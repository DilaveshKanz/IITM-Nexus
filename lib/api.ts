// Create a centralized API client for backend integration
export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`/api/${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

// Example API routes for different data types
export const api = {
  getAnnouncements: () => fetchData("announcements"),
  getEvents: () => fetchData("events"),
  getCourses: () => fetchData("courses"),
  getQuestionPapers: () => fetchData("question-papers"),
  submitContactForm: (data: any) => {
    return fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to submit form")
      return res.json()
    })
  },
}
