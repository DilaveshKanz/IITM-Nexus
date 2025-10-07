"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, ChevronDown, Filter, X, Video, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlossyMonochromeCard } from "@/components/ui/glossy-monochrome-card"
import { SectionTitle } from "@/components/section-title"
import { PageTransition } from "@/components/page-transition"
import { staggeredContainer, fadeInUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"

// Combined data for all updates
const allUpdates = [
  // Announcements
  {
    id: "a1",
    type: "announcement",
    title: "Registrations Open for Next Term",
    date: "2023-12-15",
    time: "09:00 AM",
    category: "Academic",
    content:
      "Registrations for the next term are now open. Please log in to the portal to register for your courses. The registration window will be open until December 30th. Make sure to check the course catalog for any new offerings and prerequisites before registering.",
  },
  {
    id: "a2",
    type: "announcement",
    title: "Quiz 1 Schedule Released",
    date: "2024-01-10",
    time: "10:30 AM",
    category: "Exams",
    content:
      "The schedule for Quiz 1 has been released. Please check your course pages for specific timing details. All quizzes will be conducted online through the examination portal. Make sure your system meets the technical requirements and you have a stable internet connection during the examination period.",
  },
  {
    id: "a3",
    type: "announcement",
    title: "Holiday Schedule Update",
    date: "2023-12-20",
    time: "02:15 PM",
    category: "General",
    content:
      "There will be a short break from December 25 to January 1. All platform services will remain operational during this period, but administrative support may be limited. Regular classes will resume on January 2nd. We wish all students a restful and enjoyable break.",
  },

  // Events
  {
    id: "e1",
    type: "event",
    title: "Virtual Career Fair",
    date: "2024-02-10",
    time: "10:00 AM - 4:00 PM",
    category: "Career",
    content:
      "Connect with potential employers and explore career opportunities in the annual virtual career fair. Over 50 companies from various industries will be participating. Prepare your resume and be ready to engage in one-on-one sessions with recruiters. Pre-registration is required through the career portal.",
    location: "Online",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "e2",
    type: "event",
    title: "Research Symposium",
    date: "2024-02-15",
    time: "2:00 PM - 6:00 PM",
    category: "Academic",
    content:
      "Join faculty and students in presenting and discussing ongoing research projects across disciplines. This is a great opportunity to learn about cutting-edge research and potential collaboration opportunities. Students interested in presenting their work should submit abstracts by January 30th.",
    location: "Virtual Auditorium",
    meetLink: "https://meet.google.com/xyz-abcd-efg",
  },
  {
    id: "e3",
    type: "event",
    title: "Python Workshop for Beginners",
    date: "2024-01-25",
    time: "3:00 PM - 5:00 PM",
    category: "Workshop",
    content:
      "Learn the basics of Python programming in this hands-on workshop designed for beginners. No prior programming experience is required. The workshop will cover fundamental concepts, syntax, and practical applications. Participants will work on small projects to reinforce their learning.",
    location: "Online",
    meetLink: "https://meet.google.com/pqr-stuv-wxy",
  },

  // News
  {
    id: "n1",
    type: "news",
    title: "IITM BS Program Recognized Internationally",
    date: "2023-12-18",
    time: "11:45 AM",
    category: "Recognition",
    content:
      "The IITM BS program has received international recognition for its innovative approach to online education. The program was highlighted in a recent international education conference as a model for accessible, high-quality online degrees. This recognition further validates the program's commitment to providing world-class education to students regardless of geographical constraints.",
  },
  {
    id: "n2",
    type: "news",
    title: "New Partnership with Industry Leaders",
    date: "2024-01-08",
    time: "09:30 AM",
    category: "Partnerships",
    content:
      "IITM has formed new partnerships with leading tech companies to enhance job placement opportunities for students. These partnerships will provide internship opportunities, industry projects, and potential job placements for graduating students. A series of industry connect sessions will be organized in the coming months to introduce students to these opportunities.",
  },
  {
    id: "n3",
    type: "news",
    title: "Student Achievement Spotlight",
    date: "2024-01-12",
    time: "03:20 PM",
    category: "Student Success",
    content:
      "IITM BS students win the national hackathon with their innovative solution for sustainable development. The team of four students developed a machine learning model that optimizes resource allocation for urban farming initiatives. Their solution was praised for its practical application and potential impact on urban sustainability.",
  },
]

// Filter categories
const filterCategories = [
  { value: "all", label: "All Updates" },
  { value: "announcement", label: "Announcements" },
  { value: "event", label: "Events" },
  { value: "news", label: "News" },
  { value: "Academic", label: "Academic" },
  { value: "Career", label: "Career" },
  { value: "General", label: "General" },
  { value: "Workshop", label: "Workshops" },
]

// Get badge color based on update type
const getBadgeVariant = (type: string) => {
  switch (type) {
    case "announcement":
      return "default"
    case "event":
      return "secondary"
    case "news":
      return "outline"
    default:
      return "default"
  }
}

// Get category badge color
const getCategoryBadgeVariant = (category: string) => {
  switch (category) {
    case "Academic":
      return "default"
    case "Exams":
      return "destructive"
    case "Career":
      return "secondary"
    case "Workshop":
      return "outline"
    default:
      return "default"
  }
}

export default function Updates() {
  const [dateTime, setDateTime] = useState({ date: "", time: "" })
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [filteredUpdates, setFilteredUpdates] = useState(allUpdates)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }

      setDateTime({
        date: now.toLocaleDateString(undefined, dateOptions),
        time: now.toLocaleTimeString(undefined, timeOptions),
      })
    }

    // Update immediately and then every second
    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    // Clean up on unmount
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredUpdates(allUpdates)
    } else {
      setFilteredUpdates(
        allUpdates.filter((update) => update.type === activeFilter || update.category === activeFilter),
      )
    }
  }, [activeFilter])

  const toggleCard = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null)
    } else {
      setExpandedCard(id)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-16 bg-background">
        {/* Date and Time Display */}
        <div className="fixed right-6 bottom-6 z-30 bg-card/30 backdrop-blur-md rounded-lg px-4 py-2 text-sm flex flex-col items-end border border-border/20 shadow-md">
          <div className="flex items-center text-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary/70" />
            <span>{dateTime.date}</span>
          </div>
          <div className="flex items-center text-foreground mt-1">
            <Clock className="h-4 w-4 mr-2 text-primary/70" />
            <span>{dateTime.time}</span>
          </div>
        </div>

        <div className="container px-4 py-10 md:py-16">
          <SectionTitle
            title="Updates & Announcements"
            subtitle="Stay informed with the latest news, events, and announcements from IITM BS Degree program"
            align="center"
            className="max-w-3xl mx-auto"
          />

          {/* Filter Controls */}
          <div className="relative mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-card/20 backdrop-blur-sm border-border/20 hover:bg-card/30 text-foreground"
              >
                <Filter className="h-4 w-4" />
                <span>Filter: {filterCategories.find((f) => f.value === activeFilter)?.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>

              <div className="text-sm text-muted-foreground">Showing {filteredUpdates.length} updates</div>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute z-10 mt-2 w-64 rounded-lg bg-card/30 backdrop-blur-md border border-border/20 p-3 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-2 px-2">
                    <h3 className="text-sm font-medium text-foreground">Filter Updates</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {filterCategories.map((category) => (
                      <button
                        key={category.value}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                          activeFilter === category.value
                            ? "bg-primary/20 text-foreground"
                            : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                        }`}
                        onClick={() => {
                          setActiveFilter(category.value)
                          setShowFilters(false)
                        }}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Updates Grid */}
          <motion.div
            variants={staggeredContainer}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map((update) => (
                <motion.div
                  key={update.id}
                  variants={fadeInUp}
                  className={expandedCard === update.id ? "md:col-span-2 lg:col-span-3" : ""}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <GlossyMonochromeCard
                    variant={update.type === "event" ? "glass" : "light"}
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl h-full"
                    onClick={() => toggleCard(update.id)}
                  >
                    <AnimatePresence mode="wait">
                      {expandedCard === update.id ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          {/* Expanded Card Content */}
                          <div className="flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex flex-wrap gap-2">
                                <Badge variant={getBadgeVariant(update.type)}>
                                  {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                                </Badge>
                                <Badge variant={getCategoryBadgeVariant(update.category)}>{update.category}</Badge>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedCard(null)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </div>

                            <motion.h3 className="text-xl font-medium mb-3 text-foreground" layout>
                              {update.title}
                            </motion.h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                <span>{update.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                <span>{update.time}</span>
                              </div>
                            </div>

                            <motion.div
                              className="bg-card/30 rounded-lg p-4 mb-4 border border-border/10"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <p className="text-muted-foreground">{update.content}</p>
                            </motion.div>

                            {/* Event-specific details */}
                            {update.type === "event" && (
                              <motion.div
                                className="space-y-3"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {update.location && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground mr-2">Location:</span>
                                    <span>{update.location}</span>
                                  </div>
                                )}

                                {update.meetLink && (
                                  <a
                                    href={update.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-foreground bg-card/50 hover:bg-card/70 transition-colors rounded-md px-4 py-2 w-fit"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Video className="h-4 w-4 mr-2" />
                                    Join Google Meet
                                    <ExternalLink className="h-3 w-3 ml-2" />
                                  </a>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col"
                          layout
                        >
                          {/* Collapsed Card Content */}
                          <div className="flex justify-between items-start mb-1">
                            <Badge variant={getBadgeVariant(update.type)}>
                              {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                            </Badge>
                            <Badge variant={getCategoryBadgeVariant(update.category)}>{update.category}</Badge>
                          </div>

                          <h3 className="text-lg font-medium my-3 line-clamp-2 text-foreground">{update.title}</h3>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>{update.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>{update.time}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-3 flex-grow">{update.content}</p>

                          <div className="mt-4 text-sm text-primary/70 flex items-center justify-end">
                            <span>Read more</span>
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlossyMonochromeCard>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-muted-foreground/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg">No updates found for the selected filter</p>
                <Button
                  variant="outline"
                  className="mt-4 border-border/30 bg-card/20 hover:bg-card/40 text-foreground"
                  onClick={() => setActiveFilter("all")}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
