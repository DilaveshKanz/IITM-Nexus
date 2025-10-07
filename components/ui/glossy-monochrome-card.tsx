import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface GlossyMonochromeCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "light" | "dark"
  intensity?: "low" | "medium" | "high"
  interactive?: boolean
}

const GlossyMonochromeCard = forwardRef<HTMLDivElement, GlossyMonochromeCardProps>(
  ({ className, variant = "default", intensity = "medium", interactive = true, ...props }, ref) => {
    // Shadow intensity variations
    const shadowIntensity = {
      low: {
        default: "shadow-md",
        glass: "shadow-md",
        light: "shadow-md",
        dark: "shadow-md",
      },
      medium: {
        default: "shadow-lg",
        glass: "shadow-lg",
        light: "shadow-lg",
        dark: "shadow-lg",
      },
      high: {
        default: "shadow-xl",
        glass: "shadow-xl",
        light: "shadow-xl",
        dark: "shadow-xl",
      },
    }

    // Background variations
    const bgVariants = {
      default: "bg-card/80",
      glass: "bg-card/30 backdrop-blur-md",
      light: "bg-card/50",
      dark: "bg-card",
    }

    // Border variations
    const borderVariants = {
      default: "border border-border/30",
      glass: "border border-border/20",
      light: "border border-border/10",
      dark: "border border-border/40",
    }

    // Interactive hover effects
    const interactiveStyles = interactive
      ? variant === "glass"
        ? "hover:bg-card/40 hover:border-border/30"
        : variant === "light"
          ? "hover:bg-card/60 hover:border-border/20"
          : variant === "dark"
            ? "hover:bg-card/90 hover:border-border/50"
            : "hover:bg-card/90 hover:border-border/40"
      : ""

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          bgVariants[variant],
          borderVariants[variant],
          shadowIntensity[intensity][variant],
          interactiveStyles,
          className,
        )}
        {...props}
      />
    )
  },
)
GlossyMonochromeCard.displayName = "GlossyMonochromeCard"

export { GlossyMonochromeCard }
