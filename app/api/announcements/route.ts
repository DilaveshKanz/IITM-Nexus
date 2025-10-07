import { NextResponse } from "next/server"

// Sample data for announcements
const announcements = [
  {
    id: 1,
    title: "Registrations Open for Next Term",
    date: "2023-12-15",
    category: "Academic",
    content: "Registrations for the next term are now open. Please log in to the portal to register for your courses.",
  },
  // ... other announcements
]

export async function GET() {
  // In a real application, this would fetch from a database
  return NextResponse.json(announcements)
}
