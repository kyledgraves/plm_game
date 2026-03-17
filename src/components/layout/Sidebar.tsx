import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Map, CheckCircle, Lock, ChevronDown, ChevronRight, Trophy } from 'lucide-react'
import { useGameStore } from '../../store/gameStore'
import { ACT_INFO, MISSIONS, isMissionUnlocked } from '../../data/missions'
import clsx from 'clsx'

interface SidebarProps {
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()
  const { completedMissions, totalScore, currentAct } = useGameStore()
  
  const getExpandedActFromUrl = () => {
    const match = location.pathname.match(/\/mission\/(\d)_(\d)/)
    if (match) return parseInt(match[1], 10)
    return currentAct || 1
  }
  
  const [expandedActs, setExpandedActs] = useState<Record<number, boolean>>({
    1: true, 2: false, 3: false, 4: false,
  })
  
  useEffect(() => {
    const act = getExpandedActFromUrl()
    setExpandedActs(prev => ({ ...prev, [act]: true }))
  }, [location.pathname, currentAct])

  const completedCount = completedMissions.length

  const toggleAct = (act: number) => {
    setExpandedActs(prev => ({ ...prev, [act]: !prev[act] }))
  }

  return (
    <aside className="w-64 bg-white border-r border-ds-border flex flex-col" role="navigation" aria-label="Sidebar navigation">
      <div className="p-4 border-b border-ds-border">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-ds-warning" aria-hidden="true" />
          <span className="font-medium text-sm">Your Progress</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-ds-bg rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{totalScore}</div>
            <div className="text-xs text-ds-text-secondary">Points</div>
          </div>
          <div className="bg-ds-bg rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{completedCount}/20</div>
            <div className="text-xs text-ds-text-secondary">Missions</div>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={20}>
          <div className="h-full bg-ds-success transition-all duration-300" style={{ width: `${(completedCount / 20) * 100}%` }} />
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-auto" aria-label="Main navigation">
        <NavLink to="/" onClick={() => onNavigate?.()} className={({ isActive }) => clsx('sidebar-item', isActive && 'active')} aria-label="Home">
          <Home className="w-5 h-5" aria-hidden="true" /><span>Home</span>
        </NavLink>
        <NavLink to="/missions" onClick={() => onNavigate?.()} className={({ isActive }) => clsx('sidebar-item', isActive && 'active')} aria-label="Mission Select">
          <Map className="w-5 h-5" aria-hidden="true" /><span>Missions</span>
        </NavLink>
        
        <div className="pt-4 pb-2" role="heading" aria-level={2}>
          <span className="text-xs font-medium text-ds-text-secondary uppercase px-4">Acts</span>
        </div>
        
        {[1, 2, 3, 4].map(act => {
          const actCompleted = completedMissions.filter(m => m.startsWith(`${act}_`)).length
          const actTotal = ACT_INFO[act].missions
          const isExpanded = expandedActs[act]
          
          return (
            <div key={act} className="mb-1">
              <button onClick={() => toggleAct(act)} className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-50 rounded-lg transition-colors" aria-expanded={isExpanded} aria-controls={`act-${act}-missions`}>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-ds-text-secondary" /> : <ChevronRight className="w-4 h-4 text-ds-text-secondary" />}
                <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium', actCompleted === actTotal ? 'bg-ds-success text-white' : 'bg-gray-200 text-ds-text-secondary')} aria-label={`Act ${act} progress: ${actCompleted} of ${actTotal} completed`}>
                  {actCompleted}/{actTotal}
                </div>
                <span className="font-medium text-sm text-left flex-1">Act {act}: {ACT_INFO[act].title}</span>
              </button>
              
              {isExpanded && (
                <div id={`act-${act}-missions`} className="ml-4 space-y-1 mt-1" role="group" aria-label={`Act ${act} missions`}>
                  {MISSIONS.filter(m => m.act === act).map(mission => {
                    const unlocked = isMissionUnlocked(mission.id, completedMissions)
                    const completed = completedMissions.includes(mission.id)
                    
                    return (
                      <NavLink key={mission.id} to={unlocked ? `/mission/${mission.id}` : '#'} onClick={() => onNavigate?.()} className={clsx('flex items-center gap-2 px-3 py-1.5 rounded text-sm', !unlocked && 'opacity-50 cursor-not-allowed', completed && 'text-ds-success', !completed && unlocked && 'text-ds-text')} aria-label={`${mission.title} - ${completed ? 'Completed' : unlocked ? 'Available' : 'Locked'}`} aria-disabled={!unlocked}>
                        {completed ? <CheckCircle className="w-4 h-4 text-ds-success" aria-hidden="true" /> : !unlocked ? <Lock className="w-4 h-4 text-gray-400" aria-hidden="true" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" aria-hidden="true" />}
                        <span className="truncate">{mission.title}</span>
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
