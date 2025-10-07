"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      setHasError(true)
      setError(error.error)
      // Prevent the default error handling
      error.preventDefault()
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <GlassmorphismCard className="max-w-md text-center p-8">
          <h2 className="text-2xl font-heading mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error?.message || "An unexpected error occurred"}</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </GlassmorphismCard>
      </div>
    )
  }

  return <>{children}</>
}
