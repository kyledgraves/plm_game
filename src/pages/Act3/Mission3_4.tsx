import { useState } from 'react'
import { useMission } from '../../hooks/useMission'

export default function Mission3_4() {
  const { setObjectives, handleComplete } = useMission({
    missionId: '3_4',
    nextMissionId: '3_5',
    score: 100
  })

  const [approvers, setApprovers] = useState<string[]>(['Engineering Manager', 'Quality Assurance'])
  const [approved, setApproved] = useState<Record<string, boolean>>({})

  const handleApprove = (name: string) => {
    setApproved(prev => ({ ...prev, [name]: true }))
  }

  const allApproved = approvers.every(a => approved[a])

  const handleSubmit = () => {
    setObjectives({ changeOrderApproval: true })
    handleComplete()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Change Order Approval</h1>
        <p className="text-gray-600 mb-6">
          Get approval from stakeholders to proceed with the engineering change.
        </p>

        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Change Order: Update Main Rotor Blade</h3>
            <p className="text-sm text-gray-500">Status: Pending Approval</p>
          </div>

          <div className="space-y-3">
            {approvers.map(name => (
              <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-gray-500">
                    {approved[name] ? '✓ Approved' : 'Pending approval'}
                  </div>
                </div>
                {approved[name] ? (
                  <span className="text-green-600 font-medium">✓</span>
                ) : (
                  <button
                    onClick={() => handleApprove(name)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {allApproved && (
          <div className="p-4 bg-green-50 rounded-lg mb-6">
            <p className="text-green-700 font-medium">All approvals received! Change order is authorized.</p>
          </div>
        )}

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
