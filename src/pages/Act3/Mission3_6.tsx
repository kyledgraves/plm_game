import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission3_6() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '3_6',
    nextMissionId: '4_1',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  const updatePart = useGameStore(state => state.updatePart)
  
  const [verificationSteps, setVerificationSteps] = useState<Record<string, boolean>>({
    'partsUpdated': false,
    'documentationComplete': false,
    'stakeholdersNotified': false,
    'changeClosed': false
  })

  const toggleStep = (step: string) => {
    setVerificationSteps(prev => ({ ...prev, [step]: !prev[step] }))
  }

  const allComplete = Object.values(verificationSteps).every(v => v)

  const handleSubmit = () => {
    setObjectives({ closingLoop: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Closing the Loop</h1>
        <p className="text-gray-600 mb-6">
          Verify that all change activities are complete and close the change order.
        </p>

        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium">Change Order: Update Main Rotor Blade</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(verificationSteps).map(([key, value]) => (
              <label
                key={key}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors ${
                  value ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleStep(key)}
                  className="w-5 h-5 rounded"
                />
                <span className={value ? 'text-green-700' : 'text-gray-700'}>
                  {key === 'partsUpdated' && 'All parts have been updated'}
                  {key === 'documentationComplete' && 'Documentation is complete'}
                  {key === 'stakeholdersNotified' && 'Stakeholders have been notified'}
                  {key === 'changeClosed' && 'Change order can be closed'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {allComplete && (
          <div className="p-4 bg-green-50 rounded-lg mb-6">
            <p className="text-green-700 font-medium">✓ All verification steps complete. Change order is ready to be closed.</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Close Change Order
        </button>
      </div>
    </div>
  )
}
