"use client"

import Link from "next/link"
import Image from "next/image"
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
    { href: "#contact", label: navT("contact") },
  ]

  const serviceLinks = [
    { label: t("brandIdentity") },
    { label: t("websiteDesign") },
    { label: t("printDesign") },
    { label: t("signage") },
    { label: t("socialMedia") },
    { label: t("marketing") },
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
                    className="text-sm text-ink/60 hover:text-coral transition-colors"
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
                  <span className="text-sm text-ink/60">{link.label}</span>
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
                  className="text-sm text-ink/60 hover:text-coral transition-colors"
                >
                  sales@berrydesign.online
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/97431490766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/60 hover:text-coral transition-colors"
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
                href="https://www.facebook.com/berrydesignonline"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <Image
                  src="/assets/social/facebook.png"
                  alt="Facebook"
                  width={18}
                  height={18}
                />
              </a>
              <a
                href="https://www.instagram.com/berrydesignonline/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <Image
                  src="/assets/social/instagram.png"
                  alt="Instagram"
                  width={18}
                  height={18}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/ali-foural-9aa460359/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
              className="text-sm text-ink/40 hover:text-coral transition-colors"
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
