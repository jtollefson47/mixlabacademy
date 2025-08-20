import { test, expect } from '@playwright/test';

test.describe('EQ Match Game', () => {
  test('should allow user to play EQ match game and get score', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Find and click the EQ Match game link
    await page.click('text=Play EQ Match');
    
    // Should be on the EQ Match page
    await expect(page).toHaveURL('/games/eq-match');
    
    // Verify page title and content
    await expect(page.locator('h1')).toContainText('EQ Match Challenge');
    await expect(page.locator('text=Target EQ')).toBeVisible();
    await expect(page.locator('text=EQ Controls')).toBeVisible();
    
    // Verify all three frequency sliders are present
    await expect(page.locator('input[type="range"]')).toHaveCount(3);
    
    // Verify frequency labels
    await expect(page.locator('text=100 Hz')).toBeVisible();
    await expect(page.locator('text=1 kHz')).toBeVisible();
    await expect(page.locator('text=8 kHz')).toBeVisible();
    
    // Adjust sliders to some values
    const slider100Hz = page.locator('input[aria-labelledby="freq-100-label"]');
    const slider1kHz = page.locator('input[aria-labelledby="freq-1000-label"]');
    const slider8kHz = page.locator('input[aria-labelledby="freq-8000-label"]');
    
    // Set some values (not perfect to test scoring)
    await slider100Hz.fill('1'); // Target is +2, so this is 1 dB off
    await slider1kHz.fill('-2'); // Target is -3, so this is 1 dB off
    await slider8kHz.fill('5'); // Target is +4, so this is 1 dB off
    
    // Verify the values are displayed
    await expect(page.locator('text=+1 dB')).toBeVisible();
    await expect(page.locator('text=-2 dB')).toBeVisible();
    await expect(page.locator('text=+5 dB')).toBeVisible();
    
    // Click the "Check Score" button
    await page.click('text=Check Score');
    
    // Verify score is displayed in the ARIA live region
    const scoreRegion = page.locator('[role="status"][aria-live="polite"]');
    await expect(scoreRegion).toBeVisible();
    
    // Check that score text is present (pattern matches "Score: <number>")
    await expect(scoreRegion.locator('h3')).toContainText(/^Score:\s+\d+$/);
    
    // Verify individual band results are shown
    await expect(scoreRegion.locator('text=100 Hz')).toBeVisible();
    await expect(scoreRegion.locator('text=1 kHz')).toBeVisible();
    await expect(scoreRegion.locator('text=8 kHz')).toBeVisible();
    
    // Verify delta values are shown
    await expect(scoreRegion.locator('text=-1.0 dB off')).toBeVisible(); // 100 Hz
    await expect(scoreRegion.locator('text=+1.0 dB off')).toBeVisible();  // 1 kHz
    await expect(scoreRegion.locator('text=+1.0 dB off')).toBeVisible();  // 8 kHz
    
    // Verify individual scores are shown (all should be 100 since within tolerance)
    await expect(scoreRegion.locator('text=100/100')).toHaveCount(3);
    
    // Verify encouragement message appears
    await expect(scoreRegion.locator('text=🎉 Excellent! Your ear is well-trained.')).toBeVisible();
  });

  test('should handle perfect score scenario', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Set sliders to exact target values
    await page.locator('input[aria-labelledby="freq-100-label"]').fill('2');   // +2 dB
    await page.locator('input[aria-labelledby="freq-1000-label"]').fill('-3'); // -3 dB
    await page.locator('input[aria-labelledby="freq-8000-label"]').fill('4');  // +4 dB
    
    await page.click('text=Check Score');
    
    // Should get perfect score
    const scoreRegion = page.locator('[role="status"][aria-live="polite"]');
    await expect(scoreRegion.locator('h3')).toContainText('Score: 100');
    
    // All deltas should be 0
    await expect(scoreRegion.locator('text=+0.0 dB off')).toHaveCount(3);
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Tab through all interactive elements
    await page.keyboard.press('Tab'); // Focus on first slider
    await expect(page.locator('input[aria-labelledby="freq-100-label"]')).toBeFocused();
    
    // Use arrow keys to adjust slider
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight'); // Should be at +1 dB
    
    await page.keyboard.press('Tab'); // Focus on second slider
    await expect(page.locator('input[aria-labelledby="freq-1000-label"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Focus on third slider
    await expect(page.locator('input[aria-labelledby="freq-8000-label"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Focus on button
    await expect(page.locator('text=Check Score')).toBeFocused();
    
    // Activate button with Enter key
    await page.keyboard.press('Enter');
    
    // Score should appear
    await expect(page.locator('[role="status"][aria-live="polite"]')).toBeVisible();
  });

  test('should display last score when available', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Play game once to set a score
    await page.locator('input[aria-labelledby="freq-100-label"]').fill('2');
    await page.locator('input[aria-labelledby="freq-1000-label"]').fill('-3');
    await page.locator('input[aria-labelledby="freq-8000-label"]').fill('4');
    await page.click('text=Check Score');
    
    // Refresh page
    await page.reload();
    
    // Should show last score
    await expect(page.locator('text=Last Score: 100/100')).toBeVisible();
  });

  test('should show target EQ values correctly', async ({ page }) => {
    await page.goto('/games/eq-match');
    
    // Verify target values are displayed
    const targetCard = page.locator('text=Target EQ').locator('..');
    await expect(targetCard.locator('text=100 Hz')).toBeVisible();
    await expect(targetCard.locator('text=+2 dB')).toBeVisible();
    await expect(targetCard.locator('text=1 kHz')).toBeVisible();
    await expect(targetCard.locator('text=-3 dB')).toBeVisible();
    await expect(targetCard.locator('text=8 kHz')).toBeVisible();
    await expect(targetCard.locator('text=+4 dB')).toBeVisible();
  });
});
