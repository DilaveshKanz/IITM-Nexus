import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "glossy-button glossy-button-dark after:absolute after:inset-0 after:bg-foreground after:opacity-0 hover:after:opacity-5 active:after:opacity-10 after:transition-opacity",
        secondary:
          "glossy-button glossy-button-light after:absolute after:inset-0 after:bg-foreground after:opacity-0 hover:after:opacity-5 active:after:opacity-10 after:transition-opacity",
        outline:
          "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground active:bg-accent/20 hover:border-foreground",
        glass: "glass-button hover:shadow-md active:shadow-sm active:translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-foreground underline-offset-4 hover:underline hover:text-foreground/80 active:text-foreground/60",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3 text-xs",
        lg: "h-11 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
