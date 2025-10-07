"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, BookOpen, Target, Plus, Edit, Trash2, CheckCircle, Circle, AlertCircle, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudyTask {
  id: string
  title: string
  description: string
  subject: string
  course: string
  priority: "low" | "medium" | "high"
  dueDate: string
  estimatedHours: number
  completedHours: number
  status: "pending" | "in-progress" | "completed"
  createdAt: string
}

interface StudyPlannerProps {
  courses: string[]
}

export function StudyPlanner({ courses }: StudyPlannerProps) {
  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "1",
      title: "Complete Statistics Assignment",
      description: "Solve problems 1-15 from Chapter 3",
      subject: "Statistics",
      course: "Data Science",
      priority: "high",
      dueDate: "2024-01-20",
      estimatedHours: 4,
      completedHours: 2,
      status: "in-progress",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Review Python Fundamentals",
      description: "Go through loops, functions, and data structures",
      subject: "Programming in Python",
      course: "Data Science",
      priority: "medium",
      dueDate: "2024-01-25",
      estimatedHours: 6,
      completedHours: 0,
      status: "pending",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      title: "Circuit Analysis Practice",
      description: "Solve 20 circuit problems from textbook",
      subject: "Basic Electronics",
      course: "Electronics",
      priority: "high",
      dueDate: "2024-01-18",
      estimatedHours: 3,
      completedHours: 3,
      status: "completed",
      createdAt: "2024-01-08",
    },
  ])

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCourse, setFilterCourse] = useState<string>("all")

  const [newTask, setNewTask] = useState<Partial<StudyTask>>({
    title: "",
    description: "",
    subject: "",
    course: "",
    priority: "medium",
    dueDate: "",
    estimatedHours: 1,
  })

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filterStatus === "all" || task.status === filterStatus
      const courseMatch = filterCourse === "all" || task.course === filterCourse
      return statusMatch && courseMatch
    })
  }, [tasks, filterStatus, filterCourse])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const pending = tasks.filter((t) => t.status === "pending").length
    const totalHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0)
    const completedHours = tasks.reduce((sum, t) => sum + t.completedHours, 0)

    return {
      total,
      completed,
      inProgress,
      pending,
      totalHours,
      completedHours,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      hoursProgress: totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0,
    }
  }, [tasks])

  const handleAddTask = () => {
    if (!newTask.title || !newTask.course || !newTask.dueDate) return

    const task: StudyTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || "",
      subject: newTask.subject || "",
      course: newTask.course,
      priority: newTask.priority || "medium",
      dueDate: newTask.dueDate,
      estimatedHours: newTask.estimatedHours || 1,
      completedHours: 0,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      subject: "",
      course: "",
      priority: "medium",
      dueDate: "",
      estimatedHours: 1,
    })
    setIsAddingTask(false)
  }

  const handleUpdateTask = (taskId: string, updates: Partial<StudyTask>) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    let newStatus: StudyTask["status"]
    if (task.status === "pending") newStatus = "in-progress"
    else if (task.status === "in-progress") newStatus = "completed"
    else newStatus = "pending"

    // If marking as completed, set completed hours to estimated hours
    const updates: Partial<StudyTask> = { status: newStatus }
    if (newStatus === "completed") {
      updates.completedHours = task.estimatedHours
    }

    handleUpdateTask(taskId, updates)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-400" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days overdue`, urgent: true }
    if (diffDays === 0) return { text: "Due today", urgent: true }
    if (diffDays === 1) return { text: "Due tomorrow", urgent: true }
    if (diffDays <= 3) return { text: `${diffDays} days left`, urgent: true }
    return { text: `${diffDays} days left`, urgent: false }
  }

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassmorphismCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold">{stats.completionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <Progress value={stats.completionRate} className="mt-2" />
        </GlassmorphismCard>

        <GlassmorphismCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Study Hours</p>
              <p className="text-2xl font-bold">
                {stats.completedHours}/{stats.totalHours}
              </p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <Progress value={stats.hoursProgress} className="mt-2" />
        </GlassmorphismCard>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-background/50 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-40 bg-background/50 backdrop-blur-sm border-white/20">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
              <SelectItem value="all">All Courses</SelectItem>
              {courses
                .filter((c) => c !== "All Courses")
                .map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border border-white/20">
            <DialogHeader>
              <DialogTitle>Add New Study Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title || ""}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-background/50 backdrop-blur-sm border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-background/50 backdrop-blur-sm border-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={newTask.course || ""}
                    onValueChange={(value) => setNewTask({ ...newTask, course: value })}
                  >
                    <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
                      {courses
                        .filter((c) => c !== "All Courses")
                        .map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority || "medium"}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}
                  >
                    <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate || ""}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-background/50 backdrop-blur-sm border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="estimatedHours">Estimated Hours</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    min="1"
                    value={newTask.estimatedHours || 1}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number.parseInt(e.target.value) || 1 })}
                    className="bg-background/50 backdrop-blur-sm border-white/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask} disabled={!newTask.title || !newTask.course || !newTask.dueDate}>
                  Add Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.map((task, index) => {
            const dueInfo = getDaysUntilDue(task.dueDate)
            const progress = task.estimatedHours > 0 ? (task.completedHours / task.estimatedHours) * 100 : 0

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mt-1 hover:scale-110 transition-transform"
                    >
                      {getStatusIcon(task.status)}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h4
                            className={`font-semibold ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </h4>
                          {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          {dueInfo.urgent && <AlertCircle className="h-4 w-4 text-red-400" />}
                          <span className={`text-xs ${dueInfo.urgent ? "text-red-400" : "text-muted-foreground"}`}>
                            {dueInfo.text}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {task.course}
                        </Badge>
                        {task.subject && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {task.subject}
                          </Badge>
                        )}
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority} priority
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>
                              {task.completedHours}h / {task.estimatedHours}h
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTask(task)}
                            className="h-8 w-8 p-0 hover:bg-white/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No tasks found</p>
            <p className="text-muted-foreground text-sm mt-2">Create your first study task to get started</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
