import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import type { Part, Badge } from '../utils/types'
import { getNextMission } from '../data/missions'

interface UseMissionOptions {
  missionId: string
  nextMissionId?: string
  score?: number
  badge?: Omit<Badge, 'earnedAt'>
  dialogue?: string
  achievement?: string
}

interface UseMissionReturn {
  isComplete: boolean
  score: number
  objectives: Record<string, boolean>
  setObjectives: (obj: Record<string, boolean>) => void
  setScore: (score: number) => void
  handleComplete: () => void
  createPart: (part: Omit<Part, 'id'>) => string
  validatePartNumber: (pn: string) => boolean
}

export function useMission({ missionId, nextMissionId, score: baseScore = 100, badge, dialogue, achievement }: UseMissionOptions): UseMissionReturn {
  const navigate = useNavigate()
  const { addScore, completeMission, earnBadge, createPart: storeCreatePart, setCurrentDialogue, unlockAchievement, storyProgress } = useGameStore()
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [objectives, setObjectives] = useState<Record<string, boolean>>({})

  // Show dialogue when mission loads
  useEffect(() => {
    if (dialogue && !storyProgress.currentDialogue) {
      setCurrentDialogue(dialogue)
    }
  }, [dialogue, storyProgress.currentDialogue, setCurrentDialogue])

  const validatePartNumber = (pn: string) => /^HT-\d{5}$/.test(pn)

  const createPart = (part: Omit<Part, 'id'>) => {
    const partId = `part-${Date.now()}`
    const newPart: Part = {
      id: partId,
      ...part,
      specifications: part.specifications || [],
      children: part.children || [],
      unit: part.unit || 'kg'
    }
    storeCreatePart(newPart)
    return partId
  }

  const handleComplete = useCallback(() => {
    const completedObjectives = Object.values(objectives).filter(Boolean).length
    const totalObjectives = Object.keys(objectives).length
    const objectiveScore = totalObjectives > 0 ? Math.round((completedObjectives / totalObjectives) * baseScore) : baseScore
    
    setScore(objectiveScore)
    addScore(objectiveScore)
    completeMission(missionId)
    
    if (badge) {
      earnBadge({ ...badge, earnedAt: new Date().toISOString() })
    }
    
    if (achievement) {
      unlockAchievement(achievement)
    }
    
    setIsComplete(true)
    
    // Navigate to next mission
    if (nextMissionId) {
      navigate(`/mission/${nextMissionId}`)
    }
  }, [addScore, completeMission, earnBadge, missionId, nextMissionId, objectives, baseScore, badge, achievement, navigate, unlockAchievement])

  return {
    isComplete,
    score,
    objectives,
    setObjectives,
    setScore,
    handleComplete,
    createPart,
    validatePartNumber
  }
}
