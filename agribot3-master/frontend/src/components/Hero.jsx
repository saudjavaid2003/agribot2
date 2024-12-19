'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    (<div
      className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0">
        <Image
          src="/hero_agri.jpg"
          alt="Agriculture background"
          layout="fill"
          objectFit="fit"
          quality={100} />
      </motion.div>
      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to AgriChat
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl mb-8">
          Cultivate knowledge with our AI-powered agriculture chat application
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-x-4">
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200">
            Login
          </motion.a>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200">
            Sign Up
          </motion.a>
        </motion.div>
      </div>
    </div>)
  );
}

