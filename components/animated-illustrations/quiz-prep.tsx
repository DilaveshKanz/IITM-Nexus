"use client"

import { motion } from "framer-motion"

export function QuizPrepIllustration() {
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
        {/* Paper background */}
        <motion.rect
          x="25"
          y="20"
          width="70"
          height="80"
          rx="2"
          fill="#ffffff"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Paper lines */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <line x1="35" y1="35" x2="85" y2="35" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="45" x2="85" y2="45" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="55" x2="85" y2="55" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="65" x2="85" y2="65" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="75" x2="85" y2="75" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="85" x2="85" y2="85" stroke="#e5e7eb" strokeWidth="1" />
        </motion.g>

        {/* Quiz title */}
        <motion.text
          x="60"
          y="30"
          fontFamily="Arial"
          fontSize="8"
          fill="#22c55e"
          textAnchor="middle"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          QUIZ PAPER
        </motion.text>

        {/* Question 1 */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
          <text x="35" y="42" fontFamily="Arial" fontSize="6" fill="#374151">
            1. What is the capital of France?
          </text>
        </motion.g>

        {/* Multiple choice options */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }}>
          <circle cx="40" cy="50" r="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <text x="45" y="52" fontFamily="Arial" fontSize="5" fill="#374151">
            London
          </text>

          <circle cx="40" cy="58" r="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <text x="45" y="60" fontFamily="Arial" fontSize="5" fill="#374151">
            Paris
          </text>

          <circle cx="40" cy="66" r="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <text x="45" y="68" fontFamily="Arial" fontSize="5" fill="#374151">
            Berlin
          </text>

          <circle cx="40" cy="74" r="2" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <text x="45" y="76" fontFamily="Arial" fontSize="5" fill="#374151">
            Madrid
          </text>
        </motion.g>

        {/* Checkmark animation */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <circle cx="40" cy="58" r="4" fill="#22c55e" />
          <path d="M37 58 L39 60 L43 56" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Floating pencil */}
        <motion.g
          initial={{ rotate: -30, x: -10, y: -10 }}
          animate={{ rotate: [-30, -25, -30], x: [-10, -8, -10], y: [-10, -12, -10] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        >
          <rect x="75" y="30" width="4" height="20" fill="#facc15" />
          <polygon points="75,30 79,30 77,25" fill="#374151" />
          <rect x="75" y="50" width="4" height="2" fill="#f59e0b" />
        </motion.g>

        {/* Sparkles */}
        <motion.circle
          cx="90"
          cy="40"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        />
        <motion.circle
          cx="85"
          cy="60"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
        <motion.circle
          cx="90"
          cy="80"
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
