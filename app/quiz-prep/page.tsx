"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Download, Clock, BookOpen, Filter, Search, X, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"
import { SectionTitle } from "@/components/section-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { staggeredContainer, fadeInUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Restructured question papers data organized by year instead of author
const questionPapersData = {
  "Data Science": {
    Foundation: {
      "Mathematics I": {
        "2023": [
          {
            id: "pyq1",
            title: "Calculus and Its Applications",
            term: "May",
            type: "End Term",
            author: "Dr. Rajesh Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq2",
            title: "Linear Algebra Basics",
            term: "January",
            type: "Quiz 1",
            author: "Dr. Rajesh Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq2b",
            title: "Advanced Linear Algebra",
            term: "January",
            type: "Quiz 2",
            author: "Dr. Rajesh Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq2c",
            title: "Calculus Applications",
            term: "January",
            type: "End Term",
            author: "Dr. Rajesh Kumar",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq3",
            title: "Advanced Calculus",
            term: "September",
            type: "Quiz 2",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
          {
            id: "pyq3b",
            title: "Calculus Fundamentals",
            term: "September",
            type: "Quiz 1",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
          {
            id: "pyq3c",
            title: "Mathematical Analysis",
            term: "September",
            type: "End Term",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
        ],
      },
      Statistics: {
        "2023": [
          {
            id: "pyq4",
            title: "Probability and Statistics",
            term: "May",
            type: "End Term",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
          {
            id: "pyq4b",
            title: "Basic Probability",
            term: "May",
            type: "Quiz 1",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
          {
            id: "pyq4c",
            title: "Statistical Inference",
            term: "May",
            type: "Quiz 2",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq5",
            title: "Statistical Methods",
            term: "September",
            type: "Quiz 2",
            author: "Prof. Anita Desai",
            downloadUrl: "#",
          },
          {
            id: "pyq6",
            title: "Descriptive Statistics",
            term: "January",
            type: "Quiz 1",
            author: "Dr. Vikram Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq6b",
            title: "Statistical Analysis",
            term: "January",
            type: "End Term",
            author: "Dr. Vikram Singh",
            downloadUrl: "#",
          },
        ],
      },
    },
    Diploma: {
      "Programming in Python": {
        "2023": [
          {
            id: "pyq7",
            title: "Programming and Data Structures",
            term: "May",
            type: "End Term",
            author: "Dr. Vikram Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq8",
            title: "Python Fundamentals",
            term: "January",
            type: "Quiz 1",
            author: "Dr. Vikram Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq8b",
            title: "Python Advanced Concepts",
            term: "January",
            type: "Quiz 2",
            author: "Dr. Vikram Singh",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq9",
            title: "Object-Oriented Programming",
            term: "September",
            type: "Quiz 2",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
          {
            id: "pyq9b",
            title: "Python Basics",
            term: "September",
            type: "Quiz 1",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
          {
            id: "pyq9c",
            title: "Programming Fundamentals",
            term: "September",
            type: "End Term",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
        ],
      },
      "Database Management": {
        "2023": [
          {
            id: "pyq10",
            title: "Database Management Systems",
            term: "May",
            type: "End Term",
            author: "Dr. Priya Sharma",
            downloadUrl: "#",
          },
          {
            id: "pyq10b",
            title: "Database Fundamentals",
            term: "May",
            type: "Quiz 1",
            author: "Dr. Priya Sharma",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq11",
            title: "SQL and NoSQL Databases",
            term: "January",
            type: "Quiz 2",
            author: "Dr. Priya Sharma",
            downloadUrl: "#",
          },
          {
            id: "pyq12",
            title: "Database Design",
            term: "September",
            type: "Quiz 1",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq12b",
            title: "Advanced Database Concepts",
            term: "September",
            type: "End Term",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
        ],
      },
    },
    BSc: {
      "Machine Learning": {
        "2023": [
          {
            id: "pyq13",
            title: "Machine Learning Fundamentals",
            term: "May",
            type: "End Term",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
          {
            id: "pyq13b",
            title: "ML Basics",
            term: "May",
            type: "Quiz 1",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq14",
            title: "Algorithms and Analysis",
            term: "September",
            type: "Quiz 2",
            author: "Prof. Rahul Verma",
            downloadUrl: "#",
          },
        ],
        "2021": [
          {
            id: "pyq15",
            title: "Introduction to AI",
            term: "January",
            type: "Quiz 1",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
          {
            id: "pyq15b",
            title: "AI Fundamentals",
            term: "January",
            type: "End Term",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
        ],
      },
    },
  },
  Electronics: {
    Foundation: {
      "Basic Electronics": {
        "2023": [
          {
            id: "pyq16",
            title: "Digital Systems",
            term: "May",
            type: "End Term",
            author: "Dr. Ravi Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq17",
            title: "Circuit Analysis",
            term: "January",
            type: "Quiz 1",
            author: "Dr. Ravi Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq17b",
            title: "Electronic Fundamentals",
            term: "January",
            type: "Quiz 2",
            author: "Dr. Ravi Kumar",
            downloadUrl: "#",
          },
        ],
        "2022": [
          {
            id: "pyq18",
            title: "Electronic Devices",
            term: "September",
            type: "Quiz 2",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq18b",
            title: "Circuit Design",
            term: "September",
            type: "End Term",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
        ],
      },
    },
    Diploma: {
      "Digital Electronics": {
        "2023": [
          {
            id: "pyq19",
            title: "Logic Design",
            term: "May",
            type: "End Term",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
          {
            id: "pyq19b",
            title: "Digital Logic",
            term: "May",
            type: "Quiz 1",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
        ],
        "2021": [
          {
            id: "pyq20",
            title: "Boolean Algebra",
            term: "September",
            type: "Quiz 1",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
          {
            id: "pyq20b",
            title: "Digital Systems Design",
            term: "September",
            type: "End Term",
            author: "Dr. Amit Sharma",
            downloadUrl: "#",
          },
        ],
      },
      Microprocessors: {
        "2022": [
          {
            id: "pyq21",
            title: "Operating Systems",
            term: "May",
            type: "End Term",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
          {
            id: "pyq21b",
            title: "Microprocessor Basics",
            term: "May",
            type: "Quiz 1",
            author: "Prof. Kavita Singh",
            downloadUrl: "#",
          },
        ],
        "2021": [
          {
            id: "pyq22",
            title: "Assembly Language",
            term: "January",
            type: "Quiz 2",
            author: "Dr. Ravi Kumar",
            downloadUrl: "#",
          },
          {
            id: "pyq22b",
            title: "Computer Architecture",
            term: "January",
            type: "End Term",
            author: "Dr. Ravi Kumar",
            downloadUrl: "#",
          },
        ],
      },
    },
  },
}

// Sample mock test questions data
const mockTestQuestions = {
  "Data Science": {
    Foundation: {
      "Mathematics I": [
        {
          id: 1,
          question: "What is the derivative of x² + 3x + 2?",
          options: ["2x + 3", "x² + 3", "2x + 2", "3x + 2"],
          correctAnswer: 0,
          explanation: "Using the power rule: d/dx(x²) = 2x, d/dx(3x) = 3, d/dx(2) = 0",
        },
        {
          id: 2,
          question: "Which of the following is a linear transformation?",
          options: ["f(x) = x² + 1", "f(x) = 2x + 3", "f(x) = sin(x)", "f(x) = |x|"],
          correctAnswer: 1,
          explanation: "A linear transformation must satisfy f(ax + by) = af(x) + bf(y)",
        },
        {
          id: 3,
          question: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
          options: ["ad + bc", "ad - bc", "ac - bd", "ab - cd"],
          correctAnswer: 1,
          explanation: "For a 2x2 matrix, determinant = ad - bc",
        },
        {
          id: 4,
          question: "The limit of (sin x)/x as x approaches 0 is:",
          options: ["0", "1", "∞", "undefined"],
          correctAnswer: 1,
          explanation: "This is a standard limit: lim(x→0) (sin x)/x = 1",
        },
        {
          id: 5,
          question: "Which method is used to find the area under a curve?",
          options: ["Differentiation", "Integration", "Substitution", "Factoring"],
          correctAnswer: 1,
          explanation: "Integration is used to find the area under curves",
        },
      ],
      Statistics: [
        {
          id: 1,
          question: "What is the mean of the dataset: 2, 4, 6, 8, 10?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 1,
          explanation: "Mean = (2+4+6+8+10)/5 = 30/5 = 6",
        },
        {
          id: 2,
          question: "In a normal distribution, what percentage of data falls within 1 standard deviation?",
          options: ["68%", "95%", "99.7%", "50%"],
          correctAnswer: 0,
          explanation: "In a normal distribution, approximately 68% of data falls within 1 standard deviation",
        },
        {
          id: 3,
          question: "What is the probability of getting heads in a fair coin toss?",
          options: ["0.25", "0.5", "0.75", "1"],
          correctAnswer: 1,
          explanation: "A fair coin has equal probability for heads and tails: 1/2 = 0.5",
        },
        {
          id: 4,
          question: "Which measure of central tendency is most affected by outliers?",
          options: ["Mean", "Median", "Mode", "Range"],
          correctAnswer: 0,
          explanation: "The mean is most sensitive to extreme values (outliers)",
        },
        {
          id: 5,
          question: "What does a p-value of 0.05 typically indicate?",
          options: ["95% confidence", "5% significance level", "Both A and B", "Neither A nor B"],
          correctAnswer: 2,
          explanation: "A p-value of 0.05 corresponds to a 5% significance level and 95% confidence level",
        },
      ],
    },
    Diploma: {
      "Programming in Python": [
        {
          id: 1,
          question: "Which of the following is the correct way to create a list in Python?",
          options: ["list = {1, 2, 3}", "list = [1, 2, 3]", "list = (1, 2, 3)", "list = <1, 2, 3>"],
          correctAnswer: 1,
          explanation: "Lists in Python are created using square brackets []",
        },
        {
          id: 2,
          question: "What is the output of: print(type([]))?",
          options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
          correctAnswer: 0,
          explanation: "[] creates an empty list, so type([]) returns <class 'list'>",
        },
        {
          id: 3,
          question: "Which keyword is used to define a function in Python?",
          options: ["function", "def", "func", "define"],
          correctAnswer: 1,
          explanation: "The 'def' keyword is used to define functions in Python",
        },
        {
          id: 4,
          question: "What is the correct way to handle exceptions in Python?",
          options: ["try-catch", "try-except", "catch-finally", "handle-error"],
          correctAnswer: 1,
          explanation: "Python uses try-except blocks for exception handling",
        },
        {
          id: 5,
          question: "Which of the following is a mutable data type in Python?",
          options: ["tuple", "string", "list", "int"],
          correctAnswer: 2,
          explanation: "Lists are mutable (can be changed), while tuples and strings are immutable",
        },
      ],
      "Database Management": [
        {
          id: 1,
          question: "What does SQL stand for?",
          options: [
            "Structured Query Language",
            "Simple Query Language",
            "Standard Query Language",
            "System Query Language",
          ],
          correctAnswer: 0,
          explanation: "SQL stands for Structured Query Language",
        },
        {
          id: 2,
          question: "Which SQL command is used to retrieve data from a database?",
          options: ["GET", "SELECT", "RETRIEVE", "FETCH"],
          correctAnswer: 1,
          explanation: "SELECT is the SQL command used to retrieve data from tables",
        },
        {
          id: 3,
          question: "What is a primary key in a database?",
          options: [
            "A key that opens the database",
            "A unique identifier for records",
            "The first column in a table",
            "A password for the database",
          ],
          correctAnswer: 1,
          explanation: "A primary key uniquely identifies each record in a database table",
        },
        {
          id: 4,
          question: "Which normal form eliminates partial dependencies?",
          options: ["1NF", "2NF", "3NF", "BCNF"],
          correctAnswer: 1,
          explanation: "Second Normal Form (2NF) eliminates partial dependencies",
        },
        {
          id: 5,
          question: "What is the purpose of an index in a database?",
          options: ["To store data", "To improve query performance", "To backup data", "To encrypt data"],
          correctAnswer: 1,
          explanation: "Indexes are used to improve the speed of data retrieval operations",
        },
      ],
    },
    BSc: {
      "Machine Learning": [
        {
          id: 1,
          question: "What is supervised learning?",
          options: [
            "Learning without labels",
            "Learning with input-output pairs",
            "Learning by trial and error",
            "Learning from rewards",
          ],
          correctAnswer: 1,
          explanation: "Supervised learning uses labeled training data with input-output pairs",
        },
        {
          id: 2,
          question: "Which algorithm is commonly used for classification?",
          options: ["K-means", "Linear Regression", "Decision Tree", "PCA"],
          correctAnswer: 2,
          explanation: "Decision Trees are commonly used for classification problems",
        },
        {
          id: 3,
          question: "What is overfitting in machine learning?",
          options: [
            "Model performs well on training data but poorly on test data",
            "Model performs poorly on all data",
            "Model is too simple",
            "Model has too few parameters",
          ],
          correctAnswer: 0,
          explanation: "Overfitting occurs when a model learns the training data too well but fails to generalize",
        },
        {
          id: 4,
          question: "Which metric is used to evaluate classification models?",
          options: ["Mean Squared Error", "Accuracy", "R-squared", "Mean Absolute Error"],
          correctAnswer: 1,
          explanation: "Accuracy is a common metric for evaluating classification model performance",
        },
        {
          id: 5,
          question: "What is the purpose of cross-validation?",
          options: [
            "To increase model complexity",
            "To evaluate model performance",
            "To reduce training time",
            "To increase dataset size",
          ],
          correctAnswer: 1,
          explanation: "Cross-validation is used to assess how well a model will generalize to unseen data",
        },
      ],
    },
  },
  Electronics: {
    Foundation: {
      "Basic Electronics": [
        {
          id: 1,
          question: "What is Ohm's Law?",
          options: ["V = I × R", "V = I / R", "V = I + R", "V = I - R"],
          correctAnswer: 0,
          explanation: "Ohm's Law states that Voltage equals Current times Resistance (V = I × R)",
        },
        {
          id: 2,
          question: "Which component stores electrical energy in an electric field?",
          options: ["Resistor", "Inductor", "Capacitor", "Diode"],
          correctAnswer: 2,
          explanation: "Capacitors store electrical energy in an electric field between their plates",
        },
        {
          id: 3,
          question: "What is the unit of electrical resistance?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          correctAnswer: 2,
          explanation: "The unit of electrical resistance is the Ohm (Ω)",
        },
        {
          id: 4,
          question: "In a series circuit, the current is:",
          options: ["Different through each component", "Same through all components", "Zero", "Infinite"],
          correctAnswer: 1,
          explanation: "In a series circuit, the same current flows through all components",
        },
        {
          id: 5,
          question: "What does a diode primarily do?",
          options: ["Amplify signals", "Store energy", "Allow current in one direction", "Resist current flow"],
          correctAnswer: 2,
          explanation: "A diode allows current to flow in only one direction",
        },
      ],
    },
    Diploma: {
      "Digital Electronics": [
        {
          id: 1,
          question: "How many states can a binary digit have?",
          options: ["1", "2", "3", "4"],
          correctAnswer: 1,
          explanation: "A binary digit (bit) can have exactly 2 states: 0 or 1",
        },
        {
          id: 2,
          question: "What is the output of an AND gate when both inputs are 1?",
          options: ["0", "1", "Undefined", "Both 0 and 1"],
          correctAnswer: 1,
          explanation: "An AND gate outputs 1 only when both inputs are 1",
        },
        {
          id: 3,
          question: "Which number system uses base 16?",
          options: ["Binary", "Decimal", "Octal", "Hexadecimal"],
          correctAnswer: 3,
          explanation: "Hexadecimal number system uses base 16 (digits 0-9 and A-F)",
        },
        {
          id: 4,
          question: "What is a flip-flop in digital electronics?",
          options: ["A type of gate", "A memory element", "A display device", "A power supply"],
          correctAnswer: 1,
          explanation: "A flip-flop is a basic memory element that can store one bit of information",
        },
        {
          id: 5,
          question: "How many input combinations are possible for a 3-input logic gate?",
          options: ["3", "6", "8", "9"],
          correctAnswer: 2,
          explanation: "For n inputs, there are 2^n combinations. For 3 inputs: 2^3 = 8 combinations",
        },
      ],
      Microprocessors: [
        {
          id: 1,
          question: "What is the function of the ALU in a microprocessor?",
          options: ["Store data", "Perform arithmetic and logic operations", "Control input/output", "Manage memory"],
          correctAnswer: 1,
          explanation: "The ALU (Arithmetic Logic Unit) performs arithmetic and logical operations",
        },
        {
          id: 2,
          question: "Which register stores the address of the next instruction to be executed?",
          options: ["Accumulator", "Program Counter", "Stack Pointer", "Index Register"],
          correctAnswer: 1,
          explanation: "The Program Counter (PC) stores the address of the next instruction",
        },
        {
          id: 3,
          question: "What is assembly language?",
          options: [
            "High-level programming language",
            "Machine language",
            "Low-level programming language",
            "Operating system",
          ],
          correctAnswer: 2,
          explanation: "Assembly language is a low-level programming language using mnemonics",
        },
        {
          id: 4,
          question: "How many bits are in a byte?",
          options: ["4", "8", "16", "32"],
          correctAnswer: 1,
          explanation: "A byte consists of 8 bits",
        },
        {
          id: 5,
          question: "What is the purpose of an interrupt in a microprocessor?",
          options: ["Stop the processor", "Handle urgent tasks", "Increase speed", "Save power"],
          correctAnswer: 1,
          explanation: "Interrupts allow the processor to handle urgent or time-critical tasks",
        },
      ],
    },
  },
}

// Filter Component for Quiz Prep
function QuizPrepFilterSection({
  selectedCourse,
  selectedLevel,
  selectedSubject,
  selectedYear,
  selectedType,
  searchQuery,
  courses,
  levels,
  subjects,
  years,
  types,
  onCourseChange,
  onLevelChange,
  onSubjectChange,
  onYearChange,
  onTypeChange,
  onSearchChange,
  onResetFilters,
}: {
  selectedCourse: string
  selectedLevel: string
  selectedSubject: string
  selectedYear: string
  selectedType: string
  searchQuery: string
  courses: string[]
  levels: string[]
  subjects: string[]
  years: string[]
  types: string[]
  onCourseChange: (course: string) => void
  onLevelChange: (level: string) => void
  onSubjectChange: (subject: string) => void
  onYearChange: (year: string) => void
  onTypeChange: (type: string) => void
  onSearchChange: (query: string) => void
  onResetFilters: () => void
}) {
  return (
    <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6 bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold">Filter Question Papers</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-2 xl:col-span-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-white/20"
          />
        </div>

        {/* Course Filter */}
        <Select value={selectedCourse} onValueChange={onCourseChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Course" />
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
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {levels.map((level) => (
              <SelectItem key={level} value={level} className="hover:bg-white/10">
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {years.map((year) => (
              <SelectItem key={year} value={year} className="hover:bg-white/10">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-background/90 backdrop-blur-xl border-white/20">
            {types.map((type) => (
              <SelectItem key={type} value={type} className="hover:bg-white/10">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display and Reset Button */}
      {(selectedCourse !== "All Courses" ||
        selectedLevel !== "All Levels" ||
        selectedSubject !== "All Subjects" ||
        selectedYear !== "All Years" ||
        selectedType !== "All Types" ||
        searchQuery) && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {selectedCourse !== "All Courses" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Course: {selectedCourse}
              </Badge>
            )}
            {selectedLevel !== "All Levels" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Level: {selectedLevel}
              </Badge>
            )}
            {selectedSubject !== "All Subjects" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Subject: {selectedSubject}
              </Badge>
            )}
            {selectedYear !== "All Years" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Year: {selectedYear}
              </Badge>
            )}
            {selectedType !== "All Types" && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Type: {selectedType}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="bg-background/50 hover:bg-background/70 border-white/20 text-muted-foreground hover:text-foreground h-9 px-4 sm:h-10 sm:px-5"
          >
            <X className="h-3 w-3 mr-1" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

// Mock Test Selection and Test Components
function MockTestSection() {
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  // Get available courses
  const courses = Object.keys(mockTestQuestions)

  // Get available levels based on selected course
  const levels = useMemo(() => {
    if (!selectedCourse) return []
    return Object.keys(mockTestQuestions[selectedCourse as keyof typeof mockTestQuestions] || {})
  }, [selectedCourse])

  // Get available subjects based on selected course and level
  const subjects = useMemo(() => {
    if (!selectedCourse || !selectedLevel) return []
    const courseData = mockTestQuestions[selectedCourse as keyof typeof mockTestQuestions]
    const levelData = courseData?.[selectedLevel as keyof typeof courseData]
    return Object.keys(levelData || {})
  }, [selectedCourse, selectedLevel])

  // Reset selections when course changes
  const handleCourseChange = (course: string) => {
    setSelectedCourse(course)
    setSelectedLevel("")
    setSelectedSubject("")
  }

  // Reset subject when level changes
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setSelectedSubject("")
  }

  const handleStartTest = () => {
    setTestStarted(true)
    setTestCompleted(false)
  }

  const handleTestComplete = (results: any) => {
    setTestStarted(false)
    setTestCompleted(true)
    setTestResults(results)
  }

  const handleRetakeTest = () => {
    setTestStarted(true)
    setTestCompleted(false)
    setTestResults(null)
  }

  const handleBackToSelection = () => {
    setTestStarted(false)
    setTestCompleted(false)
    setTestResults(null)
  }

  if (testStarted) {
    return (
      <MockTestInterface
        course={selectedCourse}
        level={selectedLevel}
        subject={selectedSubject}
        onTestComplete={handleTestComplete}
        onBackToSelection={handleBackToSelection}
      />
    )
  }

  if (testCompleted && testResults) {
    return (
      <MockTestResults
        results={testResults}
        course={selectedCourse}
        level={selectedLevel}
        subject={selectedSubject}
        onRetakeTest={handleRetakeTest}
        onBackToSelection={handleBackToSelection}
      />
    )
  }

  return (
    <motion.div variants={staggeredContainer} initial="hidden" animate="show" className="space-y-6">
      {/* Instructions */}
      <motion.div variants={fadeInUp}>
        <GlassmorphismCard className="p-4 sm:p-6 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Mock Test Instructions</h3>
              <div className="text-sm text-blue-300/80 space-y-2">
                <p>• Select your course, level, and subject to start a personalized mock test</p>
                <p>• Each test contains 5 carefully selected questions from the chosen subject</p>
                <p>• You have 10 minutes to complete the test (2 minutes per question)</p>
                <p>• Questions are multiple choice with detailed explanations provided after completion</p>
                <p>• Your progress is saved automatically, and you can review answers at the end</p>
              </div>
            </div>
          </div>
        </GlassmorphismCard>
      </motion.div>

      {/* Selection Interface */}
      <motion.div variants={fadeInUp}>
        <GlassmorphismCard className="p-4 sm:p-6">
          <h3 className="text-xl font-semibold mb-6">Configure Your Mock Test</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Course Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Course</label>
              <Select value={selectedCourse} onValueChange={handleCourseChange}>
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
            </div>

            {/* Level Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Level</label>
              <Select value={selectedLevel} onValueChange={handleLevelChange} disabled={!selectedCourse}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20 disabled:opacity-50">
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
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedLevel}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm border-white/20 disabled:opacity-50">
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
          </div>

          {/* Selection Summary */}
          {selectedCourse && selectedLevel && selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background/30 rounded-lg p-4 mb-6"
            >
              <h4 className="font-medium mb-3">Test Configuration</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Course:</span>
                  <p className="font-medium">{selectedCourse}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Level:</span>
                  <p className="font-medium">{selectedLevel}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Subject:</span>
                  <p className="font-medium">{selectedSubject}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Start Test Button */}
          <div className="text-center">
            <Button
              onClick={handleStartTest}
              disabled={!selectedCourse || !selectedLevel || !selectedSubject}
              size="lg"
              className="px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Clock className="mr-2 h-5 w-5" />
              Start Mock Test
            </Button>
            {(!selectedCourse || !selectedLevel || !selectedSubject) && (
              <p className="text-sm text-muted-foreground mt-2">
                Please select course, level, and subject to start the test
              </p>
            )}
          </div>
        </GlassmorphismCard>
      </motion.div>
    </motion.div>
  )
}

// Mock Test Interface Component
function MockTestInterface({
  course,
  level,
  subject,
  onTestComplete,
  onBackToSelection,
}: {
  course: string
  level: string
  subject: string
  onTestComplete: (results: any) => void
  onBackToSelection: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // Get questions for the selected subject
  const questions = useMemo(() => {
    const courseData = mockTestQuestions[course as keyof typeof mockTestQuestions]
    const levelData = courseData?.[level as keyof typeof courseData]
    const subjectData = levelData?.[subject as keyof typeof levelData]
    return subjectData || []
  }, [course, level, subject])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      handleSubmitTest()
    }
  }, [timeLeft])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer ?? -1
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null)
    } else {
      handleSubmitTest(newAnswers)
    }
  }

  const handlePreviousQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer ?? -1
    setAnswers(newAnswers)

    setCurrentQuestion(currentQuestion - 1)
    setSelectedAnswer(newAnswers[currentQuestion - 1] ?? null)
  }

  const handleSubmitTest = (finalAnswers = answers) => {
    const newAnswers = [...finalAnswers]
    newAnswers[currentQuestion] = selectedAnswer ?? -1

    const score = newAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index]?.correctAnswer ? 1 : 0)
    }, 0)

    const results = {
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      answers: newAnswers,
      questions,
      timeSpent: 600 - timeLeft,
    }

    onTestComplete(results)
  }

  if (questions.length === 0) {
    return (
      <GlassmorphismCard className="text-center py-12">
        <p className="text-muted-foreground">No questions available for this subject.</p>
        <Button onClick={onBackToSelection} className="mt-4">
          Back to Selection
        </Button>
      </GlassmorphismCard>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <GlassmorphismCard className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{subject} Mock Test</h2>
            <p className="text-sm text-muted-foreground">
              {course} • {level}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
              <div className="text-xs text-muted-foreground">Time Left</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {currentQuestion + 1}/{questions.length}
              </div>
              <div className="text-xs text-muted-foreground">Question</div>
            </div>
          </div>
        </div>
      </GlassmorphismCard>

      {/* Question */}
      <GlassmorphismCard className="p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">
            Question {currentQuestion + 1}: {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/10"
                    : "border-white/20 bg-background/20 hover:bg-white/5"
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? "border-primary bg-primary" : "border-white/40"
                    }`}
                  >
                    {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-sm font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index === currentQuestion
                    ? "bg-primary text-white"
                    : answers[index] !== undefined && answers[index] !== -1
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-background/30 text-muted-foreground border border-white/20"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
            {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
          </Button>
        </div>
      </GlassmorphismCard>
    </div>
  )
}

// Mock Test Results Component
function MockTestResults({
  results,
  course,
  level,
  subject,
  onRetakeTest,
  onBackToSelection,
}: {
  results: any
  course: string
  level: string
  subject: string
  onRetakeTest: () => void
  onBackToSelection: () => void
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "Excellent! You have a strong understanding of the subject."
    if (percentage >= 60) return "Good job! Review the explanations to improve further."
    return "Keep practicing! Focus on the areas where you made mistakes."
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <GlassmorphismCard className="p-4 sm:p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
        <p className="text-muted-foreground mb-6">
          {subject} • {course} • {level}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <div className={`text-4xl font-bold ${getScoreColor(results.percentage)}`}>{results.percentage}%</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">
              {results.score}/{results.totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400">{formatTime(results.timeSpent)}</div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{getScoreMessage(results.percentage)}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onRetakeTest} variant="default">
            <Clock className="mr-2 h-4 w-4" />
            Retake Test
          </Button>
          <Button onClick={onBackToSelection} variant="outline">
            Back to Selection
          </Button>
        </div>
      </GlassmorphismCard>

      {/* Detailed Results */}
      <GlassmorphismCard className="p-4 sm:p-6">
        <h3 className="text-xl font-semibold mb-6">Question Review</h3>

        <div className="space-y-6">
          {results.questions.map((question: any, index: number) => {
            const userAnswer = results.answers[index]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <div key={index} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{question.question}</h4>

                    <div className="space-y-2 mb-3">
                      {question.options.map((option: string, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : optionIndex === userAnswer && !isCorrect
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-background/20 text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                          {optionIndex === question.correctAnswer && <span className="ml-2 text-xs">(Correct)</span>}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-2 text-xs">(Your answer)</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                      <p className="text-sm text-blue-300">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </GlassmorphismCard>
    </div>
  )
}

export default function QuizPrep() {
  const [selectedCourse, setSelectedCourse] = useState<string>("All Courses")
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels")
  const [selectedSubject, setSelectedSubject] = useState<string>("All Subjects")
  const [selectedYear, setSelectedYear] = useState<string>("All Years")
  const [selectedType, setSelectedType] = useState<string>("All Types")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("past-papers")
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([])

  // Get available courses
  const courses = ["All Courses", ...Object.keys(questionPapersData)]

  // Get available levels based on selected course
  const levels = useMemo(() => {
    if (selectedCourse === "All Courses") {
      const allLevels = new Set<string>()
      Object.values(questionPapersData).forEach((courseData) => {
        Object.keys(courseData).forEach((level) => allLevels.add(level))
      })
      return ["All Levels", ...Array.from(allLevels)]
    }
    return ["All Levels", ...Object.keys(questionPapersData[selectedCourse as keyof typeof questionPapersData] || {})]
  }, [selectedCourse])

  // Get available subjects based on selected course and level
  const subjects = useMemo(() => {
    if (selectedCourse === "All Courses") {
      const allSubjects = new Set<string>()
      Object.values(questionPapersData).forEach((courseData) => {
        Object.values(courseData).forEach((levelData) => {
          Object.keys(levelData).forEach((subject) => allSubjects.add(subject))
        })
      })
      return ["All Subjects", ...Array.from(allSubjects).sort()]
    }

    if (selectedLevel === "All Levels") {
      const courseData = questionPapersData[selectedCourse as keyof typeof questionPapersData]
      const allSubjects = new Set<string>()
      if (courseData) {
        Object.values(courseData).forEach((levelData) => {
          Object.keys(levelData).forEach((subject) => allSubjects.add(subject))
        })
      }
      return ["All Subjects", ...Array.from(allSubjects).sort()]
    }

    const courseData = questionPapersData[selectedCourse as keyof typeof questionPapersData]
    const levelData = courseData?.[selectedLevel as keyof typeof courseData]
    const subjects = levelData ? Object.keys(levelData) : []
    return ["All Subjects", ...subjects.sort()]
  }, [selectedCourse, selectedLevel])

  // Get available years and types from all papers
  const { years, types } = useMemo(() => {
    const allYears = new Set<string>()
    const allTypes = new Set<string>()

    Object.values(questionPapersData).forEach((courseData) => {
      Object.values(courseData).forEach((levelData) => {
        Object.values(levelData).forEach((subjectData) => {
          Object.entries(subjectData).forEach(([year, papers]) => {
            allYears.add(year)
            papers.forEach((paper) => {
              allTypes.add(paper.type)
            })
          })
        })
      })
    })

    return {
      years: ["All Years", ...Array.from(allYears).sort().reverse()],
      types: ["All Types", ...Array.from(allTypes).sort()],
    }
  }, [])

  // Filter and organize question papers by term
  const filteredQuestionPapers = useMemo(() => {
    const results: Array<{
      course: string
      level: string
      subject: string
      terms: Array<{
        term: string
        year: string
        papers: Array<{
          id: string
          title: string
          term: string
          type: string
          author: string
          downloadUrl: string
        }>
      }>
    }> = []

    Object.entries(questionPapersData).forEach(([course, courseData]) => {
      if (selectedCourse !== "All Courses" && selectedCourse !== course) return

      Object.entries(courseData).forEach(([level, levelData]) => {
        if (selectedLevel !== "All Levels" && selectedLevel !== level) return

        Object.entries(levelData).forEach(([subject, subjectData]) => {
          if (selectedSubject !== "All Subjects" && selectedSubject !== subject) return

          // Group papers by term across all years
          const termGroups = new Map<string, Array<{ paper: any; year: string }>>()

          Object.entries(subjectData).forEach(([year, papers]) => {
            if (selectedYear !== "All Years" && selectedYear !== year) return

            papers.forEach((paper) => {
              const matchesType = selectedType === "All Types" || paper.type === selectedType
              const matchesSearch =
                searchQuery === "" ||
                paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.term.toLowerCase().includes(searchQuery.toLowerCase())

              if (matchesType && matchesSearch) {
                const termKey = `${paper.term}-${year}`
                if (!termGroups.has(termKey)) {
                  termGroups.set(termKey, [])
                }
                termGroups.get(termKey)!.push({ paper, year })
              }
            })
          })

          if (termGroups.size > 0) {
            const terms = Array.from(termGroups.entries()).map(([termKey, paperData]) => {
              const [term, year] = termKey.split("-")
              return {
                term,
                year,
                papers: paperData.map(({ paper }) => paper),
              }
            })

            // Sort terms by year (newest first) and then by term order (May, September, January)
            const termOrder = { May: 3, September: 2, January: 1 }
            terms.sort((a, b) => {
              const yearDiff = Number.parseInt(b.year) - Number.parseInt(a.year)
              if (yearDiff !== 0) return yearDiff
              return (
                (termOrder[b.term as keyof typeof termOrder] || 0) - (termOrder[a.term as keyof typeof termOrder] || 0)
              )
            })

            results.push({
              course,
              level,
              subject,
              terms,
            })
          }
        })
      })
    })

    return results
  }, [selectedCourse, selectedLevel, selectedSubject, selectedYear, selectedType, searchQuery])

  // Toggle term expansion
  const toggleTermExpansion = (termKey: string) => {
    if (expandedTerms.includes(termKey)) {
      setExpandedTerms(expandedTerms.filter((key) => key !== termKey))
    } else {
      setExpandedTerms([...expandedTerms, termKey])
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
    setSelectedYear("All Years")
    setSelectedType("All Types")
    setSearchQuery("")
  }

  // Toggle subject expansion
  const toggleSubjectExpansion = (subjectKey: string) => {
    if (expandedSubjects.includes(subjectKey)) {
      setExpandedSubjects(expandedSubjects.filter((key) => key !== subjectKey))
    } else {
      setExpandedSubjects([...expandedSubjects, subjectKey])
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container px-3 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <SectionTitle
            title="Quiz Preparation"
            subtitle="Access previous years' question papers grouped by term for streamlined exam preparation"
          />
        </div>

        <Tabs defaultValue="past-papers" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-background/50 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
            <TabsTrigger
              value="past-papers"
              className="flex gap-2 items-center data-[state=active]:bg-white/10 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Past Question Papers</span>
              <span className="sm:hidden">Past Papers</span>
            </TabsTrigger>
            <TabsTrigger
              value="mock-test"
              className="flex gap-2 items-center data-[state=active]:bg-white/10 data-[state=active]:shadow-md rounded-lg transition-all duration-200"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Mock Test</span>
              <span className="sm:hidden">Mock Test</span>
            </TabsTrigger>
          </TabsList>

          {/* Past Papers Tab */}
          <TabsContent value="past-papers">
            <QuizPrepFilterSection
              selectedCourse={selectedCourse}
              selectedLevel={selectedLevel}
              selectedSubject={selectedSubject}
              selectedYear={selectedYear}
              selectedType={selectedType}
              searchQuery={searchQuery}
              courses={courses}
              levels={levels}
              subjects={subjects}
              years={years}
              types={types}
              onCourseChange={handleCourseChange}
              onLevelChange={handleLevelChange}
              onSubjectChange={setSelectedSubject}
              onYearChange={setSelectedYear}
              onTypeChange={setSelectedType}
              onSearchChange={setSearchQuery}
              onResetFilters={resetFilters}
            />

            {filteredQuestionPapers.length > 0 ? (
              <motion.div
                variants={staggeredContainer}
                initial="hidden"
                animate="show"
                className="space-y-4 sm:space-y-6"
              >
                {filteredQuestionPapers.map((item, index) => {
                  const subjectKey = `${item.course}-${item.level}-${item.subject}`
                  const isExpanded = expandedSubjects.includes(subjectKey)
                  const totalPapers = item.terms.reduce((sum, term) => sum + term.papers.length, 0)

                  return (
                    <motion.div key={subjectKey} variants={fadeInUp} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <GlassmorphismCard className="overflow-hidden">
                        {/* Subject Header - Always Visible */}
                        <div
                          className="p-4 sm:p-5 lg:p-6 cursor-pointer hover:bg-white/5 transition-colors duration-200"
                          onClick={() => toggleSubjectExpansion(subjectKey)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                  >
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                  </motion.div>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="text-lg sm:text-xl font-semibold truncate">{item.subject}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {item.terms.length} term{item.terms.length !== 1 ? "s" : ""} • {totalPapers} paper
                                      {totalPapers !== 1 ? "s" : ""} available
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 flex-shrink-0">
                                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    {item.course}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/20 text-green-400 border-green-500/30"
                                  >
                                    {item.level}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Content */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 border-t border-white/10">
                            {/* Term-wise Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                              {item.terms.map((termData) => {
                                const termKey = `${item.course}-${item.level}-${item.subject}-${termData.term}-${termData.year}`
                                const paperTypes = ["End Term", "Quiz 1", "Quiz 2"]

                                return (
                                  <motion.div
                                    key={termKey}
                                    className="border border-white/10 rounded-lg overflow-hidden bg-background/20 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                  >
                                    {/* Term Header */}
                                    <div className="p-4 border-b border-white/10">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 text-primary" />
                                          <h4 className="font-medium text-foreground text-sm sm:text-base">
                                            {termData.term} {termData.year}
                                          </h4>
                                        </div>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                          {termData.papers.length} paper{termData.papers.length !== 1 ? "s" : ""}
                                        </Badge>
                                      </div>
                                    </div>

                                    {/* Papers List */}
                                    <div className="p-4 space-y-3">
                                      {paperTypes.map((type) => {
                                        const paper = termData.papers.find((p) => p.type === type)
                                        return (
                                          <div
                                            key={type}
                                            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                                              paper
                                                ? "border-white/10 bg-white/5 hover:bg-white/10"
                                                : "border-white/5 bg-background/10 opacity-50"
                                            }`}
                                          >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                              <BookOpen
                                                className={`h-4 w-4 flex-shrink-0 ${paper ? "text-primary" : "text-muted-foreground"}`}
                                              />
                                              <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                  <span
                                                    className={`text-sm font-medium ${paper ? "text-foreground" : "text-muted-foreground"}`}
                                                  >
                                                    {type}
                                                  </span>
                                                  <Badge
                                                    variant="outline"
                                                    className={`text-xs ${
                                                      type === "Quiz 1"
                                                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                        : type === "Quiz 2"
                                                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                                          : "bg-red-500/20 text-red-400 border-red-500/30"
                                                    }`}
                                                  >
                                                    {type}
                                                  </Badge>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex justify-end ml-2">
                                              {paper ? (
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-8 px-3 hover:bg-white/10 border border-white/10 flex-shrink-0"
                                                >
                                                  <Download className="h-3 w-3 mr-1" />
                                                  <span className="text-xs">Download</span>
                                                </Button>
                                              ) : (
                                                <span className="text-xs text-muted-foreground px-3 py-1">
                                                  Not Available
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </GlassmorphismCard>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-base sm:text-lg">
                  No question papers found for the selected filters
                </p>
                <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </TabsContent>

          {/* Mock Test Tab */}
          <TabsContent value="mock-test">
            <MockTestSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
