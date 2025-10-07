"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { useAnimation } from "@/components/ui/animation-provider"

interface FeatureCardProps {
  title: string
  description: string
  illustration: ReactNode
  link: string
  index?: number
}

export function FeatureCard({ title, description, illustration, link, index = 0 }: FeatureCardProps) {
  const { animationPreference } = useAnimation()

  // Adjust animation based on user preference
  const animationProps =
    animationPreference === "reduced"
      ? {
          initial: {},
          animate: {},
          whileHover: {},
          whileTap: {},
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: index * 0.1 },
          whileHover: { y: -5 },
          whileTap: { y: 0, scale: 0.98 },
        }

  return (
    <motion.div {...animationProps} className="h-full">
      <Link href={link} className="block h-full">
        <GlassmorphismCard className="h-full p-6 flex flex-col group" hoverable={true} glowing={true}>
          <div className="mb-4 h-32 flex items-center justify-center">{illustration}</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm flex-grow">{description}</p>
          <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            <span>Explore</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </GlassmorphismCard>
      </Link>
    </motion.div>
  )
}
