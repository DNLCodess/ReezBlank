'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'
import { Button } from '../../components/ui/button'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [orderNumber] = useState(() => reference || `REEZ${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-cream flex items-center justify-center py-8"
    >
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-black mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-2 border-dashed border-gold rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">Order Details</h2>
            <p className="text-lg text-gray-600 mb-1">Order Number:</p>
            <p className="text-2xl font-mono font-bold text-gold">{orderNumber}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Package className="h-12 w-12 text-gold mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-1">Order Processed</h3>
              <p className="text-sm text-gray-600">Your order is being prepared</p>
            </div>
            <div>
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-500 mb-1">Shipping Soon</h3>
              <p className="text-sm text-gray-500">We'll notify you when shipped</p>
            </div>
            <div>
              <Home className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-500 mb-1">Delivered</h3>
              <p className="text-sm text-gray-500">Enjoy your new items!</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gold/10 border border-gold/20 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-black mb-3">What's Next?</h3>
          <div className="space-y-2 text-left">
            <p className="text-gray-700">✓ You'll receive a confirmation email shortly</p>
            <p className="text-gray-700">✓ We'll send tracking information when your order ships</p>
            <p className="text-gray-700">✓ Expected delivery: 5-7 business days</p>
            <p className="text-gray-700">✓ Questions? Contact our support team</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Need help? Contact our customer service team
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-500 justify-center">
            <span>📧 support@reezblank.com</span>
            <span className="hidden sm:block">|</span>
            <span>📱 +234 123 456 7890</span>
            <span className="hidden sm:block">|</span>
            <span>💬 Live Chat</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}