import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getMission } from '../data/missions'
import DialogueBox from '../components/story/DialogueBox'
import AchievementToast from '../components/story/AchievementToast'

export default function Mission() {
  const location = useLocation()
  const { currentAct, currentMission, setCurrentMission, totalScore, storyProgress, setDialogueShownForCurrentMission } = useGameStore()
  const [timeLeft, setTimeLeft] = useState(0)

  // Get mission ID from URL path
  const missionId = location.pathname.split('/').pop() || ''
  const mission = missionId ? getMission(missionId) : null
  
  // Check if dialogue is active
  const hasActiveDialogue = !!storyProgress.currentDialogue

  useEffect(() => {
    if (mission) {
      const act = parseInt(missionId.split('_')[0])
      const missionNum = parseInt(missionId.split('_')[1])
      setCurrentMission(act, missionNum)
      setTimeLeft(mission.timeLimit)
      // Reset dialogue shown flag when mission changes
      setDialogueShownForCurrentMission(false)
    }
  }, [missionId, setDialogueShownForCurrentMission])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-ds-bg">
      <div className="bg-white border-b border-ds-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-medium">Act {mission?.act}: {mission?.title}</span>
          <span className={`px-2 py-1 rounded text-sm ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-ds-success font-medium">{totalScore} pts</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-4 px-4">
        <DialogueBox />
        <AchievementToast />
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`relative ${hasActiveDialogue ? 'pointer-events-none opacity-50' : ''}`}>
          {hasActiveDialogue && (
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
