"use client"

import { useTranslations } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Mail, MapPin, CheckCircle } from "lucide-react"

export function ContactSection() {
  const t = useTranslations("contact")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || "97431490766"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      institution: (form.elements.namedItem("institution") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      setIsSuccess(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-cream py-20 sm:py-28" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-[36px] font-semibold text-foreground mb-4">
            {t("headline")}
          </h2>
          <p className="text-base text-ink/60 max-w-xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle className="w-16 h-16 text-coral mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {t("successTitle")}
                </h3>
                <p className="text-ink/60">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("nameLabel")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    required
                    className="bg-white border-border"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("emailLabel")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      required
                      className="bg-white border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phoneLabel")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      className="bg-white border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">{t("institutionLabel")}</Label>
                  <Input
                    id="institution"
                    name="institution"
                    placeholder={t("institutionPlaceholder")}
                    className="bg-white border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("messageLabel")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    required
                    className="bg-white border-border resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coral hover:bg-coral/90 text-white font-medium py-3 rounded-full"
                >
                  {isSubmitting ? t("sending") : t("submit")}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border hover:border-coral transition-colors group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{t("whatsapp")}</div>
                <div className="text-sm text-ink/60">+974 3149 0766</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${t("email")}`}
              className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border hover:border-coral transition-colors group"
            >
              <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                <Mail className="w-6 h-6 text-coral" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{t("emailLabel")}</div>
                <div className="text-sm text-ink/60">{t("email")}</div>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{t("location")}</div>
                <div className="text-sm text-ink/60">Doha, Qatar</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
