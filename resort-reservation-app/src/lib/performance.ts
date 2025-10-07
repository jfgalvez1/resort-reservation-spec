// Performance utilities for the resort reservation app

/**
 * Debounced function that delays execution until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttled function that limits the rate at which a function can fire.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Memoization function that caches the result of a function call
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  func: T
): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy loading utility for components
 */
export function lazyLoad<T>(
  importFunc: () => Promise<{ default: T }>
) {
  // This would be used with React.lazy in actual components
  return importFunc;
}

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();
  
  static mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      this.marks.set(name, performance.now());
    }
  }
  
  static measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = this.marks.get(startMark);
      const endTime = endMark ? this.marks.get(endMark) : performance.now();
      
      if (startTime !== undefined && endTime !== undefined) {
        const duration = endTime - startTime;
        console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
        return duration;
      }
    }
    return null;
  }
}

/**
 * Bundle size optimization utilities
 */
export const bundleOptimizations = {
  // Tree shaking helpers
  importOnly: <T extends Record<string, unknown>>(module: T, keys: (keyof T)[]): Partial<T> => {
    const result: Partial<T> = {};
    keys.forEach(key => {
      if (key in module) {
        result[key] = module[key];
      }
    });
    return result;
  },
  
  // Dynamic import with error handling
  safeImport: async <T>(importFunc: () => Promise<T>): Promise<T | null> => {
    try {
      return await importFunc();
    } catch (error) {
      console.warn('Failed to import module:', error);
      return null;
    }
  }
};

/**
 * Memory management utilities
 */
export const memoryManagement = {
  // Clean up event listeners
  cleanup: (listeners: Array<() => void>): void => {
    listeners.forEach(cleanup => cleanup());
  },
  
  // Weak reference cache
  createWeakCache: <K extends object, V>() => {
    return new WeakMap<K, V>();
  }
};
