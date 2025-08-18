import { Page } from '@playwright/test'
import { playAudit } from 'playwright-lighthouse'

export interface LighthouseA11yResult {
  score: number
  violations: Array<{
    id: string
    impact: string
    description: string
    helpUrl: string
  }>
}

export async function runLighthouseA11yAudit(
  page: Page,
  url: string
): Promise<LighthouseA11yResult> {
  // Navigate to the page
  await page.goto(url)
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle')
  
  // Run Lighthouse audit focused on accessibility
  const lighthouseResult = await playAudit({
    page,
    port: 9222,
    config: {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: ['accessibility'],
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
  })

  const a11yScore = Math.round((lighthouseResult.lhr.categories.accessibility?.score || 0) * 100)
  
  // Extract basic information about failed audits
  const violations: Array<{id: string, impact: string, description: string, helpUrl: string}> = []
  
  if (lighthouseResult.lhr.audits) {
    for (const [auditId, audit] of Object.entries(lighthouseResult.lhr.audits)) {
      if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode === 'binary') {
        violations.push({
          id: auditId,
          impact: 'high',
          description: audit.title || 'Unknown accessibility issue',
          helpUrl: `https://web.dev/${auditId}/`,
        })
      }
    }
  }

  return {
    score: a11yScore,
    violations,
  }
}

export function assertA11yScore(result: LighthouseA11yResult, minScore: number = 95): void {
  if (result.score < minScore) {
    const violationDetails = result.violations.length > 0 
      ? `\n\nAccessibility violations found:\n${result.violations.map(v => 
          `- ${v.description} (${v.id})\n  Help: ${v.helpUrl}`
        ).join('\n')}`
      : ''
    
    throw new Error(
      `Accessibility score ${result.score} is below minimum threshold of ${minScore}${violationDetails}`
    )
  }
}
