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
  // Navigate to the page with proper base URL
  const fullUrl = url.startsWith('http') ? url : `http://127.0.0.1:3000${url}`
  await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 })
  
  // Wait for page to be fully loaded and ensure content is present
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('domcontentloaded')
  
  // Verify the page has content (not blank)
  await page.waitForSelector('body', { timeout: 10000 })
  const bodyContent = await page.locator('body').innerHTML()
  if (!bodyContent || bodyContent.trim().length < 100) {
    throw new Error(`Page appears to be blank or has minimal content: ${fullUrl}`)
  }
  
  // Wait a bit more for any dynamic content
  await page.waitForTimeout(2000)
  
  // Run Lighthouse audit focused ONLY on accessibility
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
        // Disable all performance audits completely
        skipAudits: [
          'largest-contentful-paint',
          'first-contentful-paint',
          'speed-index',
          'cumulative-layout-shift',
          'total-blocking-time',
          'first-meaningful-paint',
          'interactive',
          'first-cpu-idle',
          'max-potential-fid',
          'performance-budget',
          'timing-budget',
          'resource-summary',
          'third-party-summary',
          'third-party-facades',
          'largest-contentful-paint-element',
          'lcp-lazy-loaded',
          'layout-shift-elements',
          'uses-long-cache-ttl',
          'total-byte-weight',
          'offscreen-images',
          'render-blocking-resources',
          'unminified-css',
          'unminified-javascript',
          'unused-css-rules',
          'unused-javascript',
          'uses-webp-images',
          'uses-optimized-images',
          'uses-text-compression',
          'uses-responsive-images',
          'efficient-animated-content',
          'duplicated-javascript',
          'legacy-javascript',
          'preload-lcp-image',
          'uses-rel-preconnect',
          'uses-rel-preload',
          'uses-http2',
          'uses-passive-event-listeners',
          'no-document-write',
          'uses-efficient-cache-policy',
          'critical-request-chains',
          'user-timings',
          'bootup-time',
          'mainthread-work-breakdown',
          'font-display',
          'network-requests',
          'network-rtt',
          'network-server-latency',
          'main-thread-tasks',
          'diagnostics',
          'metrics',
          'screenshot-thumbnails',
          'final-screenshot',
        ],
        // Only run accessibility audits
        onlyAudits: [
          'accesskeys',
          'aria-allowed-attr',
          'aria-command-name',
          'aria-hidden-body',
          'aria-hidden-focus',
          'aria-input-field-name',
          'aria-meter-name',
          'aria-progressbar-name',
          'aria-required-attr',
          'aria-required-children',
          'aria-required-parent',
          'aria-roles',
          'aria-toggle-field-name',
          'aria-tooltip-name',
          'aria-treeitem-name',
          'aria-valid-attr-value',
          'aria-valid-attr',
          'button-name',
          'bypass',
          'color-contrast',
          'definition-list',
          'dlitem',
          'document-title',
          'duplicate-id-active',
          'duplicate-id-aria',
          'form-field-multiple-labels',
          'frame-title',
          'heading-order',
          'html-has-lang',
          'html-lang-valid',
          'image-alt',
          'input-image-alt',
          'label',
          'landmark-one-main',
          'link-name',
          'list',
          'listitem',
          'meta-refresh',
          'meta-viewport',
          'object-alt',
          'tabindex',
          'td-headers-attr',
          'th-has-data-cells',
          'valid-lang',
          'video-caption',
        ],
      },
    },
    // No thresholds here - we handle assertions in individual tests
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
