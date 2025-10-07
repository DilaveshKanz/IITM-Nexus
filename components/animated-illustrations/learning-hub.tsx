"use client"

import { motion } from "framer-motion"

export function LearningHubIllustration() {
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
        {/* Bookshelf */}
        <motion.rect
          x="20"
          y="30"
          width="80"
          height="60"
          rx="2"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Books */}
        <motion.rect
          x="25"
          y="40"
          width="15"
          height="45"
          rx="1"
          fill="#22c55e"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.rect
          x="45"
          y="40"
          width="15"
          height="45"
          rx="1"
          fill="#facc15"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.rect
          x="65"
          y="40"
          width="15"
          height="45"
          rx="1"
          fill="#22c55e"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.rect
          x="85"
          y="40"
          width="10"
          height="45"
          rx="1"
          fill="#facc15"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* Floating book */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [-5, 0, -5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        >
          <rect x="35" y="15" width="20" height="15" rx="1" fill="#22c55e" />
          <rect x="35" y="15" width="20" height="15" rx="1" stroke="#ffffff" strokeWidth="1" />
          <line x1="45" y1="15" x2="45" y2="30" stroke="#ffffff" strokeWidth="1" />
        </motion.g>

        {/* Sparkles */}
        <motion.circle
          cx="30"
          cy="20"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        />
        <motion.circle
          cx="60"
          cy="25"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
        <motion.circle
          cx="80"
          cy="15"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />
      </motion.svg>
    </div>
  )
}
