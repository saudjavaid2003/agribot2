'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://khizar3333-agri-bot.hf.space/user/register', {
      // const response = await fetch('http://127.0.0.1:8000/user/register', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (response.ok) {
        router.push('/login')
      } else {
        const data = await response.json()
        setError(data.detail || 'An error occurred during signup')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    (<Layout>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </Layout>)
  );
}

