"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Skull, Candy, X, Ghost } from 'lucide-react'

interface House {
  treat: string
  type: 'song' | 'photo' | 'place' | 'riddle'
}

const houses: House[] = [
  { treat: 'https://www.canva.com/design/DAGVFSk6RFY/wMQQF_YGUDIhAMjmqCT-DA/edit?utm_content=DAGVFSk6RFY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', type: 'place' },
  { treat: 'https://www.canva.com/design/DAGVEKio-Ec/4pH7BEmOJ3NdK_fZcqU0Rg/edit', type: 'song' },
  { treat: 'https://watchseries.bar/movie/bloomington/51736', type: 'place' },  
  { treat: 'https://open.spotify.com/playlist/5YnXDLHKvCp3fA4z64nDWk?si=5440b654ed0b4a14k', type: 'song' },
  { treat: 'https://www.canva.com/design/DAGVDzCv-58/oKugENpm0-IaB9Fqc2H_aA/edit?utm_content=DAGVDzCv-58&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', type: 'photo' },
  { treat: 'https://watchseries.bar/movie/the-love-witch/374052', type: 'place' },
  { treat: 'https://www.youtube.com/watch?v=xYsfIYUV4Gk', type: 'place' },
  { treat: 'https://docs.google.com/document/d/1d8pKYD2xMof-zpQrMCuyjTp9rws7TwYR28CNIWYATvk/edit?tab=t.0', type: 'song' },
  { treat: 'https://www.canva.com/design/DAGVDw6qkVE/PaRwjkuPcy1pWKoQxZDR9Q/edit', type: 'place' },
]

const FloatingGhost = ({ delay = 0 }) => (
  <motion.div
    className="absolute text-purple-500/20"
    initial={{ y: 0, x: "-50%" }}
    animate={{ 
      y: [-20, 20, -20],
      x: ["-50%", "-45%", "-50%"]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay
    }}
  >
    <Ghost size={64} />
  </motion.div>
)

export default function Component() {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null)
  const [showTreat, setShowTreat] = useState<boolean>(false)
  const [showTrick, setShowTrick] = useState<boolean>(false)

  const handleHouseClick = (index: number): void => {
    setSelectedHouse(index)
    setShowTreat(false)
    setShowTrick(false)
  }

  const handleTreatClick = (): void => {
    setShowTreat(true)
  }

  const handleTrickClick = (): void => {
    setShowTrick(true)
  }

  const handleClose = (): void => {
    setSelectedHouse(null)
    setShowTreat(false)
    setShowTrick(false)
  }

  useEffect(() => {
    if (showTrick) {
      const timeout = setTimeout(() => {
        setShowTrick(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showTrick])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-orange-950 p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=32&width=32')] opacity-5" />
      <div className="absolute top-1/4 left-1/4">
        <FloatingGhost delay={0} />
      </div>
      <div className="absolute top-1/3 left-2/3">
        <FloatingGhost delay={1} />
      </div>
      <div className="absolute top-2/3 left-1/3">
        <FloatingGhost delay={2} />
      </div>
      
      {/* Spider web corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-purple-500/20 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-purple-500/20 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-purple-500/20 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-purple-500/20 rounded-br-3xl" />

      {/* Main content */}
      <div className="relative z-10">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-12 justify-items-center items-center h-[calc(100vh-16rem)]">
          {houses.map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer relative group"
              onClick={() => handleHouseClick(index)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <Home 
                size={64} 
                className={`${
                  index % 2 === 0 ? 'text-purple-600 hover:text-purple-400' : 'text-orange-500 hover:text-orange-400'
                } transition-colors relative`} 
              />
              <motion.div
                className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-purple-500/50 to-orange-500/50 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ translateX: '-50%' }}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedHouse !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 p-8 rounded-lg text-orange-500 relative max-w-md w-full mx-4 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <button
                  className="absolute top-2 right-2 text-orange-500 hover:text-orange-600"
                  onClick={handleClose}
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl mb-6 text-center font-bold">Choose wisely...</h2>
                <div className="flex gap-6 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-purple-900 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                    onClick={handleTrickClick}
                  >
                    <Skull className="inline-block" /> Trick
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-purple-900 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                    onClick={handleTreatClick}
                  >
                    <Candy className="inline-block" /> Treat
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTreat && selectedHouse !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 p-8 rounded-lg text-orange-500 relative max-w-md w-full mx-4 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <button
                  className="absolute top-2 right-2 text-orange-500 hover:text-orange-600"
                  onClick={() => setShowTreat(false)}
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl mb-6 text-center font-bold">Your treat!</h2>
                {houses[selectedHouse].type === 'song' && (
                  <p className="text-center">
                    Hmm..what could this be?{' '}
                    <a href={houses[selectedHouse].treat} target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-400 underline">
                    View here...
                    </a>
                  </p>
                )}
                {houses[selectedHouse].type === 'photo' && (
                  <p className="text-center">
                    Hmm..what could this be?:{' '}
                    <a href={houses[selectedHouse].treat} target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-400 underline">
                      View here...
                    </a>
                  </p>
                )}
                {houses[selectedHouse].type === 'place' && (
                  <p className="text-center">
                    Hmm..what could this be?{' '}
                    <a href={houses[selectedHouse].treat} target="_blank" rel="noopener noreferrer" className="text-orange-300 hover:text-orange-400 underline">
                      View here...
                    </a>
                  </p>
                )}
                {houses[selectedHouse].type === 'riddle' && (
                  <p className="text-center">Solve this Halloween riddle: {houses[selectedHouse].treat}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTrick && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.img
                src="/placeholder.svg?height=300&width=300"
                alt="Scary face"
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center relative z-10">
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-purple-900 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/pumpkins'}
          >
            Go to Ghost Patch
          </motion.button>
        </div>
      </div>
    </div>
  )
}