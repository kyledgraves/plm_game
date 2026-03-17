import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, CheckCircle, Lock, ChevronDown, ChevronRight } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { ACT_INFO, MISSIONS, isMissionUnlocked } from '../data/missions'
import clsx from 'clsx'

export default function MissionSelect() {
  const { completedMissions } = useGameStore()
  const [expandedActs, setExpandedActs] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
  })

  const toggleAct = (act: number) => {
    setExpandedActs(prev => ({ ...prev, [act]: !prev[act] }))
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <Map className="w-8 h-8 text-ds-primary" />
        <h1 className="text-2xl font-bold">Mission Select</h1>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map(act => {
          const actInfo = ACT_INFO[act]
          const actCompleted = completedMissions.filter(m => m.startsWith(`${act}_`)).length
          const isExpanded = expandedActs[act]

          return (
            <div key={act} className="bg-white rounded-xl border border-ds-border overflow-hidden">
              <button
                onClick={() => toggleAct(act)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50"
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-ds-text-secondary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-ds-text-secondary" />
                )}
                <div className="flex-1 text-left">
                  <h2 className="font-semibold">Act {act}: {actInfo.title}</h2>
                  <p className="text-sm text-ds-text-secondary">{actInfo.description}</p>
                </div>
                <div className={clsx(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  actCompleted === actInfo.missions
                    ? 'bg-ds-success text-white'
                    : 'bg-gray-100 text-ds-text-secondary'
                )}>
                  {actCompleted}/{actInfo.missions}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-ds-border">
                  {MISSIONS.filter(m => m.act === act).map(mission => {
                    const unlocked = isMissionUnlocked(mission.id, completedMissions)
                    const completed = completedMissions.includes(mission.id)

                    return (
                      <Link
                        key={mission.id}
                        to={unlocked ? `/mission/${mission.id}` : '#'}
                        className={clsx(
                          'flex items-center gap-4 px-6 py-3 border-b border-ds-border last:border-b-0',
                          !unlocked && 'opacity-50 cursor-not-allowed',
                          unlocked && 'hover:bg-gray-50'
                        )}
                      >
                        {completed ? (
                          <CheckCircle className="w-5 h-5 text-ds-success" />
                        ) : !unlocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{mission.title}</div>
                          <div className="text-sm text-ds-text-secondary">{mission.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
