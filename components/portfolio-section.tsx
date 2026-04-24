"use client"

import { useTranslations, useLocale } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  { image: "/assets/portfolio/1.jpg", titleKey: "project1Title", categoryKey: "project1Category" },
  { image: "/assets/portfolio/2.jpg", titleKey: "project2Title", categoryKey: "project2Category" },
  { image: "/assets/portfolio/3.jpg", titleKey: "project3Title", categoryKey: "project3Category" },
]

export function PortfolioSection() {
  const t = useTranslations("portfolio")
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-cream relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t("headline")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-navy shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={project.image}
                  alt={t(project.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="transform transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-coral text-white text-xs font-medium uppercase tracking-wider mb-3">
                      {t(project.categoryKey)}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {t("conceptLabel") || "View Project"}
                    </p>
                    <Link
                      href={`/${locale}/work`}
                      className="inline-flex items-center gap-2 text-coral font-medium hover:gap-3 transition-all duration-300"
                    >
                      {t("viewProject")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 py-6 text-lg"
          >
            <Link href={`/${locale}/work`}>
              {t("viewAll")}
              <ArrowRight className="w-5 h-5 ms-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}