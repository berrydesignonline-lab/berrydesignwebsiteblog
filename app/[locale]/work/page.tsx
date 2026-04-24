"use client"

import { useState, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const projects = [
  { id: 1, image: "/assets/portfolio/1.jpg", titleEn: "Al Noor Nursery", titleAr: "حضانة النور",       categoryEn: "Brand Identity",   categoryAr: "الهوية البصرية",    span: "col-span-1 row-span-2" },
  { id: 2, image: "/assets/portfolio/2.jpg", titleEn: "Doha International School", titleAr: "مدرسة الدوحة الدولية", categoryEn: "Website Design",   categoryAr: "تصميم المواقع",    span: "col-span-1 row-span-1" },
  { id: 3, image: "/assets/portfolio/3.jpg", titleEn: "Little Stars Kindergarten", titleAr: "روضة النجوم الصغيرة", categoryEn: "Print & Signage",  categoryAr: "المطبوعات واللافتات", span: "col-span-1 row-span-1" },
  { id: 4, image: "/assets/portfolio/4.jpg", titleEn: "Bright Minds Academy",      titleAr: "أكاديمية العقول المتألقة", categoryEn: "Brand Identity",   categoryAr: "الهوية البصرية",    span: "col-span-1 row-span-1" },
  { id: 5, image: "/assets/portfolio/5.jpg", titleEn: "Qatar Learning Center",     titleAr: "مركز قطر للتعلم",   categoryEn: "Website Design",   categoryAr: "تصميم المواقع",    span: "col-span-2 row-span-1" },
  { id: 6, image: "/assets/portfolio/6.jpg", titleEn: "Rainbow Nursery",           titleAr: "حضانة قوس قزح",    categoryEn: "Print & Signage",  categoryAr: "المطبوعات واللافتات", span: "col-span-1 row-span-1" },
  { id: 7, image: "/assets/portfolio/7.jpg", titleEn: "Future Leaders School",     titleAr: "مدرسة قادة المستقبل", categoryEn: "Brand Identity",   categoryAr: "الهوية البصرية",    span: "col-span-1 row-span-1" },
  { id: 8, image: "/assets/portfolio/8.jpg", titleEn: "Al Bayan Bilingual School", titleAr: "مدرسة البيان ثنائية اللغة", categoryEn: "Website Design",   categoryAr: "تصميم المواقع",    span: "col-span-1 row-span-1" },
  { id: 9, image: "/assets/portfolio/9.jpg", titleEn: "Sunrise Early Learning",    titleAr: "مركز شروق للتعلم المبكر", categoryEn: "Print & Signage",  categoryAr: "المطبوعات واللافتات", span: "col-span-1 row-span-2" },
]

const categories = {
  en: ["All", "Brand Identity", "Website Design", "Print & Signage"],
  ar: ["الكل", "الهوية البصرية", "تصميم المواقع", "المطبوعات واللافتات"],
}

type Props = { params: Promise<{ locale: string }> }

export default function WorkPage({ params }: Props) {
  const { locale } = use(params)
  const isAr = locale === "ar"

  const [activeCategory, setActiveCategory] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const cats = isAr ? categories.ar : categories.en

  const filtered = activeCategory === 0
    ? projects
    : projects.filter(p => (isAr ? p.categoryAr : p.categoryEn) === cats[activeCategory])

  const lightboxProject = lightbox !== null ? projects.find(p => p.id === lightbox) : null
  const lightboxIndex = lightbox !== null ? filtered.findIndex(p => p.id === lightbox) : -1

  function prevLightbox() {
    if (lightboxIndex > 0) setLightbox(filtered[lightboxIndex - 1].id)
  }
  function nextLightbox() {
    if (lightboxIndex < filtered.length - 1) setLightbox(filtered[lightboxIndex + 1].id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar locale={locale} />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/8 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/20 text-coral text-sm font-medium mb-4">
              {isAr ? "معرض الأعمال" : "Portfolio"}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
              {isAr ? "أعمالنا" : "Our Work"}
            </h1>
            <p className="text-lg text-white/60 max-w-xl">
              {isAr
                ? "علامات تجارية ومواقع ومطبوعات صممناها للمؤسسات التعليمية في قطر."
                : "Brands, websites, and print we've designed for educational institutions across Qatar."}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { value: "9+", label: isAr ? "مشروع" : "Projects" },
              { value: "3", label: isAr ? "تخصصات" : "Specialties" },
              { value: "Qatar", label: isAr ? "متواجدون في" : "Based in" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coral" />
                <span className="text-white/60 text-sm">
                  <span className="text-white font-semibold">{stat.value}</span> {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-12 justify-center"
          >
            {cats.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === i
                    ? "bg-coral text-white shadow-lg shadow-coral/25"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[280px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-navy ${project.span}`}
                  onClick={() => setLightbox(project.id)}
                >
                  <Image
                    src={project.image}
                    alt={isAr ? project.titleAr : project.titleEn}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="inline-block self-start px-2.5 py-1 rounded-full bg-coral text-white text-xs font-medium uppercase tracking-wider mb-2">
                      {isAr ? project.categoryAr : project.categoryEn}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {isAr ? project.titleAr : project.titleEn}
                    </h3>
                  </div>
                  {/* Expand icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {isAr ? "هل أنت مستعد لبناء علامتك التجارية؟" : "Ready to build your brand?"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isAr
              ? "انضم إلى المدارس والحضانات التي تثق في بيري ديزاين قطر."
              : "Join the schools and nurseries that trust Berry Design Qatar."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-base">
              <Link href={`/${locale}#contact`}>
                {isAr ? "تواصل معنا" : "Get in Touch"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-6 text-base">
              <Link href={`/${locale}#pricing`}>
                {isAr ? "عرض الأسعار" : "View Pricing"}
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={e => { e.stopPropagation(); prevLightbox() }}
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Next */}
            {lightboxIndex < filtered.length - 1 && (
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={e => { e.stopPropagation(); nextLightbox() }}
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            )}

            <motion.div
              key={lightboxProject.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={lightboxProject.image}
                  alt={isAr ? lightboxProject.titleAr : lightboxProject.titleEn}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-coral text-white text-xs font-medium uppercase tracking-wider mb-1">
                    {isAr ? lightboxProject.categoryAr : lightboxProject.categoryEn}
                  </span>
                  <h3 className="text-white text-xl font-bold">
                    {isAr ? lightboxProject.titleAr : lightboxProject.titleEn}
                  </h3>
                </div>
                <span className="text-white/30 text-sm">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
