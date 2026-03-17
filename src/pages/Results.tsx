import { Link } from 'react-router-dom'
import { Trophy, Star } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { getNextMission } from '../data/missions'

export default function Results() {
  const { totalScore, completedMissions, badges, playerName } = useGameStore()
  const lastMission = completedMissions[completedMissions.length - 1]
  const nextMission = lastMission ? getNextMission(lastMission) : null

  const allComplete = completedMissions.length >= 20

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg to-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg border border-ds-border p-8 text-center">
          {allComplete ? (
            <>
              <div className="flex justify-center mb-6">
                <Trophy className="w-20 h-20 text-ds-warning" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Training Complete!</h1>
              <p className="text-ds-text-secondary mb-6">
                Congratulations! You've mastered all 20 missions.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <Star className="w-20 h-20 text-ds-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Mission Complete!</h1>
              <p className="text-ds-text-secondary mb-6">
                Keep up the great work, {playerName}!
              </p>
            </>
          )}

          <div className="bg-ds-bg rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-ds-primary mb-2">{totalScore}</div>
            <div className="text-ds-text-secondary">Total Points</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-ds-bg rounded-xl p-4">
              <div className="text-2xl font-bold">{completedMissions.length}</div>
              <div className="text-sm text-ds-text-secondary">Missions</div>
            </div>
            <div className="bg-ds-bg rounded-xl p-4">
              <div className="text-2xl font-bold">{badges.length}</div>
              <div className="text-sm text-ds-text-secondary">Badges</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {nextMission ? (
              <Link
                to={`/mission/${nextMission}`}
                className="px-6 py-3 bg-ds-primary text-white rounded-lg hover:bg-ds-primary-dark"
              >
                Continue
              </Link>
            ) : (
              <Link
                to="/missions"
                className="px-6 py-3 bg-ds-primary text-white rounded-lg hover:bg-ds-primary-dark"
              >
                View All Missions
              </Link>
            )}
            <Link
              to="/"
              className="px-6 py-3 border border-ds-border rounded-lg hover:bg-gray-50"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
