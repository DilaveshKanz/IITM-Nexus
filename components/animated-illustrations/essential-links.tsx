"use client"

import { motion } from "framer-motion"

export function EssentialLinksIllustration() {
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
        {/* Main link icon */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx="60" cy="60" r="25" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <path
            d="M50 60 C50 55 45 55 45 60 L45 70 C45 75 50 75 50 70"
            stroke="#22c55e"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
          <path
            d="M70 60 C70 55 75 55 75 60 L75 70 C75 75 70 75 70 70"
            stroke="#22c55e"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
          <line x1="52" y1="65" x2="68" y2="65" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Orbiting links */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        >
          {/* Link 1 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <circle cx="60" cy="25" r="8" fill="#facc15" />
            <text x="60" y="28" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
              1
            </text>
          </motion.g>

          {/* Link 2 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
            <circle cx="85" cy="50" r="8" fill="#22c55e" />
            <text x="85" y="53" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
              2
            </text>
          </motion.g>

          {/* Link 3 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
            <circle cx="75" cy="85" r="8" fill="#facc15" />
            <text x="75" y="88" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
              3
            </text>
          </motion.g>

          {/* Link 4 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }}>
            <circle cx="35" cy="75" r="8" fill="#22c55e" />
            <text x="35" y="78" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
              4
            </text>
          </motion.g>

          {/* Link 5 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 }}>
            <circle cx="30" cy="40" r="8" fill="#facc15" />
            <text x="30" y="43" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
              5
            </text>
          </motion.g>
        </motion.g>

        {/* Connection lines - pulsing */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        >
          <line x1="60" y1="35" x2="60" y2="55" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="70" y1="60" x2="80" y2="55" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="65" y1="70" x2="70" y2="80" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="50" y1="70" x2="40" y2="75" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="45" y1="55" x2="35" y2="45" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
        </motion.g>

        {/* Sparkles */}
        <motion.circle
          cx="20"
          cy="60"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />
        <motion.circle
          cx="100"
          cy="60"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2.5 }}
        />
        <motion.circle
          cx="60"
          cy="100"
          r="2"
          fill="#facc15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 3 }}
        />
      </motion.svg>
    </div>
  )
}
