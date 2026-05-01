import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const GA_ID = "G-WFGY2HB1KV"

export const metadata: Metadata = {
  title: "Berry Design Qatar",
  description: "Design for Schools & Nurseries in Qatar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      {children}
      <SpeedInsights />
      <Analytics />
    </>
  )
}