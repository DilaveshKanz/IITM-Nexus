"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Navigation items for main pages
const navItems = [
  { name: "Home", href: "/" },
  { name: "Updates", href: "/updates" },
  { name: "Resources", href: "/resources" },
  { name: "Quiz Prep", href: "/quiz-prep" },
  { name: "Tools", href: "/tools" },
  { name: "Essential Links", href: "/essential-links" },
  { name: "About Us", href: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY

    // Set navbar visible if scrolling up or at the top
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

    // Add background effect when scrolled
    setScrolled(currentScrollPos > 20)

    setPrevScrollPos(currentScrollPos)
  }, [prevScrollPos])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#mobile-menu") && !target.closest('button[aria-controls="mobile-menu"]')) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}
    >
      <div
        className={`max-w-5xl w-full mt-4 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-background/60 shadow-lg border border-white/20 shadow-black/5"
            : "bg-background/40 border border-white/10 shadow-sm"
        }`}
        style={{
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, rgba(var(--primary), 0.2) 0%, rgba(var(--primary), 0.1) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="relative text-primary font-bold text-sm">IN</span>
            </motion.div>
            <motion.span
              className="text-xl font-medium tracking-tight text-foreground"
              whileHover={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IITM Nexus
            </motion.span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex space-x-1 relative">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`relative px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 -z-10 bg-foreground/10 backdrop-blur-sm rounded-lg border border-white/20"
                          layoutId="navbar-active"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          style={{
                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="glass"
            size="icon"
            className="md:hidden w-10 h-10 p-0 flex items-center justify-center border border-white/10"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <span className="sr-only">Toggle menu</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            aria-hidden={!isOpen}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 md:hidden bg-background/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg z-40 overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="py-4 px-4">
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`block py-3 px-4 text-sm rounded-lg ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        } transition-all duration-200 hover:translate-x-1`}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 -z-10 bg-foreground/8 backdrop-blur-sm rounded-lg border border-white/10"
                            layoutId="mobile-nav-active"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        )}
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
