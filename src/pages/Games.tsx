

import { useState, useEffect, useRef } from 'react'

interface ScrambledWord {
  word: string
  scrambled: string
}

interface CrosswordClue {
  number: number
  clue: string
  answer: string
  direction: 'across' | 'down'
  x: number
  y: number
}

interface EscapeRoomPuzzle {
  question: string
  answer: string
  hint: string
}

interface CarveColor {
  name: string
  value: string
}

const scrambledWords: ScrambledWord[] = [
  { word: 'PUMPKIN', scrambled: 'KIPNUMP' },
  { word: 'GHOST', scrambled: 'HOSTG' },
  { word: 'WITCH', scrambled: 'CHTIW' },
  { word: 'VAMPIRE', scrambled: 'MPRAIVE' },
  { word: 'ZOMBIE', scrambled: 'BEIZOM' },
  { word: 'SKELETON', scrambled: 'KELESONT' },
  { word: 'HAUNTED', scrambled: 'DETHUAN' },
  { word: 'MONSTER', scrambled: 'SERMTON' },
  { word: 'SPOOKY', scrambled: 'YKOOPS' },
  { word: 'CANDY', scrambled: 'DYNAC' }
]


const crosswordClues: CrosswordClue[] = [
    { number: 1, clue: "Halloween night light", answer: "LANTERN", direction: "across", x: 0, y: 0 },
    
    { number: 2, clue: "Trick or ___", answer: "TREAT", direction: "across", x: 0, y: 2 },
    { number: 3, clue: "Dark bird associated with Halloween", answer: "RAVEN", direction: "down", x: 5, y: 0}, // Made the clue clearer
    { number: 4, clue: "Month of Halloween", answer: "OCTOBER", direction: "across", x: 0, y: 4 }
];


const escapeRoomPuzzles: EscapeRoomPuzzle[] = [
  {
    question: "What has to be broken before you can use it?",
    answer: "EGG",
    hint: "It's something you might find in a witch's cauldron."
  },
  {
    question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    answer: "FIRE",
    hint: "I'm often found in jack-o'-lanterns."
  },
  {
    question: "What building has the most stories?",
    answer: "LIBRARY",
    hint: "You might find spooky books here."
  }
]

const carveColors: CarveColor[] = [
  { name: 'Orange', value: '#FFA500' },
  { name: 'Purple', value: '#800080' },
  { name: 'Green', value: '#008000' },
  { name: 'White', value: '#FFFFFF' }
]

