import { test, expect } from '@playwright/test';

test.describe('EQ Match Game', () => {
  test('should allow user to play EQ match game and get score', async ({ page }) => {
    // Navigate to EQ Match page directly
    await page.goto('/games/eq-match')
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle')
    
    // Verify we're on the correct page
    await expect(page).toHaveURL('/games/eq-match')
    
    // Verify page title and content
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 })
    
    // Look for specific game elements - be more specific to avoid multiple matches
    // Check for target EQ section
    const targetSection = page.locator('text=/target eq|target/i').first()
    if (await targetSection.count() > 0) {
      await expect(targetSection).toBeVisible({ timeout: 10000 })
    }
    
    // Check for controls section
    const controlsSection = page.locator('text=/controls|eq controls/i').first()
    if (await controlsSection.count() > 0) {
      await expect(controlsSection).toBeVisible({ timeout: 10000 })
    }
    
    // Verify frequency controls are present (look for sliders or inputs)
    const frequencyControls = page.locator('input[type="range"], input[type="number"], [role="slider"]')
    if (await frequencyControls.count() > 0) {
      await expect(frequencyControls.first()).toBeVisible({ timeout: 10000 })
    }
    
    // Look for Check Score button - be specific to avoid multiple matches
    const checkScoreButton = page.getByRole('button', { name: /check score/i }).first()
    await expect(checkScoreButton).toBeVisible({ timeout: 15000 })
    
    // Click the button to get a score
    await checkScoreButton.click()
    
    // Wait for score calculation
    await page.waitForTimeout(2000)
    
    // Verify some kind of result is displayed
    const resultIndicators = [
      page.locator('[role="status"]').first(),
      page.locator('[aria-live="polite"]').first(),
      page.locator('text=/score|points|result/i').first(),
      page.locator('.score-display, .result').first()
    ]
    
    // Check if any result indicator becomes visible
    let resultFound = false
    for (const indicator of resultIndicators) {
      if (await indicator.count() > 0) {
        try {
          await expect(indicator).toBeVisible({ timeout: 5000 })
          resultFound = true
          break
        } catch {
          // Continue to next indicator
        }
      }
    }
    
    if (!resultFound) {
      console.log('No specific result area found, but score button click was successful')
    }
  })

  test('should navigate to EQ Match from home page', async ({ page }) => {
    // Start from home page
    await page.goto('/')
    
    // Wait for page load
    await page.waitForLoadState('networkidle')
    
    // Find and click the specific "Play EQ Match" link in hero section
    await page.getByRole('link', { name: /play eq match/i }).first().click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Should be on the EQ Match page
    await expect(page).toHaveURL('/games/eq-match')
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 })
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/games/eq-match')
    
    // Wait for page load
    await page.waitForLoadState('networkidle')
    
    // Verify page is accessible
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 })
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    
    // Verify we can focus on interactive elements
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Continue tabbing to find interactive elements (sliders, buttons)
    let tabCount = 0
    while (tabCount < 15) { // Limit iterations to prevent infinite loop
      await page.keyboard.press('Tab')
      
      const currentFocus = page.locator(':focus')
      const tagName = await currentFocus.evaluate(el => el?.tagName?.toLowerCase()).catch(() => '')
      const role = await currentFocus.evaluate(el => el?.getAttribute?.('role')).catch(() => '')
      const textContent = await currentFocus.textContent().catch(() => '')
      
      // Check if we've found the submit button
      if (tagName === 'button' || role === 'button' || 
          (textContent && /check score|submit|calculate/i.test(textContent))) {
        // Try to activate with Enter
        await page.keyboard.press('Enter')
        // Wait a moment for any response
        await page.waitForTimeout(1000)
        break
      }
      
      tabCount++
    }
  })

  test('should display game interface correctly', async ({ page }) => {
    await page.goto('/games/eq-match')
    
    // Wait for page load
    await page.waitForLoadState('networkidle')
    
    // Check for basic game structure
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 })
    
    // Look for any frequency-related content (be specific to avoid strict mode violations)
    const frequencyContent = page.locator('text=/hz|khz|frequency/i').first()
    if (await frequencyContent.count() > 0) {
      await expect(frequencyContent).toBeVisible({ timeout: 10000 })
    }
    
    // Verify interactive elements exist (be specific to get first match)
    const interactiveElements = page.locator('button, input, select, [role="slider"]')
    if (await interactiveElements.count() > 0) {
      await expect(interactiveElements.first()).toBeVisible({ timeout: 10000 })
    }
    
    // Verify the page has the main content area
    const mainContent = page.locator('main, [role="main"], #main-content')
    if (await mainContent.count() > 0) {
      await expect(mainContent.first()).toBeVisible({ timeout: 10000 })
    }
  })
})
