import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quiz Preparation | IITM Nexus",
  description: "Access previous years' question papers to enhance your exam preparation for IITM BS Degree program",
  keywords: ["IITM quiz prep", "previous year questions", "exam preparation", "question papers"],
}

export default function QuizPrepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
