import type React from "react"
import ClientLayout from "./clientLayout"

export const metadata = {
  title: "IITM Nexus | Your IITM BS Degree Companion",
  description: "A comprehensive platform for IITM BS Degree students with resources, tools, and updates",
  keywords: ["IITM", "BS Degree", "Education", "Resources", "India"],
  openGraph: {
    title: "IITM Nexus",
    description: "Your IITM BS Degree Companion",
    url: "https://iitm-nexus.vercel.app",
    siteName: "IITM Nexus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IITM Nexus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'