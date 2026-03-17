import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission2_4() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '2_4',
    nextMissionId: '3_1',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  const updatePart = useGameStore(state => state.updatePart)
  
  const [selectedPart, setSelectedPart] = useState('')
  const [currentState, setCurrentState] = useState('')
  const [approvers, setApprovers] = useState<string[]>([])
  const [approverName, setApproverName] = useState('')
  const [approvalSent, setApprovalSent] = useState(false)

  const selected = Object.values(parts).find(p => p.id === selectedPart)

  const handleAddApprover = () => {
    if (!approverName.trim()) return
    setApprovers([...approvers, approverName])
    setApproverName('')
  }

  const handleSendForApproval = () => {
    if (!selected) return
    setApprovalSent(true)
  }

  const handleSubmit = () => {
    setObjectives({ reviewCycle: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Review Cycle</h1>
        <p className="text-gray-600 mb-6">
          Submit a part for approval and manage the review workflow.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Part for Review</label>
          <select
            value={selectedPart}
            onChange={(e) => {
              setSelectedPart(e.target.value)
              const part = Object.values(parts).find(p => p.id === e.target.value)
              setCurrentState(part?.state || '')
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a part...</option>
            {Object.values(parts).map(part => (
              <option key={part.id} value={part.id}>{part.name} ({part.partNumber})</option>
            ))}
          </select>
        </div>

        {selected && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">{selected.name}</div>
            <div className="text-sm text-gray-500">Current State: {selected.state}</div>
          </div>
        )}

        {!approvalSent ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Approvers</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                placeholder="Approver name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddApprover}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            {approvers.length > 0 && (
              <div className="space-y-1 mb-4">
                {approvers.map((a, idx) => (
                  <div key={idx} className="p-2 bg-blue-50 rounded text-sm">👤 {a}</div>
                ))}
              </div>
            )}
            <button
              onClick={handleSendForApproval}
              disabled={approvers.length === 0}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                approvers.length > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Send for Approval
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <div className="p-4 bg-yellow-50 rounded-lg mb-4">
              <div className="text-yellow-700 font-medium">Approval Request Sent</div>
              <div className="text-sm text-yellow-600">Pending review from {approvers.length} approver(s)</div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              In a real system, you would wait for approvers to review and approve/reject the part.
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
