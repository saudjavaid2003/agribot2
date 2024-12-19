'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    try {
      const response = await fetch('https://khizar3333-agri-bot.hf.space/token', {
        // const response = await fetch('http://127.0.0.1:8000/token', {

        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        router.push('/chat')
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    (<Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200">
            Login
          </button>
        </form>
      </div>
    </Layout>)
  );
}

