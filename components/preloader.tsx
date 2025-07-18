"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PreloaderProps {
  onStart: () => void // Эта функция будет вызвана, когда прелоадер должен исчезнуть
  isDarkMode: boolean
}

export function Preloader({ onStart, isDarkMode }: PreloaderProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  /* ────────────  disable scroll while preloader active  ─────────── */
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  /* ───────────────────────── interaction ───────────────────────── */
  const handleClick = () => {
    if (isAnimatingOut) return
    setIsAnimatingOut(true) // Запускаем анимацию исчезновения
  }

  /* ─────────────────────────── styles ──────────────────────────── */
  const bg = isDarkMode ? "bg-black" : "bg-white"
  const txt = isDarkMode ? "text-white" : "text-black"
  const neon = isDarkMode ? "text-neon-green" : "text-blue-500"

  /* ─────────────────────────── render ──────────────────────────── */
  return (
    <motion.div
      onClick={handleClick} // Добавлен обработчик клика
      onAnimationComplete={() => isAnimatingOut && onStart()} // Вызываем onStart после завершения анимации
      className={cn("fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer", bg, txt)}
      initial={{ opacity: 1, scale: 1 }}
      animate={isAnimatingOut ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center p-4 select-none"
      >
        <h1 className={cn("text-6xl md:text-8xl font-bold mb-4", neon)}>NEURO</h1>
        <p className="text-2xl md:text-4xl font-light mb-2">Добро пожаловать</p>
        <p className="text-lg md:text-xl font-light opacity-70">Нажмите в любом месте, чтобы продолжить</p>
      </motion.div>
    </motion.div>
  )
}
