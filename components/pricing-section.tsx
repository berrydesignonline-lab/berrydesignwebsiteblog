"use client"

import { useTranslations, useLocale } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const t = useTranslations("pricing")
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "97431490766"
  const whatsappMessage = encodeURIComponent(t("whatsappMessage"))

  const features = [
    t("feature1"),
    t("feature2"),
    t("feature3"),
    t("feature4"),
    t("feature5"),
    t("feature6"),
    t("feature7"),
    t("feature8"),
  ]

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 sm:py-32 bg-navy relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/20 text-coral text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {t("headline")}
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
            {/* Top coral accent stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-coral via-coral/80 to-coral/50" />

            <div className="p-8 sm:p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-coral/20 text-coral text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                {t("limitedOffer")}
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 mb-2">
                <span className="text-6xl sm:text-7xl font-extrabold text-white leading-none">
                  799
                </span>
                <div className="mb-2">
                  <span className="text-2xl font-semibold text-coral">{t("currency")}</span>
                  <p className="text-white/40 text-sm">{t("oneTime")}</p>
                </div>
              </div>

              <p className="text-white/40 text-base mb-8">
                {t("wasPrice")}{" "}
                <span className="line-through text-white/30 font-semibold">
                  1,500 {t("currency")}
                </span>
                {" "}— {t("youSave")}{" "}
                <span className="text-coral font-bold">701 {t("currency")}</span>
              </p>

              {/* Divider */}
              <div className="border-t border-white/10 mb-8" />

              {/* Feature list */}
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
                {t("whatYouGet")}
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: locale === "ar" ? 20 : -20 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-coral" strokeWidth={3} />
                    </div>
                    <span className="text-white/80 text-sm sm:text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Blog note */}
              <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-8 flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-coral" strokeWidth={3} />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  <span className="text-white font-semibold">{t("blogTitle")} </span>
                  {t("blogDesc")}
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-6 text-lg rounded-2xl shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 transition-all"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("cta")}
                </a>
              </Button>

              <p className="text-center text-white/30 text-xs mt-4">{t("noHidden")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
