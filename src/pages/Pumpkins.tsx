'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ghost, Moon, X } from 'lucide-react'

const pumpkins: string[] = [
  // Original 10 messages
  "Boo! Did I scare you?",
  "Happy Halloween, sweetie!",
  "I miss you so much!",
  "You're the treat to my trick!",
  "Sending spooky hugs your way!",
  "Wish we could go trick-or-treating together!",
  "If your eyes were the ocean, I'd dive without hesitation. There’s something so mesmerizing about the depth and beauty of who you are that I’d willingly lose myself, over and over, just to feel close to you. Every glance from you feels like the first warm touch of sunlight over endless blue waters, and with every gaze, I am drawn deeper. The more I get to know you, the more I realize I would gladly risk drowning in everything you are—your kindness, your warmth, your laughter, and even those little moments when you’re vulnerable.To me, you’re an entire world. A mystery I want to unravel, an adventure I want to experience without end. I long for the day when I don’t just swim in your love from afar but can feel it all around me, completely surrounded by your presence. Until then, I’ll keep diving into every message, every call, every memory we share, knowing that one day, I’ll be close enough to hold you. You are my ocean, vast and boundless, and I am captivated by the depths of you. Drowning in your love would be the sweetest fate, and I wouldn’t trade it for anything in the world.",
  "Our love is stronger than any Halloween spell!",
  "Distance can't keep us apart on Halloween!",
  "Can't wait to celebrate with you soon!",
  // Additional 20 messages
  "You make my ghost heart glow!",
  "Haunting your thoughts this Halloween!",
  "You're spooktacular, you know that?",
  "Witch-ing you were here!",
  "You've put a spell on my heart!",
  "Boo-tiful memories with you!",
  "In a room full of art, I'd still stare at you. Paintings, sculptures, and all the masterpieces in the world could never hold a candle to the beauty you carry, both inside and out. Even though we're miles apart, it's you who fills every corner of my mind, like a work of art that never fades. I imagine your laughter echoing through the silence, filling up the spaces with warmth and color, and I think about how you make even the simplest moments feel like a masterpiece. Each text, each call, each memory we've created feels like brushstrokes on the canvas of us—vibrant, genuine, unforgettable. It's your eyes, your smile, the way you see the world with such passion that captivates me beyond any grand gallery or exhibit. I long to have you near, to be able to hold your hand and feel your heartbeat against mine, but until then, know that I am here, utterly captivated by the beautiful person you are.",
  "Sending supernatural love your way!",
  "You're my pumpkin pie!",
  "Haunted without you this Halloween!",
  "Your love gives me ghost bumps!",
  "Creeping you in my thoughts!",
  "You're fang-tastic!",
  "Our love is scary good!",
  "Ghosting through Halloween without you!",
  "You're my treat, no tricks needed!",
  "Wrapped up in thoughts of you like a mummy!",
  "You make my skeleton dance!",
  "Eight billion faces in the world, yet yours is still my favorite. Out of everyone I could see, everyone I could meet, it's you who shines brightest to me. You're the one who makes my heart race with just a look, the one whose laugh feels like home, whose voice is my favorite song. Sometimes I'm struck by how improbable it is that we found each other, two people out of billions, yet it feels like it was always meant to be. You're my calm in the chaos, my anchor through it all. Every time I think of you, I feel this wave of gratitude for the simple miracle of you being you, and of us being us, despite the miles. You are my favorite view, my favorite memory, my favorite future to imagine. And I love you in a way that feels bigger than the distance, bigger than any number of faces, just as big as the world itself.",
  "Let's make some spooky memories together!"
]

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

export default function Component() {
  const [openPumpkin, setOpenPumpkin] = useState<number | null>(null)

  const handlePumpkinClick = (index: number) => {
    setOpenPumpkin(index === openPumpkin ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-orange-950/30 p-8 relative overflow-hidden">
      {/* Spooky Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=32&width=32')] opacity-5" />
        <Moon size={60} className="absolute top-10 right-10 text-orange-300/70" />
        
        {/* Floating Ghosts */}
        <FloatingGhost className="top-20 left-[10%]" delay={0} />
        <FloatingGhost className="top-40 right-[20%]" delay={1} />
        <FloatingGhost className="bottom-20 left-[30%]" delay={2} />
        <FloatingGhost className="top-60 right-[40%]" delay={3} />
        
        {/* Cobwebs */}
        <Cobweb className="top-0 left-0" />
        <Cobweb className="top-0 right-0 rotate-90" />
        <Cobweb className="bottom-0 left-0 -rotate-90" />
        <Cobweb className="bottom-0 right-0 rotate-180" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {pumpkins.map((message, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer relative group"
              onClick={() => handlePumpkinClick(index)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <Ghost 
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

        {/* Message Modal */}
        {openPumpkin !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpenPumpkin(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-purple-950 p-8 rounded-lg text-orange-500 relative max-w-md w-full mx-4 shadow-[0_0_15px_rgba(168,85,247,0.5)] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-orange-500 hover:text-orange-600"
                onClick={() => setOpenPumpkin(null)}
              >
                <X size={24} />
              </button>
              <p className="text-xl text-center font-medium">{pumpkins[openPumpkin]}</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-center relative z-10">
        <motion.button
          className="bg-gradient-to-r from-purple-700 to-purple-800 text-orange-500 font-bold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/Games'}
        >
          Play Games
        </motion.button>
      </div>
    </div>
  )
}