import { Page } from '@playwright/test'

/**
 * CI Configuration and Utilities
 * Provides centralized configuration for CI/local environment handling
 */

export const CI_CONFIG = {
  isCI: process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true',
  baseUrl: process.env.CI === 'true' ? 'http://localhost:3000' : 'http://127.0.0.1:3000',
  retryAttempts: process.env.CI === 'true' ? 3 : 1,
  timeouts: {
    navigation: process.env.CI === 'true' ? 60000 : 30000,
    lighthouse: process.env.CI === 'true' ? 120000 : 60000,
    element: process.env.CI === 'true' ? 20000 : 10000,
    stabilization: process.env.CI === 'true' ? 5000 : 2000
  },

  async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number,
    operationName: string
  ): Promise<T> {
    let lastError: unknown
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`${operationName} - Attempt ${attempt}/${maxRetries}`)
        const result = await operation()
        if (attempt > 1) {
          console.log(`${operationName} succeeded on attempt ${attempt}`)
        }
        return result
      } catch (error) {
        lastError = error
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.warn(`${operationName} - Attempt ${attempt} failed:`, errorMessage)
        
        if (attempt < maxRetries) {
          const delay = attempt * 1000 // Progressive backoff: 1s, 2s, 3s
          console.log(`Waiting ${delay}ms before retry...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    const finalError = lastError instanceof Error ? lastError : new Error(String(lastError))
    throw finalError || new Error(`${operationName} failed after ${maxRetries} attempts`)
  }
}

export async function waitForStableEnvironment(page: Page) {
  // Enhanced stability waiting for CI
  if (CI_CONFIG.isCI) {
    console.log('CI environment detected - applying enhanced stability measures')
    await page.waitForTimeout(CI_CONFIG.timeouts.stabilization)
    
    // Ensure no ongoing network requests
    await page.waitForLoadState('networkidle')
    
    // Additional check for page readiness
    await page.evaluate(() => {
      return new Promise<boolean>(resolve => {
        if (document.readyState === 'complete') {
          resolve(true)
        } else {
          window.addEventListener('load', () => resolve(true))
        }
      })
    })
  }
}

export function getTestTimeout() {
  return CI_CONFIG.isCI ? 300000 : 120000 // 5 minutes for CI, 2 minutes locally
}
