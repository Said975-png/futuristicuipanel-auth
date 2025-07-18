"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Sun, Moon, Check } from "lucide-react"
import useScrollParallax from "@/hooks/use-scroll-parallax"
import { Badge } from "@/components/ui/badge"
import { SphereToNavbarTransition } from "@/components/sphere-to-navbar-transition"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { CustomAuraCursor } from "@/components/custom-aura-cursor"
// Preloader больше не импортируется здесь, он управляется в ClientLayout

// Удаляем проп onPreloaderDismiss, так как page.tsx больше не координирует это
export default function Component() {
  const [loaded, setLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  // showPreloader состояние теперь управляется в ClientLayout, удалено отсюда

  useEffect(() => {
    setLoaded(true)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // handlePreloaderComplete больше не нужен здесь

  const { ref: mainTitleRef, style: mainTitleParallaxStyle } = useScrollParallax({ speed: 0.1 })
  const { ref: pricingTitleRef, style: pricingTitleParallaxStyle } = useScrollParallax({ speed: 0.05 })

  const currentBg = isDarkMode ? "bg-bg-dark" : "bg-bg-light"
  const currentText = isDarkMode ? "text-text-dark" : "text-text-light"
  const currentProgressBarBg = isDarkMode ? "bg-progress-bg-dark" : "bg-progress-bg-light"

  const currentDescriptionText = isDarkMode ? "text-gray-300" : "text-gray-700"
  const currentCardTitleText = isDarkMode ? "text-gray-200" : "text-gray-800"
  const currentBoldTextInCard = isDarkMode ? "text-white" : "text-black"

  return (
    <>
      {/* AnimatePresence и Preloader удалены отсюда, они теперь в ClientLayout */}

      <div
        className={cn(
          `relative flex min-h-screen flex-col items-center font-mono p-8 md:p-12 transition-opacity duration-500`,
          currentBg,
          currentText,
          // Условные классы opacity-0 и pointer-events-none теперь управляются в ClientLayout
        )}
      >
        {/* Custom Aura Cursor */}
        <CustomAuraCursor isDarkMode={isDarkMode} />

        {/* Animated decorative plus signs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Plus className="absolute top-[10%] left-[5%] text-neon-green/30 text-5xl animate-float-1" />
          <Plus className="absolute top-[30%] right-[10%] text-neon-green/30 text-4xl animate-float-2" />
          <Plus className="absolute bottom-[20%] left-[20%] text-neon-green/30 text-6xl animate-float-3" />
          <Plus className="absolute top-[50%] left-[40%] text-neon-green/30 text-3xl animate-float-4" />
          <Plus className="absolute bottom-[10%] right-[30%] text-neon-green/30 text-5xl animate-float-5" />
          <Plus className="absolute top-[5%] left-[70%] text-neon-green/30 text-4xl animate-float-2" />
          <Plus className="absolute top-[80%] right-[5%] text-neon-green/30 text-3xl animate-float-4" />
          <Plus className="absolute bottom-[5%] left-[50%] text-neon-green/30 text-5xl animate-float-1" />
        </div>

        {/* Neon Glows */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Top-left glow */}
          <div
            className="absolute top-0 left-0 rounded-full filter blur-3xl opacity-50"
            style={{
              background: "radial-gradient(circle at top left, #00ff66, transparent 70%)",
              width: "min(50vw, 300px)",
              height: "min(50vw, 300px)",
            }}
          ></div>
          {/* Top-right glow */}
          <div
            className="absolute top-0 right-0 rounded-full filter blur-3xl opacity-50"
            style={{
              background: "radial-gradient(circle at top right, #00ccff, transparent 70%)",
              width: "min(50vw, 300px)",
              height: "min(50vw, 300px)",
            }}
          ></div>
          {/* Bottom-left glow */}
          <div
            className="absolute bottom-0 left-0 rounded-full filter blur-3xl opacity-50"
            style={{
              background: "radial-gradient(circle at bottom left, #cc00ff, transparent 70%)",
              width: "min(50vw, 300px)",
              height: "min(50vw, 300px)",
            }}
          ></div>
          {/* Bottom-right glow */}
          <div
            className="absolute bottom-0 right-0 rounded-full filter blur-3xl opacity-50"
            style={{
              background: "radial-gradient(circle at bottom right, #00ff66, transparent 70%)",
              width: "min(50vw, 300px)",
              height: "min(50vw, 300px)",
            }}
          ></div>
        </div>

        {/* Header (now empty of the requested elements) */}
        <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between mb-8 w-full max-w-6xl gap-4">
          <div className="flex items-center space-x-4">{/* Dashboard button removed */}</div>
          <div className="flex flex-wrap items-center justify-end space-x-4 gap-y-2">
            {/* Battery Level Active and 60% removed */}
          </div>
        </header>

        {/* Sphere Transition Component - Renders only if navbar is not yet shown */}
        {!showNavbar && <SphereToNavbarTransition onAnimationComplete={() => setShowNavbar(true)} />}

        {/* NEW CENTRAL NAVBAR - Now fixed and darkens on scroll, with glassmorphism */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={showNavbar ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "fixed top-4 left-[50px] right-[50px] z-50 flex flex-wrap items-center justify-center space-x-4 md:space-x-8 border rounded-full px-6 py-3 transition-all duration-300",
            showNavbar ? "pointer-events-auto" : "pointer-events-none",
            scrolled
              ? isDarkMode
                ? "bg-black/30 backdrop-blur-md shadow-lg"
                : "bg-white/30 backdrop-blur-md shadow-lg"
              : "bg-transparent backdrop-blur-none shadow-none",
            isDarkMode ? "border-white/20" : "border-black/20",
          )}
        >
          {/* Navbar content */}
          <div className="relative z-10 flex items-center space-x-4 md:space-x-8">
            {/* NEURO Logo */}
            <span className="text-xl md:text-2xl font-bold text-neon-green">NEURO</span>
            {/* Theme Toggle Buttons */}
            <Button
              variant="outline"
              onClick={() => setIsDarkMode(true)}
              className={`rounded-full px-4 py-2 text-sm font-light border bg-transparent ${
                isDarkMode
                  ? "border-neon-green text-neon-green hover:bg-neon-green/5"
                  : "border-black/20 text-black hover:bg-black/5"
              } transition-all duration-300`}
            >
              <Moon className="h-4 w-4 mr-2" /> Темная
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDarkMode(false)}
              className={`rounded-full px-4 py-2 text-sm font-light border bg-transparent ${
                !isDarkMode ? "border-black text-black hover:bg-black/5" : "border-white/20 text-white hover:bg-white/5"
              } transition-all duration-300`}
            >
              <Sun className="h-4 w-4 mr-2" /> Светлая
            </Button>
            {/* Contacts Link */}
            <a
              href="#"
              className={`text-sm font-light ${isDarkMode ? "text-white" : "text-black"} hover:text-neon-green transition-colors duration-300 hover:scale-105 rounded-full px-4 py-2 border bg-transparent ${isDarkMode ? "border-white/20" : "border-black/20"}`}
            >
              Контакты
            </a>
          </div>
        </motion.nav>

        {/* Main Grid Layout */}
        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-24">
          {" "}
          {/* Added mt-24 to push content down */}
          {/* Left Section */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <h1
              ref={mainTitleRef}
              style={mainTitleParallaxStyle}
              className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in"
            >
              NEURA JARVIS v0
            </h1>
            <p className={`text-base md:text-lg ${currentDescriptionText} animate-fade-in delay-100 mt-4`}>
              NEURA AI - это когнитивная система, которая обучается, адаптируется и эволюционирует. Полностью
              персонализированный опыт взаимодействия с технологиями будущего.
            </p>
          </div>
          {/* Right Section */}
          <div className="col-span-1 flex flex-col justify-between items-end space-y-6">
            <div className="flex flex-col space-y-4 w-full">
              {/* Material Content */}
              <div className="p-6 animate-fade-in delay-400">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${currentCardTitleText}`}>Material</h3>
                  <div
                    className={`w-6 h-6 rounded-full ${isDarkMode ? "border-white/10" : "border-black/10"} flex items-center justify-center`}
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                  </div>
                </div>
                <p className={`text-sm ${currentDescriptionText}`}>
                  Будущее цифрового взаимодействия — уже здесь.Мы разрабатываем адаптивные сайты и Telegram-ботов,
                  которые не просто реагируют, а понимают.
                </p>
              </div>

              {/* Purpose Content */}
              <div className="p-6 animate-fade-in delay-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${currentCardTitleText}`}>Purpose</h3>
                  <div
                    className={`w-6 h-6 rounded-full ${isDarkMode ? "border-white/10" : "border-black/10"} flex items-center justify-center`}
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                  </div>
                </div>
                <p className={`text-sm ${currentDescriptionText}`}>
                  Создаём Умные Сайты и Telegram-Боты с Искусственным Интеллектом
                  <br />
                  Персонализированные digital-решения, которые думают вместе с вами. AI-помощники · Интерактивные сайты
                  · Автоматизация общения
                </p>
              </div>
            </div>

            {/* Green Circular Buttons */}
            <div className="flex flex-wrap justify-end gap-4 animate-fade-in delay-800 px-4 md:px-8">
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10 transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10 transition-all duration-300 flex items-center justify-center"
              >
                <Minus className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-8 flex justify-center w-full max-w-6xl">
          <nav
            className={`flex flex-wrap justify-center space-x-4 md:space-x-8 border bg-transparent ${isDarkMode ? "border-white/20" : "border-black/20"} rounded-full px-8 py-4 gap-y-2`}
          >
            {["MONOLOGUE", "Home page", "Repository", "Collection"].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-light ${isDarkMode ? "text-white" : "text-black"} hover:text-neon-green transition-colors duration-300 hover:scale-105`}
              >
                {item}
              </a>
            ))}
          </nav>
        </footer>

        {/* Second Section (Pricing) */}
        <div className="relative z-10 w-full max-w-6xl mt-16">
          <h2
            ref={pricingTitleRef}
            style={pricingTitleParallaxStyle}
            className="text-4xl md:text-5xl font-bold leading-tight text-center mb-4"
          >
            The Perfect Plan for Your Needs
          </h2>
          <p className={`text-base md:text-lg ${currentDescriptionText} text-center mb-12`}>
            Our transparent pricing makes it easy to find a plan that works within your financial constraints.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Free Plan Content */}
            <div className="p-6 flex flex-col items-start text-left animate-fade-in delay-200">
              <h3 className={`text-lg font-semibold ${currentCardTitleText} mb-2`}>Free</h3>
              <p className={`text-4xl font-bold ${currentText} mb-2`}>$0/mo</p>
              <p className={`text-sm ${currentDescriptionText} mb-6`}>Up to $5K refferal ARR</p>
              <h4 className={`text-sm font-semibold ${currentCardTitleText} mb-3`}>Includes:</h4>
              <ul className={`text-sm ${currentDescriptionText} w-full mb-6 space-y-2`}>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> Unlimited referrals
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> All integrations
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> Core platform features
                </li>
              </ul>
              <Button
                variant="outline"
                className={`mt-auto w-full rounded-full px-6 py-2 text-sm font-light border bg-transparent ${isDarkMode ? "border-white/20 text-white hover:bg-white/5" : "border-black/20 text-black hover:bg-black/5"} transition-all duration-300`}
              >
                Get Started
              </Button>
            </div>

            {/* Grow Plan Content */}
            <div className="p-6 flex flex-col items-start text-left relative overflow-hidden animate-fade-in delay-400">
              <Badge
                className="absolute top-4 right-4 bg-neon-green text-black px-3 py-1 rounded-full text-xs font-semibold"
                variant="default"
              >
                Recommended
              </Badge>
              <h3 className={`text-lg font-semibold ${currentCardTitleText} mb-2`}>Grow</h3>
              <p className={`text-4xl font-bold ${currentText} mb-2`}>$350/mo</p>
              <p className={`text-sm ${currentDescriptionText} mb-6`}>Up to $50K refferal ARR</p>
              <h4 className={`text-sm font-semibold ${currentCardTitleText} mb-3`}>Everything in Free, Plus:</h4>
              <ul className={`text-sm ${currentDescriptionText} w-full mb-6 space-y-2`}>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> In-brand customization
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> In-brand email design widget
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> Menu integration
                </li>
              </ul>
              <Button
                variant="outline"
                className={`mt-auto w-full rounded-full px-6 py-2 text-sm font-light border bg-transparent ${isDarkMode ? "border-white/20 text-white hover:bg-white/5" : "border-black/20 text-black hover:bg-black/5"} transition-all duration-300`}
              >
                Choose Grow
              </Button>
            </div>

            {/* Scale Plan Content */}
            <div className="p-6 flex flex-col items-start text-left animate-fade-in delay-600">
              <h3 className={`text-lg font-semibold ${currentCardTitleText} mb-2`}>Scale</h3>
              <p className={`text-4xl font-bold ${currentText} mb-2`}>$750/mo</p>
              <p className={`text-sm ${currentDescriptionText} mb-6`}>Up to $100K refferal ARR</p>
              <h4 className={`text-sm font-semibold ${currentCardTitleText} mb-3`}>Everything in Grow, Plus:</h4>
              <ul className={`text-sm ${currentDescriptionText} w-full mb-6 space-y-2`}>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-neon-green" /> Premium SLAs
                </li>
              </ul>
              <Button
                variant="outline"
                className={`mt-auto w-full rounded-full px-6 py-2 text-sm font-light border bg-transparent ${isDarkMode ? "border-white/20 text-white hover:bg-white/5" : "border-black/20 text-black hover:bg-black/5"} transition-all duration-300`}
              >
                Choose Scale
              </Button>
            </div>
          </div>
        </div>

        {/* Third Section (About Us / Services) - Updated */}
        <section className="relative z-10 w-full max-w-6xl mt-16 py-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-center mb-4">Что мы создаём</h2>
          <p className={`text-base md:text-lg ${currentDescriptionText} text-center mb-12`}>
            AI-решения, которые действительно работают.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full">
            {/* Card 1: Умные сайты нового поколения */}
            <div
              className={cn(
                "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                isDarkMode
                  ? "border-white/10 bg-white/5 shadow-xl hover:border-neon-green hover:shadow-neon"
                  : "border-black/10 bg-black/5 shadow-xl hover:border-blue-500 hover:shadow-lg", // Adjusted for light mode
                "backdrop-blur-sm",
                "animate-fade-in delay-100",
              )}
            >
              <h4 className={`text-xl font-bold ${currentCardTitleText} mb-2 flex items-center`}>
                <span className="text-neon-green mr-3 text-2xl"></span> Умные сайты нового поколения
              </h4>
              <p className={`text-sm ${currentDescriptionText}`}>
                Ультрабыстрая загрузка, AI-навигация, адаптивный дизайн.
              </p>
            </div>

            {/* Card 2: Telegram-боты с ИИ */}
            <div
              className={cn(
                "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                isDarkMode
                  ? "border-white/10 bg-white/5 shadow-xl hover:border-neon-green hover:shadow-neon"
                  : "border-black/10 bg-black/5 shadow-xl hover:border-blue-500 hover:shadow-lg",
                "backdrop-blur-sm",
                "animate-fade-in delay-200",
              )}
            >
              <h4 className={`text-xl font-bold ${currentCardTitleText} mb-2 flex items-center`}>
                <span className="text-neon-green mr-3 text-2xl"></span> Telegram-боты с ИИ
              </h4>
              <p className={`text-sm ${currentDescriptionText}`}>
                Диалоговые интерфейсы на базе GPT, с распознаванием и обучением.
              </p>
            </div>

            {/* Card 3: Автоматизация процессов */}
            <div
              className={cn(
                "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                isDarkMode
                  ? "border-white/10 bg-white/5 shadow-xl hover:border-neon-green hover:shadow-neon"
                  : "border-black/10 bg-black/5 shadow-xl hover:border-blue-500 hover:shadow-lg",
                "backdrop-blur-sm",
                "animate-fade-in delay-300",
              )}
            >
              <h4 className={`text-xl font-bold ${currentCardTitleText} mb-2 flex items-center`}>
                <span className="text-neon-green mr-3 text-2xl"></span> Автоматизация процессов
              </h4>
              <p className={`text-sm ${currentDescriptionText}`}>Подключим ИИ к поддержке, аналитике, задачам и API.</p>
            </div>

            {/* Card 4: Кастомные AI-интеграции */}
            <div
              className={cn(
                "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                isDarkMode
                  ? "border-white/10 bg-white/5 shadow-xl hover:border-neon-green hover:shadow-neon"
                  : "border-black/10 bg-black/5 shadow-xl hover:border-blue-500 hover:shadow-lg",
                "backdrop-blur-sm",
                "animate-fade-in delay-400",
              )}
            >
              <h4 className={`text-xl font-bold ${currentCardTitleText} mb-2 flex items-center`}>
                <span className="text-neon-green mr-3 text-2xl"></span> Кастомные AI-интеграции
              </h4>
              <p className={`text-sm ${currentDescriptionText}`}>
                API, No-code, CRM, CMS, платежные шлюзы — под ваш бизнес и масштаб.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
