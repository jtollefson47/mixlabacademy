import { test, expect } from '@playwright/test'

test.describe('Navigation Flow', () => {
  test('navigates from home to EQ Match game via Play EQ Match button', async ({ page }) => {
    // Go to the home page
    await page.goto('/')

    // Verify we're on the home page
    await expect(page.getByRole('heading', { name: /learn audio engineering by playing/i })).toBeVisible()

    // Click the "Play EQ Match" button
    await page.getByRole('link', { name: /play eq match/i }).click()

    // Verify we're now on the EQ Match page
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible()
    await expect(page.getByText(/train your ear to identify frequency ranges/i)).toBeVisible()
    
    // Verify the URL is correct
    await expect(page).toHaveURL('/games/eq-match')

    // Check that the start button is present
    await expect(page.getByRole('button', { name: /start game/i })).toBeVisible()
  })

  test('navigates from home to games page via Browse Games button', async ({ page }) => {
    // Go to the home page
    await page.goto('/')

    // Click the "Browse Games" button
    await page.getByRole('link', { name: /browse games/i }).click()

    // Verify we're now on the games page
    await expect(page.getByRole('heading', { name: /learning games/i })).toBeVisible()
    await expect(page.getByText(/choose from our collection/i)).toBeVisible()
    
    // Verify the URL is correct
    await expect(page).toHaveURL('/games')

    // Check that the EQ Match game card is present
    await expect(page.getByText(/eq match/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /play now/i })).toBeVisible()
  })

  test('navigation from games page to EQ Match', async ({ page }) => {
    // Go to the games page
    await page.goto('/games')

    // Click the "Play Now" button on the EQ Match card
    await page.getByRole('link', { name: /play now/i }).click()

    // Verify we're on the EQ Match page
    await expect(page.getByRole('heading', { name: /eq match/i })).toBeVisible()
    await expect(page).toHaveURL('/games/eq-match')
  })

  test('navbar navigation works correctly', async ({ page }) => {
    // Start from EQ Match page
    await page.goto('/games/eq-match')

    // Click the brand logo to go home
    await page.getByRole('link', { name: /audio learning/i }).first().click()

    // Verify we're back on the home page
    await expect(page.getByRole('heading', { name: /learn audio engineering by playing/i })).toBeVisible()
    await expect(page).toHaveURL('/')

    // Click the Games link in navbar
    await page.getByRole('link', { name: /^games$/i }).click()

    // Verify we're on the games page
    await expect(page.getByRole('heading', { name: /learning games/i })).toBeVisible()
    await expect(page).toHaveURL('/games')
  })

  test('start game button shows toast notification', async ({ page }) => {
    // Go to the EQ Match page
    await page.goto('/games/eq-match')

    // Click the start game button
    await page.getByRole('button', { name: /start game/i }).click()

    // Verify that a toast notification appears
    await expect(page.getByText(/game coming soon/i)).toBeVisible()
    await expect(page.getByText(/the eq match game is currently in development/i)).toBeVisible()
  })
})
