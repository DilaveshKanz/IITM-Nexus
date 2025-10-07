"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  User,
  Calendar,
  Clock,
  FolderOpen,
  Filter,
  Search,
  X,
  Plus,
  Upload,
  LinkIcon,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { SectionTitle } from "@/components/section-title"
import { PageTransition } from "@/components/page-transition"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { handleResizeObserverError } from "@/lib/resize-observer-error-handler"

// Hierarchical data structure: Course -> Level -> Subject -> Authors -> Notes
const resourceData = {
  "Data Science": {
    Foundation: {
      "Mathematics I": [
        {
          id: "author1",
          name: "Dr. Rajesh Kumar",
          notes: [
            { id: 1, title: "Basic Algebra", fileSize: "2.4 MB", updateDate: "2023-10-15" },
            { id: 2, title: "Linear Equations", fileSize: "3.1 MB", updateDate: "2023-10-22" },
          ],
        },
      ],
      Statistics: [
        {
          id: "author2",
          name: "Prof. Anita Desai",
          notes: [
            { id: 3, title: "Descriptive Statistics", fileSize: "1.8 MB", updateDate: "2023-11-05" },
            { id: 4, title: "Probability Basics", fileSize: "2.7 MB", updateDate: "2023-11-12" },
          ],
        },
      ],
    },
    Diploma: {
      "Programming in Python": [
        {
          id: "author3",
          name: "Dr. Vikram Singh",
          notes: [
            { id: 5, title: "Python Fundamentals", fileSize: "3.2 MB", updateDate: "2023-09-10" },
            { id: 6, title: "Data Structures in Python", fileSize: "2.8 MB", updateDate: "2023-09-17" },
          ],
        },
      ],
      "Database Management": [
        {
          id: "author4",
          name: "Dr. Priya Sharma",
          notes: [
            { id: 7, title: "SQL Basics", fileSize: "2.1 MB", updateDate: "2023-10-05" },
            { id: 8, title: "Database Design", fileSize: "2.5 MB", updateDate: "2023-10-12" },
          ],
        },
      ],
    },
    BSc: {
      "Machine Learning": [
        {
          id: "author5",
          name: "Prof. Rahul Verma",
          notes: [
            { id: 9, title: "Supervised Learning", fileSize: "3.0 MB", updateDate: "2023-10-19" },
            { id: 10, title: "Unsupervised Learning", fileSize: "2.6 MB", updateDate: "2023-10-26" },
          ],
        },
      ],
      "Deep Learning": [
        {
          id: "author6",
          name: "Dr. Suresh Patel",
          notes: [
            { id: 11, title: "Neural Networks", fileSize: "1.9 MB", updateDate: "2023-11-02" },
            { id: 12, title: "Convolutional Networks", fileSize: "2.2 MB", updateDate: "2023-11-09" },
          ],
        },
      ],
    },
    BS: {
      "Advanced Analytics": [
        {
          id: "author7",
          name: "Dr. Anil Gupta",
          notes: [
            { id: 13, title: "Time Series Analysis", fileSize: "2.3 MB", updateDate: "2023-09-05" },
            { id: 14, title: "Predictive Modeling", fileSize: "2.7 MB", updateDate: "2023-09-12" },
          ],
        },
      ],
      "Big Data Analytics": [
        {
          id: "author8",
          name: "Dr. Meera Iyer",
          notes: [
            { id: 15, title: "Hadoop Ecosystem", fileSize: "1.8 MB", updateDate: "2023-10-08" },
            { id: 16, title: "Spark Programming", fileSize: "2.0 MB", updateDate: "2023-10-15" },
          ],
        },
      ],
    },
  },
  Electronics: {
    Foundation: {
      "Basic Electronics": [
        {
          id: "author9",
          name: "Dr. Ravi Kumar",
          notes: [
            { id: 17, title: "Circuit Analysis", fileSize: "2.5 MB", updateDate: "2023-10-20" },
            { id: 18, title: "Semiconductor Devices", fileSize: "3.0 MB", updateDate: "2023-10-27" },
          ],
        },
      ],
      "Mathematics for Electronics": [
        {
          id: "author10",
          name: "Prof. Sita Devi",
          notes: [
            { id: 19, title: "Complex Numbers", fileSize: "2.2 MB", updateDate: "2023-11-01" },
            { id: 20, title: "Fourier Analysis", fileSize: "2.8 MB", updateDate: "2023-11-08" },
          ],
        },
      ],
    },
    Diploma: {
      "Digital Electronics": [
        {
          id: "author11",
          name: "Dr. Amit Sharma",
          notes: [
            { id: 21, title: "Boolean Algebra", fileSize: "1.9 MB", updateDate: "2023-11-02" },
            { id: 22, title: "Logic Gates", fileSize: "2.2 MB", updateDate: "2023-11-09" },
          ],
        },
      ],
      Microprocessors: [
        {
          id: "author12",
          name: "Prof. Kavita Singh",
          notes: [
            { id: 23, title: "8085 Architecture", fileSize: "2.7 MB", updateDate: "2023-10-30" },
            { id: 24, title: "Assembly Programming", fileSize: "3.1 MB", updateDate: "2023-11-06" },
          ],
        },
      ],
    },
    BS: {
      "VLSI Design": [
        {
          id: "author13",
          name: "Dr. Rajesh Gupta",
          notes: [
            { id: 25, title: "CMOS Technology", fileSize: "2.4 MB", updateDate: "2023-10-25" },
            { id: 26, title: "Layout Design", fileSize: "2.9 MB", updateDate: "2023-11-01" },
          ],
        },
      ],
      "Communication Systems": [
        {
          id: "author14",
          name: "Dr. Sunita Rao",
          notes: [
            { id: 27, title: "Analog Communication", fileSize: "2.6 MB", updateDate: "2023-10-28" },
            { id: 28, title: "Digital Communication", fileSize: "3.2 MB", updateDate: "2023-11-04" },
          ],
        },
      ],
    },
  },
}

