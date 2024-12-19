import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLoggedIn(true)
      router.push('/chat')
    } else {
      setIsLoggedIn(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return (
    (<div>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">
          Logout
        </button>
      )}
      {children}
    </div>)
  );
}

const Home = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLoggedIn(true)
      router.push('/chat')
    } else {
      setIsLoggedIn(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return (
    (<Layout>
      <h1>Home Page</h1>
      {/* Rest of the Home component */}
    </Layout>)
  );
}

export default Home

