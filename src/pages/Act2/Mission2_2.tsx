import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission2_2() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '2_2',
    nextMissionId: '2_3',
    score: 100
  })

  const parts = useGameStore(state => state.parts)
  
  const [selectedPart, setSelectedPart] = useState('')
  const [viewAngle, setViewAngle] = useState('front')
  const [zoom, setZoom] = useState(100)
  const [annotations, setAnnotations] = useState<string[]>([])

  const angles = ['front', 'back', 'left', 'right', 'top', 'bottom']

  const handleAddAnnotation = () => {
    setAnnotations([...annotations, `View: ${viewAngle} at ${zoom}%`])
  }

  const handleSubmit = () => {
    setObjectives({ review3D: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">3D Review</h1>
        <p className="text-gray-600 mb-6">
          Review the 3D design of your part. Use different views and add annotations.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Part to Review</label>
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a part...</option>
            {Object.values(parts).map(part => (
              <option key={part.id} value={part.id}>{part.name} ({part.partNumber})</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-6xl mb-2">🚁</div>
              <p className="text-gray-500 text-sm">3D View: {viewAngle.toUpperCase()}</p>
              <p className="text-gray-400 text-xs">Zoom: {zoom}%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View Angle</label>
              <select
                value={viewAngle}
                onChange={(e) => setViewAngle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {angles.map(angle => (
                  <option key={angle} value={angle}>{angle.charAt(0).toUpperCase() + angle.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zoom: {zoom}%</label>
              <input
                type="range"
                min="50"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={handleAddAnnotation}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium mb-4"
          >
            Add Annotation
          </button>

          {annotations.length > 0 && (
            <div className="space-y-1">
              {annotations.map((ann, idx) => (
                <div key={idx} className="p-2 bg-yellow-50 rounded text-sm">✓ {ann}</div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Complete Review
        </button>
      </div>
    </div>
  )
}
