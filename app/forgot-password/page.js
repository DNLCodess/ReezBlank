'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import useAuthStore from '../../store/useAuthStore'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Email is required')
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const result = await resetPassword(email)
      
      if (result.success) {
        setSent(true)
        toast.success('Password reset link sent to your email!')
      } else {
        setError(result.error || 'Failed to send reset email')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            {sent 
              ? "We've sent a password reset link to your email"
              : "Enter your email address and we'll send you a link to reset your password"
            }
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-gray-600">
              Check your email inbox and click the reset link to create a new password.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                variant="outline"
                className="w-full"
              >
                Send Another Email
              </Button>
              <Link href="/login">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className={`pl-10 ${error ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}

        {!sent && (
          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center text-gold hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}