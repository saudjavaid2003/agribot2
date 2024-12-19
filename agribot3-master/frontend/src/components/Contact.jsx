'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const result = await emailjs.send(
        'service_hj9cl7s',
        'template_9z97uaw',
        { name, email, message },
        'Y5m57xeQCiz9BQVzo'
      )
      console.log(result.text)
      setStatus('Message sent successfully!')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('Failed to send message. Please try again.')
    }
  }

  return (
    (<section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in Touch
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600">
            Have questions? We're here to help!
          </motion.p>
        </motion.div>
        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto">
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Your Name" />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              placeholder="your@email.com" />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Your message here..."></textarea>
          </motion.div>
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center">
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-center ${
                status === 'Message sent successfully!' ? 'text-green-600' : 'text-red-600'
              }`}>
              {status}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>)
  );
}

