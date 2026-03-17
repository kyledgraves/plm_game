import { useState } from 'react'
import { useMission } from '../../hooks/useMission'

export default function Mission2_1() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '2_1',
    nextMissionId: '2_2',
    score: 100
  })

  const [message, setMessage] = useState('')
  const [teamUpdates, setTeamUpdates] = useState<Array<{ author: string; message: string; timestamp: string }>>([
    { author: 'System', message: 'Welcome to the collaboration platform!', timestamp: new Date().toISOString() }
  ])

  const handlePost = () => {
    if (!message.trim()) return
    setTeamUpdates([...teamUpdates, { author: 'You', message, timestamp: new Date().toISOString() }])
    setMessage('')
  }

  const handleSubmit = () => {
    setObjectives({ teamCommunication: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Communication</h1>
        <p className="text-gray-600 mb-6">
          Post updates to keep your team informed. Effective communication is key in PLM.
        </p>

        <div className="mb-6">
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {teamUpdates.map((update, idx) => (
              <div key={idx} className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{update.author}</span>
                  <span className="text-xs text-gray-500">{new Date(update.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-600 text-sm">{update.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write an update for your team..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePost}
            disabled={!message.trim()}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              message.trim() ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Post Update
          </button>
        </div>

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
