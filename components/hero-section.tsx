"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code2, Palette, Globe, Printer, Megaphone } from "lucide-react"
import { motion } from "framer-motion"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero")
  const isArabic = locale === "ar"

  const headlineText = t("headline")
  const words = headlineText.split(" ")
  const secondToLastIndex = words.length - 2
  const beforeUnderline = words.slice(0, secondToLastIndex).join(" ")
  const underlineWord = words[secondToLastIndex]
  const afterUnderline = words.slice(secondToLastIndex + 1).join(" ")

  const badgeText = isArabic ? "تصميم وتطوير المواقع الاحترافي" : "Professional Web Design & Development"

  const stats = [
    { value: "50+", label: isArabic ? "مشروع" : "Projects" },
    { value: "45+", label: isArabic ? "عميل سعيد" : "Happy Clients" },
    { value: "3+", label: isArabic ? "سنوات خبرة" : "Years Experience" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-coral/20 blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-coral/15 blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ bottom: "10%", right: "15%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-coral/10 blur-3xl"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "15%", left: "15%" }}
        >
          <Code2 size={40} />
        </motion.div>
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ top: "25%", right: "20%" }}
        >
          <Palette size={35} />
        </motion.div>
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ bottom: "20%", left: "20%" }}
        >
          <Sparkles size={30} />
        </motion.div>
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 0],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ top: "35%", right: "10%" }}
        >
          <Globe size={32} />
        </motion.div>
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 4, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{ bottom: "30%", right: "25%" }}
        >
          <Printer size={28} />
        </motion.div>
        <motion.div
          className="absolute text-white/20"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -4, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          style={{ top: "55%", left: "8%" }}
        >
          <Megaphone size={34} />
        </motion.div>
      </div>

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-coral" />
          <span className="text-sm font-medium text-coral">{badgeText}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-white ${isArabic ? "font-['Noto Sans Arabic']" : ""}`}
          style={{ direction: isArabic ? "rtl" : "ltr" }}
        >
          {beforeUnderline}{" "}
          <span className="text-coral relative inline-block">
            {underlineWord}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M2 10C50 5 150 5 198 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-coral"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </span>{" "}
          {afterUnderline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className={`text-lg sm:text-xl text-white/70 mb-10 max-w-3xl mx-auto animate-fade-in-up leading-relaxed ${isArabic ? "font-['Noto Sans Arabic']" : ""}`}
          style={{ direction: isArabic ? "rtl" : "ltr" }}
        >
          {t("subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up mb-12 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <Button
            size="lg"
            className="bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-6 text-lg group shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 transition-all"
            asChild
          >
            <a href="#portfolio">
              {t("ctaPrimary")}
              <ArrowRight className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${isArabic ? "rotate-180" : ""}`} />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-coral/20 text-white hover:bg-coral/5 hover:border-coral font-semibold px-8 py-6 text-lg backdrop-blur-sm bg-transparent"
            asChild
          >
            <a href="#contact">{t("ctaSecondary")}</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className={`flex flex-wrap justify-center items-center gap-8 text-sm animate-fade-in-up ${isArabic ? "flex-row-reverse" : ""}`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-white/70">
                <span className="font-semibold text-white">{stat.value}</span> {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <FloatingWhatsApp />
    </section>
  )
}
