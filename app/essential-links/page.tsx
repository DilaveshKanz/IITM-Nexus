"use client"

import { motion } from "framer-motion"
import { ExternalLink, Bookmark, GraduationCap, Youtube, Linkedin, Instagram } from "lucide-react"
import { SectionTitle } from "@/components/section-title"
import { PageTransition } from "@/components/page-transition"
import { staggeredContainer, fadeInUp } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

// IITM Official Pages data
const officialPages = [
  {
    name: "IITM BS Official Website",
    description:
      "The official website for the IITM BS Degree program with all program information, admissions details, and official announcements.",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [
      { type: "linkedin", url: "https://www.linkedin.com/school/indian-institute-of-technology-madras/" },
      { type: "youtube", url: "https://www.youtube.com/channel/UCvKzzGO37oT83K0FwnUucxw" },
    ],
  },
  {
    name: "IITM Student Portal",
    description:
      "Log in to your student account to access courses, assignments, and track your academic progress in the program.",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "instagram", url: "https://www.instagram.com/iitmadras/" }],
  },
  {
    name: "IITM Learning Management System",
    description: "Access your course materials, lectures, assignments, and interact with faculty and fellow students.",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "youtube", url: "https://www.youtube.com/channel/UCvKzzGO37oT83K0FwnUucxw" }],
  },
  {
    name: "IITM Discussion Forum",
    description: "Engage with fellow students and faculty in academic discussions, ask questions, and share knowledge.",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "linkedin", url: "https://www.linkedin.com/school/indian-institute-of-technology-madras/" }],
  },
  {
    name: "IITM Digital Library",
    description: "Access the digital library for research papers, e-books, and other academic resources.",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [],
  },
]

// Houses of the IITM BS Program
const programHouses = [
  {
    name: "Wayanad House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [
      { type: "instagram", url: "https://instagram.com/" },
      { type: "linkedin", url: "https://linkedin.com/" },
    ],
  },
  {
    name: "Sundarbans House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "youtube", url: "https://youtube.com/" }],
  },
  {
    name: "Saranda House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "instagram", url: "https://instagram.com/" }],
  },
  {
    name: "Pichavaram House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "linkedin", url: "https://linkedin.com/" }],
  },
  {
    name: "Nilgiri House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [
      { type: "youtube", url: "https://youtube.com/" },
      { type: "instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "Namdapha House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "linkedin", url: "https://linkedin.com/" }],
  },
  {
    name: "Nallamala House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "instagram", url: "https://instagram.com/" }],
  },
  {
    name: "Kaziranga House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "youtube", url: "https://youtube.com/" }],
  },
  {
    name: "Kanha House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/" },
      { type: "instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "Gir House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "youtube", url: "https://youtube.com/" }],
  },
  {
    name: "Corbett House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [{ type: "instagram", url: "https://instagram.com/" }],
  },
  {
    name: "Bandipur House",
    href: "https://study.iitm.ac.in/ds/",
    logo: "/placeholder.svg?height=100&width=100",
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/" },
      { type: "youtube", url: "https://youtube.com/" },
    ],
  },
]

// Other Links including YouTube channels
const otherLinks = [
  {
    name: "IITM BS Official YouTube Channel",
    description: "Official channel featuring lectures, program updates, and educational content from IITM faculty.",
    href: "https://www.youtube.com/channel/UCvKzzGO37oT83K0FwnUucxw",
    type: "youtube",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Student Community",
    description: "Unofficial channel run by students sharing tips, experiences, and study resources.",
    href: "https://youtube.com/",
    type: "youtube",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Programming Tutorials",
    description: "Tutorials and coding examples specifically for IITM BS programming courses.",
    href: "https://youtube.com/",
    type: "youtube",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Alumni Network",
    description: "Connect with IITM BS alumni for mentorship and networking opportunities.",
    href: "https://linkedin.com/",
    type: "resource",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Career Services",
    description: "Explore career opportunities and placement services for IITM BS students.",
    href: "https://study.iitm.ac.in/ds/",
    type: "resource",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Math Help Community",
    description: "Community-driven resource for mathematics help and problem-solving.",
    href: "https://discord.com/",
    type: "community",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "IITM BS Programming Forum",
    description: "Forum dedicated to programming and computer science discussions for IITM BS students.",
    href: "https://github.com/",
    type: "community",
    logo: "/placeholder.svg?height=100&width=100",
  },
]

// Social media icon mapping - now only Instagram, LinkedIn and YouTube
const SocialIcon = ({ type, url }: { type: string; url: string }) => {
  const iconMap: Record<string, any> = {
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  }

  const IconComponent = iconMap[type] || ExternalLink

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <IconComponent className="h-5 w-5" />
        <span className="sr-only">{type}</span>
      </Button>
    </a>
  )
}

