import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission4_3() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '4_3',
    nextMissionId: '4_4',
    score: 100
  })

  const configurations = useGameStore(state => state.configurations)
  
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null)

  const variants = [
    { id: 'standard', name: 'Standard Config', engine: 'Standard', color: 'Red', avionics: 'Basic', price: '$50,000' },
    { id: 'sport', name: 'Sport Config', engine: 'Turbo', color: 'Blue', avionics: 'Advanced', price: '$75,000' },
    { id: 'premium', name: 'Premium Config', engine: 'Supercharged', color: 'Green', avionics: 'Professional', price: '$100,000' }
  ]

  const handleSubmit = () => {
    setObjectives({ configurationStrategy: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Configuration Strategy</h1>
        <p className="text-gray-600 mb-6">
          Compare different configuration options and select the best one for your needs.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4">Available configurations:</p>
          
          <div className="space-y-3">
            {variants.map(variant => (
              <label
                key={variant.id}
                className={`block p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedConfig === variant.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="config"
                    checked={selectedConfig === variant.id}
                    onChange={() => setSelectedConfig(variant.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {variant.engine} | {variant.color} | {variant.avionics}
                    </div>
                    <div className="font-bold text-green-600 mt-2">{variant.price}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Select Configuration
        </button>
      </div>
    </div>
  )
}
