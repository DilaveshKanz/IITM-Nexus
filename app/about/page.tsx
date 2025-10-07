"use client"

import { Github, Linkedin, Mail, Twitter, Globe, BookOpen, Calculator, Trophy, Users, Clock, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Team members data
const teamMembers = [
  {
    name: "Dilavesh Kanz",
    role: "Product Manager & Co-Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about creating educational solutions that empower students.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "dilavesh@iitmnexus.com",
    },
  },
  {
    name: "P Devanarayanan",
    role: "Lead Developer & Co-Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Full-stack developer with expertise in modern web technologies.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "devan@iitmnexus.com",
    },
  },
]

// Key features data
const keyFeatures = [
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Comprehensive study materials and academic resources",
  },
  {
    icon: Calculator,
    title: "Academic Tools",
    description: "CGPA calculator, grade predictor, and planning tools",
  },
  {
    icon: Trophy,
    title: "Quiz Preparation",
    description: "Interactive quizzes and exam preparation materials",
  },
  {
    icon: Clock,
    title: "Study Planner",
    description: "Organize your study schedule and track progress",
  },
  {
    icon: Link,
    title: "Essential Links",
    description: "Quick access to important IITM resources and portals",
  },
  {
    icon: Users,
    title: "Community Updates",
    description: "Latest news and announcements for IITM students",
  },
]

export default function About() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Header Section */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About IITM Nexus</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A comprehensive platform designed specifically for IITM BS Degree students, providing essential tools and
              resources to enhance your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Website Description Section */}
      <section className="py-16 border-t border-border/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              IITM Nexus brings together all the tools and resources you need for academic success in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="border border-border/50 hover:border-border transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 border-t border-border/50">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">The passionate individuals behind IITM Nexus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                    />
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" asChild>
                      <a href={member.social.email} aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" asChild>
                      <a href={member.social.twitter} aria-label="Twitter">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" asChild>
                      <a href={member.social.linkedin} aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" asChild>
                      <a href={member.social.github} aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 border-t border-border/50">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              To empower IITM BS Degree students with comprehensive digital tools and resources that simplify academic
              management, enhance learning outcomes, and foster a supportive educational community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full px-8">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                <Globe className="w-4 h-4 mr-2" />
                Visit Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="py-12 border-t border-border/50 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">Resources Available</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">Platform Access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
