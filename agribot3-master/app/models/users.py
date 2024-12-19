
from pydantic import BaseModel
from sqlmodel import  SQLModel, Field







    


    
class User (SQLModel, table=True):
        id: int = Field(default=None, primary_key=True)
        username: str
        email:str
        password:str
        

class Register_User(BaseModel):
    username: str
    email: str
    password: str
           

class Token (BaseModel):
        access_token:str
        token_type: str
        refresh_token: str

class TokenData (BaseModel):
        username:str







class RefreshTokenData (BaseModel):
        email:str