export default function Component() {
  const [currentWord, setCurrentWord] = useState<ScrambledWord>(scrambledWords[0])
  const [userGuess, setUserGuess] = useState<string>('')
  const [wordResult, setWordResult] = useState<string>('')
  
  const [crosswordAnswers, setCrosswordAnswers] = useState<Record<string, string>>({})
  const [crosswordResult, setCrosswordResult] = useState<string>('')
  const [selectedCell, setSelectedCell] = useState<string | null>(null)

  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentColor, setCurrentColor] = useState<string>(carveColors[0].value)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const [currentPuzzle, setCurrentPuzzle] = useState<number>(0)
  const [escapeRoomAnswer, setEscapeRoomAnswer] = useState<string>('')
  const [escapeRoomResult, setEscapeRoomResult] = useState<string>('')
  const [showHint, setShowHint] = useState<boolean>(false)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        setCtx(context)
        // Set initial canvas background
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }, [])

  const handleWordGuess = (e: React.FormEvent) => {
    e.preventDefault()
    if (userGuess.toUpperCase() === currentWord.word) {
      setWordResult('Correct! You unscrambled the word!')
      // Get a new random word that's different from the current one
      let newWord
      do {
        newWord = scrambledWords[Math.floor(Math.random() * scrambledWords.length)]
      } while (newWord.word === currentWord.word)
      setCurrentWord(newWord)
    } else {
      setWordResult('Sorry, that\'s not correct. Try again!')
    }
    setUserGuess('')
  }

  const handleCrosswordChange = (x: number, y: number, value: string) => {
    setCrosswordAnswers(prev => ({ ...prev, [`${x},${y}`]: value.toUpperCase() }))
  }

  const checkCrossword = () => {
    const allCorrect = crosswordClues.every(clue => {
      return clue.answer.split('').every((letter, index) => {
        const x = clue.direction === 'across' ? clue.x + index : clue.x
        const y = clue.direction === 'down' ? clue.y + index : clue.y
        return crosswordAnswers[`${x},${y}`] === letter
      })
    })
    setCrosswordResult(allCorrect ? 'Congratulations! You solved the crossword!' : 'Not quite right. Keep trying!')
  }

  const renderCrosswordGrid = () => {
    const grid = Array(7).fill(null).map(() => Array(7).fill(null))
    
    crosswordClues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const x = clue.direction === 'across' ? clue.x + i : clue.x
        const y = clue.direction === 'down' ? clue.y + i : clue.y
        
        if (x >= 0 && x < 7 && y >= 0 && y < 7) {
          grid[y][x] = (
            <input
              key={`${x},${y}`}
              type="text"
              maxLength={1}
              value={crosswordAnswers[`${x},${y}`] || ''}
              onChange={(e) => handleCrosswordChange(x, y, e.target.value)}
              className={`w-8 h-8 text-center border border-purple-500 ${
                selectedCell === `${x},${y}` ? 'bg-purple-300' : 'bg-purple-800'
              } text-orange-500`}
              onClick={() => setSelectedCell(`${x},${y}`)}
            />
          )
          if (i === 0) {
            grid[y][x] = (
              <div key={`${x},${y}`} className="relative">
                <span className="absolute top-0 left-0 text-xs">{clue.number}</span>
                {grid[y][x]}
              </div>
            )
          }
        }
      }
    })

    return grid.map((row, i) => (
      <div key={i} className="flex">
        {row.map((cell, j) => (
          <div key={j} className="w-8 h-8">
            {cell || <div className="w-8 h-8 bg-black"></div>}
          </div>
        ))}
      </div>
    ))
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (ctx) {
      ctx.beginPath()
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    let x, y
    if ('clientX' in e) {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    }
    
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const resetPumpkin = () => {
    if (!ctx || !canvasRef.current) return
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.beginPath()
  }

  const handleEscapeRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (escapeRoomAnswer.toUpperCase() === escapeRoomPuzzles[currentPuzzle].answer) {
      if (currentPuzzle === escapeRoomPuzzles.length - 1) {
        setEscapeRoomResult('Congratulations! You\'ve escaped the room!')
      } else {
        setCurrentPuzzle(currentPuzzle + 1)
        setEscapeRoomResult('Correct! On to the next puzzle...')
      }
    } else {
      setEscapeRoomResult('Incorrect. Try again!')
    }
    setEscapeRoomAnswer('')
    setShowHint(false)
  }

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Halloween Games</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-purple-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Unscramble the Word</h2>
          <p className="mb-4">Unscramble this word: {currentWord.scrambled}</p>
          <form onSubmit={handleWordGuess} className="space-y-4">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className="w-full p-2 bg-purple-800 text-orange-500 rounded"
              placeholder="Enter your guess"
            />
            <button type="submit" className="w-full bg-orange-500 text-purple-900 py-2 rounded font-bold">
              Guess
            </button>
          </form>
          {wordResult && <p className="mt-4">{wordResult}</p>}
        </div>

        <div className="bg-purple-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Halloween Crossword</h2>
          <div className="mb-4">{renderCrosswordGrid()}</div>
          <div className="mt-4">
            <h3 className="font-bold">Clues:</h3>
            <ul className="space-y-1">
              {crosswordClues.map((clue, index) => (
                <li key={index}>{clue.number}. {clue.clue} ({clue.direction})</li>
              ))}
            </ul>
          </div>
          <button onClick={checkCrossword} className="w-full bg-orange-500 text-purple-900 py-2 rounded font-bold mt-4">
            Check Answers
          </button>
          {crosswordResult && <p className="mt-4">{crosswordResult}</p>}
        </div>

        <div className="bg-purple-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Carve a Virtual Pumpkin</h2>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="border border-orange-500 cursor-crosshair bg-orange-500"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {carveColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setCurrentColor(color.value)}
                className={`w-8 h-8 rounded-full ${currentColor === color.value ? 'ring-2 ring-white' : ''}`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
          <div className="mt-4">
            <button onClick={resetPumpkin} className="w-full bg-orange-500 text-purple-900 py-2 rounded font-bold">
              Reset Pumpkin
            </button>
          </div>
        </div>

        <div className="bg-purple-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Escape Room Puzzle</h2>
          <p className="mb-4">{escapeRoomPuzzles[currentPuzzle].question}</p>
          <form onSubmit={handleEscapeRoomSubmit} className="space-y-4">
            <input
              type="text"
              
              value={escapeRoomAnswer}
              onChange={(e) => setEscapeRoomAnswer(e.target.value)}
              className="w-full p-2 bg-purple-800 text-orange-500 rounded"
              placeholder="Enter your answer"
            />
            <button type="submit" className="w-full bg-orange-500 text-purple-900 py-2 rounded font-bold">
              Submit
            </button>
          </form>
          {escapeRoomResult && <p className="mt-4">{escapeRoomResult}</p>}
          <button 
            onClick={() => setShowHint(!showHint)} 
            className="mt-4 text-sm underline"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && <p className="mt-2 text-sm italic">{escapeRoomPuzzles[currentPuzzle].hint}</p>}
        </div>
      </div>

      <div className="mt-8 text-center">
      <button 
        className="bg-orange-500 hover:bg-orange-600 text-purple-900 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => window.location.href = '/'}
      > 
        Back to Home 
      </button> 
   

      </div>
    </div>
  )
}