import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission4_1() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '4_1',
    nextMissionId: '4_2',
    score: 100
  })

  const setConfiguration = useGameStore(state => state.setConfiguration)
  
  const [config, setConfig] = useState({
    engine: '',
    color: '',
    avionics: ''
  })

  const engines = ['Standard', 'Turbo', 'Supercharged']
  const colors = ['Red', 'Blue', 'Green', 'Yellow']
  const avionics = ['Basic', 'Advanced', 'Professional']

  const isComplete = config.engine && config.color && config.avionics

  const handleSubmit = () => {
    if (!isComplete) return
    setConfiguration(config)
    setObjectives({ configureHelicopter: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Build Your Helicopter</h1>
        <p className="text-gray-600 mb-6">
          Configure your helicopter by selecting options for each component.
        </p>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-6">
            <div className="text-6xl">🚁</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
              <select
                value={config.engine}
                onChange={(e) => setConfig({ ...config, engine: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select engine...</option>
                {engines.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select color...</option>
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avionics Package</label>
              <select
                value={config.avionics}
                onChange={(e) => setConfig({ ...config, avionics: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select avionics...</option>
                {avionics.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isComplete
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Configure Helicopter
        </button>
      </div>
    </div>
  )
}
