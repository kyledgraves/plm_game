import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Part, ProductStructure, ChangeRequest, ChangeOrder, Badge, StoryProgress } from '../utils/types'
import { INITIAL_PARTS } from '../data/parts'

const initialParts = INITIAL_PARTS.reduce((acc, part) => {
  acc[part.id] = part
  return acc
}, {} as Record<string, Part>)

interface HelicopterConfiguration {
  engine: string
  color: string
  avionics: string
}

type GameMode = 'normal' | 'timeAttack' | 'scoreAttack'
type SaveSlot = 1 | 2 | 3

interface MissionTime {
  missionId: string
  startTime: number
  endTime?: number
  duration?: number
}

interface GameState {
  playerName: string
  currentAct: number
  currentMission: number
  totalScore: number
  completedMissions: string[]
  badges: Badge[]
  startedAt: string
  
  gameMode: GameMode
  currentSlot: SaveSlot
  missionTimes: MissionTime[]
  
  parts: Record<string, Part>
  productStructures: Record<string, ProductStructure>
  changeRequests: ChangeRequest[]
  changeOrders: ChangeOrder[]
  
  configurations: HelicopterConfiguration
  configurationRules: Array<{ id: string; name: string; condition: string; valid: boolean }>
  
  storyProgress: StoryProgress
  unlockedAchievements: string[]
  showAchievement: string | null
  
  setPlayerName: (name: string) => void
  setCurrentMission: (act: number, mission: number) => void
  addScore: (points: number) => void
  completeMission: (missionId: string) => void
  earnBadge: (badge: Badge) => void
  setGameMode: (mode: GameMode) => void
  setCurrentSlot: (slot: SaveSlot) => void
  startMissionTimer: (missionId: string) => void
  endMissionTimer: (missionId: string) => number
  createPart: (part: Part) => void
  updatePart: (id: string, updates: Partial<Part>) => void
  addChildToPart: (parentId: string, child: { partId: string; quantity: number }) => void
  createProductStructure: (structure: ProductStructure) => void
  updateProductStructure: (id: string, updates: Partial<ProductStructure>) => void
  createChangeRequest: (cr: ChangeRequest) => void
  updateChangeRequest: (id: string, updates: Partial<ChangeRequest>) => void
  createChangeOrder: (co: ChangeOrder) => void
  updateChangeOrder: (id: string, updates: Partial<ChangeOrder>) => void
  setConfiguration: (config: HelicopterConfiguration) => void
  addConfigurationRule: (rule: { id: string; name: string; condition: string; valid: boolean }) => void
  updateConfigurationRule: (id: string, valid: boolean) => void
  setCurrentDialogue: (dialogueKey: string) => void
  advanceDialogue: () => void
  clearDialogue: () => void
  unlockAchievement: (achievementId: string) => void
  clearShowAchievement: () => void
  resetProgress: () => void
}

const initialState = {
  playerName: '',
  currentAct: 1,
  currentMission: 1,
  totalScore: 0,
  completedMissions: [] as string[],
  badges: [] as Badge[],
  startedAt: new Date().toISOString(),
  gameMode: 'normal' as GameMode,
  currentSlot: 1 as SaveSlot,
  missionTimes: [] as MissionTime[],
  parts: initialParts,
  productStructures: {} as Record<string, ProductStructure>,
  changeRequests: [] as ChangeRequest[],
  changeOrders: [] as ChangeOrder[],
  configurations: { engine: '', color: '', avionics: '' } as HelicopterConfiguration,
  configurationRules: [] as Array<{ id: string; name: string; condition: string; valid: boolean }>,
  storyProgress: { currentDialogue: null, dialogueIndex: 0, seenDialogues: [], currentAchievement: null } as StoryProgress,
  unlockedAchievements: [] as string[],
  showAchievement: null as string | null,
}

