import { useState } from 'react'
import { useMission } from '../../hooks/useMission'

export default function Mission1_1() {
  const { createPart, validatePartNumber, setObjectives, handleComplete } = useMission({
    missionId: '1_1',
    nextMissionId: '1_2',
    score: 100,
    dialogue: 'margaret_intro',
    achievement: 'first_part'
  })

  const [partNumber, setPartNumber] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [revision, setRevision] = useState('A')
  const [state, setState] = useState('WIP')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!partNumber) {
      newErrors.partNumber = 'Part number is required'
    } else if (!validatePartNumber(partNumber)) {
      newErrors.partNumber = 'Part number must be in format HT-XXXXX'
    }
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    createPart({
      partNumber,
      name,
      description,
      revision,
      state,
      specifications: [],
      children: []
    })

    setObjectives({ createPart: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Your First Part</h1>
        <p className="text-gray-600 mb-6">
          Create a new part in the PLM system. Fill in the required fields below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Part Number
            </label>
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
              placeholder="HT-XXXXX"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.partNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.partNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.partNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revision
              </label>
              <select
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WIP">WIP</option>
                <option value="Review">Review</option>
                <option value="Released">Released</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Create Part
          </button>
        </form>
      </div>
    </div>
  )
}
