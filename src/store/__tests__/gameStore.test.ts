import { renderHook, act } from '@testing-library/react'
import { useGameStore } from '../gameStore'

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.setState({
      playerName: '',
      currentAct: 1,
      currentMission: 1,
      totalScore: 0,
      completedMissions: [],
      badges: [],
      gameMode: 'normal',
      currentSlot: 1,
      missionTimes: [],
      parts: {},
      productStructures: {},
      changeRequests: [],
      changeOrders: [],
      configurations: { engine: '', color: '', avionics: '' },
      configurationRules: []
    })
  })

  it('should set player name', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.setPlayerName('TestPlayer')
    })
    
    expect(useGameStore.getState().playerName).toBe('TestPlayer')
  })

  it('should set current mission', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.setCurrentMission(2, 3)
    })
    
    const state = useGameStore.getState()
    expect(state.currentAct).toBe(2)
    expect(state.currentMission).toBe(3)
  })

  it('should add score', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.addScore(100)
    })
    
    expect(useGameStore.getState().totalScore).toBe(100)
  })

  it('should add to existing score', () => {
    useGameStore.setState({ totalScore: 50 })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.addScore(75)
    })
    
    expect(useGameStore.getState().totalScore).toBe(125)
  })

  it('should complete mission', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.completeMission('1_1')
    })
    
    expect(useGameStore.getState().completedMissions).toContain('1_1')
  })

  it('should not duplicate completed missions', () => {
    useGameStore.setState({ completedMissions: ['1_1'] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.completeMission('1_1')
    })
    
    expect(useGameStore.getState().completedMissions).toHaveLength(1)
  })

  it('should earn badge', () => {
    const { result } = renderHook(() => useGameStore())
    const badge = { id: 'badge1', name: 'Test', description: 'Test badge', icon: 'star' }
    
    act(() => {
      result.current.earnBadge(badge)
    })
    
    const state = useGameStore.getState()
    expect(state.badges).toHaveLength(1)
    expect(state.badges[0].earnedAt).toBeDefined()
  })

  it('should not duplicate badges', () => {
    const badge = { id: 'badge1', name: 'Test', description: 'Test badge', icon: 'star' }
    useGameStore.setState({ badges: [{ ...badge, earnedAt: '2024-01-01' }] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.earnBadge(badge)
    })
    
    expect(useGameStore.getState().badges).toHaveLength(1)
  })

  it('should set game mode', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.setGameMode('timeAttack')
    })
    
    expect(useGameStore.getState().gameMode).toBe('timeAttack')
  })

  it('should set current slot', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.setCurrentSlot(2)
    })
    
    expect(useGameStore.getState().currentSlot).toBe(2)
  })

  it('should start mission timer', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.startMissionTimer('1_1')
    })
    
    const state = useGameStore.getState()
    expect(state.missionTimes).toHaveLength(1)
    expect(state.missionTimes[0].missionId).toBe('1_1')
    expect(state.missionTimes[0].startTime).toBeDefined()
  })

  it('should end mission timer', () => {
    useGameStore.setState({
      missionTimes: [{ missionId: '1_1', startTime: Date.now() - 1000 }]
    })
    const { result } = renderHook(() => useGameStore())
    
    let duration = 0
    act(() => {
      duration = result.current.endMissionTimer('1_1')
    })
    
    const state = useGameStore.getState()
    expect(state.missionTimes[0].endTime).toBeDefined()
    expect(duration).toBeGreaterThan(0)
  })

  it('should handle create part', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.createPart({
        id: 'HT-99999',
        partNumber: 'HT-99999',
        name: 'Test Part',
        description: 'Test',
        revision: 'A',
        state: 'RELEASED',
        specifications: [],
        children: []
      })
    })
    
    const state = useGameStore.getState()
    expect(state.parts['HT-99999']).toBeDefined()
  })

  it('should update part', () => {
    useGameStore.setState({
      parts: { 'HT-99999': { id: 'HT-99999', partNumber: 'HT-99999', name: 'Test', description: '', revision: 'A', state: 'RELEASED', specifications: [], children: [] } }
    })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updatePart('HT-99999', { name: 'Updated' })
    })
    
    expect(useGameStore.getState().parts['HT-99999'].name).toBe('Updated')
  })
})
