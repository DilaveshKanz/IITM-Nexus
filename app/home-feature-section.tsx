"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GlossyMonochromeCard } from "@/components/ui/glossy-monochrome-card"

// This component can be imported in the page.tsx file to replace the existing feature section
export function HomeFeatureSection({ features }) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {features.map((feature, index) => (
        <Link href={feature.link} key={feature.id} className="block h-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            whileHover={{
              y: -3,
              transition: { duration: 0.2 },
            }}
            whileTap={{ y: 0, scale: 0.98 }}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
            className="h-full"
          >
            <GlossyMonochromeCard
              variant="light"
              intensity={hoveredFeature === feature.id ? "high" : "medium"}
              className="h-full p-3 md:p-4 flex flex-col group"
            >
              <div className="mb-2 md:mb-3 flex items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} mr-3`}
                >
                  <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-1">
                  {feature.title}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-gray-600 flex-grow line-clamp-2">{feature.description}</p>

              <div className="mt-2 md:mt-3 flex items-center text-black text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                <span>Explore</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </GlossyMonochromeCard>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
