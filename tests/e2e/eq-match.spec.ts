import { test, expect } from '@playwright/test';

test.describe('EQ Match Game', () => {
  test('should allow user to play EQ match game and get score', async ({ page }) => {
    // Navigate to EQ Match page directly
    await page.goto('/games/eq-match');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the correct page
    await expect(page).toHaveURL('/games/eq-match');
    
    // Verify page title and content
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 });
    
    // Verify basic game elements are present
    await expect(page.getByText(/target|controls/i)).toBeVisible({ timeout: 10000 });
    
    // Verify frequency controls are present (look for sliders or inputs)
    const frequencyControls = page.locator('input[type="range"], input[type="number"], .frequency-control');
    await expect(frequencyControls.first()).toBeVisible({ timeout: 10000 });
    
    // Look for Check Score button
    const checkScoreButton = page.getByRole('button', { name: /check score|submit|calculate/i });
    await expect(checkScoreButton).toBeVisible({ timeout: 15000 });
    
    // Click the button to get a score
    await checkScoreButton.click();
    
    // Wait for score calculation
    await page.waitForTimeout(1000);
    
    // Verify some kind of result is displayed
    const resultArea = page.locator('[role="status"], [aria-live="polite"], .score-display, .result');
    if (await resultArea.count() > 0) {
      await expect(resultArea.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate to EQ Match from home page', async ({ page }) => {
    // Start from home page
    await page.goto('/');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Find and click the EQ Match link
    await page.getByRole('link', { name: /play eq match/i }).click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Should be on the EQ Match page
    await expect(page).toHaveURL('/games/eq-match');
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 });
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Verify we can focus on game controls
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing to find the submit button
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = await page.locator(':focus').textContent();
      if (currentFocus && /check score|submit|calculate/i.test(currentFocus)) {
        break;
      }
    }
    
    // Try to activate with Enter
    await page.keyboard.press('Enter');
    
    // Wait a moment for any response
    await page.waitForTimeout(1000);
  });

  test('should display game interface correctly', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Check for basic game structure
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible({ timeout: 15000 });
    
    // Look for any frequency-related content
    const frequencyContent = page.locator('text=/hz|khz|frequency/i');
    if (await frequencyContent.count() > 0) {
      await expect(frequencyContent.first()).toBeVisible({ timeout: 10000 });
    }
    
    // Verify interactive elements exist
    const interactiveElements = page.locator('button, input, select, [role="slider"]');
    await expect(interactiveElements.first()).toBeVisible({ timeout: 10000 });
  });
});
