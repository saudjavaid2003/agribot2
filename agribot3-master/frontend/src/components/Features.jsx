'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Leaf, MessageSquare, Users } from 'lucide-react'

const features = [
  {
    icon: <Leaf className="w-12 h-12 text-green-600" />,
    title: 'Crop Insights',
    description: 'Get AI-powered insights on crop management and optimization.',
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
    title: 'Expert Chat',
    description: 'Connect with agriculture experts and AI assistants in real-time.',
  },
  {
    icon: <Users className="w-12 h-12 text-yellow-600" />,
    title: 'Community',
    description: 'Join a thriving community of farmers and agronomists.',
  },
]

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

const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.2
    }
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
}

export default function Features() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          className="text-center"
        >
          <motion.h2
            variants={textVariants}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Grow Your Knowledge with AgriChat
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="mt-4 text-xl text-gray-600"
          >
            Discover how our AI-powered platform can revolutionize your farming practices.
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="pt-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flow-root bg-white rounded-lg px-6 pb-8"
              >
                <div className="-mt-6">
                  <div>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-flex items-center justify-center p-3 bg-green-50 rounded-md shadow-lg"
                    >
                      {feature.icon}
                    </motion.span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

