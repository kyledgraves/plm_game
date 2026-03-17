import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission1_4() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '1_4',
    nextMissionId: '1_5',
    score: 100,
    dialogue: 'quantity_rollup',
    achievement: 'quantity_roller'
  })

  const parts = useGameStore(state => state.parts)
  const mainPart = Object.values(parts).find(p => p.name === 'Main Rotor Blade')
  
  const children = mainPart?.children || []
  
  const totalQuantity = children.reduce((sum, child) => sum + child.quantity, 0)

  const handleSubmit = () => {
    setObjectives({ quantityRollup: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quantity Rollup</h1>
        <p className="text-gray-600 mb-6">
          Calculate the total quantity of parts in your Bill of Materials. This is known as quantity rollup.
        </p>

        {mainPart && (
          <div className="mb-6">
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-700">Parent: {mainPart.name}</h3>
            </div>
            
            <h4 className="font-medium text-gray-700 mb-2">Bill of Materials:</h4>
            {children.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {children.map((child, idx) => {
                  const childPart = parts[child.partId]
                  return (
                    <li key={idx} className="p-3 bg-blue-50 rounded flex justify-between items-center">
                      <span>{childPart?.name || child.partId}</span>
                      <span className="font-bold text-blue-600">x{child.quantity}</span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-gray-500 mb-4">No children added yet.</p>
            )}
          </div>
        )}

        <div className="p-4 bg-green-50 rounded-lg mb-6">
          <div className="text-sm text-green-700 mb-1">Total Quantity Rollup:</div>
          <div className="text-3xl font-bold text-green-700">{totalQuantity}</div>
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
