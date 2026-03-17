import { useState } from 'react'
import { useMission } from '../../hooks/useMission'
import { useGameStore } from '../../store/gameStore'

export default function Mission4_2() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '4_2',
    nextMissionId: '4_3',
    score: 100
  })

  const addConfigurationRule = useGameStore(state => state.addConfigurationRule)
  
  const [rules, setRules] = useState<Array<{ name: string; condition: string }>>([])

  const [ruleName, setRuleName] = useState('')
  const [condition, setCondition] = useState('')

  const handleAddRule = () => {
    if (!ruleName || !condition) return
    setRules([...rules, { name: ruleName, condition }])
    setRuleName('')
    setCondition('')
  }

  const handleSubmit = () => {
    if (rules.length === 0) return
    rules.forEach(rule => addConfigurationRule({
      id: Date.now().toString(),
      name: rule.name,
      condition: rule.condition,
      valid: true
    }))
    setObjectives({ configurationRules: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Set Configuration Rules</h1>
        <p className="text-gray-600 mb-6">
          Define rules to ensure valid configurations (e.g., certain options require others).
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="e.g., Turbo requires Professional avionics"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g., IF Engine=Turbo THEN Avionics=Professional"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAddRule}
            disabled={!ruleName || !condition}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              ruleName && condition
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Rule
          </button>
        </div>

        {rules.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Configuration Rules:</h3>
            <ul className="space-y-2">
              {rules.map((rule, idx) => (
                <li key={idx} className="p-3 bg-blue-50 rounded text-sm">
                  <strong>{rule.name}</strong>
                  <br />
                  <span className="text-gray-600">{rule.condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={rules.length === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            rules.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Configuration Rules
        </button>
      </div>
    </div>
  )
}
