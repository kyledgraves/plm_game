import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Trophy, Users, RefreshCw, Settings, HelpCircle } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export default function Home() {
  const { playerName, setPlayerName, totalScore, completedMissions, badges, resetProgress } = useGameStore()
  const [name, setName] = useState(playerName)
  const [showReset, setShowReset] = useState(false)

  const handleStart = () => {
    if (name.trim()) {
      setPlayerName(name.trim())
    }
  }

  const handleReset = () => {
    if (showReset) {
      resetProgress()
      setShowReset(false)
    } else {
      setShowReset(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-bg to-gray-100">
      <header className="bg-white border-b border-ds-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/helicopter.svg" alt="" className="w-8 h-8" />
          <span className="text-xl font-bold text-ds-blue">PLM Factory</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Settings">
            <Settings className="w-5 h-5 text-ds-text-secondary" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Help">
            <HelpCircle className="w-5 h-5 text-ds-text-secondary" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ds-text mb-4">The ENOVIA Challenge</h1>
          <p className="text-xl text-ds-text-secondary">
            Master Product Lifecycle Management through interactive training
          </p>
        </div>

        {completedMissions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-ds-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-ds-warning" />
                Your Progress
              </h2>
              <span className="text-2xl font-bold text-ds-primary">{totalScore} pts</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-ds-success transition-all duration-500"
                style={{ width: `${(completedMissions.length / 20) * 100}%` }}
              />
            </div>
            <div className="text-sm text-ds-text-secondary">
              {completedMissions.length} of 20 missions completed
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-ds-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ds-primary/10 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-ds-primary" />
              </div>
              <h3 className="font-semibold">Start Training</h3>
            </div>
            {!playerName ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-ds-border rounded-lg mb-3"
                />
                <button
                  onClick={handleStart}
                  disabled={!name.trim()}
                  className="w-full py-2 bg-ds-primary text-white rounded-lg hover:bg-ds-primary-dark disabled:opacity-50"
                >
                  Continue Training
                </button>
              </div>
            ) : (
              <Link
                to="/missions"
                className="block w-full py-2 bg-ds-primary text-white rounded-lg hover:bg-ds-primary-dark text-center"
              >
                Continue Training
              </Link>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-ds-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ds-warning/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-ds-warning" />
              </div>
              <h3 className="font-semibold">Your Badges</h3>
            </div>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map(badge => (
                  <span key={badge.id} className="px-3 py-1 bg-ds-warning/10 text-ds-warning rounded-full text-sm">
                    {badge.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-ds-text-secondary text-sm">Complete missions to earn badges!</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleReset}
            className={`text-sm ${showReset ? 'text-red-600' : 'text-ds-text-secondary'}`}
          >
            {showReset ? 'Click again to confirm reset' : 'Reset Progress'}
          </button>
        </div>
      </main>
    </div>
  )
}
