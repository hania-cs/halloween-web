'use client'

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ghost, Moon, Bird } from 'lucide-react'

const FloatingGhost = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`absolute text-purple-500/20 ${className}`}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Ghost size={40} />
  </motion.div>
)

const FloatingBird = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`absolute text-orange-500/20 ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 30, 0],
      rotate: [0, 15, -15, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Bird size={30} />
  </motion.div>
)

const Cobweb = ({ className = "" }) => (
  <div className={`absolute w-32 h-32 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-700/20">
      <path d="M0,0 Q50,50 100,100 M20,0 Q50,50 80,100 M40,0 Q50,50 60,100 M60,0 Q50,50 40,100 M80,0 Q50,50 20,100 M100,0 Q50,50 0,100" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
    </svg>
  </div>
)

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-orange-950/30 relative overflow-hidden">
      {/* Spooky Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=32&width=32')] opacity-5" />
        <Moon size={60} className="absolute top-10 right-10 text-orange-300/70" />
        
        {/* Floating Ghosts */}
        <FloatingGhost className="top-20 left-[10%]" delay={0} />
        <FloatingGhost className="top-40 right-[20%]" delay={1} />
        <FloatingGhost className="bottom-20 left-[30%]" delay={2} />
        <FloatingGhost className="top-60 right-[40%]" delay={3} />
        
        {/* Flying Birds */}
        <FloatingBird className="top-32 left-[25%]" delay={0.5} />
        <FloatingBird className="top-48 right-[35%]" delay={1.5} />
        <FloatingBird className="bottom-40 left-[15%]" delay={2.5} />
        
        {/* Cobwebs */}
        <Cobweb className="top-0 left-0" />
        <Cobweb className="top-0 right-0 rotate-90" />
        <Cobweb className="bottom-0 left-0 -rotate-90" />
        <Cobweb className="bottom-0 right-0 rotate-180" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-orange-500 px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text"
            animate={{ 
              textShadow: [
                "0 0 7px rgba(249,115,22,0.3)",
                "0 0 10px rgba(249,115,22,0.5)",
                "0 0 7px rgba(249,115,22,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ready baby?
          </motion.h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/houses">
            <motion.button 
              className="bg-gradient-to-r from-purple-700 to-purple-800 text-orange-500 font-bold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              Ready
            </motion.button>
          </Link>
          <Link to="/houses">
            <motion.button 
              className="bg-gradient-to-r from-purple-700 to-purple-800 text-orange-500 font-bold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              SUPER READYYY
            </motion.button>
          </Link>
         
        </div>
      </div>
    </div>
  )
}

export default Home