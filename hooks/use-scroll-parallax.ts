"use client"

import { useState, useEffect, useRef } from "react"

interface ParallaxOptions {
  speed?: number // Насколько сильно элемент должен двигаться относительно прокрутки (например, 0.1 для 10% от прокрутки)
}

export default function useScrollParallax({ speed = 0.1 }: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollPosition = window.scrollY
        // Применяем отрицательное смещение, чтобы элемент двигался медленнее (отставал)
        // Это создает эффект "плавания" при прокрутке вниз
        setOffsetY(-scrollPosition * speed)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Устанавливаем начальную позицию при монтировании

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, style: { transform: `translateY(${offsetY}px)` } }
}
