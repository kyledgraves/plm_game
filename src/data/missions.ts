import type { Badge } from '../utils/types'

export const BADGES: Badge[] = [
  { id: 'first_part', name: 'First Part', description: 'Create your first part', icon: 'box' },
  { id: 'structure_builder', name: 'Structure Builder', description: 'Complete Act 1', icon: 'git-branch' },
  { id: 'collaborator', name: 'Collaborator', description: 'Complete Act 2', icon: 'users' },
  { id: 'change_agent', name: 'Change Agent', description: 'Complete Act 3', icon: 'refresh-cw' },
  { id: 'part_master', name: 'Part Master', description: 'Create 10 parts without errors', icon: 'award' },
  { id: 'speed_runner', name: 'Speed Runner', description: 'Complete any mission under target time', icon: 'zap' },
  { id: 'perfect_score', name: 'Perfect Score', description: 'Complete mission with 100% score', icon: 'star' },
  { id: 'helicopter_hero', name: 'Helicopter Hero', description: 'Complete all 15 missions', icon: 'trophy' },
]

export const ACT_INFO: Record<number, { title: string; description: string; missions: number }> = {
  1: { title: 'Foundation', description: 'Learn the basics', missions: 5 },
  2: { title: 'Collaboration', description: 'Team communication', missions: 4 },
  3: { title: 'Change Crisis', description: 'Engineering changes', missions: 6 },
  4: { title: 'Configuration', description: 'Product variants', missions: 5 },
}

export const MISSIONS = [
  { id: '1_1', act: 1, mission: 1, title: 'Create Your First Part', description: 'Learn how to create a part', timeLimit: 300 },
  { id: '1_2', act: 1, mission: 2, title: 'Linking Specifications', description: 'Attach specifications', timeLimit: 240 },
  { id: '1_3', act: 1, mission: 3, title: 'Building the BOM', description: 'Create product structure', timeLimit: 360 },
  { id: '1_4', act: 1, mission: 4, title: 'Quantity Rollup', description: 'Calculate quantities', timeLimit: 180 },
  { id: '1_5', act: 1, mission: 5, title: 'Revision Basics', description: 'Understand revisions', timeLimit: 240 },
  { id: '2_1', act: 2, mission: 1, title: 'Team Communication', description: 'Post updates', timeLimit: 180 },
  { id: '2_2', act: 2, mission: 2, title: '3D Review', description: 'Review designs', timeLimit: 240 },
  { id: '2_3', act: 2, mission: 3, title: 'Finding Data', description: 'Search parts', timeLimit: 180 },
  { id: '2_4', act: 2, mission: 4, title: 'Review Cycle', description: 'Approval workflow', timeLimit: 300 },
  { id: '3_1', act: 3, mission: 1, title: 'The Problem Report', description: 'Report issues', timeLimit: 180 },
  { id: '3_2', act: 3, mission: 2, title: 'Creating Change Request', description: 'Submit change request', timeLimit: 300 },
  { id: '3_3', act: 3, mission: 3, title: 'Impact Analysis', description: 'Analyze effects', timeLimit: 360 },
  { id: '3_4', act: 3, mission: 4, title: 'Change Order Approval', description: 'Create change order', timeLimit: 300 },
  { id: '3_5', act: 3, mission: 5, title: 'Disposition Decisions', description: 'Handle inventory', timeLimit: 300 },
  { id: '3_6', act: 3, mission: 6, title: 'Closing the Loop', description: 'Verify change', timeLimit: 240 },
  { id: '4_1', act: 4, mission: 1, title: 'Build Your Helicopter', description: 'Configure helicopter', timeLimit: 300 },
  { id: '4_2', act: 4, mission: 2, title: 'Set Configuration Rules', description: 'Define rules', timeLimit: 360 },
  { id: '4_3', act: 4, mission: 3, title: 'Configuration Strategy', description: 'Compare options', timeLimit: 420 },
  { id: '4_4', act: 4, mission: 4, title: 'Create Specification', description: 'Document variant', timeLimit: 300 },
  { id: '4_5', act: 4, mission: 5, title: 'Release Configuration', description: 'Lock config', timeLimit: 240 },
]

export const getMission = (id: string) => MISSIONS.find(m => m.id === id)

export const getNextMission = (currentId: string): string | null => {
  const currentIndex = MISSIONS.findIndex(m => m.id === currentId)
  if (currentIndex === -1 || currentIndex === MISSIONS.length - 1) return null
  return MISSIONS[currentIndex + 1].id
}

export const isMissionUnlocked = (missionId: string, completedMissions: string[]): boolean => {
  const mission = getMission(missionId)
  if (!mission) return false
  if (mission.act === 1 && mission.mission === 1) return true
  
  const prevMissionId = MISSIONS.find(
    m => m.act === mission.act && m.mission === mission.mission - 1
  )?.id
  
  if (!prevMissionId && mission.mission > 1) {
    const prevAct = MISSIONS.find(
      m => m.act === mission.act - 1 && m.mission === ACT_INFO[mission.act - 1]?.missions
    )?.id
    return prevAct ? completedMissions.includes(prevAct) : true
  }
  
  return prevMissionId ? completedMissions.includes(prevMissionId) : true
}
