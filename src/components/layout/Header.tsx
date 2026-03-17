import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { useGameStore } from '../../store/gameStore'

export default function Header() {
  const { currentAct, currentMission, totalScore } = useGameStore()
  const progress = Math.min(100, ((currentAct - 1) * 5 + currentMission) / 20 * 100)

  return (
    <header className="h-14 bg-white border-b border-ds-border flex items-center px-4 gap-4" role="banner">
      <Link to="/" className="flex items-center gap-2 text-ds-blue hover:text-ds-blue-dark" aria-label="PLM Factory Home">
        <img src="/helicopter.svg" alt="" className="w-6 h-6" aria-hidden="true" />
        <span className="font-semibold text-lg">PLM Factory</span>
      </Link>
      
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress: ${Math.round(progress)}%`}>
          <span className="text-sm text-ds-text-secondary">Act {currentAct}</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-ds-blue transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-ds-text-secondary">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-ds-success font-medium" role="status" aria-label={`Total score: ${totalScore} points`}>
          <Trophy className="w-4 h-4" aria-hidden="true" />
          <span>{totalScore} pts</span>
        </div>
      </div>
    </header>
  )
}
