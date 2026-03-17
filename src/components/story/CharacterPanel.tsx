import { useGameStore } from '../../store/gameStore'
import { CHARACTERS, getDialogue } from '../../data/story'

export default function CharacterPanel() {
  const storyProgress = useGameStore(state => state.storyProgress)
  
  if (!storyProgress.currentDialogue) {
    return null
  }
  
  const dialogue = getDialogue(storyProgress.currentDialogue)
  if (!dialogue || dialogue.length === 0) {
    return null
  }
  
  const currentEntry = dialogue[storyProgress.dialogueIndex]
  if (!currentEntry) {
    return null
  }
  
  const character = CHARACTERS[currentEntry.characterId]
  if (!character) {
    return null
  }
  
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 border-blue-400',
    orange: 'bg-orange-100 border-orange-400',
    green: 'bg-green-100 border-green-400',
    red: 'bg-red-100 border-red-400',
    purple: 'bg-purple-100 border-purple-400',
    indigo: 'bg-indigo-100 border-indigo-400',
    teal: 'bg-teal-100 border-teal-400',
  }
  
  return (
    <div className={`rounded-lg border-l-4 ${colorClasses[character.color] || 'bg-gray-100 border-gray-400'} p-4 mb-4`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{character.emoji}</span>
        <div>
          <div className="font-semibold text-gray-800">{character.name}</div>
          <div className="text-sm text-gray-600">{character.role}</div>
        </div>
      </div>
    </div>
  )
}
