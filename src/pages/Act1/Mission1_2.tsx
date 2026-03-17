import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission1_2() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '1_2',
    nextMissionId: '1_3',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  const updatePart = useGameStore(state => state.updatePart)
  
  const mainPart = Object.values(parts).find(p => p.name === 'Main Rotor Blade')
  
  const [specName, setSpecName] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [specUnit, setSpecUnit] = useState('')
  const [addedSpecs, setAddedSpecs] = useState<Array<{ name: string; value: string; unit: string }>>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!specName.trim()) newErrors.specName = 'Specification name is required'
    if (!specValue.trim()) newErrors.specValue = 'Value is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSpec = () => {
    if (!validateForm()) return
    setAddedSpecs([...addedSpecs, { name: specName, value: specValue, unit: specUnit }])
    setSpecName('')
    setSpecValue('')
    setSpecUnit('')
  }

  const handleSubmit = () => {
    if (!mainPart) return
    updatePart(mainPart.id, {
      specifications: [...mainPart.specifications, ...addedSpecs]
    })
    setObjectives({ linkSpecs: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Linking Specifications</h1>
        <p className="text-gray-600 mb-6">
          Attach technical specifications to your part. Add at least one specification to continue.
        </p>

        {mainPart && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700">Part: {mainPart.name}</h3>
            <p className="text-sm text-gray-500">Part #: {mainPart.partNumber}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specification Name</label>
            <input
              type="text"
              value={specName}
              onChange={(e) => setSpecName(e.target.value)}
              placeholder="e.g., Weight, Material"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.specName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.specName && <p className="text-red-500 text-sm mt-1">{errors.specName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="e.g., 50"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.specValue ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.specValue && <p className="text-red-500 text-sm mt-1">{errors.specValue}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                value={specUnit}
                onChange={(e) => setSpecUnit(e.target.value)}
                placeholder="e.g., kg, m"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleAddSpec}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Add Specification
          </button>
        </div>

        {addedSpecs.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Added Specifications:</h3>
            <ul className="space-y-2">
              {addedSpecs.map((spec, idx) => (
                <li key={idx} className="p-2 bg-blue-50 rounded text-sm">
                  {spec.name}: {spec.value} {spec.unit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={addedSpecs.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            addedSpecs.length > 0
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
