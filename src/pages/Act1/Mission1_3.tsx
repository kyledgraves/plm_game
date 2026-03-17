import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission1_3() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '1_3',
    nextMissionId: '1_4',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  const addChildToPart = useGameStore(state => state.addChildToPart)
  
  const parentPart = Object.values(parts).find(p => p.name === 'Main Rotor Blade')
  const childParts = Object.values(parts).filter(p => p.name !== 'Main Rotor Blade')
  
  const [selectedChild, setSelectedChild] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addedChildren, setAddedChildren] = useState<Array<{ partId: string; quantity: number; name: string }>>([])

  const handleAddChild = () => {
    if (!selectedChild || quantity < 1) return
    const child = childParts.find(p => p.id === selectedChild)
    if (!child) return
    setAddedChildren([...addedChildren, { partId: selectedChild, quantity, name: child.name }])
    setSelectedChild('')
    setQuantity(1)
  }

  const handleSubmit = () => {
    if (!parentPart) return
    addedChildren.forEach(child => {
      addChildToPart(parentPart.id, { partId: child.partId, quantity: child.quantity })
    })
    setObjectives({ buildBom: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Building the BOM</h1>
        <p className="text-gray-600 mb-6">
          Create a product structure by adding child parts to build your Bill of Materials.
        </p>

        {parentPart && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700">Parent Part: {parentPart.name}</h3>
            <p className="text-sm text-gray-500">Part #: {parentPart.partNumber}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Child Part</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a part...</option>
              {childParts.map(part => (
                <option key={part.id} value={part.id}>{part.name} ({part.partNumber})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAddChild}
            disabled={!selectedChild}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              selectedChild
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add to BOM
          </button>
        </div>

        {addedChildren.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Bill of Materials:</h3>
            <ul className="space-y-2">
              {addedChildren.map((child, idx) => (
                <li key={idx} className="p-2 bg-blue-50 rounded text-sm flex justify-between">
                  <span>{child.name}</span>
                  <span className="font-medium">x{child.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={addedChildren.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            addedChildren.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
