"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { SectionTitle } from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { staggeredContainer, fadeInUp } from "@/lib/animations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

// CGPA Calculator Component
const CGPACalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", credits: 4, grade: 10 },
    { id: 2, name: "Course 2", credits: 3, grade: 9 },
    { id: 3, name: "Course 3", credits: 4, grade: 8 },
  ])

  const [totalCGPA, setTotalCGPA] = useState(9.0)

  const updateCourse = (id: number, field: string, value: string | number) => {
    const updatedCourses = courses.map((course) => (course.id === id ? { ...course, [field]: value } : course))
    setCourses(updatedCourses)

    // Calculate CGPA
    const totalCredits = updatedCourses.reduce((sum, course) => sum + course.credits, 0)
    const weightedSum = updatedCourses.reduce((sum, course) => sum + course.credits * course.grade, 0)
    const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0
    setTotalCGPA(Number.parseFloat(cgpa.toFixed(2)))
  }

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: `Course ${courses.length + 1}`,
        credits: 4,
        grade: 8,
      },
    ])
  }

  const removeCourse = (id: number) => {
    if (courses.length <= 1) return

    const updatedCourses = courses.filter((course) => course.id !== id)
    setCourses(updatedCourses)

    // Recalculate CGPA
    const totalCredits = updatedCourses.reduce((sum, course) => sum + course.credits, 0)
    const weightedSum = updatedCourses.reduce((sum, course) => sum + course.credits * course.grade, 0)
    const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0
    setTotalCGPA(Number.parseFloat(cgpa.toFixed(2)))
  }

  return (
    <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Details - Now takes 2/3 of the space */}
        <motion.div variants={fadeInUp} className="md:col-span-2">
          <GlassmorphismCard>
            <h3 className="text-xl font-medium mb-6">Course Details</h3>

            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-5">
                    <Label htmlFor={`course-${course.id}`}>Course Name</Label>
                    <Input
                      id={`course-${course.id}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-2">
                    <Label htmlFor={`credits-${course.id}`}>Credits</Label>
                    <Input
                      id={`credits-${course.id}`}
                      type="number"
                      min="1"
                      max="10"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", Number.parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  <div className="col-span-5 sm:col-span-4">
                    <Label htmlFor={`grade-${course.id}`}>Grade</Label>
                    <Select
                      value={course.grade.toString()}
                      onValueChange={(value) => updateCourse(course.id, "grade", Number.parseFloat(value))}
                    >
                      <SelectTrigger id={`grade-${course.id}`} className="mt-1">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">S (10)</SelectItem>
                        <SelectItem value="9">A (9)</SelectItem>
                        <SelectItem value="8">B (8)</SelectItem>
                        <SelectItem value="7">C (7)</SelectItem>
                        <SelectItem value="6">D (6)</SelectItem>
                        <SelectItem value="5">E (5)</SelectItem>
                        <SelectItem value="0">U (0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex justify-end items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                      <span className="sr-only">Remove course</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full" onClick={addCourse}>
              Add Course
            </Button>
          </GlassmorphismCard>
        </motion.div>

        {/* CGPA Result Display - Now takes 1/3 of the space and is alongside courses */}
        <motion.div variants={fadeInUp}>
          <GlassmorphismCard className="text-center py-10 h-full flex flex-col justify-center">
            <motion.div
              className="text-6xl font-heading glow-text"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              {totalCGPA.toFixed(2)}
            </motion.div>
            <div className="text-lg text-muted-foreground mt-2">Current CGPA</div>

            {/* Gauge Visualization */}
            <div className="mt-8 relative mx-auto w-full max-w-md h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(totalCGPA / 10) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              <span>0.0</span>
              <span>5.0</span>
              <span>10.0</span>
            </div>

            {/* Grade Scale Reference */}
            <div className="mt-8 text-left text-sm">
              <h4 className="font-medium mb-2">Grade Scale Reference:</h4>
              <div className="grid grid-cols-2 gap-1">
                <div>S: 10</div>
                <div>A: 9</div>
                <div>B: 8</div>
                <div>C: 7</div>
                <div>D: 6</div>
                <div>E: 5</div>
                <div>U: 0</div>
              </div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Grade Predictor Component
const GradePredictor = () => {
  // Degree programs
  const degreePrograms = ["BS in Data Science", "BS in Electronic Systems"]

  // Academic levels
  const academicLevels = ["Foundation", "Diploma", "Degree"]

  // Subjects based on degree program
  const subjectsByProgram: Record<string, string[]> = {
    "BS in Data Science": [
      "Computational Thinking",
      "Mathematics for Data Science",
      "Statistics for Data Science",
      "Machine Learning Foundations",
      "Data Visualization",
    ],
    "BS in Electronic Systems": [
      "Digital Systems Design",
      "Analog Electronics",
      "Signals and Systems",
      "Microprocessors",
      "Communication Systems",
    ],
  }

  // State for form inputs
  const [formData, setFormData] = useState({
    degreeProgram: "",
    academicLevel: "",
    subject: "",
    generalAssessment: "",
    quiz1: "",
    quiz2: "",
    bonus: "",
  })

  // State for available subjects based on selected degree program
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])

  // State for prediction results
  const [predictionResult, setPredictionResult] = useState<{
    predictedGrade: string
    totalScore: number
    status: string
    breakdown: {
      generalAssessment: number
      quiz1: number
      quiz2: number
      bonus: number
    }
    requiredScores: {
      forS: number
      forA: number
      forB: number
    }
  } | null>(null)

  // Handle input changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // If degree program changes, update available subjects
    if (field === "degreeProgram") {
      setFormData({
        ...formData,
        degreeProgram: value as string,
        subject: "", // Reset subject when degree program changes
      })
      setAvailableSubjects(subjectsByProgram[value as string] || [])
    }

    // Reset prediction result when any input changes
    setPredictionResult(null)
  }

  // Calculate grade prediction
  const calculatePrediction = () => {
    // Validate inputs
    if (!formData.degreeProgram || !formData.academicLevel || !formData.subject) {
      alert("Please fill in all required fields")
      return
    }

    // Convert empty string values to 0 for calculation
    const generalAssessment = formData.generalAssessment === "" ? 0 : Number(formData.generalAssessment)
    const quiz1 = formData.quiz1 === "" ? 0 : Number(formData.quiz1)
    const quiz2 = formData.quiz2 === "" ? 0 : Number(formData.quiz2)
    const bonus = formData.bonus === "" ? 0 : Number(formData.bonus)

    // Calculate weighted scores based on academic level
    let gaWeight = 0.2
    let quiz1Weight = 0.15
    let quiz2Weight = 0.15
    let endTermWeight = 0.5

    if (formData.academicLevel === "Foundation") {
      gaWeight = 0.25
      quiz1Weight = 0.15
      quiz2Weight = 0.15
      endTermWeight = 0.45
    } else if (formData.academicLevel === "Diploma") {
      gaWeight = 0.2
      quiz1Weight = 0.15
      quiz2Weight = 0.15
      endTermWeight = 0.5
    }

    // Calculate current score (without end-term)
    const gaScore = (generalAssessment / 100) * gaWeight * 100
    const quiz1Score = (quiz1 / 100) * quiz1Weight * 100
    const quiz2Score = (quiz2 / 100) * quiz2Weight * 100
    const bonusScore = Math.min(bonus, 10) * 0.01 * 100 // Bonus is up to 10 points (1%)

    const currentScore = gaScore + quiz1Score + quiz2Score + bonusScore
    const currentPercentage = (currentScore / (gaWeight + quiz1Weight + quiz2Weight + 0.01)) * 100

    // Determine current status
    let status = "Passing"
    if (currentPercentage < 40) {
      status = "At Risk"
    }

    // Calculate required end-term scores for different grades
    const requiredForS = Math.max(0, Math.min(100, (90 - currentScore) / endTermWeight))
    const requiredForA = Math.max(0, Math.min(100, (80 - currentScore) / endTermWeight))
    const requiredForB = Math.max(0, Math.min(100, (70 - currentScore) / endTermWeight))

    // Predict final grade (assuming average performance in end-term)
    // For prediction, we'll assume the student gets 70% in the end-term
    const assumedEndTermScore = 70
    const predictedTotalScore = currentScore + (assumedEndTermScore / 100) * endTermWeight * 100

    let predictedGrade = ""
    if (predictedTotalScore >= 90) predictedGrade = "S"
    else if (predictedTotalScore >= 80) predictedGrade = "A"
    else if (predictedTotalScore >= 70) predictedGrade = "B"
    else if (predictedTotalScore >= 60) predictedGrade = "C"
    else if (predictedTotalScore >= 50) predictedGrade = "D"
    else if (predictedTotalScore >= 40) predictedGrade = "E"
    else predictedGrade = "U"

    // Set prediction result
    setPredictionResult({
      predictedGrade,
      totalScore: predictedTotalScore,
      status,
      breakdown: {
        generalAssessment: gaScore,
        quiz1: quiz1Score,
        quiz2: quiz2Score,
        bonus: bonusScore,
      },
      requiredScores: {
        forS: requiredForS,
        forA: requiredForA,
        forB: requiredForB,
      },
    })
  }

  return (
    <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div variants={fadeInUp}>
          <GlassmorphismCard>
            <h3 className="text-xl font-medium mb-6">Course Information</h3>

            <div className="space-y-4">
              {/* Degree Program Selection */}
              <div>
                <Label htmlFor="degree-program">Degree Program</Label>
                <Select
                  value={formData.degreeProgram}
                  onValueChange={(value) => handleInputChange("degreeProgram", value)}
                >
                  <SelectTrigger id="degree-program" className="mt-1">
                    <SelectValue placeholder="Select Degree Program" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreePrograms.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Academic Level Selection */}
              <div>
                <Label htmlFor="academic-level">Academic Level</Label>
                <Select
                  value={formData.academicLevel}
                  onValueChange={(value) => handleInputChange("academicLevel", value)}
                >
                  <SelectTrigger id="academic-level" className="mt-1">
                    <SelectValue placeholder="Select Academic Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Selection */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleInputChange("subject", value)}
                  disabled={!formData.degreeProgram}
                >
                  <SelectTrigger id="subject" className="mt-1">
                    <SelectValue
                      placeholder={formData.degreeProgram ? "Select Subject" : "Select Degree Program First"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Score Inputs */}
              <div>
                <Label htmlFor="general-assessment">General Assessment (GA) Score (0-100)</Label>
                <Input
                  id="general-assessment"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.generalAssessment}
                  onChange={(e) =>
                    handleInputChange("generalAssessment", e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="mt-1"
                  placeholder="Enter score"
                />
              </div>

              <div>
                <Label htmlFor="quiz1">Quiz 1 Score (0-100)</Label>
                <Input
                  id="quiz1"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.quiz1}
                  onChange={(e) => handleInputChange("quiz1", e.target.value === "" ? "" : Number(e.target.value))}
                  className="mt-1"
                  placeholder="Enter score"
                />
              </div>

              <div>
                <Label htmlFor="quiz2">Quiz 2 Score (0-100)</Label>
                <Input
                  id="quiz2"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.quiz2}
                  onChange={(e) => handleInputChange("quiz2", e.target.value === "" ? "" : Number(e.target.value))}
                  className="mt-1"
                  placeholder="Enter score"
                />
              </div>

              <div>
                <Label htmlFor="bonus">Bonus Points (0-10)</Label>
                <Input
                  id="bonus"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.bonus}
                  onChange={(e) => handleInputChange("bonus", e.target.value === "" ? "" : Number(e.target.value))}
                  className="mt-1"
                  placeholder="Enter points"
                />
              </div>
            </div>

            <Button className="mt-6 w-full" onClick={calculatePrediction}>
              Predict Grade
            </Button>
          </GlassmorphismCard>
        </motion.div>

        {/* Results Display */}
        <motion.div variants={fadeInUp}>
          {predictionResult ? (
            <GlassmorphismCard>
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">Predicted Grade</h3>
                <div className="text-5xl font-heading glow-text mb-2">{predictionResult.predictedGrade}</div>
                <div className="text-lg text-muted-foreground">
                  Estimated Score: {predictionResult.totalScore.toFixed(2)}%
                </div>
                <div
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${
                    predictionResult.status === "Passing"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {predictionResult.status}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Score Breakdown</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>General Assessment</TableCell>
                      <TableCell className="text-right">
                        {predictionResult.breakdown.generalAssessment.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quiz 1</TableCell>
                      <TableCell className="text-right">{predictionResult.breakdown.quiz1.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quiz 2</TableCell>
                      <TableCell className="text-right">{predictionResult.breakdown.quiz2.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bonus</TableCell>
                      <TableCell className="text-right">{predictionResult.breakdown.bonus.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Current Total</TableCell>
                      <TableCell className="text-right font-medium">
                        {(
                          predictionResult.breakdown.generalAssessment +
                          predictionResult.breakdown.quiz1 +
                          predictionResult.breakdown.quiz2 +
                          predictionResult.breakdown.bonus
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Required End-Term Scores */}
              <div>
                <h4 className="font-medium mb-3">Required End-Term Scores</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">For Grade S</span>
                      <span className="text-sm">{predictionResult.requiredScores.forS.toFixed(2)}%</span>
                    </div>
                    <Progress value={Math.min(100, 100 - predictionResult.requiredScores.forS)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">For Grade A</span>
                      <span className="text-sm">{predictionResult.requiredScores.forA.toFixed(2)}%</span>
                    </div>
                    <Progress value={Math.min(100, 100 - predictionResult.requiredScores.forA)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">For Grade B</span>
                      <span className="text-sm">{predictionResult.requiredScores.forB.toFixed(2)}%</span>
                    </div>
                    <Progress value={Math.min(100, 100 - predictionResult.requiredScores.forB)} className="h-2" />
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          ) : (
            <GlassmorphismCard className="flex flex-col items-center justify-center text-center h-full py-12">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-16 w-16 text-muted-foreground/50 mb-4 mx-auto"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <h3 className="text-xl font-medium mb-2">Grade Prediction</h3>
                <p className="text-muted-foreground max-w-md">
                  Fill in your course details and assessment scores to predict your final grade and see what you need to
                  achieve your target grade.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <Card className="bg-black/20 border-white/10">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">S</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-muted-foreground">90-100%</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/20 border-white/10">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">A</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-muted-foreground">80-89%</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/20 border-white/10">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">B</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs text-muted-foreground">70-79%</p>
                  </CardContent>
                </Card>
              </div>
            </GlassmorphismCard>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Quiz Evaluator Component
const QuizEvaluator = () => {
  return (
    <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={fadeInUp}>
        <GlassmorphismCard className="text-center py-12">
          <div className="inline-block rounded-full px-3 py-1 text-sm bg-white/10 text-white mb-4">Coming Soon</div>
          <h3 className="text-2xl font-heading mb-4">Quiz Performance Analysis</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our Quiz Evaluator tool is currently under development. Soon you'll be able to analyze your quiz
            performance, track your progress, and receive personalized recommendations to improve your scores.
          </p>
          <div className="mt-8">
            <Button variant="outline" disabled>
              <Clock className="mr-2 h-4 w-4" />
              Check Back Later
            </Button>
          </div>
        </GlassmorphismCard>
      </motion.div>
    </motion.div>
  )
}

export default function Tools() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container px-4 py-10 md:py-16">
        <SectionTitle
          title="Academic Tools"
          subtitle="Utilize our suite of tools to enhance your academic performance and track your progress"
        />

        <Tabs defaultValue="cgpa" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
            <TabsTrigger value="predictor">Grade Predictor</TabsTrigger>
          </TabsList>

          <TabsContent value="cgpa">
            <CGPACalculator />
          </TabsContent>

          <TabsContent value="predictor">
            <GradePredictor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
