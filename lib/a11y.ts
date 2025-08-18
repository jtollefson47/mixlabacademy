export const visuallyHidden = 'visually-hidden'

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

// Memoized media query for better performance
let reducedMotionQuery: MediaQueryList | null = null

export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false
  
  // Cache the media query for performance
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  }
  
  return reducedMotionQuery.matches
}

export function applyReducedMotion(element: HTMLElement, className: string): void {
  if (getReducedMotionPreference()) {
    element.classList.add('motion-reduce')
  } else {
    element.classList.add(className)
  }
}

// Enhanced accessibility utilities
export function announceToScreenReader(message: string): void {
  if (typeof window === 'undefined') return
  
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}
