import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy, Target, Play, Calendar, Star, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const stats = [
    { title: "Courses Enrolled", value: "8", change: "+2", icon: BookOpen, color: "text-blue-600" },
    { title: "Hours Learned", value: "127", change: "+15", icon: Clock, color: "text-green-600" },
    { title: "Certificates", value: "3", change: "+1", icon: Trophy, color: "text-purple-600" },
    { title: "Current Streak", value: "12 days", change: "+3", icon: Target, color: "text-orange-600" },
  ];

  const enrolledCourses = [
    {
      title: "Complete React Developer Course",
      instructor: "Sarah Johnson",
      progress: 75,
      totalLessons: 48,
      completedLessons: 36,
      nextLesson: "Redux State Management",
      thumbnail: "/placeholder.svg",
      rating: 4.8
    },
    {
      title: "JavaScript ES6 Masterclass",
      instructor: "Mike Chen",
      progress: 90,
      totalLessons: 32,
      completedLessons: 29,
      nextLesson: "Async/Await Patterns",
      thumbnail: "/placeholder.svg",
      rating: 4.9
    },
    {
      title: "Node.js Backend Development",
      instructor: "Emma Davis",
      progress: 45,
      totalLessons: 56,
      completedLessons: 25,
      nextLesson: "Database Integration",
      thumbnail: "/placeholder.svg",
      rating: 4.7
    },
  ];

  const upcomingDeadlines = [
    { title: "React Project Submission", course: "React Developer Course", due: "Tomorrow", type: "Assignment" },
    { title: "JavaScript Quiz", course: "JavaScript Masterclass", due: "In 3 days", type: "Quiz" },
    { title: "Portfolio Review", course: "Full Stack Development", due: "Next week", type: "Project" },
  ];

  const achievements = [
    { title: "First Course Completed", description: "Completed your first course", earned: "2 days ago", icon: "🎓" },
    { title: "Week Warrior", description: "Studied for 7 consecutive days", earned: "1 week ago", icon: "🔥" },
    { title: "Quiz Master", description: "Scored 100% on 5 quizzes", earned: "2 weeks ago", icon: "🏆" },
  ];

  const recommendations = [
    {
      title: "Advanced Python Programming",
      instructor: "Dr. Wilson",
      rating: 4.9,
      students: "2.1k",
      price: "$89",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Machine Learning Basics",
      instructor: "Prof. Chen",
      rating: 4.8,
      students: "1.8k",
      price: "$129",
      thumbnail: "/placeholder.svg"
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Continue your learning journey and achieve your goals</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Courses
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
                <span className="text-green-600">{stat.change}</span> this month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Continue Learning
          </CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{course.title}</h4>
                    <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} lessons completed
                  </p>
                  <p className="text-xs font-medium">Next: {course.nextLesson}</p>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Continue Learning
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{deadline.type}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{deadline.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Celebrate your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-blue-600">{achievement.earned}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recommended for You
          </CardTitle>
          <CardDescription>Courses that match your interests and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{course.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{course.students} students</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{course.price}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Enroll
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;