import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, Users, DollarSign, Star, Play, MessageSquare, Calendar, Plus, 
  Video, FileText, Upload, BarChart3, Clock, TrendingUp, Award, CheckCircle,
  Edit, Eye, Trash2, Settings, Bell, Search, Filter, Download, Send,
  VideoIcon as Webcam, PenTool, Target, Zap, Globe, UserCheck, 
  BookMarked, GraduationCap, Lightbulb, Timer, Activity,
  ChevronRight, ExternalLink, RefreshCw, MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProInstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isScheduleClassOpen, setIsScheduleClassOpen] = useState(false);
  const [isGradeAssignmentOpen, setIsGradeAssignmentOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      title: "Total Students", 
      value: "2,847", 
      change: "+12%", 
      icon: Users, 
      color: "text-blue-500", 
      trend: "up",
      detail: "Across all courses"
    },
    { 
      title: "Active Courses", 
      value: "18", 
      change: "+3", 
      icon: BookOpen, 
      color: "text-green-500", 
      trend: "up",
      detail: "Published & in progress"
    },
    { 
      title: "This Month Revenue", 
      value: "$12,450", 
      change: "+23%", 
      icon: DollarSign, 
      color: "text-purple-500", 
      trend: "up",
      detail: "From course sales & subscriptions"
    },
    { 
      title: "Course Rating", 
      value: "4.9/5", 
      change: "+0.3", 
      icon: Star, 
      color: "text-yellow-500", 
      trend: "up",
      detail: "Average across all courses"
    },
  ];

  const quickActions = [
    { 
      title: "Create New Course", 
      icon: Plus, 
      color: "bg-gradient-primary", 
      action: () => setIsCreateCourseOpen(true),
      shortcut: "Ctrl+N",
      description: "Start building your next course"
    },
    { 
      title: "Upload Video Lesson", 
      icon: Video, 
      color: "bg-gradient-accent", 
      action: () => toast({ title: "Upload Video", description: "Video upload dialog opening..." }),
      shortcut: "Ctrl+U",
      description: "Add video content to existing courses"
    },
    { 
      title: "Schedule Live Class", 
      icon: Webcam, 
      color: "bg-gradient-zoho", 
      action: () => setIsScheduleClassOpen(true),
      shortcut: "Ctrl+L",
      description: "Set up your next live session"
    },
    { 
      title: "Create Assignment", 
      icon: PenTool, 
      color: "bg-purple-500", 
      action: () => toast({ title: "Create Assignment", description: "Assignment builder opening..." }),
      shortcut: "Ctrl+A",
      description: "Design new assignments & projects"
    },
    { 
      title: "Manage Students", 
      icon: UserCheck, 
      color: "bg-orange-500", 
      action: () => toast({ title: "Student Management", description: "Navigating to student management..." }),
      shortcut: "Ctrl+S",
      description: "View & manage enrolled students"
    },
    { 
      title: "Analytics Dashboard", 
      icon: BarChart3, 
      color: "bg-teal-500", 
      action: () => setIsAnalyticsOpen(true),
      shortcut: "Ctrl+D",
      description: "Detailed performance metrics"
    },
  ];

  const myCourses = [
    { 
      id: 1,
      title: "Advanced React & Next.js Masterclass", 
      students: 1247, 
      progress: 85, 
      revenue: "$4,250",
      rating: 4.8,
      status: "Published",
      thumbnail: "/placeholder.svg",
      lastUpdated: "2 days ago",
      completion: 92,
      engagement: 87,
      nextLesson: "React Server Components"
    },
    { 
      id: 2,
      title: "Full-Stack JavaScript Development", 
      students: 892, 
      progress: 78, 
      revenue: "$3,890",
      rating: 4.9,
      status: "Published",
      thumbnail: "/placeholder.svg",
      lastUpdated: "1 week ago",
      completion: 88,
      engagement: 91,
      nextLesson: "API Authentication"
    },
    { 
      id: 3,
      title: "Python for Data Science", 
      students: 456, 
      progress: 45, 
      revenue: "$2,180",
      rating: 4.7,
      status: "Draft",
      thumbnail: "/placeholder.svg",
      lastUpdated: "3 days ago",
      completion: 65,
      engagement: 82,
      nextLesson: "Machine Learning Basics"
    },
    { 
      id: 4,
      title: "UI/UX Design Fundamentals", 
      students: 234, 
      progress: 92, 
      revenue: "$1,890",
      rating: 4.9,
      status: "Published",
      thumbnail: "/placeholder.svg",
      lastUpdated: "5 days ago",
      completion: 94,
      engagement: 89,
      nextLesson: "User Testing"
    },
  ];

  const upcomingClasses = [
    { 
      id: 1,
      title: "React Hooks Deep Dive", 
      time: "Today, 2:00 PM", 
      duration: "90 min",
      students: 45,
      course: "React Masterclass",
      meetingLink: "https://zoom.us/j/123456789",
      status: "starting_soon"
    },
    { 
      id: 2,
      title: "API Integration Workshop", 
      time: "Tomorrow, 10:00 AM", 
      duration: "120 min",
      students: 32,
      course: "Full-Stack JS",
      meetingLink: "https://zoom.us/j/987654321",
      status: "scheduled"
    },
    { 
      id: 3,
      title: "Database Design Masterclass", 
      time: "Wed, 3:00 PM", 
      duration: "150 min",
      students: 28,
      course: "Backend Development",
      meetingLink: "https://zoom.us/j/456789123",
      status: "scheduled"
    },
  ];

  const pendingTasks = [
    { 
      id: 1,
      type: "Assignment",
      title: "React Component Architecture - Final Project",
      course: "React Masterclass",
      submissions: 23,
      total: 45,
      deadline: "Tomorrow",
      priority: "high"
    },
    { 
      id: 2,
      type: "Quiz",
      title: "JavaScript ES6+ Features",
      course: "Full-Stack JS",
      submissions: 18,
      total: 32,
      deadline: "2 days",
      priority: "medium"
    },
    { 
      id: 3,
      type: "Discussion",
      title: "Best Practices in API Design",
      course: "Backend Development",
      responses: 15,
      total: 28,
      deadline: "1 week",
      priority: "low"
    },
  ];

  const recentStudents = [
    { 
      id: 1,
      name: "Alice Johnson", 
      course: "React Masterclass", 
      progress: 87, 
      avatar: "/placeholder.svg",
      lastActivity: "2 hours ago",
      status: "active",
      grade: "A"
    },
    { 
      id: 2,
      name: "Bob Chen", 
      course: "Full-Stack JS", 
      progress: 94, 
      avatar: "/placeholder.svg",
      lastActivity: "1 day ago",
      status: "active",
      grade: "A+"
    },
    { 
      id: 3,
      name: "Carol Rodriguez", 
      course: "Python Data Science", 
      progress: 72, 
      avatar: "/placeholder.svg",
      lastActivity: "3 hours ago",
      status: "struggling",
      grade: "B"
    },
    { 
      id: 4,
      name: "David Kim", 
      course: "UI/UX Design", 
      progress: 91, 
      avatar: "/placeholder.svg",
      lastActivity: "5 hours ago",
      status: "active",
      grade: "A"
    },
  ];

  const handleStartClass = (classItem) => {
    toast({
      title: "Starting Live Class",
      description: `Opening ${classItem.title} in Zoom...`,
    });
    window.open(classItem.meetingLink, '_blank');
  };

  const handleGradeAssignment = (task) => {
    setIsGradeAssignmentOpen(true);
    toast({
      title: "Opening Grading Interface",
      description: `Grading ${task.title}...`,
    });
  };

  const handleViewStudent = (student) => {
    toast({
      title: "Student Profile",
      description: `Viewing ${student.name}'s progress and performance...`,
    });
  };

  const handleCreateCourse = () => {
    toast({
      title: "Course Created Successfully!",
      description: "Your new course has been saved as a draft.",
    });
    setIsCreateCourseOpen(false);
  };

  const handleScheduleClass = () => {
    toast({
      title: "Class Scheduled!",
      description: "Your live class has been scheduled and students will be notified.",
    });
    setIsScheduleClassOpen(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Instructor Hub</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Current time: {formatTime(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, students, content..." 
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-zoho-hover transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-background ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </div>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Fast access to your most-used tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-3 group hover:shadow-zoho transition-all duration-300"
                  onClick={action.action}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 rounded-lg text-white ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <kbd className="text-xs bg-muted px-2 py-1 rounded">{action.shortcut}</kbd>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors self-end" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-primary" />
                    My Courses
                  </CardTitle>
                  <CardDescription>Manage and track your course performance</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCourses.map((course, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-soft transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {course.students} students
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {course.rating}
                            </span>
                            <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{course.revenue}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Completion</span>
                          <span className="text-foreground">{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Engagement</span>
                          <span className="text-foreground">{course.engagement}%</span>
                        </div>
                        <Progress value={course.engagement} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Next: </span>
                        <span className="text-foreground font-medium">{course.nextLesson}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Classes & Tasks */}
          <div className="space-y-6">
            {/* Live Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webcam className="h-5 w-5 text-red-500" />
                  Live Classes
                </CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-gradient-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">{classItem.title}</h4>
                      {classItem.status === 'starting_soon' && (
                        <Badge variant="destructive" className="text-xs">Live Soon</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {classItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {classItem.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {classItem.students} students
                        </span>
                        <span className="text-primary">{classItem.course}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3"
                      variant={classItem.status === 'starting_soon' ? 'default' : 'outline'}
                      onClick={() => handleStartClass(classItem)}
                    >
                      {classItem.status === 'starting_soon' ? 'Start Class' : 'Join Meeting'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Pending Tasks
                </CardTitle>
                <CardDescription>Assignments & reviews waiting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-gradient-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                        {task.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due {task.deadline}</span>
                    </div>
                    <h4 className="font-medium text-sm text-foreground mb-1">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{task.course}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-foreground font-medium">{task.submissions || task.responses}</span>
                        <span className="text-muted-foreground">/{task.total}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleGradeAssignment(task)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Student Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Recent Student Activity
                </CardTitle>
                <CardDescription>Track student progress and engagement</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {recentStudents.map((student, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border hover:shadow-soft transition-all duration-300 cursor-pointer group"
                  onClick={() => handleViewStudent(student)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{student.course}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={student.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {student.status}
                        </Badge>
                        <span className="text-xs font-medium text-primary">Grade: {student.grade}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Last active: {student.lastActivity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Course Dialog */}
      <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Set up your new course with basic information. You can add content later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" placeholder="Enter course title..." />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what students will learn..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCourse}>Create Course</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Class Dialog */}
      <Dialog open={isScheduleClassOpen} onOpenChange={setIsScheduleClassOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Live Class</DialogTitle>
            <DialogDescription>
              Set up a new live session for your students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="classTitle">Class Title</Label>
              <Input id="classTitle" placeholder="Enter class topic..." />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React Masterclass</SelectItem>
                  <SelectItem value="js">Full-Stack JS</SelectItem>
                  <SelectItem value="python">Python Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="90" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsScheduleClassOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleClass}>Schedule Class</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Analytics Dashboard</DialogTitle>
            <DialogDescription>
              Detailed insights into your course performance and student engagement.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,847</div>
                    <p className="text-xs text-muted-foreground">+23% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="engagement">
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Engagement analytics will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="revenue">
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Revenue analytics will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="students">
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Student analytics will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Grade Assignment Dialog */}
      <Dialog open={isGradeAssignmentOpen} onOpenChange={setIsGradeAssignmentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Grade Assignment</DialogTitle>
            <DialogDescription>
              Review and grade student submissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Grading interface will be displayed here</p>
              <p className="text-sm">Select submissions to review and provide feedback</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsGradeAssignmentOpen(false)}>
                Close
              </Button>
              <Button>Save Grades</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProInstructorDashboard;