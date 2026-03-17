import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getAchievement } from '../../data/story'

export default function AchievementToast() {
  const showAchievement = useGameStore(state => state.showAchievement)
  const clearShowAchievement = useGameStore(state => state.clearShowAchievement)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (showAchievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          clearShowAchievement()
        }, 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showAchievement, clearShowAchievement])
  
  if (!showAchievement) {
    return null
  }
  
  const achievement = getAchievement(showAchievement)
  if (!achievement) {
    return null
  }
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{achievement.icon}</span>
          <div>
            <div className="text-xs uppercase tracking-wide opacity-80">Achievement Unlocked!</div>
            <div className="font-bold text-lg">{achievement.name}</div>
            <div className="text-sm opacity-90">{achievement.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
