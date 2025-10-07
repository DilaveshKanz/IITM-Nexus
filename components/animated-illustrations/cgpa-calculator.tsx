"use client"

import { motion } from "framer-motion"

export function CGPACalculatorIllustration() {
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
        {/* Calculator body */}
        <motion.rect
          x="25"
          y="20"
          width="70"
          height="80"
          rx="4"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Calculator screen */}
        <motion.rect
          x="30"
          y="25"
          width="60"
          height="20"
          rx="2"
          fill="#ffffff"
          stroke="#22c55e"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* CGPA text */}
        <motion.text
          x="60"
          y="40"
          fontFamily="Arial"
          fontSize="12"
          fill="#22c55e"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          9.5
        </motion.text>

        {/* Calculator buttons */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          {/* Row 1 */}
          <rect x="35" y="50" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="54" y="50" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="73" y="50" width="12" height="12" rx="2" fill="#22c55e" />

          {/* Row 2 */}
          <rect x="35" y="67" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="54" y="67" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="73" y="67" width="12" height="12" rx="2" fill="#22c55e" />

          {/* Row 3 */}
          <rect x="35" y="84" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="54" y="84" width="12" height="12" rx="2" fill="#facc15" />
          <rect x="73" y="84" width="12" height="12" rx="2" fill="#22c55e" />
        </motion.g>

        {/* Animated calculation symbols */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
        >
          <circle cx="90" cy="30" r="5" fill="#facc15" fillOpacity="0.7" />
          <text x="90" y="33" fontFamily="Arial" fontSize="8" fill="#000" textAnchor="middle">
            +
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
        >
          <circle cx="20" cy="50" r="5" fill="#22c55e" fillOpacity="0.7" />
          <text x="20" y="53" fontFamily="Arial" fontSize="8" fill="#000" textAnchor="middle">
            ×
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 3 }}
        >
          <circle cx="100" cy="70" r="5" fill="#facc15" fillOpacity="0.7" />
          <text x="100" y="73" fontFamily="Arial" fontSize="8" fill="#000" textAnchor="middle">
            ÷
          </text>
        </motion.g>
      </motion.svg>
    </div>
  )
}
