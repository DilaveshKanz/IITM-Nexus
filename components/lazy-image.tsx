"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function LazyImage({ src, alt, width, height, className, priority = false }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(
    priority
      ? src
      : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiLz48L3N2Zz4=",
  )

  useEffect(() => {
    if (!priority) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
      }
    } else {
      setIsLoaded(true)
    }
  }, [src, priority])

  return (
    <img
      src={currentSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
    />
  )
}
