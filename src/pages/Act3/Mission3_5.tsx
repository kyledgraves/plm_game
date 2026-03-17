import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission3_5() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '3_5',
    nextMissionId: '3_6',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  
  const [dispositions, setDispositions] = useState<Record<string, string>>({})

  const handleDisposition = (partId: string, decision: string) => {
    setDispositions(prev => ({ ...prev, [partId]: decision }))
  }

  const handleSubmit = () => {
    if (Object.keys(dispositions).length === 0) return
    setObjectives({ dispositionDecisions: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Disposition Decisions</h1>
        <p className="text-gray-600 mb-6">
          Decide how to handle existing inventory affected by the change.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4">
            Review each affected part and decide how to handle existing inventory:
          </p>

          <div className="space-y-3">
            {Object.values(parts).map(part => (
              <div key={part.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">{part.name} ({part.partNumber})</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDisposition(part.id, 'use-as-is')}
                    className={`flex-1 py-2 px-3 text-sm rounded ${
                      dispositions[part.id] === 'use-as-is'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Use As-Is
                  </button>
                  <button
                    onClick={() => handleDisposition(part.id, ' rework')}
                    className={`flex-1 py-2 px-3 text-sm rounded ${
                      dispositions[part.id] === 'rework'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Rework
                  </button>
                  <button
                    onClick={() => handleDisposition(part.id, 'scrap')}
                    className={`flex-1 py-2 px-3 text-sm rounded ${
                      dispositions[part.id] === 'scrap'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Scrap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(dispositions).length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            Object.keys(dispositions).length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Disposition Decisions
        </button>
      </div>
    </div>
  )
}
