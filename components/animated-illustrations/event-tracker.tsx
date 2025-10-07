"use client"

import { motion } from "framer-motion"

export function EventTrackerIllustration() {
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
        {/* Calendar background */}
        <motion.rect
          x="25"
          y="25"
          width="70"
          height="70"
          rx="4"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Calendar header */}
        <motion.rect
          x="25"
          y="25"
          width="70"
          height="15"
          rx="4"
          fill="#22c55e"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Month text */}
        <motion.text
          x="60"
          y="35"
          fontFamily="Arial"
          fontSize="8"
          fill="#ffffff"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          JANUARY 2024
        </motion.text>

        {/* Calendar grid */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          {/* Week days */}
          <text x="35" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            M
          </text>
          <text x="45" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            T
          </text>
          <text x="55" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            W
          </text>
          <text x="65" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            T
          </text>
          <text x="75" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            F
          </text>
          <text x="85" y="50" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            S
          </text>

          {/* Calendar dates - first row */}
          <text x="35" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            1
          </text>
          <text x="45" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            2
          </text>
          <text x="55" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            3
          </text>
          <text x="65" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            4
          </text>
          <text x="75" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            5
          </text>
          <text x="85" y="60" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            6
          </text>

          {/* Calendar dates - second row */}
          <text x="35" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            7
          </text>
          <text x="45" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            8
          </text>
          <text x="55" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            9
          </text>
          <text x="65" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            10
          </text>
          <text x="75" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            11
          </text>
          <text x="85" y="70" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            12
          </text>

          {/* Calendar dates - third row */}
          <text x="35" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            13
          </text>
          <text x="45" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            14
          </text>
          <text x="55" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            15
          </text>
          <text x="65" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            16
          </text>
          <text x="75" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            17
          </text>
          <text x="85" y="80" fontFamily="Arial" fontSize="6" fill="#374151" textAnchor="middle">
            18
          </text>
        </motion.g>

        {/* Event highlights */}
        <motion.circle
          cx="55"
          cy="70"
          r="5"
          fill="#facc15"
          fillOpacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />

        <motion.circle
          cx="75"
          cy="80"
          r="5"
          fill="#22c55e"
          fillOpacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        />

        {/* Animated notification */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <circle cx="85" cy="35" r="8" fill="#facc15" />
          <text x="85" y="38" fontFamily="Arial" fontSize="10" fill="#ffffff" textAnchor="middle">
            !
          </text>
        </motion.g>

        {/* Pulsing animation for event day */}
        <motion.circle
          cx="55"
          cy="70"
          r="5"
          stroke="#facc15"
          strokeWidth="1"
          fill="transparent"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        />

        {/* Floating clock */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [-3, 0, -3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
        >
          <circle cx="30" cy="20" r="8" fill="#ffffff" stroke="#22c55e" strokeWidth="1" />
          <line x1="30" y1="20" x2="30" y2="15" stroke="#22c55e" strokeWidth="1" />
          <line x1="30" y1="20" x2="33" y2="20" stroke="#22c55e" strokeWidth="1" />
        </motion.g>
      </motion.svg>
    </div>
  )
}
