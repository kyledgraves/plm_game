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

  it('should add child to part', () => {
    useGameStore.setState({
      parts: { 'HT-99999': { id: 'HT-99999', partNumber: 'HT-99999', name: 'Parent', description: '', revision: 'A', state: 'RELEASED', specifications: [], children: [] } }
    })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.addChildToPart('HT-99999', { id: 'child1', partNumber: 'HT-99999-child', name: 'Child', description: '', revision: 'A', state: 'WIP', specifications: [], children: [] })
    })
    
    const state = useGameStore.getState()
    expect(state.parts['HT-99999'].children).toHaveLength(1)
  })

  it('should create product structure', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.createProductStructure({ id: 'ps1', name: 'Helicopter', parts: [] })
    })
    
    expect(useGameStore.getState().productStructures['ps1']).toBeDefined()
  })

  it('should update product structure', () => {
    useGameStore.setState({ productStructures: { ps1: { id: 'ps1', name: 'Old', parts: [] } } })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateProductStructure('ps1', { name: 'New' })
    })
    
    expect(useGameStore.getState().productStructures['ps1'].name).toBe('New')
  })

  it('should create change request', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.createChangeRequest({ id: 'cr1', title: 'Test', description: '', status: 'pending', priority: 'high', requestedBy: '', requestedAt: '', affectedParts: [], affectedProducts: [] })
    })
    
    expect(useGameStore.getState().changeRequests).toHaveLength(1)
  })

  it('should update change request', () => {
    useGameStore.setState({ changeRequests: [{ id: 'cr1', title: 'Test', description: '', status: 'pending', priority: 'high', requestedBy: '', requestedAt: '', affectedParts: [], affectedProducts: [] }] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateChangeRequest('cr1', { status: 'approved' })
    })
    
    expect(useGameStore.getState().changeRequests[0].status).toBe('approved')
  })

  it('should create change order', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.createChangeOrder({ id: 'co1', title: 'Test', description: '', status: 'pending', priority: 'high', requestedBy: '', requestedAt: '', implementationDate: '', affectedParts: [] })
    })
    
    expect(useGameStore.getState().changeOrders).toHaveLength(1)
  })

  it('should update change order', () => {
    useGameStore.setState({ changeOrders: [{ id: 'co1', title: 'Test', description: '', status: 'pending', priority: 'high', requestedBy: '', requestedAt: '', implementationDate: '', affectedParts: [] }] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateChangeOrder('co1', { status: 'implemented' })
    })
    
    expect(useGameStore.getState().changeOrders[0].status).toBe('implemented')
  })

  it('should set configuration', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.setConfiguration({ engine: 'v8', color: 'red', avionics: 'advanced' })
    })
    
    const state = useGameStore.getState()
    expect(state.configurations.engine).toBe('v8')
    expect(state.configurations.color).toBe('red')
  })

  it('should add configuration rule', () => {
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.addConfigurationRule({ id: 'rule1', name: 'Test', condition: 'engine=v8', valid: false })
    })
    
    expect(useGameStore.getState().configurationRules).toHaveLength(1)
  })

  it('should update configuration rule', () => {
    useGameStore.setState({ configurationRules: [{ id: 'rule1', name: 'Test', condition: 'engine=v8', valid: false }] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.updateConfigurationRule('rule1', true)
    })
    
    expect(useGameStore.getState().configurationRules[0].valid).toBe(true)
  })

  it('should reset progress', () => {
    useGameStore.setState({ totalScore: 1000, completedMissions: ['1_1', '1_2'] })
    const { result } = renderHook(() => useGameStore())
    
    act(() => {
      result.current.resetProgress()
    })
    
    const state = useGameStore.getState()
    expect(state.totalScore).toBe(0)
    expect(state.completedMissions).toHaveLength(0)
  })
})
