import React from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PricingSection } from "@/components/pricing-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Berry Design Qatar",
  description: "Graphic design agency for schools and nurseries in Qatar",
  url: "https://berrydesign.online",
  telephone: "+97431490766",
  email: "sales@berrydesign.online",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Doha",
    addressCountry: "QA",
  },
  areaServed: "QA",
  image: "https://berrydesign.online/assets/logo/logo-v1.png",
}

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Navbar locale={locale} />
        <HeroSection locale={locale} />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
