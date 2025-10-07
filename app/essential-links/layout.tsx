import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Essential Links | IITM Nexus",
  description: "Quick access to important resources and platforms for IITM BS Degree students",
  keywords: ["IITM essential links", "student resources", "academic portals", "IITM BS links"],
}

export default function EssentialLinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
