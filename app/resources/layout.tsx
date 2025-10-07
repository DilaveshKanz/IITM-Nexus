import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learning Resources | IITM Nexus",
  description:
    "Access comprehensive study materials, grading documents, term calendars, and lecture videos for IITM BS Degree program",
  keywords: ["IITM resources", "study materials", "lecture videos", "term calendar", "grading documents"],
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
