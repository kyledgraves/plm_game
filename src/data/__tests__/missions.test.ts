import { getMission, getNextMission, isMissionUnlocked, ACT_INFO, BADGES } from '../missions'

describe('missions data', () => {
  describe('getMission', () => {
    it('should return mission by id', () => {
      const mission = getMission('1_1')
      expect(mission).toBeDefined()
      expect(mission?.id).toBe('1_1')
      expect(mission?.title).toBe('Create Your First Part')
    })

    it('should return undefined for invalid id', () => {
      const mission = getMission('invalid')
      expect(mission).toBeUndefined()
    })
  })

  describe('getNextMission', () => {
    it('should return next mission id', () => {
      const next = getNextMission('1_1')
      expect(next).toBe('1_2')
    })

    it('should return null for last mission', () => {
      const next = getNextMission('4_5')
      expect(next).toBeNull()
    })

    it('should return null for invalid id', () => {
      const next = getNextMission('invalid')
      expect(next).toBeNull()
    })
  })

  describe('isMissionUnlocked', () => {
    it('should unlock first mission', () => {
      expect(isMissionUnlocked('1_1', [])).toBe(true)
    })

    it('should unlock mission 2 if mission 1 completed', () => {
      expect(isMissionUnlocked('1_2', ['1_1'])).toBe(true)
    })

    it('should not unlock mission if previous not completed', () => {
      expect(isMissionUnlocked('1_2', [])).toBe(false)
    })

    it('should handle invalid mission id', () => {
      expect(isMissionUnlocked('invalid', [])).toBe(false)
    })

    it('should unlock first mission of act 2 if all act 1 complete', () => {
      expect(isMissionUnlocked('2_1', ['1_1', '1_2', '1_3', '1_4', '1_5'])).toBe(true)
    })

    it('should unlock act 3 after act 2 complete', () => {
      const allAct2 = ['1_1', '1_2', '1_3', '1_4', '1_5', '2_1', '2_2', '2_3', '2_4']
      expect(isMissionUnlocked('3_1', allAct2)).toBe(true)
    })

    it('should unlock act 4 after act 3 complete', () => {
      const allAct3 = [
        '1_1', '1_2', '1_3', '1_4', '1_5',
        '2_1', '2_2', '2_3', '2_4',
        '3_1', '3_2', '3_3', '3_4', '3_5', '3_6'
      ]
      expect(isMissionUnlocked('4_1', allAct3)).toBe(true)
    })
  })

  describe('BADGES', () => {
    it('should have required badges', () => {
      const badgeIds = BADGES.map(b => b.id)
      expect(badgeIds).toContain('first_part')
      expect(badgeIds).toContain('helicopter_hero')
    })
  })

  describe('ACT_INFO', () => {
    it('should have correct act info', () => {
      expect(ACT_INFO[1].title).toBe('Foundation')
      expect(ACT_INFO[1].missions).toBe(5)
      expect(ACT_INFO[4].missions).toBe(5)
    })
  })
})
