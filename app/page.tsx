"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CursorEffect } from "@/components/cursor-effect"
import { ExamTimer } from "@/components/exam-timer"

// Update the feature icons with a more modern, consistent style
// Replace the features array with this updated version
const features = [
  {
    id: 1,
    title: "Learning Hub",
    description: "Access study materials and notes",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 0 0 1 0-5H20" />
        <circle cx="10" cy="8" r="2" />
        <path d="M20 8v1" />
        <path d="M20 12v1" />
        <path d="M20 16v1" />
      </svg>
    ),
    link: "/resources",
    color: "from-primary/20 to-primary/10",
  },
  {
    id: 2,
    title: "CGPA Calculator",
    description: "Calculate your current or projected CGPA",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <path d="M9 9h6" />
        <path d="M9 12h6" />
        <path d="M9 15h6" />
      </svg>
    ),
    link: "/tools",
    color: "from-primary/30 to-primary/20",
  },
  {
    id: 3,
    title: "Quiz Prep",
    description: "Practice with previous years' questions",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    link: "/quiz-prep",
    color: "from-primary/20 to-primary/10",
  },
  {
    id: 4,
    title: "Event Tracker",
    description: "Stay updated with important dates",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M18 14l3 3-3 3" />
      </svg>
    ),
    link: "/updates",
    color: "from-primary/30 to-primary/20",
  },
  {
    id: 5,
    title: "Academic Updates",
    description: "Get the latest announcements and news",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <circle cx="18" cy="4" r="3" />
      </svg>
    ),
    link: "/updates",
    color: "from-primary/20 to-primary/10",
  },
  {
    id: 6,
    title: "Essential Links",
    description: "Quick access to important resources",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    link: "/essential-links",
    color: "from-primary/30 to-primary/20",
  },
  {
    id: 7,
    title: "Study Guides",
    description: "Guides for complex course materials",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    link: "/resources",
    color: "from-primary/20 to-primary/10",
  },
  {
    id: 8,
    title: "Study Tips",
    description: "Strategies to maximize learning",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
    link: "/resources",
    color: "from-primary/30 to-primary/20",
  },
]

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const isMobile = useMediaQuery("(max-width: 639px)")
  const [mounted, setMounted] = useState(false)

  // Handle initial mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine grid columns based on screen size
  const getGridCols = () => {
    if (!mounted) return "grid-cols-2"
    if (isDesktop) return "grid-cols-4"
    if (isTablet) return "grid-cols-3"
    return "grid-cols-2"
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Mobile Quick Actions - Only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-border">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Section - Welcome */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-2/5 py-6 sm:py-8 lg:py-12 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 z-0"></div>

          {/* Add the cursor effect */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <CursorEffect
              colors={["#ffffff"]}
              baseThickness={30}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade={false}
              enableShaderEffect={true}
              height="100%"
            />
          </div>

          {/* Decorative elements - Responsive sizing */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 opacity-20 blur-3xl"></div>

          <div className="relative z-20 p-4 sm:p-6 lg:p-8 text-center lg:text-left w-full max-w-md mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
                Welcome to <span className="gradient-text">IITM Nexus</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0">
                Your comprehensive platform for IITM BS Degree resources, designed to enhance your academic journey.
              </p>

              <ExamTimer />
            </motion.div>
          </div>
        </motion.section>

        {/* Right Section - Features */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-3/5 bg-card p-4 sm:p-6 lg:p-8 flex-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium mb-0.5 sm:mb-1">Features</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Explore tools and resources for IITM students
                </p>
              </div>

              {/* Desktop search - Only visible on larger screens */}
              <div className="hidden md:block">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm glass-button">
                  <Search className="mr-2 h-3.5 w-3.5" />
                  Search Resources
                </Button>
              </div>
            </div>

            <div className={`grid ${getGridCols()} gap-2 sm:gap-3 md:gap-4`}>
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
                    <GlassmorphismCard
                      className="h-full p-2.5 sm:p-3 flex flex-col group"
                      hoverable={true}
                      glowing={hoveredFeature === feature.id}
                    >
                      <div className="mb-1.5 sm:mb-2 flex items-center">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} mr-2`}
                        >
                          <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="text-xs text-muted-foreground flex-grow line-clamp-2">{feature.description}</p>

                      <div className="mt-1.5 sm:mt-2 flex items-center text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                        <span>Explore</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </GlassmorphismCard>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
