// Add this script to your project to enable ripple effects on interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add ripple effect to buttons and cards
  document.addEventListener("click", (e) => {
    const target = e.target

    // Check if the clicked element or its parent has a ripple container
    const rippleContainer =
      target.querySelector(".ripple-container") ||
      target.closest('[class*="glassmorphism-card"]')?.querySelector(".ripple-container")

    if (rippleContainer) {
      // Create ripple element
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      rippleContainer.appendChild(ripple)

      // Get position
      const rect = rippleContainer.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)

      // Set position and size
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`

      // Remove after animation completes
      ripple.addEventListener("animationend", () => {
        ripple.remove()
      })
    }
  })

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, [role="button"], .glassmorphism-card[interactive="true"]',
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transition = "all 0.2s ease-out"
    })
  })
})
