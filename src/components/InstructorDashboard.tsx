import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, DollarSign, Star, Play, MessageSquare, Calendar, Plus } from "lucide-react";

const InstructorDashboard = () => {
  const stats = [
    { title: "Total Students", value: "1,284", change: "+8%", icon: Users, color: "text-blue-600" },
    { title: "Active Courses", value: "12", change: "+2", icon: BookOpen, color: "text-green-600" },
    { title: "This Month Earnings", value: "$3,247", change: "+15%", icon: DollarSign, color: "text-purple-600" },
    { title: "Average Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-600" },
  ];

  const courses = [
    { 
      title: "Advanced React Development", 
      students: 324, 
      progress: 85, 
      revenue: "$1,250",
      status: "Published",
      thumbnail: "/placeholder.svg"
    },
    { 
      title: "JavaScript Fundamentals", 
      students: 567, 
      progress: 92, 
      revenue: "$1,890",
      status: "Published",
      thumbnail: "/placeholder.svg"
    },
    { 
      title: "Node.js Backend Development", 
      students: 198, 
      progress: 67, 
      revenue: "$780",
      status: "Draft",
      thumbnail: "/placeholder.svg"
    },
  ];

  const recentStudents = [
    { name: "Alice Cooper", course: "React Development", progress: 75, avatar: "/placeholder.svg" },
    { name: "Bob Wilson", course: "JavaScript Fundamentals", progress: 90, avatar: "/placeholder.svg" },
    { name: "Carol Zhang", course: "Node.js Backend", progress: 45, avatar: "/placeholder.svg" },
  ];

  const upcomingLessons = [
    { title: "React Hooks Deep Dive", time: "Today, 2:00 PM", students: 45 },
    { title: "API Integration Workshop", time: "Tomorrow, 10:00 AM", students: 32 },
    { title: "Database Design Basics", time: "Wed, 3:00 PM", students: 28 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your courses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
            <CardDescription>Manage and track your course performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                      <Play className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{course.revenue}</p>
                      <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
                    </div>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Lessons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingLessons.map((lesson, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-medium text-sm">{lesson.title}</h4>
                <p className="text-xs text-muted-foreground">{lesson.time}</p>
                <p className="text-xs text-blue-600">{lesson.students} students registered</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Student Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Student Activity
          </CardTitle>
          <CardDescription>Track your students' progress and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recentStudents.map((student, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.course}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboard;