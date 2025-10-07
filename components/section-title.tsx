import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionTitle({ title, subtitle, align = "center", className }: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className,
      )}
    >
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-3">{title}</h1>
      {subtitle && <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
