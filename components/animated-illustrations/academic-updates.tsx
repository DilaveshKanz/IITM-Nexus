"use client"

import { motion } from "framer-motion"

export function AcademicUpdatesIllustration() {
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
        {/* Notification bell */}
        <motion.path
          d="M60 25 C60 25 50 25 50 35 L50 65 L40 75 L80 75 L70 65 L70 35 C70 25 60 25 60 25 Z"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Bell clapper */}
        <motion.circle
          cx="60"
          cy="65"
          r="3"
          fill="#22c55e"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* Bell handle */}
        <motion.path
          d="M55 25 Q60 20 65 25"
          stroke="#22c55e"
          strokeWidth="2"
          fill="transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Notification waves */}
        <motion.path
          d="M40 55 Q30 55 30 45"
          stroke="#facc15"
          strokeWidth="2"
          strokeLinecap="round"
          fill="transparent"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />

        <motion.path
          d="M80 55 Q90 55 90 45"
          stroke="#facc15"
          strokeWidth="2"
          strokeLinecap="round"
          fill="transparent"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />

        {/* Notification badges */}
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 1.1 }}>
          <circle cx="75" cy="35" r="8" fill="#facc15" />
          <text x="75" y="38" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
            3
          </text>
        </motion.g>

        {/* Notification cards */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <rect x="35" y="85" width="50" height="10" rx="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <rect x="40" y="87" width="20" height="6" rx="1" fill="#f0fdf4" />
          <rect x="65" y="87" width="15" height="6" rx="1" fill="#f0fdf4" />
        </motion.g>

        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <rect x="35" y="100" width="50" height="10" rx="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <rect x="40" y="102" width="20" height="6" rx="1" fill="#f0fdf4" />
          <rect x="65" y="102" width="15" height="6" rx="1" fill="#f0fdf4" />
        </motion.g>

        {/* Bell ringing animation */}
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 0.5, repeat: 3, repeatType: "loop", delay: 2 }}
          style={{ originX: "60px", originY: "25px" }}
        >
          <path
            d="M60 25 C60 25 50 25 50 35 L50 65 L40 75 L80 75 L70 65 L70 35 C70 25 60 25 60 25 Z"
            fill="transparent"
            stroke="transparent"
          />
          <circle cx="60" cy="65" r="3" fill="transparent" />
        </motion.g>

        {/* Sparkles */}
        <motion.circle
          cx="30"
          cy="40"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        />
        <motion.circle
          cx="90"
          cy="40"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
      </motion.svg>
    </div>
  )
}
