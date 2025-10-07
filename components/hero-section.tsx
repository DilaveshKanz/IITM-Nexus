"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GlossyMonochromeButton } from "@/components/ui/glossy-monochrome-button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">IITM Nexus</span>
            </h1>

            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto">
              Your comprehensive platform for IITM BS Degree resources, designed to enhance your academic journey with a
              sleek, modern interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlossyMonochromeButton variant="default" size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </GlossyMonochromeButton>

              <GlossyMonochromeButton variant="secondary" size="lg">
                Explore Resources
              </GlossyMonochromeButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
