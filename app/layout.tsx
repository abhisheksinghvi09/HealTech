import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HealthCare Hub - Innovative Hospital Management System",
  description:
    "HealthCare Hub offers cutting-edge solutions for disease detection, pharmacy services, appointment booking, and medical tourism.",
  keywords: [
    "healthcare",
    "hospital management",
    "disease detection",
    "online pharmacy",
    "appointment booking",
    "medical tourism",
  ],
  authors: [{ name: "HealthCare Hub Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://healthcarehub.com",
    site_name: "HealthCare Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HealthCare Hub",
      },
    ],
  },
  twitter: {
    handle: "@healthcarehub",
    site: "@healthcarehub",
    cardType: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

