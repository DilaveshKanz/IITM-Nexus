"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SleekCard } from "@/components/ui/sleek-card"
import Link from "next/link"

// Sample news data (in a real app, this would come from an API)
const newsItems = [
  {
    id: 1,
    title: "IITM BS Program Recognized Internationally",
    date: "2023-12-18",
    image: "/placeholder.svg?height=400&width=600",
    summary:
      "The IITM BS program has received international recognition for its innovative approach to online education.",
    variant: "default",
  },
  {
    id: 2,
    title: "New Partnership with Industry Leaders",
    date: "2024-01-08",
    image: "/placeholder.svg?height=400&width=600",
    summary: "IITM has formed new partnerships with leading tech companies to enhance job placement opportunities.",
    variant: "accent",
  },
  {
    id: 3,
    title: "Student Achievement Spotlight",
    date: "2024-01-12",
    image: "/placeholder.svg?height=400&width=600",
    summary: "IITM BS students win the national hackathon with their innovative solution for sustainable development.",
    variant: "dark",
  },
  {
    id: 4,
    title: "New Elective Courses Announced",
    date: "2024-01-15",
    image: "/placeholder.svg?height=400&width=600",
    summary: "Exciting new elective courses will be available in the upcoming term. Registration opens next week.",
    variant: "default",
  },
]

export function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const visibleItems = 3

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - visibleItems ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - visibleItems : prevIndex - 1))
  }

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const visibleNews = newsItems.slice(currentIndex, currentIndex + visibleItems)

  // If we don't have enough items at the end, wrap around to the beginning
  if (visibleNews.length < visibleItems) {
    visibleNews.push(...newsItems.slice(0, visibleItems - visibleNews.length))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-md h-10 w-10 border-primary/20 text-primary hover:text-white hover:border-primary/40 hover:bg-primary/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-md h-10 w-10 border-primary/20 text-primary hover:text-white hover:border-primary/40 hover:bg-primary/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleNews.map((item, index) => (
              <Link href="/updates" key={item.id}>
                <SleekCard
                  className="h-full overflow-hidden shimmer"
                  variant={item.variant as "default" | "accent" | "dark"}
                >
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  </div>
                  <h3 className="text-lg font-medium line-clamp-2">{item.title}</h3>
                  <time className="text-sm text-gray-400 block mt-2">{item.date}</time>
                  <p className="mt-3 text-gray-400 line-clamp-3">{item.summary}</p>
                </SleekCard>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6">
        {newsItems.slice(0, newsItems.length - visibleItems + 1).map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full mx-1 transition-colors ${
              idx === currentIndex ? "bg-primary" : "bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
          />
        ))}
      </div>
    </div>
  )
}
