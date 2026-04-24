"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { Menu, X, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  locale?: string
}

export function Navbar({ locale = "en" }: NavbarProps) {
  const t = useTranslations("nav")
  const isScrolled = useScrollPosition()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const otherLocale = locale === "en" ? "ar" : "en"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "97431490766"
  const pathname = usePathname()
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  const homePrefix = isHome ? "" : `/${locale}`

  useEffect(() => {
    setIsMobileOpen(false)
  }, [locale])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  const navLinks = [
    { href: `${homePrefix}#about`, label: t("about") },
    { href: `${homePrefix}#services`, label: t("services") },
    { href: `${homePrefix}#pricing`, label: t("pricing") },
    { href: `${homePrefix}#portfolio`, label: t("work") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `${homePrefix}#contact`, label: t("contact") },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
              <Image
                src="/assets/logo/logo-v1.png"
                alt="Berry Design"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/${otherLocale}`}
                className="text-sm font-medium hover:text-primary transition-colors px-2 py-1"
              >
                {t("language")}
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("whatsapp")}
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-1"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-semibold hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <Link
                href={`/${otherLocale}`}
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {t("language")}
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("whatsapp")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}