export const useGameStore = create<GameState>()(
  (set) => ({
      ...initialState,
      
      setPlayerName: (name) => set({ playerName: name }),
      
      setCurrentMission: (act, mission) => set({ currentAct: act, currentMission: mission }),
      
      addScore: (points) => set((state) => ({ totalScore: state.totalScore + points })),
      
      completeMission: (missionId) => set((state) => ({
        completedMissions: state.completedMissions.includes(missionId) 
          ? state.completedMissions 
          : [...state.completedMissions, missionId]
      })),
      
      earnBadge: (badge) => set((state) => ({
        badges: state.badges.some(b => b.id === badge.id)
          ? state.badges
          : [...state.badges, { ...badge, earnedAt: new Date().toISOString() }]
      })),
      
      setGameMode: (mode) => set({ gameMode: mode }),
      
      setCurrentSlot: (slot) => set({ currentSlot: slot }),
      
      startMissionTimer: (missionId) => set((state) => ({
        missionTimes: [
          ...state.missionTimes.filter(t => t.missionId !== missionId),
          { missionId, startTime: Date.now() }
        ]
      })),
      
      endMissionTimer: (missionId) => {
        let duration = 0
        set((state) => {
          const mission = state.missionTimes.find(t => t.missionId === missionId)
          if (mission) {
            duration = Date.now() - mission.startTime
            return {
              missionTimes: state.missionTimes.map(t =>
                t.missionId === missionId
                  ? { ...t, endTime: Date.now(), duration }
                  : t
              )
            }
          }
          return state
        })
        return duration
      },
      
      createPart: (part) => set((state) => ({
        parts: { ...state.parts, [part.id]: part }
      })),
      
      updatePart: (id, updates) => set((state) => ({
        parts: {
          ...state.parts,
          [id]: { ...state.parts[id], ...updates }
        }
      })),
      
      addChildToPart: (parentId, child: { partId: string; quantity: number }) => set((state) => {
        const parent = state.parts[parentId]
        if (!parent) return state
        return {
          parts: {
            ...state.parts,
            [parentId]: {
              ...parent,
              children: [...parent.children, child]
            }
          }
        }
      }),
      
      createProductStructure: (structure) => set((state) => ({
        productStructures: { ...state.productStructures, [structure.id]: structure }
      })),
      
      updateProductStructure: (id, updates) => set((state) => ({
        productStructures: {
          ...state.productStructures,
          [id]: { ...state.productStructures[id], ...updates }
        }
      })),
      
      createChangeRequest: (cr) => set((state) => ({
        changeRequests: [...state.changeRequests, cr]
      })),
      
      updateChangeRequest: (id, updates) => set((state) => ({
        changeRequests: state.changeRequests.map(cr => 
          cr.id === id ? { ...cr, ...updates } : cr
        )
      })),
      
      createChangeOrder: (co) => set((state) => ({
        changeOrders: [...state.changeOrders, co]
      })),
      
      updateChangeOrder: (id, updates) => set((state) => ({
        changeOrders: state.changeOrders.map(co => 
          co.id === id ? { ...co, ...updates } : co
        )
      })),
      
      setConfiguration: (config) => set({ configurations: config }),
      
      addConfigurationRule: (rule) => set((state) => ({
        configurationRules: [...state.configurationRules, rule]
      })),
      
      updateConfigurationRule: (id, valid) => set((state) => ({
        configurationRules: state.configurationRules.map(r =>
          r.id === id ? { ...r, valid } : r
        )
      })),
      
      setCurrentDialogue: (dialogueKey) => set((state) => ({
        storyProgress: {
          ...state.storyProgress,
          currentDialogue: dialogueKey,
          dialogueIndex: 0
        }
      })),
      
      advanceDialogue: () => set((state) => ({
        storyProgress: {
          ...state.storyProgress,
          dialogueIndex: state.storyProgress.dialogueIndex + 1
        }
      })),
      
      clearDialogue: () => set((state) => ({
        storyProgress: {
          ...state.storyProgress,
          currentDialogue: null,
          dialogueIndex: 0
        }
      })),
      
      unlockAchievement: (achievementId) => set((state) => {
        const alreadyUnlocked = state.unlockedAchievements.includes(achievementId)
        return {
          unlockedAchievements: alreadyUnlocked 
            ? state.unlockedAchievements 
            : [...state.unlockedAchievements, achievementId],
          showAchievement: alreadyUnlocked ? null : achievementId
        }
      }),
      
      clearShowAchievement: () => set({ showAchievement: null }),
      
      resetProgress: () => set(initialState),
    }))
