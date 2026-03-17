import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission1_5() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '1_5',
    nextMissionId: '2_1',
    score: 100,
    dialogue: 'revision_problem',
    achievement: 'revision_tracker'
  })

  const parts = useGameStore(state => state.parts)
  const updatePart = useGameStore(state => state.updatePart)
  
  const mainPart = Object.values(parts).find(p => p.name === 'Main Rotor Blade')
  
  const [newRevision, setNewRevision] = useState('B')
  const [revisionNote, setRevisionNote] = useState('')

  const revisions = ['A', 'B', 'C', 'D']

  const handleSubmit = () => {
    if (!mainPart) return
    updatePart(mainPart.id, {
      revision: newRevision,
      description: `${mainPart.description} (Rev ${newRevision})`
    })
    setObjectives({ revisionBasics: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Revision Basics</h1>
        <p className="text-gray-600 mb-6">
          Learn how revisions track changes to parts over time. Create a new revision to continue.
        </p>

        {mainPart && (
          <div className="mb-6">
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-700">Part: {mainPart.name}</h3>
              <p className="text-sm text-gray-500">Current Revision: {mainPart.revision}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Revision</label>
                <select
                  value={newRevision}
                  onChange={(e) => setNewRevision(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {revisions.filter(r => r !== mainPart.revision).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Revision Note</label>
                <textarea
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Describe what changed in this revision..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>Tip:</strong> Revisions track changes to parts. When you modify a part, you typically create a new revision (A → B → C). This ensures traceability and configuration management.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Create Revision
        </button>
      </div>
    </div>
  )
}
