"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Preloader } from "@/components/preloader" // Импортируем Preloader

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Эта функция будет вызвана, когда пользователь кликнет по прелоадеру
  const handlePreloaderDismiss = () => {
    console.log("Preloader dismissed. Attempting to play audio.")
    setShowPreloader(false) // Скрываем прелоадер
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio playback started successfully.")
        })
        .catch((error) => {
          console.error("Audio playback failed:", error)
          // Дополнительная обработка ошибок для отладки
          if (error.name === "NotAllowedError") {
            console.warn("Autoplay was prevented by the browser. User interaction required.")
          } else if (error.name === "AbortError") {
            console.warn("Audio playback was aborted (e.g., by user quickly navigating away).")
          }
        })
    } else {
      console.warn("Audio element not found.")
    }
  }

  return (
    <>
      {/* Аудио-элемент с правильным источником и MIME-типом */}
      <audio id="bg-audio" ref={audioRef} preload="auto" loop>
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bd6704ab7470ce8-qhueIDOaQy4LIwILmUx3n2hWpaUoeW.mp3" type="audio/mpeg" />
        {/* Fallback для старых браузеров */}
        Ваш браузер не поддерживает воспроизведение аудио.
      </audio>

      {/* Условный рендеринг прелоадера */}
      {showPreloader && <Preloader onStart={handlePreloaderDismiss} isDarkMode={true} />}

      {/* Основной контент страницы. Размытие и блокировка взаимодействия, пока прелоадер активен */}
      <div className={`${showPreloader ? "blur-sm pointer-events-none" : ""}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </div>
    </>
  )
}
