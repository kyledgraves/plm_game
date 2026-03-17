import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

export default function Mission4_5() {
  const navigate = useNavigate()
  const { setObjectives, handleComplete } = useMission({
    missionId: '4_5',
    nextMissionId: undefined,
    score: 100
  })

  const configurations = useGameStore(state => state.configurations)
  
  const [confirmed, setConfirmed] = useState(false)
  const [locked, setLocked] = useState(false)

  const handleLock = () => {
    setLocked(true)
    setObjectives({ releaseConfiguration: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Release Configuration</h1>
        <p className="text-gray-600 mb-6">
          Review and lock your configuration to release it for production.
        </p>

        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Configuration Summary:</h3>
            <div className="space-y-1 text-sm">
              <div><span className="text-gray-500">Engine:</span> {configurations.engine || 'Not selected'}</div>
              <div><span className="text-gray-500">Color:</span> {configurations.color || 'Not selected'}</div>
              <div><span className="text-gray-500">Avionics:</span> {configurations.avionics || 'Not selected'}</div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-yellow-700">
              <strong>Warning:</strong> Once released, the configuration will be locked and cannot be modified. Make sure all specifications are correct.
            </p>
          </div>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <span>I confirm this configuration is correct and ready for release</span>
          </label>
        </div>

        {locked ? (
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-green-600 mb-2">Configuration Released!</h2>
            <p className="text-gray-600 mb-4">Your helicopter configuration has been locked.</p>
            <button
              onClick={() => navigate('/results')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              View Results
            </button>
          </div>
        ) : (
          <button
            onClick={handleLock}
            disabled={!confirmed}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              confirmed
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Release Configuration
          </button>
        )}
      </div>
    </div>
  )
}
