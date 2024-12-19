// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X } from 'lucide-react'

// export default function Layout({
//   children
// }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = (e) => {
//       e.preventDefault()
//       const href = (e.currentTarget).getAttribute('href')
//       if (href && href.startsWith('#')) {
//         const targetId = href.replace('#', '')
//         const elem = document.getElementById(targetId)
//         elem?.scrollIntoView({
//           behavior: 'smooth'
//         })
//       }
//     }

//     const links = document.querySelectorAll('a[href^="#"]')
//     links.forEach(link => {
//       link.addEventListener('click', handleScroll)
//     })

//     return () => {
//       links.forEach(link => {
//         link.removeEventListener('click', handleScroll)
//       })
//     };
//   }, [])

//   const navItems = [
//     { href: '#home', label: 'Home' },
//     { href: '#features', label: 'Features' },
//     { href: '#about', label: 'About' },
//     { href: '#pricing', label: 'Pricing' },
//     { href: '#contact', label: 'Contact' },
//   ]

//   return (
//     (<div className="min-h-screen flex flex-col">
//       <header className="bg-green-800 text-white fixed w-full z-10">
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <a href="#home" className="text-2xl font-bold">
//                 AgriChat
//               </a>
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.href}
//                     href={item.href}
//                     className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
//                     {item.label}
//                   </a>
//                 ))}
//               </div>
//             </div>
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-green-300 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-200">
//                 <span className="sr-only">Open main menu</span>
//                 {isMenuOpen ? (
//                   <X className="block h-6 w-6" aria-hidden="true" />
//                 ) : (
//                   <Menu className="block h-6 w-6" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </nav>
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden">
//               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.href}
//                     href={item.href}
//                     className="block hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium transition duration-200"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {item.label}
//                   </a>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//       <main className="flex-grow pt-16">{children}</main>
//     </div>)
//   );
// }

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault()
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '')
        const elem = document.getElementById(targetId)
        elem?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', handleScroll)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll)
      })
    };
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    router.push('/')
  }

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ]

  const authItems = isLoggedIn
    ? [{ href: '#', label: 'Logout', onClick: handleLogout }]
    : [
        { href: '/login', label: 'Login' },
        { href: '/signup', label: 'Sign Up' },
      ]

  const allNavItems = [...navItems, ...authItems]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-800 text-white fixed w-full z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#home" className="text-2xl font-bold">
                AgriChat
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {allNavItems.map((item) => (
                  item.onClick ? (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-green-300 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-200">
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {allNavItems.map((item) => (
                  item.onClick ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium transition duration-200">
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                      onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main className="flex-grow pt-16">{children}</main>
    </div>
  );
}

