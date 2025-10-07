"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(true)
    // Scroll to top on page change - using smooth scroll for better UX
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`w-full ${isActive ? "fade-in" : ""}`}
    >
      {children}
    </motion.div>
  )
}
