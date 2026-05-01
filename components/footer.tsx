"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Logo } from "@/components/logo"

export function Footer() {
  const t = useTranslations("footer")
  const navT = useTranslations("nav")
  const locale = useLocale()
  const otherLocale = locale === "en" ? "ar" : "en"

  const quickLinks = [
    { href: "#about", label: navT("about") },
    { href: "#services", label: navT("services") },
    { href: "#portfolio", label: navT("work") },
    { href: `/${locale}/blog`, label: navT("blog") },
    { href: "#contact", label: navT("contact") },
  ]

  const serviceLinks = [
    { href: "#services", label: t("brandIdentity") },
    { href: "#services", label: t("websiteDesign") },
    { href: "#services", label: t("printDesign") },
    { href: "#services", label: t("signage") },
    { href: "#services", label: t("socialMedia") },
    { href: "#services", label: t("marketing") },
  ]

  return (
    <footer className="border-t border-border bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + Tagline */}
          <div className="lg:col-span-1">
            <Logo white={false} className="mb-4" />
            <p className="text-sm text-ink/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-ink mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm text-ink/60 hover:text-coral transition-colors min-h-[44px] leading-[44px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-ink mb-4">{t("servicesTitle")}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-ink/60 hover:text-coral transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-ink mb-4">{t("contactTitle")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sales@berrydesign.online"
                  className="block text-sm text-ink/60 hover:text-coral transition-colors min-h-[44px] leading-[44px]"
                >
                  sales@berrydesign.online
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/97431490766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-ink/60 hover:text-coral transition-colors min-h-[44px] leading-[44px]"
                >
                  +974 3149 0766
                </a>
              </li>
              <li>
                <span className="text-sm text-ink/60">Doha, Qatar</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/berrydesignonline/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="min-w-11 min-h-11 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ali-foural-9aa460359/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="min-w-11 min-h-11 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:sales@berrydesign.online"
                aria-label="Email"
                className="min-w-11 min-h-11 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink/40">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${otherLocale}`}
              className="text-sm text-ink/40 hover:text-coral transition-colors min-h-[44px] flex items-center"
            >
              {locale === "en" ? "العربية" : "English"}
            </Link>
            <span className="text-sm text-ink/40">
              {t("location")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
