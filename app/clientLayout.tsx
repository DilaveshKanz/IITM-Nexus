"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/components/ui/animation-provider"
import Navbar from "@/components/navbar"
import "@/app/globals.css"
import "@/app/ribbons.css"
import { Suspense, useEffect } from "react"
import { handleResizeObserverError } from "@/lib/resize-observer-error-handler"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

function ErrorHandler() {
  useEffect(() => {
    handleResizeObserverError()
  }, [])

  return null
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn("min-h-screen font-sans antialiased overflow-x-hidden", inter.variable)}>
        <ErrorHandler />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AnimationProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Navbar />
              <Suspense>
                <main className="relative flex-1 pt-28">{children}</main>
              </Suspense>
              <footer className="border-t border-border/30 bg-background/60 backdrop-blur-md">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-90"></div>
                        <span className="relative flex items-center justify-center h-full text-primary-foreground font-bold text-xs">
                          IN
                        </span>
                      </div>
                      <span className="text-base font-medium tracking-tight text-foreground">IITM Nexus</span>
                    </div>

                    <p className="text-center text-xs text-muted-foreground my-1 sm:my-0">
                      &copy; {new Date().getFullYear()} IITM Nexus. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        href="/about"
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                      >
                        About
                      </Link>
                      <Link
                        href="/resources"
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                      >
                        Resources
                      </Link>
                      <Link
                        href="/contact"
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </AnimationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
