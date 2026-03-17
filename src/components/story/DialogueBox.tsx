import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { CHARACTERS, getDialogue } from '../../data/story'

export default function DialogueBox() {
  const storyProgress = useGameStore(state => state.storyProgress)
  const advanceDialogue = useGameStore(state => state.advanceDialogue)
  const clearDialogue = useGameStore(state => state.clearDialogue)
  
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  
  // Compute derived values
  const dialogue = storyProgress.currentDialogue ? getDialogue(storyProgress.currentDialogue) : []
  const currentEntry = dialogue[storyProgress.dialogueIndex]
  const character = currentEntry ? CHARACTERS[currentEntry.characterId] : null
  const isLastEntry = storyProgress.dialogueIndex >= dialogue.length - 1
  
  // Call useEffect unconditionally (before any early return)
  useEffect(() => {
    if (!currentEntry) return
    
    setDisplayedText('')
    setIsTyping(true)
    setShowContinue(false)
    
    const fullText = currentEntry.text
    let currentIndex = 0
    
    const typewriter = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typewriter)
        setIsTyping(false)
        setShowContinue(true)
      }
    }, 30)
    
    return () => clearInterval(typewriter)
  }, [storyProgress.dialogueIndex, currentEntry?.text])
  
  // Compute handlers (these are functions, not hooks)
  const handleContinue = () => {
    if (isLastEntry) {
      clearDialogue()
    } else {
      advanceDialogue()
    }
  }
  
  const handleSkip = () => {
    if (currentEntry) {
      setDisplayedText(currentEntry.text)
      setIsTyping(false)
      setShowContinue(true)
    }
  }
  
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-300',
    orange: 'bg-orange-50 border-orange-300',
    green: 'bg-green-50 border-green-300',
    red: 'bg-red-50 border-red-300',
    purple: 'bg-purple-50 border-purple-300',
    indigo: 'bg-indigo-50 border-indigo-300',
    teal: 'bg-teal-50 border-teal-300',
  }
  
  // Early return if conditions are not met
  if (!storyProgress.currentDialogue || !dialogue || dialogue.length === 0 || !currentEntry || !character) {
    return null
  }
  
  return (
    <div className={`rounded-lg border-2 ${colorClasses[character.color] || 'bg-gray-50 border-gray-300'} p-4 mb-4`}>
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{character.emoji}</span>
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{character.name}</div>
          <div className="text-xs text-gray-500">{character.role}</div>
        </div>
        {isTyping && (
          <button
            onClick={handleSkip}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Skip
          </button>
        )}
      </div>
      
      <p className="text-gray-700 min-h-[60px]">
        {displayedText}
        {isTyping && <span className="animate-pulse">|</span>}
      </p>
      
      {showContinue && (
        <button
          onClick={handleContinue}
          className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {isLastEntry ? 'Continue' : 'Next'}
        </button>
      )}
    </div>
  )
}
