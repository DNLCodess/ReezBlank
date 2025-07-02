'use client'

import { motion } from 'framer-motion'
import { Camera, Sparkles, Clock, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import Link from 'next/link'

export default function LookoutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-block mb-6"
          >
            <div className="relative">
              <Camera className="h-24 w-24 text-gold mx-auto" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-8 w-8 text-gold" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            AI LookOut
            <span className="block text-gold">Coming Soon</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Upload a full body photo to try on clothing using AI. Experience the future of online shopping with our revolutionary virtual fitting technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6">
              <Camera className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Virtual Try-On</h3>
            <p className="text-gray-300">
              See how clothes look on you before buying. Our AI analyzes your body shape and fits clothing perfectly.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI-Powered</h3>
            <p className="text-gray-300">
              Advanced machine learning algorithms ensure accurate fitting and realistic visualization of clothing.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Results</h3>
            <p className="text-gray-300">
              Get instant feedback on how items fit and look, making online shopping faster and more confident.
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-3xl p-12 text-center border border-gold/30">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="mb-8"
          >
            <Clock className="h-20 w-20 text-gold mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-6">Revolutionary Technology</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're working hard to bring you the most advanced virtual fitting experience. 
            Be among the first to experience AI-powered fashion when we launch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 text-lg">
              Get Notified
            </Button>
            <Link href="/products">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div variants={itemVariants} className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12">How It Will Work</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Upload Photo',
                description: 'Take or upload a full-body photo in good lighting'
              },
              {
                step: 2,
                title: 'Select Items',
                description: 'Choose clothing items you want to try on'
              },
              {
                step: 3,
                title: 'AI Processing',
                description: 'Our AI maps the clothing to your body shape'
              },
              {
                step: 4,
                title: 'See Results',
                description: 'View realistic visualization of how items fit'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={itemVariants} className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
            <p className="text-gray-300 mb-6">
              Sign up to get notified when AI LookOut launches and be among the first to experience the future of online fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-3">
                Notify Me
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}