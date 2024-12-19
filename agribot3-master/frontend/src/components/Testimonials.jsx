'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'John Doe',
    role: 'Organic Farmer',
    image: '/user1.jpg',
    quote: 'AgriChat has revolutionized how I manage my crops. The AI insights are invaluable!',
  },
  {
    name: 'Jane Smith',
    role: 'Agricultural Researcher',
    image: '/user2.jpg',
    quote: 'The expert chat feature has connected me with brilliant minds in agriculture.',
  },
  {
    name: 'Mike Johnson',
    role: 'Sustainable Farming Advocate',
    image: '/user4.avif',
    quote: 'The community on AgriChat is supportive and knowledgeable. A great resource!',
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function Testimonials() {
  return (
    (<section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          What Our Users Say
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-8 shadow-md">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
                className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  layout='fit'
                  className="rounded-full" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 * index, duration: 0.8 }}
                className="text-gray-700 italic">
                "{testimonial.quote}"
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>)
  );
}

