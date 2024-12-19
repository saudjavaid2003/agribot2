'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    (<footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-bold mb-4">AgriChat</h3>
            <p className="text-gray-300">Cultivating knowledge, growing success.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-green-300 transition duration-200">About Us</a></li>
              <li><a href="/features" className="hover:text-green-300 transition duration-200">Features</a></li>
              <li><a href="/pricing" className="hover:text-green-300 transition duration-200">Pricing</a></li>
              <li><a href="/contact" className="hover:text-green-300 transition duration-200">Contact</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300 transition duration-200">Facebook</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-200">Twitter</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-200">LinkedIn</a></li>
              <li><a href="#" className="hover:text-green-300 transition duration-200">Instagram</a></li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 border-t border-green-700 pt-8 text-center">
          <p>&copy; 2023 AgriChat. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>)
  );
}

