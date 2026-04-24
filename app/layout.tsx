import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

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
    <html suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}