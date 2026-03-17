import { useState, useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getMission } from '../data/missions'

export default function Mission() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentAct, currentMission, setCurrentMission, totalScore } = useGameStore()
  const [timeLeft, setTimeLeft] = useState(0)

  const mission = id ? getMission(id) : null

  useEffect(() => {
    if (mission) {
      const act = parseInt(id!.split('_')[0])
      const missionNum = parseInt(id!.split('_')[1])
      setCurrentMission(act, missionNum)
      setTimeLeft(mission.timeLimit)
    }
  }, [id])

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
      <Outlet />
    </div>
  )
}