// Sample grading documents data
const gradingDocuments = [
  {
    id: "grade1",
    title: "Assignment 1 - Grading Rubric",
    description:
      "Detailed grading criteria and rubric for the first assignment covering fundamental concepts and practical applications.",
    type: "Assignment",
    lastUpdated: "2023-11-10",
  },
  {
    id: "grade2",
    title: "Mid-term Exam Guidelines",
    description:
      "Comprehensive examination format, duration, marking scheme, and preparation guidelines for the mid-term assessment.",
    type: "Exam",
    lastUpdated: "2023-11-15",
  },
  {
    id: "grade3",
    title: "Project Evaluation Criteria",
    description:
      "Complete evaluation criteria for final projects including technical implementation, documentation, and presentation requirements.",
    type: "Project",
    lastUpdated: "2023-11-08",
  },
  {
    id: "grade4",
    title: "Lab Assessment Guidelines",
    description:
      "Practical assessment criteria, lab report requirements, and evaluation standards for laboratory sessions.",
    type: "Lab",
    lastUpdated: "2023-11-12",
  },
  {
    id: "grade5",
    title: "Final Examination Format",
    description:
      "Detailed information about the final examination structure, question patterns, and assessment methodology.",
    type: "Exam",
    lastUpdated: "2023-11-20",
  },
  {
    id: "grade6",
    title: "Continuous Assessment Policy",
    description:
      "Guidelines for continuous assessment including quiz formats, participation grades, and overall evaluation framework.",
    type: "Assignment",
    lastUpdated: "2023-11-18",
  },
]

// Sample lecture videos data
const lectureVideos = [
  {
    id: "vid1",
    title: "Introduction to Data Science",
    course: "Data Science",
    level: "Foundation",
    subject: "Statistics",
    author: "Dr. Rajesh Kumar",
    duration: "45:22",
    uploadDate: "2023-11-15",
    url: "#",
  },
  {
    id: "vid2",
    title: "Python Programming Basics",
    course: "Data Science",
    level: "Diploma",
    subject: "Programming in Python",
    author: "Dr. Vikram Singh",
    duration: "52:14",
    uploadDate: "2023-11-20",
    url: "#",
  },
  {
    id: "vid3",
    title: "Circuit Analysis Fundamentals",
    course: "Electronics",
    level: "Foundation",
    subject: "Basic Electronics",
    author: "Dr. Ravi Kumar",
    duration: "48:37",
    uploadDate: "2023-10-25",
    url: "#",
  },
]

