'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      router.push('/chat')
    }
  }, [router])

  return (
    (<Layout>
      <div id="home">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </Layout>)
  );
}

