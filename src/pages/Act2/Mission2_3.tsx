import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission2_3() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '2_3',
    nextMissionId: '2_4',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<typeof parts>({})

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    const results = Object.values(parts).filter(part => 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const resultObj = results.reduce((acc, part) => {
      acc[part.id] = part
      return acc
    }, {} as typeof parts)
    setSearchResults(resultObj)
  }

  const handleSubmit = () => {
    setObjectives({ findData: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Finding Data</h1>
        <p className="text-gray-600 mb-6">
          Search for parts in the PLM system using part numbers, names, or descriptions.
        </p>

        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search parts..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {Object.keys(searchResults).length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 mb-2">Found {Object.keys(searchResults).length} result(s):</p>
              {Object.values(searchResults).map(part => (
                <div key={part.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{part.name}</div>
                  <div className="text-sm text-gray-500">{part.partNumber}</div>
                  <div className="text-sm text-gray-600 mt-1">{part.description}</div>
                  <div className="text-xs text-gray-400 mt-1">Rev: {part.revision} | State: {part.state}</div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <p className="text-gray-500">No results found. Try a different search term.</p>
          ) : (
            <p className="text-gray-500">Enter a search term to find parts.</p>
          )}
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
