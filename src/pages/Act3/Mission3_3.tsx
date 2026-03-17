import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission3_3() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '3_3',
    nextMissionId: '3_4',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  
  const [analysis, setAnalysis] = useState<Record<string, { cost: string; schedule: string; risk: string }>>({})

  const updateAnalysis = (partId: string, field: 'cost' | 'schedule' | 'risk', value: string) => {
    setAnalysis(prev => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        [field]: value
      }
    }))
  }

  const handleSubmit = () => {
    if (Object.keys(analysis).length === 0) return
    setObjectives({ impactAnalysis: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Impact Analysis</h1>
        <p className="text-gray-600 mb-6">
          Analyze the impact of the proposed change on each affected part.
        </p>

        <div className="space-y-4 mb-6">
          {Object.values(parts).map(part => (
            <div key={part.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800 mb-3">{part.name} ({part.partNumber})</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Cost Impact</label>
                  <select
                    value={analysis[part.id]?.cost || ''}
                    onChange={(e) => updateAnalysis(part.id, 'cost', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="">Select...</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Schedule Impact</label>
                  <select
                    value={analysis[part.id]?.schedule || ''}
                    onChange={(e) => updateAnalysis(part.id, 'schedule', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="">Select...</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Risk Level</label>
                  <select
                    value={analysis[part.id]?.risk || ''}
                    onChange={(e) => updateAnalysis(part.id, 'risk', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="">Select...</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(analysis).length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            Object.keys(analysis).length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Complete Impact Analysis
        </button>
      </div>
    </div>
  )
}
