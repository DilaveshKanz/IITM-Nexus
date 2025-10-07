"use client"

import { motion } from "framer-motion"

export function StudyGuidesIllustration() {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        {/* Open book */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Left page */}
          <path d="M30 40 L30 80 L60 70 L60 30 Z" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          {/* Right page */}
          <path d="M60 30 L60 70 L90 80 L90 40 Z" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          {/* Book spine */}
          <path d="M60 30 L60 70" stroke="#22c55e" strokeWidth="2" />
        </motion.g>

        {/* Text lines on left page */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <line x1="35" y1="45" x2="55" y2="43" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="50" x2="55" y2="48" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="55" x2="55" y2="53" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="60" x2="55" y2="58" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="65" x2="55" y2="63" stroke="#e5e7eb" strokeWidth="1" />
        </motion.g>

        {/* Text lines on right page */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <line x1="65" y1="43" x2="85" y2="45" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="65" y1="48" x2="85" y2="50" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="65" y1="53" x2="85" y2="55" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="65" y1="58" x2="85" y2="60" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="65" y1="63" x2="85" y2="65" stroke="#e5e7eb" strokeWidth="1" />
        </motion.g>

        {/* Bookmark */}
        <motion.path
          d="M70 25 L70 45 L75 40 L80 45 L80 25 Z"
          fill="#facc15"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />

        {/* Floating pencil */}
        <motion.g
          initial={{ rotate: -30, x: 0, y: 0 }}
          animate={{ rotate: [-30, -25, -30], x: [0, 2, 0], y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        >
          <rect x="40" y="25" width="4" height="20" fill="#facc15" />
          <polygon points="40,25 44,25 42,20" fill="#374151" />
          <rect x="40" y="45" width="4" height="2" fill="#f59e0b" />
        </motion.g>

        {/* Magnifying glass */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <circle cx="90" cy="30" r="8" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <line x1="85" y1="35" x2="80" y2="40" stroke="#22c55e" strokeWidth="2" />
        </motion.g>

        {/* Lightbulb - idea */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 }}>
          <circle cx="30" cy="30" r="8" fill="#facc15" />
          <path d="M30 25 L30 30 M27 33 L33 33" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Glowing effect for lightbulb */}
        <motion.circle
          cx="30"
          cy="30"
          r="12"
          fill="#facc15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />

        {/* Sparkles */}
        <motion.circle
          cx="20"
          cy="50"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />
        <motion.circle
          cx="100"
          cy="50"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2.5 }}
        />
      </motion.svg>
    </div>
  )
}
