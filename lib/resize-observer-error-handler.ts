// Handle ResizeObserver errors that don't affect functionality
export const handleResizeObserverError = () => {
  // Suppress ResizeObserver loop completed with undelivered notifications error
  const resizeObserverErrorHandler = (e: ErrorEvent) => {
    if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
      e.stopImmediatePropagation()
      return false
    }
    return true
  }

  if (typeof window !== "undefined") {
    window.addEventListener("error", resizeObserverErrorHandler)

    // Also handle unhandled promise rejections related to ResizeObserver
    window.addEventListener("unhandledrejection", (e) => {
      if (e.reason?.message?.includes("ResizeObserver")) {
        e.preventDefault()
      }
    })
  }
}

// Debounced ResizeObserver wrapper
export class DebouncedResizeObserver {
  private observer: ResizeObserver
  private timeout: NodeJS.Timeout | null = null
  private delay: number

  constructor(callback: ResizeObserverCallback, delay = 16) {
    this.delay = delay
    this.observer = new ResizeObserver((entries, observer) => {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        try {
          callback(entries, observer)
        } catch (error) {
          // Silently handle ResizeObserver errors
          if (!(error instanceof Error) || !error.message.includes("ResizeObserver")) {
            console.error("ResizeObserver error:", error)
          }
        }
      }, this.delay)
    })
  }

  observe(target: Element, options?: ResizeObserverOptions) {
    this.observer.observe(target, options)
  }

  unobserve(target: Element) {
    this.observer.unobserve(target)
  }

  disconnect() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.observer.disconnect()
  }
}
