"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container } from "@tsparticles/engine"

// Set the exam date (1 month from now)
const EXAM_DATE = new Date()
EXAM_DATE.setMonth(EXAM_DATE.getMonth() + 1)

export function ExamTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [init, setInit] = useState(false)

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Update timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +EXAM_DATE - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Calculate immediately and then every second
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const particlesLoaded = async (container?: Container) => {
    // Optional: You can access the particles container here if needed
  }

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-md border border-primary/20 shadow-lg p-4 sm:p-6">
        {/* Particles background */}
        {init && (
          <div className="absolute inset-0 -z-10">
            <Particles
              id="exam-timer-particles"
              className="absolute inset-0 w-full h-full"
              particlesLoaded={particlesLoaded}
              options={{
                fullScreen: { enable: false },
                background: {
                  color: {
                    value: "transparent",
                  },
                },
                fpsLimit: 60,
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  links: {
                    enable: false,
                  },
                  move: {
                    direction: "top",
                    enable: true,
                    outModes: {
                      default: "out",
                      top: "destroy",
                      bottom: "none",
                    },
                    random: false,
                    speed: 0.8,
                    straight: false,
                    path: {
                      enable: true,
                      delay: {
                        value: 0.1,
                      },
                      options: {
                        size: 5,
                        draw: false,
                        increment: 0.001,
                      },
                    },
                    trail: {
                      enable: true,
                      fillColor: "#000000",
                      length: 3,
                    },
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 600,
                    },
                    value: 30,
                    limit: 60,
                  },
                  opacity: {
                    value: {
                      min: 0.1,
                      max: 0.4,
                    },
                    animation: {
                      enable: true,
                      speed: 0.5,
                      minimumValue: 0.1,
                      sync: false,
                    },
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 3 },
                    animation: {
                      enable: true,
                      speed: 0.5,
                      minimumValue: 0.5,
                      sync: false,
                    },
                  },
                  life: {
                    duration: {
                      sync: false,
                      value: 6,
                    },
                    count: 1,
                  },
                  zIndex: {
                    value: -1,
                  },
                  emitters: {
                    direction: "top",
                    rate: {
                      delay: 0.1,
                      quantity: 2,
                    },
                    position: {
                      x: 50,
                      y: 100,
                    },
                    size: {
                      width: 100,
                      height: 0,
                    },
                  },
                  roll: {
                    darken: {
                      enable: false,
                      value: 0,
                    },
                    enable: false,
                    enlighten: {
                      enable: false,
                      value: 0,
                    },
                    mode: "vertical",
                    speed: 5,
                  },
                  wobble: {
                    distance: 5,
                    enable: true,
                    speed: {
                      angle: 2,
                      move: 1,
                    },
                  },
                },
                detectRetina: true,
              }}
            />
          </div>
        )}

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl blur-xl -z-20 animate-pulse-slow"></div>

        {/* Timer content */}
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-medium text-foreground mb-4">Exam Starts In</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-background/40 backdrop-blur-sm rounded-lg border border-primary/10 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <span className="text-xs sm:text-sm mt-1 text-muted-foreground">Days</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-background/40 backdrop-blur-sm rounded-lg border border-primary/10 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-xs sm:text-sm mt-1 text-muted-foreground">Hours</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-background/40 backdrop-blur-sm rounded-lg border border-primary/10 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-xs sm:text-sm mt-1 text-muted-foreground">Minutes</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-background/40 backdrop-blur-sm rounded-lg border border-primary/10 flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <span className="text-xs sm:text-sm mt-1 text-muted-foreground">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
