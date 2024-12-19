"use client"
import ReactMarkdown from 'react-markdown'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length,
      content: inputMessage,
      isUser: true,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('https://khizar3333-agri-bot.hf.space/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: inputMessage,
          message: inputMessage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await response.json()
      const botResponse = data.messages.reverse().find(msg => msg.type === 'ai')

      if (botResponse) {
        const newBotMessage = {
          id: messages.length + 1,
          content: botResponse.content,
          isUser: false,
        }
        setMessages((prevMessages) => [...prevMessages, newBotMessage])
      } else {
        throw new Error('No AI response found')
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messages.length + 1,
          content: `Error: ${error.message}`,
          isUser: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return (
    (<Layout>
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">
        Logout
      </button>
      <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                {message.isUser ? (
                  message.content
                ) : (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg p-3 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50">
            Send
          </button>
        </form>
      </div>
    </Layout>)
  );
}

