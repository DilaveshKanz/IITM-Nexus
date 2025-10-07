import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

interface GlassmorphismCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  glowing?: boolean
}

export const GlassmorphismCard = forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ className, hoverable = false, glowing = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-card/70 backdrop-blur-md border border-border/50 rounded-lg shadow-sm overflow-hidden",
          hoverable && "transition-all duration-300 hover:shadow-md hover:bg-card/80",
          glowing &&
            "after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_10px_rgba(255,255,255,0.05)] after:opacity-0 after:transition-opacity hover:after:opacity-100",
          className,
        )}
        {...props}
      />
    )
  },
)

GlassmorphismCard.displayName = "GlassmorphismCard"
