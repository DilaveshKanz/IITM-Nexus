"use client"

import { motion } from "framer-motion"

export function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center mt-12 cursor-pointer"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <span className="text-sm text-glossy-green mb-2">Scroll to explore</span>
      <motion.div
        className="w-8 h-14 rounded-full bg-glossy-black-light backdrop-blur-md border border-glossy-green/30 flex justify-center p-1 shadow-glossy-sm"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <motion.div
          className="w-1.5 h-3 bg-glossy-green rounded-full"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
