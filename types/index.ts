// Define TypeScript interfaces for all data structures

export interface Announcement {
  id: number
  title: string
  date: string
  category: string
  content: string
}

export interface Event {
  id: number
  title: string
  date: string
  time: string
  category: string
  description: string
  location: string
}

export interface Course {
  id: string
  title: string
  category: string
  term: string
  notes: CourseNote[]
}

export interface CourseNote {
  id: number
  title: string
  fileSize: string
  updateDate: string
}

export interface QuestionPaper {
  id: string
  title: string
  year: string
  term: string
  difficulty: string
  type: string
  subject: string
  downloadUrl: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}
