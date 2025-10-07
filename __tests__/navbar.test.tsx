import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "@/components/navbar"

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Navbar", () => {
  it("renders the logo and navigation links", () => {
    render(<Navbar />)

    // Check if logo is rendered
    expect(screen.getByText("IITM Nexus")).toBeInTheDocument()

    // Check if navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Updates")).toBeInTheDocument()
    expect(screen.getByText("Resources")).toBeInTheDocument()
    expect(screen.getByText("Quiz Prep")).toBeInTheDocument()
    expect(screen.getByText("Tools")).toBeInTheDocument()
    expect(screen.getByText("About Us")).toBeInTheDocument()
  })

  it("opens and closes the mobile menu", () => {
    render(<Navbar />)

    // Mobile menu should be closed initially
    expect(screen.queryByRole("navigation", { hidden: true })).not.toBeVisible()

    // Open mobile menu
    fireEvent.click(screen.getByLabelText("Toggle menu"))

    // Mobile menu should be visible
    expect(screen.getByRole("navigation")).toBeVisible()

    // Close mobile menu
    fireEvent.click(screen.getByLabelText("Toggle menu"))

    // Mobile menu should be closed again
    expect(screen.queryByRole("navigation", { hidden: true })).not.toBeVisible()
  })
})
