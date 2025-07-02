'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-black text-white py-12"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">ReezBlank</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Premium fashion redefined. Discover our carefully curated collection of 
              modern clothing that blends style with sustainability.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black hover:bg-gold/90 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black hover:bg-gold/90 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black hover:bg-gold/90 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black hover:bg-gold/90 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-gold transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/lookout" className="text-gray-300 hover:text-gold transition-colors">
                  AI LookOut
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-gold transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-gold" />
                support@reezblank.com
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-gold" />
                +234 123 456 7890
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-gold mt-1" />
                123 Fashion Street, Lagos, Nigeria
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ReezBlank. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gold transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}