// Enhanced Add Resource Form Component
function AddResourceForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    description: "",
    driveLink: "",
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      file,
      // Clear drive link if file is selected
      driveLink: file ? "" : prev.driveLink,
    }))
  }

  const handleDriveLinkChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      driveLink: value,
      // Clear file if drive link is entered
      file: value ? null : prev.file,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would integrate with your Google Form
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setShowSuccess(true)

      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          description: "",
          driveLink: "",
          file: null,
        })
        setShowSuccess(false)
        onClose()
      }, 2500)
    } catch (error) {
      console.error("Error submitting resource:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.description.trim() && (formData.driveLink || formData.file)

  if (showSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Resource Submitted Successfully!</h3>
        <p className="text-muted-foreground">Your document is currently under review and will be available soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-foreground">
          Resource Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Provide a detailed description of the resource..."
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="min-h-[100px] bg-background/50 backdrop-blur-sm border-white/20 resize-none focus:border-primary/50 transition-colors"
          required
        />
      </div>

      {/* Resource Type Selection */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground">Choose Resource Type * (Select one option)</Label>

        {/* Google Drive Link Option */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="driveOption"
              name="resourceType"
              checked={!!formData.driveLink}
              onChange={() => {}}
              className="text-primary focus:ring-primary"
            />
            <Label htmlFor="driveOption" className="text-sm text-foreground">
              Google Drive Link
            </Label>
          </div>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://drive.google.com/..."
              value={formData.driveLink}
              onChange={(e) => handleDriveLinkChange(e.target.value)}
              disabled={!!formData.file}
              className="pl-10 bg-background/50 backdrop-blur-sm border-white/20 focus:border-primary/50 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* File Upload Option */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="fileOption"
              name="resourceType"
              checked={!!formData.file}
              onChange={() => {}}
              className="text-primary focus:ring-primary"
            />
            <Label htmlFor="fileOption" className="text-sm text-foreground">
              Upload PDF File
            </Label>
          </div>
          <div className="relative">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={!!formData.driveLink}
              className="bg-background/50 backdrop-blur-sm border border-white/20 focus:border-primary/50 transition-colors disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
            />
            {formData.file && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 p-2 rounded-md"
              >
                <Upload className="h-4 w-4 text-primary" />
                <span className="text-foreground">{formData.file.name}</span>
                <span>({(formData.file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button
          type="button"
          variant="outline"
          className="bg-background/50 hover:bg-background/70 border border-white/20"
          onClick={() => {
            setFormData({
              description: "",
              driveLink: "",
              file: null,
            })
          }}
        >
          Clear Form
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary disabled:opacity-50 min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <motion.div
                className="h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Submitting...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Submit Resource
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

// Filter Component
function FilterSection({
  selectedCourse,
  selectedLevel,
  selectedSubject,
  searchQuery,
  courses,
  levels,
  subjects,
  onCourseChange,
  onLevelChange,
  onSubjectChange,
  onSearchChange,
  onResetFilters,
  addResourceButton, // New optional prop
}: {
  selectedCourse: string
  selectedLevel: string
  selectedSubject: string
  searchQuery: string
  courses: string[]
  levels: string[]
  subjects: string[]
  onCourseChange: (course: string) => void
  onLevelChange: (level: string) => void
  onSubjectChange: (subject: string) => void
  onSearchChange: (query: string) => void
  onResetFilters: () => void
  addResourceButton?: React.ReactNode // New optional prop
}) {
  return (
    <div className="mb-8 space-y-6 bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filter Resources</h3>
        </div>
        {addResourceButton && <div className="flex-shrink-0">{addResourceButton}</div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Course Filter */}
        <Select value={selectedCourse} onValueChange={onCourseChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {courses.map((course) => (
              <SelectItem key={course} value={course} className="hover:bg-white/10">
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Level Filter */}
        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {levels.map((level) => (
              <SelectItem key={level} value={level} className="hover:bg-white/10">
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject Filter */}
        <Select value={selectedSubject} onValueChange={onSubjectChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject} className="hover:bg-white/10">
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display and Reset Button */}
      {(selectedCourse !== "All Courses" ||
        selectedLevel !== "All Levels" ||
        selectedSubject !== "All Subjects" ||
        searchQuery) && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {selectedCourse !== "All Courses" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Course: {selectedCourse}
              </Badge>
            )}
            {selectedLevel !== "All Levels" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Level: {selectedLevel}
              </Badge>
            )}
            {selectedSubject !== "All Subjects" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Subject: {selectedSubject}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="bg-background/50 hover:bg-background/70 border-white/20 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Resources() {
  const [activeTab, setActiveTab] = useState("notes")
  const [selectedCourse, setSelectedCourse] = useState<string>("All Courses")
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels")
  const [selectedSubject, setSelectedSubject] = useState<string>("All Subjects")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedAuthors, setExpandedAuthors] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle ResizeObserver errors
  useEffect(() => {
    handleResizeObserverError()
  }, [])

  // Get available courses
  const courses = ["All Courses", ...Object.keys(resourceData)]

  // Get available levels based on selected course
  const levels = useMemo(() => {
    if (selectedCourse === "All Courses") {
      const allLevels = new Set<string>()
      Object.values(resourceData).forEach((courseData) => {
        Object.keys(courseData).forEach((level) => allLevels.add(level))
      })
      return ["All Levels", ...Array.from(allLevels)]
    }
    return ["All Levels", ...Object.keys(resourceData[selectedCourse as keyof typeof resourceData] || {})]
  }, [selectedCourse])

  // Get available subjects based on selected course and level
  const subjects = useMemo(() => {
    if (selectedCourse === "All Courses") {
      // If no specific course is selected, show all subjects from all courses and levels
      const allSubjects = new Set<string>()
      Object.values(resourceData).forEach((courseData) => {
        Object.values(courseData).forEach((levelData) => {
          Object.keys(levelData).forEach((subject) => allSubjects.add(subject))
        })
      })
      return ["All Subjects", ...Array.from(allSubjects).sort()]
    }

    if (selectedLevel === "All Levels") {
      // If course is selected but not level, show all subjects from that course
      const courseData = resourceData[selectedCourse as keyof typeof resourceData]
      const allSubjects = new Set<string>()
      if (courseData) {
        Object.values(courseData).forEach((levelData) => {
          Object.keys(levelData).forEach((subject) => allSubjects.add(subject))
        })
      }
      return ["All Subjects", ...Array.from(allSubjects).sort()]
    }

    // Both course and level are selected, show subjects for that specific combination
    const courseData = resourceData[selectedCourse as keyof typeof resourceData]
    const levelData = courseData?.[selectedLevel as keyof typeof courseData]
    const subjects = levelData ? Object.keys(levelData) : []
    return ["All Subjects", ...subjects.sort()]
  }, [selectedCourse, selectedLevel])

  // Filter and organize course notes
  const filteredCourseNotes = useMemo(() => {
    const results: Array<{
      course: string
      level: string
      subject: string
      authors: Array<{
        id: string
        name: string
        notes: Array<{ id: number; title: string; fileSize: string; updateDate: string }>
      }>
    }> = []

    Object.entries(resourceData).forEach(([course, courseData]) => {
      if (selectedCourse !== "All Courses" && selectedCourse !== course) return

      Object.entries(courseData).forEach(([level, levelData]) => {
        if (selectedLevel !== "All Levels" && selectedLevel !== level) return

        Object.entries(levelData).forEach(([subject, authors]) => {
          if (selectedSubject !== "All Subjects" && selectedSubject !== subject) return

          // Filter by search query
          const filteredAuthors = authors.filter((author) => {
            const matchesAuthor = author.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesNotes = author.notes.some((note) =>
              note.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            return matchesAuthor || matchesNotes || searchQuery === ""
          })

          if (filteredAuthors.length > 0) {
            results.push({
              course,
              level,
              subject,
              authors: filteredAuthors,
            })
          }
        })
      })
    })

    return results
  }, [selectedCourse, selectedLevel, selectedSubject, searchQuery])

  // Filter lecture videos
  const filteredLectureVideos = useMemo(() => {
    return lectureVideos.filter((video) => {
      const matchesCourse = selectedCourse === "All Courses" || video.course === selectedCourse
      const matchesLevel = selectedLevel === "All Levels" || video.level === selectedLevel
      const matchesSubject = selectedSubject === "All Subjects" || video.subject === selectedSubject
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCourse && matchesLevel && matchesSubject && matchesSearch
    })
  }, [selectedCourse, selectedLevel, selectedSubject, searchQuery])

  // Toggle author expansion
  const toggleAuthorExpansion = (authorId: string) => {
    if (expandedAuthors.includes(authorId)) {
      setExpandedAuthors(expandedAuthors.filter((id) => id !== authorId))
    } else {
      setExpandedAuthors([...expandedAuthors, authorId])
    }
  }

  // Reset filters when course changes
  const handleCourseChange = (course: string) => {
    setSelectedCourse(course)
    setSelectedLevel("All Levels")
    setSelectedSubject("All Subjects")
  }

  // Reset subject filter when level changes
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setSelectedSubject("All Subjects")
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCourse("All Courses")
    setSelectedLevel("All Levels")
    setSelectedSubject("All Subjects")
    setSearchQuery("")
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="container px-3 sm:px-4 py-8 sm:py-10 md:py-16">
          <div className="mb-8">
            <SectionTitle
              title="Learning Resources"
              subtitle="Access comprehensive study materials, grading documents, and lecture videos"
            />
          </div>

          <Tabs defaultValue="notes" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 md:mb-10 bg-background/50 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
              <TabsTrigger
                value="notes"
                className="flex gap-2 items-center data-[state=active]:bg-white/10 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Course Notes</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
              <TabsTrigger
                value="grading"
                className="flex gap-2 items-center data-[state=active]:bg-white/10 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Grading Docs</span>
                <span className="sm:hidden">Grading</span>
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex gap-2 items-center data-[state=active]:bg-white/10 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Lecture Videos</span>
                <span className="sm:hidden">Videos</span>
              </TabsTrigger>
            </TabsList>

            {/* Course Notes Tab */}
            <TabsContent value="notes">
              <FilterSection
                selectedCourse={selectedCourse}
                selectedLevel={selectedLevel}
                selectedSubject={selectedSubject}
                searchQuery={searchQuery}
                courses={courses}
                levels={levels}
                subjects={subjects}
                onCourseChange={handleCourseChange}
                onLevelChange={handleLevelChange}
                onSubjectChange={setSelectedSubject}
                onSearchChange={setSearchQuery}
                onResetFilters={resetFilters}
                addResourceButton={
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary shadow-lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Course Material
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-foreground">Add Course Material</DialogTitle>
                      </DialogHeader>
                      <AddResourceForm onClose={() => setIsDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                }
              />

              {filteredCourseNotes.length > 0 ? (
                <div className="space-y-6">
                  {filteredCourseNotes.map((item, index) => (
                    <motion.div
                      key={`${item.course}-${item.level}-${item.subject}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <GlassmorphismCard className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                          <h3 className="text-lg sm:text-xl font-semibold">{item.subject}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {item.course}
                            </Badge>
                            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                              {item.level}
                            </Badge>
                          </div>
                        </div>

                        {/* Authors */}
                        <div className="space-y-3">
                          {item.authors.map((author) => (
                            <motion.div
                              key={author.id}
                              className="border border-white/10 rounded-lg overflow-hidden bg-background/20 backdrop-blur-sm"
                              whileHover={{ scale: 1.01 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.div
                                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => toggleAuthorExpansion(author.id)}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center min-w-0 flex-1">
                                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />
                                  <h4 className="font-medium text-foreground text-sm sm:text-base truncate">
                                    {author.name}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 sm:ml-3 bg-primary/10 text-primary text-xs flex-shrink-0"
                                  >
                                    {author.notes.length}
                                  </Badge>
                                </div>
                                <motion.div
                                  animate={{ rotate: expandedAuthors.includes(author.id) ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </motion.div>
                              </motion.div>

                              {/* Author's Notes */}
                              <AnimatePresence>
                                {expandedAuthors.includes(author.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 space-y-2">
                                      {author.notes.map((note, noteIndex) => (
                                        <motion.div
                                          key={note.id}
                                          initial={{ x: -20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ delay: noteIndex * 0.1 }}
                                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/5 gap-2 sm:gap-0"
                                        >
                                          <div className="flex items-center flex-1 min-w-0">
                                            <FileText className="h-4 w-4 mr-2 sm:mr-3 text-primary flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <h5 className="font-medium text-foreground text-sm sm:text-base truncate">
                                                {note.title}
                                              </h5>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>Updated: {note.updateDate}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between sm:justify-end gap-3 sm:ml-4">
                                            <span className="text-xs text-muted-foreground">{note.fileSize}</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 w-8 p-0 hover:bg-white/10 border border-white/10 flex-shrink-0"
                                            >
                                              <Download className="h-4 w-4" />
                                              <span className="sr-only">Download {note.title}</span>
                                            </Button>
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">No course notes found for the selected filters</p>
                  <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search query</p>
                </motion.div>
              )}
            </TabsContent>

            {/* Grading Documents Tab */}
            <TabsContent value="grading">
              <div className="mb-8"></div>

              {gradingDocuments.length > 0 ? (
                <div className="space-y-4">
                  {gradingDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <GlassmorphismCard className="p-6 hover:bg-white/5 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold mb-2 text-foreground">{doc.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{doc.description}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Last updated on: {doc.lastUpdated}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`${
                                  doc.type === "Assignment"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : doc.type === "Exam"
                                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                                      : doc.type === "Project"
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                }`}
                              >
                                {doc.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">No grading documents available</p>
                  <p className="text-muted-foreground text-sm mt-2">Check back later for assessment guidelines</p>
                </motion.div>
              )}
            </TabsContent>

            {/* Lecture Videos Tab */}
            <TabsContent value="videos">
              <FilterSection
                selectedCourse={selectedCourse}
                selectedLevel={selectedLevel}
                selectedSubject={selectedSubject}
                searchQuery={searchQuery}
                courses={courses}
                levels={levels}
                subjects={subjects}
                onCourseChange={handleCourseChange}
                onLevelChange={handleLevelChange}
                onSubjectChange={setSelectedSubject}
                onSearchChange={setSearchQuery}
                onResetFilters={resetFilters}
              />

              <div className="flex items-center gap-3 mb-6">
                <Video className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Lecture Videos</h3>
                  <p className="text-sm text-muted-foreground">Recorded lectures and educational content</p>
                </div>
              </div>

              {filteredLectureVideos.length > 0 ? (
                <div className="space-y-4">
                  {filteredLectureVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <GlassmorphismCard className="p-6 hover:bg-white/5 transition-colors">
                        {/* Breadcrumb for videos */}
                        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                          <FolderOpen className="h-4 w-4" />
                          <span>{video.course}</span>
                          <span>/</span>
                          <span>{video.level}</span>
                          <span>/</span>
                          <span>{video.subject}</span>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2 text-foreground">{video.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{video.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{video.duration}</span>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                  {video.course}
                                </Badge>
                                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                                  {video.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-xs text-muted-foreground">Uploaded: {video.uploadDate}</div>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-primary/20 hover:bg-primary/30 border border-primary/30"
                              asChild
                            >
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <span>Watch</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">No lecture videos found for the selected filters</p>
                  <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search query</p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
