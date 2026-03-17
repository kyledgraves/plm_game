import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission3_2() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '3_2',
    nextMissionId: '3_3',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  
  const [title, setTitle] = useState('')
  const [reason, setReason] = useState('')
  const [affectedParts, setAffectedParts] = useState<string[]>([])
  const [proposedSolution, setProposedSolution] = useState('')

  const togglePart = (partId: string) => {
    if (affectedParts.includes(partId)) {
      setAffectedParts(affectedParts.filter(p => p !== partId))
    } else {
      setAffectedParts([...affectedParts, partId])
    }
  }

  const handleSubmit = () => {
    if (!title || !reason || affectedParts.length === 0) return
    setObjectives({ createChangeRequest: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Creating Change Request</h1>
        <p className="text-gray-600 mb-6">
          Submit a formal change request to address the reported problem.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Change Request Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Update Main Rotor Blade specifications"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Change</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Why is this change needed?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Affected Parts</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.values(parts).map(part => (
                <label key={part.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={affectedParts.includes(part.id)}
                    onChange={() => togglePart(part.id)}
                    className="rounded"
                  />
                  <span>{part.name} ({part.partNumber})</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Solution</label>
            <textarea
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              rows={3}
              placeholder="How should this be addressed?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!title || !reason || affectedParts.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            title && reason && affectedParts.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Change Request
        </button>
      </div>
    </div>
  )
}
