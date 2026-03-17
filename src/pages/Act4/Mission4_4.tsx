import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission4_4() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '4_4',
    nextMissionId: '4_5',
    score: 100
  })

  const createPart = useGameStore(state => state.createPart)
  
  const [partNumber, setPartNumber] = useState('')
  const [name, setName] = useState('')
  const [specs, setSpecs] = useState<Array<{ name: string; value: string }>>([])

  const [specName, setSpecName] = useState('')
  const [specValue, setSpecValue] = useState('')

  const handleAddSpec = () => {
    if (!specName || !specValue) return
    setSpecs([...specs, { name: specName, value: specValue }])
    setSpecName('')
    setSpecValue('')
  }

  const handleSubmit = () => {
    if (!partNumber || !name || specs.length === 0) return
    createPart({
      id: partNumber,
      partNumber,
      name,
      description: `Variant specification for ${name}`,
      revision: 'A',
      state: 'WIP',
      specifications: specs.map(s => ({ name: s.name, value: s.value, unit: '' })),
      children: []
    })
    setObjectives({ createSpecification: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Specification</h1>
        <p className="text-gray-600 mb-6">
          Document specifications for your product variant.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specification Number</label>
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
              placeholder="SPEC-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specification Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Helicopter Variant A"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium text-gray-700 mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
                placeholder="Name"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Value"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddSpec}
              disabled={!specName || !specValue}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                specName && specValue
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Add Specification
            </button>
          </div>

          {specs.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Added Specifications:</h4>
              <ul className="space-y-1">
                {specs.map((spec, idx) => (
                  <li key={idx} className="p-2 bg-blue-50 rounded text-sm">
                    {spec.name}: {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!partNumber || !name || specs.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            partNumber && name && specs.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Create Specification
        </button>
      </div>
    </div>
  )
}
