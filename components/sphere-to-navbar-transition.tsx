"use client"

import { useEffect } from "react"
import { motion, useAnimate } from "framer-motion"
import { useTheme } from "next-themes"

interface SphereToNavbarTransitionProps {
  onAnimationComplete: () => void
}

export function SphereToNavbarTransition({ onAnimationComplete }: SphereToNavbarTransitionProps) {
  const [scope, animate] = useAnimate()
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Appear and grow into a small sphere at the navbar's final position
      await animate(
        scope.current,
        {
          scale: [0, 1], // Scale from 0 to 1
          opacity: [0, 1], // Fade in
          borderRadius: "50%", // Ensure it's a circle
          width: "60px",
          height: "60px",
          top: "16px", // Matches navbar's top-4
          left: "50%",
          x: "-50%", // Center horizontally
          y: "0%", // No vertical translation relative to its top position
          background: isDarkMode
            ? "radial-gradient(circle at center, #00ff66, transparent 70%)"
            : "radial-gradient(circle at center, #00ccff, transparent 70%)",
        },
        { duration: 0.5, ease: "easeOut" },
      )

      // Phase 2: Jelly pulsation and subtle horizontal stretch
      await animate(
        scope.current,
        {
          scale: [1, 1.05, 0.95, 1], // Pulsate slightly
          scaleX: [1, 1.2, 0.9, 1.1], // Subtle horizontal stretch
          rotate: [0, 2, -2, 0], // Subtle rotation
        },
        { duration: 1.0, ease: "easeInOut", repeat: 0 },
      )

      // Phase 3: Rapid horizontal spread and fade out sphere
      await animate(
        scope.current,
        {
          scaleX: [1.1, 6], // Spread horizontally significantly
          scaleY: [1, 1.2], // Slightly flatten/expand vertically
          borderRadius: ["30px", "30px"], // Morph to oval shape
          opacity: [1, 0], // Fade out sphere
          width: ["auto", "calc(100% - 2rem)"], // Expand to full navbar width
          height: ["64px", "64px"], // Match new navbar height
        },
        { duration: 0.8, ease: "easeOut" },
      )

      // Final phase: Animation complete, signal parent to show navbar
      onAnimationComplete()
    }

    runAnimation()
  }, [animate, scope, onAnimationComplete, isDarkMode])

  return (
    <motion.div
      ref={scope}
      className="fixed z-50 flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 0, scale: 0, x: "-50%" }}
      style={{
        // Initial styles for the sphere container
        width: "0px",
        height: "0px",
        borderRadius: "50%",
      }}
    />
  )
}
