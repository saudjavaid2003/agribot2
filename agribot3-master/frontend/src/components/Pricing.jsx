'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: ['AI-powered crop insights', 'Community access', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['All Basic features', 'Expert chat access', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['All Pro features', 'Dedicated account manager', 'Custom integrations'],
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

export default function Pricing() {
  return (
    (<section id="pricing" className="py-20 bg-gray-50">
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
            Choose the Right Plan for You
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600">
            Flexible pricing options to suit your farming needs
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">{plan.name}</h3>
                <p className="mt-4 text-4xl font-extrabold text-green-600 text-center">{plan.price}</p>
                <p className="mt-1 text-gray-500 text-center">{plan.name === 'Enterprise' ? 'Contact us for pricing' : 'per month'}</p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-8 bg-gray-50">
                <button
                  className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 transition duration-300">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>)
  );
}

