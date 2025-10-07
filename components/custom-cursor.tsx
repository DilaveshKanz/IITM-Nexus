"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [cursorEnlarged, setCursorEnlarged] = useState(false)
  const [cursorInput, setCursorInput] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Check if we're on a touch device - more reliable detection
  const isTouchDevice = () => {
    return (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0)
    )
  }

  useEffect(() => {
    const touch = isTouchDevice()
    setIsTouch(touch)

    // Run cursor logic only on non-touch devices
    if (!touch) {
      document.body.style.cursor = "none"

      const onMouseMove = (e: MouseEvent) => {
        // Simple direct position update without any animation or transition
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }

      const onMouseEnter = () => {
        setCursorVisible(true)
      }

      const onMouseLeave = () => {
        setCursorVisible(false)
      }

      const onMouseDown = () => {
        setCursorEnlarged(true)
      }

      const onMouseUp = () => {
        setCursorEnlarged(false)
      }

      // Check for interactive elements
      const onElementMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement

        // Check for interactive elements
        const isInteractive =
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".interactive-element") ||
          window.getComputedStyle(target).cursor === "pointer"

        // Check for input elements
        const isInput =
          target.tagName.toLowerCase() === "input" ||
          target.tagName.toLowerCase() === "textarea" ||
          target.tagName.toLowerCase() === "select" ||
          target.getAttribute("contenteditable") === "true" ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[contenteditable='true']")

        setCursorEnlarged(isInteractive)
        setCursorInput(isInput)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mouseover", onElementMouseOver)

      return () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseenter", onMouseEnter)
        document.removeEventListener("mouseleave", onMouseLeave)
        document.removeEventListener("mousedown", onMouseDown)
        document.removeEventListener("mouseup", onMouseUp)
        document.removeEventListener("mouseover", onElementMouseOver)
      }
    } else {
      // Handle touch devices: reset cursor styles
      document.body.style.cursor = "auto"
      const links = document.querySelectorAll("a, button, [role='button']")
      links.forEach((link) => {
        ;(link as HTMLElement).style.cursor = "pointer"
      })
      return
    }
  }, [])

  // Don't render custom cursor on touch devices
  if (isTouch) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: cursorEnlarged ? "40px" : "32px",
          height: cursorEnlarged ? "40px" : "32px",
          borderRadius: "50%",
          opacity: cursorVisible ? 1 : 0,
          transform: `translate(${cursorPosition.x - (cursorEnlarged ? 20 : 16)}px, ${
            cursorPosition.y - (cursorEnlarged ? 20 : 16)
          }px)`,
          background: cursorInput
            ? "radial-gradient(circle, rgba(42,189,94,0.4) 0%, rgba(42,189,94,0) 70%)"
            : "radial-gradient(circle, rgba(42,189,94,0.3) 0%, rgba(42,189,94,0) 70%)",
          boxShadow: cursorInput ? "0 0 15px 5px rgba(42,189,94,0.2)" : "0 0 15px 5px rgba(42,189,94,0.1)",
          willChange: "transform, width, height",
        }}
      />

      {/* Center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          width: cursorInput ? "6px" : "4px",
          height: cursorInput ? "6px" : "4px",
          opacity: cursorVisible ? 1 : 0,
          transform: `translate(${cursorPosition.x - (cursorInput ? 3 : 2)}px, ${cursorPosition.y - (cursorInput ? 3 : 2)}px)`,
          backgroundColor: cursorInput ? "rgb(42,189,94)" : "rgb(42,189,94)",
          willChange: "transform",
        }}
      />
    </>
  )
}
