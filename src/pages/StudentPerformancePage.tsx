import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, TrendingUp, TrendingDown, Award, Clock, 
  Filter, Search, Download, Eye, ArrowLeft, Target, BookOpen,
  ChevronDown, Calendar, Activity, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentPerformancePage = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");

  const performanceData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      course: "React Masterclass",
      overallScore: 87,
      quizzesAttempted: 8,
      totalQuizzes: 10,
      averageQuizScore: 85,
      assignmentsCompleted: 12,
      totalAssignments: 15,
      timeSpent: "45h 30m",
      lastActivity: "2 hours ago",
      rank: 1,
      trend: "up",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Bob Chen",
      email: "bob@example.com",
      course: "Full-Stack JS",
      overallScore: 94,
      quizzesAttempted: 12,
      totalQuizzes: 12,
      averageQuizScore: 92,
      assignmentsCompleted: 18,
      totalAssignments: 20,
      timeSpent: "62h 15m",
      lastActivity: "1 day ago",
      rank: 2,
      trend: "up",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Carol Rodriguez",
      email: "carol@example.com",
      course: "Python Data Science",
      overallScore: 72,
      quizzesAttempted: 6,
      totalQuizzes: 10,
      averageQuizScore: 68,
      assignmentsCompleted: 8,
      totalAssignments: 12,
      timeSpent: "28h 45m",
      lastActivity: "3 hours ago",
      rank: 15,
      trend: "down",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@example.com",
      course: "UI/UX Design",
      overallScore: 91,
      quizzesAttempted: 9,
      totalQuizzes: 10,
      averageQuizScore: 88,
      assignmentsCompleted: 14,
      totalAssignments: 16,
      timeSpent: "52h 20m",
      lastActivity: "5 hours ago",
      rank: 3,
      trend: "up",
      avatar: "/placeholder.svg"
    }
  ];

  const courses = ["React Masterclass", "Full-Stack JS", "Python Data Science", "UI/UX Design"];
  
  const filteredStudents = performanceData.filter(student => 
    (selectedCourse === "all" || student.course === selectedCourse) &&
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const averageMetrics = {
    overallScore: Math.round(filteredStudents.reduce((acc, s) => acc + s.overallScore, 0) / filteredStudents.length),
    quizCompletion: Math.round(filteredStudents.reduce((acc, s) => acc + (s.quizzesAttempted / s.totalQuizzes * 100), 0) / filteredStudents.length),
    assignmentCompletion: Math.round(filteredStudents.reduce((acc, s) => acc + (s.assignmentsCompleted / s.totalAssignments * 100), 0) / filteredStudents.length),
    averageTime: "42h 30m"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Performance Analytics</h1>
                <p className="text-sm text-muted-foreground">
                  Complete analytics with drill downs and filters
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students by name or email..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Overview Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Overall Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMetrics.overallScore}%</div>
              <Progress value={averageMetrics.overallScore} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Completion</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMetrics.quizCompletion}%</div>
              <Progress value={averageMetrics.quizCompletion} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMetrics.assignmentCompletion}%</div>
              <Progress value={averageMetrics.assignmentCompletion} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMetrics.averageTime}</div>
              <p className="text-xs text-muted-foreground mt-2">Per student</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Performance Details
            </CardTitle>
            <CardDescription>
              Showing {filteredStudents.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-4 rounded-lg border hover:shadow-soft transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <Badge variant="outline" className="mt-1">{student.course}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-lg">{student.overallScore}%</div>
                        <div className="text-muted-foreground">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{student.quizzesAttempted}/{student.totalQuizzes}</div>
                        <div className="text-muted-foreground">Quizzes</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{student.assignmentsCompleted}/{student.totalAssignments}</div>
                        <div className="text-muted-foreground">Assignments</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">#{student.rank}</div>
                        <div className="text-muted-foreground">Rank</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{student.timeSpent}</div>
                        <div className="text-muted-foreground">Time Spent</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {student.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPerformancePage;