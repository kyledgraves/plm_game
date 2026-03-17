import { test, expect } from '@playwright/test'

test.describe('Story System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.evaluate(() => localStorage.clear())
    await page.goto('http://localhost:5173/mission/1_1')
    await page.waitForLoadState('domcontentloaded')
  })

  test('should load mission page', async ({ page }) => {
    await expect(page.locator('text=Create Part')).toBeVisible({ timeout: 10000 })
  })

  test('should show dialogue box on mission load', async ({ page }) => {
    await page.waitForTimeout(2000)
    const dialogue = page.locator('.rounded-lg.border-2')
    await expect(dialogue).toBeVisible({ timeout: 10000 })
  })
})
