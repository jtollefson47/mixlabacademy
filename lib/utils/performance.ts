// Performance utilities for optimizing the audio learning platform
import { useCallback, useMemo, useRef } from 'react'

// Debounce hook for performance optimization
export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      func(...args)
    }, delay)
  }, [func, delay]) as T
}

// Throttle hook for limiting function calls
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  const inThrottle = useRef(false)
  
  return useCallback((...args: Parameters<T>) => {
    if (!inThrottle.current) {
      func(...args)
      inThrottle.current = true
      setTimeout(() => {
        inThrottle.current = false
      }, limit)
    }
  }, [func, limit]) as T
}

// Memoized canvas context getter
export function useCanvasContext(canvasRef: React.RefObject<HTMLCanvasElement>) {
  return useMemo(() => {
    if (!canvasRef.current) return null
    return canvasRef.current.getContext('2d', { 
      alpha: false, // Better performance for opaque canvas
      desynchronized: true // Allow GPU acceleration
    })
  }, [canvasRef.current])
}

// Optimized animation frame hook
export function useAnimationFrame(callback: () => void, isRunning: boolean) {
  const frameRef = useRef<number>()
  const callbackRef = useRef(callback)
  
  callbackRef.current = callback
  
  const animate = useCallback(() => {
    callbackRef.current()
    if (isRunning) {
      frameRef.current = requestAnimationFrame(animate)
    }
  }, [isRunning])
  
  return {
    start: useCallback(() => {
      if (!frameRef.current && isRunning) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }, [animate, isRunning]),
    
    stop: useCallback(() => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = undefined
      }
    }, [])
  }
}

// Local storage with error handling and performance optimization
export const optimizedStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error)
      return defaultValue
    }
  },
  
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to set ${key} in localStorage:`, error)
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error)
    }
  }
}

// Preload images for better performance
export function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(url => 
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
      })
    )
  )
}

// Memory-efficient array generation
export function generateSignalData(length: number, generator: (index: number) => number): Float32Array {
  const data = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    data[i] = generator(i)
  }
  return data
}

// Optimized event handler creator
export function createOptimizedHandler<T>(handler: (value: T) => void, delay: number = 16) {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      handler(value)
      timeoutId = null
    }, delay)
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private marks: Map<string, number> = new Map()
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  mark(name: string): void {
    this.marks.set(name, performance.now())
  }
  
  measure(name: string, startMark: string): number {
    const start = this.marks.get(startMark)
    if (!start) {
      console.warn(`Start mark "${startMark}" not found`)
      return 0
    }
    
    const duration = performance.now() - start
    console.log(`${name}: ${duration.toFixed(2)}ms`)
    return duration
  }
  
  clear(name?: string): void {
    if (name) {
      this.marks.delete(name)
    } else {
      this.marks.clear()
    }
  }
}