export default function EssentialLinks() {
  const [activeTab, setActiveTab] = useState("official")

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="container px-4 py-10 md:py-16">
          <SectionTitle
            title="Essential Links"
            subtitle="Quick access to important resources and platforms for IITM BS Degree students"
            align="center"
            className="mb-12"
          />

          {/* Enhanced Section Selection Tabs with Moving Border Effect */}
          <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="p-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-xl shadow-lg">
              <div className="flex justify-between">
                {[
                  { id: "official", label: "IITM Official Pages" },
                  { id: "houses", label: "IITM BS Houses" },
                  { id: "other", label: "Other Links" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 text-sm sm:text-base py-2.5 px-3 m-0.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${
                      activeTab === tab.id ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-white/15 rounded-lg -z-10"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div>
            {/* IITM Official Pages Section */}
            {activeTab === "official" && (
              <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-10">
                <h2 className="text-2xl font-heading mb-8">IITM Official Pages</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {officialPages.map((page, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <GlassmorphismCard className="h-full">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start gap-5">
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                                <img
                                  src={page.logo || "/placeholder.svg"}
                                  alt={`${page.name} logo`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-xl font-medium mb-3">{page.name}</h3>
                              <p className="text-gray-400 text-sm mb-4">{page.description}</p>
                            </div>
                          </div>

                          <div className="mt-auto pt-5 flex justify-between items-center">
                            <div className="flex space-x-2">
                              {page.socialLinks.map((link, i) => (
                                <SocialIcon key={i} type={link.type} url={link.url} />
                              ))}
                            </div>

                            <a
                              href={page.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white font-medium text-sm bg-white/10 hover:bg-white/20 transition-colors rounded-full px-5 py-2.5"
                            >
                              <span>Visit</span>
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Houses of the IITM BS Program Section */}
            {activeTab === "houses" && (
              <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-10">
                <h2 className="text-2xl font-heading mb-8">Houses of the IITM BS Program</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {programHouses.map((house, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <GlassmorphismCard className="h-full">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center gap-5 mb-4">
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                                <img
                                  src={house.logo || "/placeholder.svg"}
                                  alt={`${house.name} logo`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-medium">{house.name}</h3>
                            </div>
                          </div>

                          <div className="mt-auto pt-5 flex justify-between items-center">
                            <div className="flex space-x-2">
                              {house.socialLinks.map((link, i) => (
                                <SocialIcon key={i} type={link.type} url={link.url} />
                              ))}
                            </div>

                            <a
                              href={house.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-white font-medium text-sm bg-white/10 hover:bg-white/20 transition-colors rounded-full px-5 py-2.5"
                            >
                              <span>Visit</span>
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other Links Section */}
            {activeTab === "other" && (
              <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-12">
                <h2 className="text-2xl font-heading mb-8">Other Links</h2>

                {/* YouTube Channels Section */}
                <div className="mb-12">
                  <h3 className="text-xl font-medium mb-6 flex items-center">
                    <Youtube className="mr-3 h-5 w-5 text-red-500" />
                    YouTube Channels
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherLinks
                      .filter((link) => link.type === "youtube")
                      .map((channel, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <GlassmorphismCard className="h-full">
                            <div className="p-6 flex flex-col h-full">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-red-500/10 flex items-center justify-center">
                                  <img
                                    src={channel.logo || "/placeholder.svg"}
                                    alt={`${channel.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium">{channel.name}</h4>
                              </div>

                              <p className="text-gray-400 text-sm mb-5">{channel.description}</p>

                              <div className="mt-auto">
                                <a
                                  href={channel.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-full text-white font-medium text-sm bg-red-500/20 hover:bg-red-500/30 transition-colors rounded-md px-4 py-3"
                                >
                                  <Youtube className="mr-2 h-4 w-4" />
                                  <span>Watch Channel</span>
                                </a>
                              </div>
                            </div>
                          </GlassmorphismCard>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Community Resources Section */}
                <div className="mb-12">
                  <h3 className="text-xl font-medium mb-6 flex items-center">
                    <Bookmark className="mr-3 h-5 w-5 text-blue-400" />
                    Community Resources
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherLinks
                      .filter((link) => link.type === "community")
                      .map((resource, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <GlassmorphismCard className="h-full">
                            <div className="p-6 flex flex-col h-full">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-500/10 flex items-center justify-center">
                                  <img
                                    src={resource.logo || "/placeholder.svg"}
                                    alt={`${resource.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium">{resource.name}</h4>
                              </div>

                              <p className="text-gray-400 text-sm mb-5">{resource.description}</p>

                              <div className="mt-auto">
                                <a
                                  href={resource.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-full text-white font-medium text-sm bg-blue-500/20 hover:bg-blue-500/30 transition-colors rounded-md px-4 py-3"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  <span>Join Community</span>
                                </a>
                              </div>
                            </div>
                          </GlassmorphismCard>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Additional Resources Section */}
                <div>
                  <h3 className="text-xl font-medium mb-6 flex items-center">
                    <GraduationCap className="mr-3 h-5 w-5 text-green-400" />
                    Additional Resources
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherLinks
                      .filter((link) => link.type === "resource")
                      .map((resource, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <GlassmorphismCard className="h-full">
                            <div className="p-6 flex flex-col h-full">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-green-500/10 flex items-center justify-center">
                                  <img
                                    src={resource.logo || "/placeholder.svg"}
                                    alt={`${resource.name} logo`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium">{resource.name}</h4>
                              </div>

                              <p className="text-gray-400 text-sm mb-5">{resource.description}</p>

                              <div className="mt-auto">
                                <a
                                  href={resource.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center w-full text-white font-medium text-sm bg-green-500/20 hover:bg-green-500/30 transition-colors rounded-md px-4 py-3"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  <span>Access Resource</span>
                                </a>
                              </div>
                            </div>
                          </GlassmorphismCard>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
