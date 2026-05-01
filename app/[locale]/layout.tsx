import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { poppins, cairo } from "@/app/layout"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://berrydesign.online/${locale}`,
      languages: {
        en: "https://berrydesign.online/en",
        ar: "https://berrydesign.online/ar",
        "x-default": "https://berrydesign.online/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_QA" : "en_QA",
      url: `https://berrydesign.online/${locale}`,
      siteName: "Berry Design Qatar",
      images: [
        {
          url: "https://berrydesign.online/assets/logo/logo-v1.png",
          width: 400,
          height: 400,
          alt: "Berry Design Qatar",
        },
      ],
      type: "website",
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound()
  }

  const messages = await getMessages()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <html lang={locale} dir={dir}>
      <body className={`font-sans antialiased ${poppins.variable} ${cairo.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
