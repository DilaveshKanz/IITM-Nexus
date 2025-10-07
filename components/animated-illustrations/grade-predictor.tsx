"use client"

import { motion } from "framer-motion"

export function GradePredictorIllustration() {
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
        {/* Graph background */}
        <motion.rect
          x="20"
          y="20"
          width="80"
          height="80"
          rx="4"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Graph axes */}
        <motion.line
          x1="30"
          y1="90"
          x2="90"
          y2="90"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line
          x1="30"
          y1="30"
          x2="30"
          y2="90"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Graph points */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 }}>
          <circle cx="40" cy="70" r="3" fill="#facc15" />
          <circle cx="50" cy="65" r="3" fill="#facc15" />
          <circle cx="60" cy="55" r="3" fill="#facc15" />
          <circle cx="70" cy="45" r="3" fill="#facc15" />
          <circle cx="80" cy="35" r="3" fill="#facc15" />
        </motion.g>

        {/* Trend line */}
        <motion.path
          d="M40 70 L50 65 L60 55 L70 45 L80 35"
          stroke="#facc15"
          strokeWidth="2"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Prediction line (dashed extension) */}
        <motion.path
          d="M80 35 L90 25"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        />

        {/* Prediction point */}
        <motion.circle
          cx="90"
          cy="25"
          r="4"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 3 }}
        />

        {/* Grade label */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          <rect x="85" y="15" width="15" height="15" rx="2" fill="#ffffff" stroke="#22c55e" />
          <text x="92.5" y="26" fontFamily="Arial" fontSize="10" fill="#22c55e" textAnchor="middle">
            A
          </text>
        </motion.g>

        {/* Floating sparkles */}
        <motion.circle
          cx="40"
          cy="30"
          r="2"
          fill="#facc15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        />
        <motion.circle
          cx="60"
          cy="20"
          r="2"
          fill="#facc15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
        <motion.circle
          cx="80"
          cy="15"
          r="2"
          fill="#facc15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />
      </motion.svg>
    </div>
  )
}
