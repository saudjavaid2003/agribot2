'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

export default function About() {
  return (
    (<section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">About AgriChat</h2>
            <p className="text-xl text-gray-600 mb-6">
              AgriChat is revolutionizing agriculture with AI-powered insights and expert connections. Our platform
              brings together farmers, agronomists, and cutting-edge technology to cultivate knowledge and grow success.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Founded by a team of agricultural experts and tech innovators, we're on a mission to empower farmers
              with the tools and knowledge they need to thrive in an ever-changing world.
            </p>
            <button
              className="bg-green-600 text-white rounded-md py-2 px-6 hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative h-[100%]  rounded-lg overflow-hidden">
            <Image
              src="/agri_about.jpg"
              alt="Farmer using AgriChat"
              layout="fill"
              objectFit="cover"
              className="rounded-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>)
  );
}

