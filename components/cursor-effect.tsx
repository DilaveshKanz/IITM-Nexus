"use client"
import dynamic from "next/dynamic"

// Dynamically import the Ribbons component to avoid SSR issues with OGL
const Ribbons = dynamic(() => import("@/components/ribbons"), { ssr: false })

interface CursorEffectProps {
  colors?: string[]
  baseThickness?: number
  speedMultiplier?: number
  maxAge?: number
  enableFade?: boolean
  enableShaderEffect?: boolean
  height?: string
}

export function CursorEffect({
  colors = ["#ffffff"],
  baseThickness = 30,
  speedMultiplier = 0.5,
  maxAge = 500,
  enableFade = false,
  enableShaderEffect = true,
  height = "500px",
}: CursorEffectProps) {
  return (
    <div style={{ height, position: "relative", overflow: "hidden" }}>
      <Ribbons
        colors={colors}
        baseThickness={baseThickness}
        speedMultiplier={speedMultiplier}
        maxAge={maxAge}
        enableFade={enableFade}
        enableShaderEffect={enableShaderEffect}
      />
    </div>
  )
}
