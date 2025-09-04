import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  DollarSign,
  Users,
  BookOpen,
  UserPlus,
  Video,
  FileText,
  BarChart3,
  Settings,
  Upload,
  MessageSquare,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  HardDrive,
  Wifi,
  Award,
  Target,
  Eye,
  Play,
  Plus,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalSales: number;
  activeUsers: number;
  totalCourses: number;
  newSignups: number;
  liveClasses: number;
  quizAttempts: number;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

interface Transaction {
  id: string;
  student: string;
  course: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  time: string;
  duration: number;
  students: number;
  status: "upcoming" | "live" | "ended";
  startUrl?: string;
}

const InstituteAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isAdminInstructor, setIsAdminInstructor] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("week");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 125670,
    activeUsers: 1248,
    totalCourses: 156,
    newSignups: 45,
    liveClasses: 8,
    quizAttempts: 234,
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      student: "John Doe",
      course: "React Masterclass",
      amount: 299,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "TXN002", 
      student: "Jane Smith",
      course: "Python Fundamentals",
      amount: 199,
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "TXN003",
      student: "Mike Johnson",
      course: "Data Science Bootcamp",
      amount: 499,
      date: "2024-01-14",
      status: "completed",
    },
  ]);

  const [liveClasses] = useState<LiveClass[]>([
    {
      id: "LC001",
      title: "Advanced JavaScript Concepts",
      instructor: "Sarah Wilson",
      time: "14:00",
      duration: 90,
      students: 45,
      status: "upcoming",
      startUrl: "https://zoom.us/start/123",
    },
    {
      id: "LC002",
      title: "Database Design Workshop",
      instructor: "Mark Thompson",
      time: "16:30",
      duration: 120,
      students: 32,
      status: "live",
    },
    {
      id: "LC003",
      title: "UI/UX Design Principles",
      instructor: "Emily Chen",
      time: "19:00",
      duration: 60,
      students: 28,
      status: "upcoming",
    },
  ]);

  const quickActions: QuickAction[] = [
    {
      id: "create-course",
      title: "Create Course",
      icon: BookOpen,
      color: "bg-blue-500",
      action: () => toast({ title: "Create Course", description: "Opening course creator..." }),
    },
    {
      id: "add-quiz",
      title: "Add Quiz",
      icon: FileText,
      color: "bg-green-500",
      action: () => toast({ title: "Add Quiz", description: "Opening quiz builder..." }),
    },
    {
      id: "manage-students",
      title: "Manage Students",
      icon: Users,
      color: "bg-purple-500",
      action: () => toast({ title: "Manage Students", description: "Opening student management..." }),
    },
    {
      id: "upload-content",
      title: "Upload Content",
      icon: Upload,
      color: "bg-orange-500",
      action: () => toast({ title: "Upload Content", description: "Opening content uploader..." }),
    },
    {
      id: "send-announcement",
      title: "Send Announcement",
      icon: MessageSquare,
      color: "bg-pink-500",
      action: () => toast({ title: "Send Announcement", description: "Opening announcement composer..." }),
    },
    {
      id: "generate-report",
      title: "Generate Report",
      icon: BarChart3,
      color: "bg-indigo-500",
      action: () => toast({ title: "Generate Report", description: "Opening report generator..." }),
    },
  ];

  const handleStartLiveClass = (classItem: LiveClass) => {
    if (classItem.startUrl) {
      window.open(classItem.startUrl, "_blank");
      toast({ title: "Success", description: `Launching ${classItem.title}` });
    } else {
      toast({ title: "Error", description: "Start URL not available" });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-blue-500";
      case "ended":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo & Search */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EduInstitute
              </h1>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses, students, quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Admin/Instructor Toggle */}
            <div className="flex items-center gap-3 rounded-lg border p-2">
              <span className="text-sm font-medium">Admin is also Instructor</span>
              <Switch
                checked={isAdminInstructor}
                onCheckedChange={setIsAdminInstructor}
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalSales)}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% this {selectedTimeFilter}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+5% today</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalCourses}</p>
                  <p className="text-xs text-green-600">+3 this week</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Signups</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.newSignups}</p>
                  <p className="text-xs text-green-600">+18% today</p>
                </div>
                <UserPlus className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live Classes</p>
                  <p className="text-2xl font-bold text-red-600">{stats.liveClasses}</p>
                  <p className="text-xs text-blue-600">{liveClasses.filter(c => c.status === "live").length} active</p>
                </div>
                <Video className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200/20 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Attempts</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.quizAttempts}</p>
                  <p className="text-xs text-green-600">+28 today</p>
                </div>
                <FileText className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:shadow-md transition-all"
                  onClick={action.action}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales & Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <div className="flex items-center gap-2">
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
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{transaction.student.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{transaction.student}</p>
                        <p className="text-sm text-muted-foreground">{transaction.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                      <Badge className={`${getStatusBadgeColor(transaction.status)} text-white`}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Live Classes Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="p-4 rounded-lg border space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{classItem.title}</h4>
                        <p className="text-sm text-muted-foreground">{classItem.instructor}</p>
                      </div>
                      <Badge className={`${getStatusBadgeColor(classItem.status)} text-white`}>
                        {classItem.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {classItem.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {classItem.students} students
                      </div>
                    </div>

                    {classItem.status === "live" || classItem.status === "upcoming" ? (
                      <Button
                        size="sm"
                        className="w-full"
                        variant={classItem.status === "live" ? "default" : "outline"}
                        onClick={() => handleStartLiveClass(classItem)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {classItem.status === "live" ? "Join Live" : "Start Class"}
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bandwidth & Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Resources Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bandwidth</span>
                  <span className="text-sm text-muted-foreground">750 GB / 1000 GB</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-muted-foreground">456 GB / 500 GB</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monthly Active Users</span>
                  <span className="text-sm text-muted-foreground">4,200 / 5,000</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Performing Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "React Masterclass", students: 245, rating: 4.8, revenue: 12450 },
                  { name: "Python for Beginners", students: 189, rating: 4.6, revenue: 9870 },
                  { name: "Data Science Bootcamp", students: 156, rating: 4.9, revenue: 15600 },
                  { name: "JavaScript Advanced", students: 134, rating: 4.7, revenue: 8900 },
                ].map((course, index) => (
                  <div key={course.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.students} students</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(course.revenue)}</p>
                      <p className="text-sm text-muted-foreground">⭐ {course.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructor Section (only shows when toggle is ON) */}
        {isAdminInstructor && (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Instructor Dashboard
                <Badge variant="secondary">Admin + Instructor Mode</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="classes" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="classes">My Classes</TabsTrigger>
                  <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
                  <TabsTrigger value="content">My Content</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="classes" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveClasses.slice(0, 2).map((classItem) => (
                      <Card key={classItem.id}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{classItem.title}</h4>
                              <Badge className={`${getStatusBadgeColor(classItem.status)} text-white`}>
                                {classItem.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>📅 Today at {classItem.time}</p>
                              <p>👥 {classItem.students} registered</p>
                            </div>
                            <Button size="sm" className="w-full">
                              <Video className="h-4 w-4 mr-2" />
                              Manage Class
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="quizzes" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No quizzes to review at the moment</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Content library coming soon</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="reports" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Performance reports coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default InstituteAdminDashboard;