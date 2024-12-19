from typing import Annotated
from fastapi.responses import JSONResponse
from langchain_google_genai import ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings
from langgraph.prebuilt import tools_condition
from langgraph.graph import MessagesState
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.graph.state import CompiledStateGraph
from langgraph.graph import START, StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI

from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from pydantic import BaseModel
from typing_extensions import TypedDict
import os
from langgraph.graph.message import add_messages
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from fastapi import FastAPI, Request
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from contextlib import asynccontextmanager
from app.router import user
from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import  Session
from typing import Annotated

from app.utils.auth import EXPIRY_TIME, authenticate_user, create_access_token, current_user, get_user_from_db, validate_refresh_token, create_refresh_token
from app.config.db import get_session, create_tables
from app.models.users import  Token, User
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
from langgraph.checkpoint.memory import MemorySaver

# from app.utils.settings import DATABASE_URL
load_dotenv()
@asynccontextmanager
async def lifespan(app: FastAPI):
    print('Creating Tables')
    create_tables()
    print("Tables Created")
    yield

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
app.include_router(router=user.user_router)    
# DATABASE_URL=os.getenv("DATABASE_URL")
# connection_kwargs = {"autocommit": True, "prepare_threshold": 0}

# pool = ConnectionPool(conninfo=DATABASE_URL, max_size=20, kwargs=connection_kwargs)
# checkpointer = PostgresSaver(pool)
# checkpointer.setup()
checkpointer = MemorySaver()

LANGCHAIN_API_KEY=os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_TRACING_V2="true"
LANGCHAIN_PROJECT="langchain-academy"

# Initialize LLM
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=os.getenv("GOOGLE_API_KEY"))
# llm=ChatOpenAI(model_name="gpt-3.5-turbo",openai_api_key=os.getenv("OPENAI_API_KEY"))


# initialze fastapi app

loader = PyPDFLoader("app/pdf/crop_guide2.pdf")
docs = loader.load()
documents = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200
).split_documents(docs)
embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vector = FAISS.from_documents(documents,embedding )

retriever = vector.as_retriever()

retriever_tool = create_retriever_tool(
    retriever,
    "Global_Agriculture_and_Environment_Advisor",
    "use this tool to provide insights on the complex relationship between agriculture and the environment. It can answer your questions about environmental concerns in agriculture, the impact of farming practices on climate change and ecosystems, and emerging trends in sustainable agriculture."
)
sys_msg=SystemMessage(content="""

You are an agricultural assistant. Respond to user questions with the following guidelines:

1. Communication Approach:
- Always answer in polite and simple terms
- Use clear, easy-to-understand language
- Break down complex information into digestible points

2. Tool Usage Rules:
- For crop production advice or location-specific plans:
  * First, use Tavily tool to find weather conditions
  * Incorporate weather information into your comprehensive response
- For other questions:
  * Use retrieval_tool to find relevant information
  * Transform tool-retrieved information into a natural language response

3. Response Structure:
- Key Points: Highlight 2-3 main takeaways
- Detailed Explanation: Provide in-depth information
- Practical Insights: Offer actionable advice or recommendations

4. Important Constraints:
- Do not use multiple tools simultaneously
- Do not combine answers from different tools in a single response
- Prioritize clarity and helpfulness

Always aim to provide a comprehensive, structured, and user-friendly response.
"""
)
# sys_msg = SystemMessage(content="""
# You are an agricultural assistant. Answer user question in polite manners and in simple terms.Always use provided
#  tools to find relevant answer dont try to answer just by yourself, if user 
# ask advice or plan for crop production on a given location always use tavily tool first to find weather of a given location then use this information
# to answer further and also mention weather conditions in your response if question is about crop production.if user dont ask advice or
# plan,guidance then always use the retrieval_tool to find the answer then use this answer to answer a user 
# question in natural language.
# Dont use both tools at the same time and dont combine answer of both tools in one response.
# also make your response in a structured way and then return that structured answer                        
                      
                   
# """)
                        

class State(TypedDict):
    messages: Annotated[list, add_messages]
# Initialize Tavily Search Tool
tool = TavilySearchResults(api_key=os.getenv("TAVILY_API_KEY"),
                           max_results=2,
                           include_answer=True)
# print(tool.invoke({"query": "who won 2024 us elections"}))



# Define tools dictionary
tools = [tool, retriever_tool]  # Tool name and instance
llm_with_tools = llm.bind_tools(tools)
# StateGraph Builder
builder: StateGraph = StateGraph(MessagesState)

# Define assistant node function
def assistant(state: MessagesState) -> MessagesState:
   return {"messages": [llm_with_tools.invoke([sys_msg] + state["messages"])]}

   

# Add nodes to the graph
builder.add_node("assistant", assistant)

builder.add_node("Punjab_Fertilizer_Advisor",retriever_tool)

builder.add_node("tools", ToolNode(tools))  # Use corrected tools dictionary

# Add edges to the graph
builder.add_edge(START, "assistant")
builder.add_conditional_edges(
    "assistant",
    tools_condition,  # Route to tools if a tool call is made
)
builder.add_edge("tools", "assistant")  # Return from tools to assistant

# Compile the graph
graph: CompiledStateGraph = builder.compile(checkpointer=checkpointer)
config = {"configurable": {"thread_id": "1"}}



# creating a fastapi app
@app.get("/")
def root():
    return {"Hello": "World"}


class ChatMessage(BaseModel):
    message: str
# @app.post("/chat")
# def chat(message:str):
    
#     return graph.invoke({"messages": [HumanMessage(content=message)]}, config=config)

@app.post("/chat")
async def chat(request: Request):
    try:
        body = await request.json()
        print("Received body:", body)  # Debug print
        query = body.get('query') or body.get('message')
        
        if not query:
            return JSONResponse(
                status_code=400, 
                content={"detail": "No query provided"}
            )
        
        return graph.invoke({"messages": [HumanMessage(content=query)]}, config=config)
    except Exception as e:
        print(f"Error parsing request: {e}")
        return JSONResponse(
            status_code=400, 
            content={"detail": str(e)}
        )
        
    
    






@app.post('/token')
async def login(form_data:Annotated[OAuth2PasswordRequestForm, Depends()],
                session:Annotated[Session, Depends(get_session)]):
    user = authenticate_user (form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    expire_time = timedelta(minutes=EXPIRY_TIME)
    access_token = create_access_token({"sub":form_data.username}, expire_time)

    refresh_expire_time = timedelta(days=7)
    refresh_token = create_refresh_token({"sub":user.email}, refresh_expire_time)

    return Token(access_token=access_token, token_type="bearer", refresh_token=refresh_token)

@app.post("/token/refresh")
def refresh_token(old_refresh_token:str,
                  session:Annotated[Session, Depends(get_session)]):
    
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token, Please login again",
        headers={"www-Authenticate":"Bearer"}
    )
    
    user = validate_refresh_token(old_refresh_token,
                                  session)
    if not user:
        raise credential_exception
    
    expire_time = timedelta(minutes=EXPIRY_TIME)
    access_token = create_access_token({"sub":user.username}, expire_time)

    refresh_expire_time = timedelta(days=7)
    refresh_token = create_refresh_token({"sub":user.email}, refresh_expire_time)

    return Token(access_token=access_token, token_type= "bearer", refresh_token=refresh_token)

