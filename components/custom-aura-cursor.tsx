"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CustomAuraCursorProps {
  isDarkMode: boolean
}

export function CustomAuraCursor({ isDarkMode }: CustomAuraCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const auraColor = isDarkMode ? "rgba(0, 255, 102, 0.7)" : "rgba(0, 204, 255, 0.7)" // Neon green for dark, light blue for light
  const cursorSize = 20 // Base size of the cursor dot
  const auraSpread = 40 // How much the aura spreads

  return (
    <motion.div
      className={cn(
        "fixed z-[9999] pointer-events-none rounded-full transition-opacity duration-100 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: cursorSize,
        height: cursorSize,
        transform: "translate(-50%, -50%)", // Center the cursor
        backgroundColor: isDarkMode ? "rgba(0, 255, 102, 0.9)" : "rgba(0, 204, 255, 0.9)", // Inner dot color
        boxShadow: `0 0 ${auraSpread / 2}px ${auraColor}, 0 0 ${auraSpread}px ${auraColor}`, // Aura effect
        filter: "blur(2px)", // Soften the aura
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    />
  )
}
