import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Bell, 
  UserCircle2,
  UserPlus,
  FileText,
  Megaphone,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ChevronDown,
  LogOut,
  Settings,
  CreditCard,
  User
} from "lucide-react";

type DateFilter = "today" | "7days" | "15days" | "30days" | "90days" | "365days";
type TransactionFilter = "all" | "completed" | "pending" | "failed";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isInstructorMode, setIsInstructorMode] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Mock data - will be replaced with API calls
  const stats = [
    { title: "Total Revenue", value: "₹4,83,920", change: "+18%", trend: "up", icon: TrendingUp, color: "text-emerald-600" },
    { title: "Active Students", value: "12,847", change: "+12%", trend: "up", icon: Users, color: "text-blue-600" },
    { title: "Active Courses", value: "243", change: "+5%", trend: "up", icon: BookOpen, color: "text-purple-600" },
    { title: "Completion Rate", value: "87%", change: "-2%", trend: "down", icon: Activity, color: "text-orange-600" },
  ];

  const transactions = [
    { id: "TXN001", student: "Rahul Sharma", course: "Web Development", amount: "₹4,999", date: "2025-11-04", status: "completed" },
    { id: "TXN002", student: "Priya Patel", course: "Data Science", amount: "₹7,499", date: "2025-11-04", status: "completed" },
    { id: "TXN003", student: "Amit Kumar", course: "UI/UX Design", amount: "₹3,999", date: "2025-11-03", status: "pending" },
    { id: "TXN004", student: "Sneha Reddy", course: "Digital Marketing", amount: "₹2,999", date: "2025-11-03", status: "failed" },
    { id: "TXN005", student: "Vikram Singh", course: "Python Programming", amount: "₹5,499", date: "2025-11-03", status: "completed" },
    { id: "TXN006", student: "Anjali Verma", course: "Machine Learning", amount: "₹8,999", date: "2025-11-02", status: "completed" },
    { id: "TXN007", student: "Rohan Gupta", course: "React Masterclass", amount: "₹6,499", date: "2025-11-02", status: "pending" },
    { id: "TXN008", student: "Kavita Desai", course: "SQL Fundamentals", amount: "₹2,499", date: "2025-11-02", status: "completed" },
    { id: "TXN009", student: "Arjun Mehta", course: "Cloud Computing", amount: "₹9,999", date: "2025-11-01", status: "failed" },
    { id: "TXN010", student: "Neha Joshi", course: "Mobile App Dev", amount: "₹7,999", date: "2025-11-01", status: "completed" },
  ];

  const notifications = [
    { id: 1, type: "payment", message: "New payment received from Rahul Sharma", time: "5 min ago", read: false },
    { id: 2, type: "user", message: "3 new instructor registrations pending approval", time: "1 hour ago", read: false },
    { id: 3, type: "course", message: "Web Development course completed by 15 students", time: "2 hours ago", read: true },
    { id: 4, type: "system", message: "System backup completed successfully", time: "5 hours ago", read: true },
    { id: 5, type: "alert", message: "Server maintenance scheduled for tonight", time: "1 day ago", read: true },
  ];

  const quickActions = [
    { 
      title: "Manage Students", 
      description: "View & manage student accounts",
      icon: Users, 
      color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
      action: () => console.log("Manage Students")
    },
    { 
      title: "Manage Instructors", 
      description: "Oversee instructor profiles",
      icon: UserPlus, 
      color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
      action: () => console.log("Manage Instructors")
    },
    { 
      title: "Send Announcements", 
      description: "Broadcast to all users",
      icon: Megaphone, 
      color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
      action: () => console.log("Send Announcements")
    },
    { 
      title: "Generate Reports", 
      description: "Analytics & insights",
      icon: BarChart3, 
      color: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      action: () => console.log("Generate Reports")
    },
  ];

  const handleModeSwitch = (checked: boolean) => {
    setIsInstructorMode(checked);
    if (checked) {
      navigate("/instructor-dashboard");
    }
  };

  const getFilteredTransactions = () => {
    if (transactionFilter === "all") return transactions;
    return transactions.filter(t => t.status === transactionFilter);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="space-y-6 p-6">
        {/* Header with Mode Switch */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dashboard Mode Switcher */}
            <div className="flex items-center gap-3 bg-card border rounded-lg px-4 py-2 shadow-sm">
              <Label htmlFor="mode-switch" className={!isInstructorMode ? "font-semibold text-primary" : "text-muted-foreground"}>
                Admin
              </Label>
              <Switch 
                id="mode-switch" 
                checked={isInstructorMode}
                onCheckedChange={handleModeSwitch}
              />
              <Label htmlFor="mode-switch" className={isInstructorMode ? "font-semibold text-primary" : "text-muted-foreground"}>
                Instructor
              </Label>
            </div>

            {/* Notifications */}
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-semibold">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <Badge variant="secondary">{unreadNotifications} new</Badge>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg mb-2 transition-colors ${
                          !notification.read ? "bg-primary/5" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                            !notification.read ? "bg-primary" : "bg-muted"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>

            {/* Profile Menu */}
            <Popover open={profileOpen} onOpenChange={setProfileOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Preferences
                  </Button>
                </div>
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Date Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Period:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Today", value: "today" as DateFilter },
                  { label: "7 Days", value: "7days" as DateFilter },
                  { label: "15 Days", value: "15days" as DateFilter },
                  { label: "30 Days", value: "30days" as DateFilter },
                  { label: "90 Days", value: "90days" as DateFilter },
                  { label: "365 Days", value: "365days" as DateFilter },
                ].map((filter) => (
                  <Button
                    key={filter.value}
                    variant={dateFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateFilter(filter.value)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-lg hover:scale-[1.02] border-l-4" style={{ borderLeftColor: stat.color.includes('emerald') ? 'hsl(var(--chart-1))' : stat.color.includes('blue') ? 'hsl(var(--chart-2))' : stat.color.includes('purple') ? 'hsl(var(--chart-3))' : 'hsl(var(--chart-4))' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color.includes('emerald') ? 'from-emerald-500/10 to-emerald-500/5' : stat.color.includes('blue') ? 'from-blue-500/10 to-blue-500/5' : stat.color.includes('purple') ? 'from-purple-500/10 to-purple-500/5' : 'from-orange-500/10 to-orange-500/5'}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center gap-2">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] overflow-hidden relative"
                onClick={action.action}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-4 rounded-2xl transition-all ${action.color}`}>
                      <action.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions and System Health */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>Latest payment activities</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    {["all", "completed", "pending", "failed"].map((filter) => (
                      <Button
                        key={filter}
                        variant={transactionFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTransactionFilter(filter as TransactionFilter)}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {getFilteredTransactions().map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.student}</p>
                          <p className="text-xs text-muted-foreground">{transaction.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-sm">{transaction.amount}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <Badge 
                          variant={
                            transaction.status === "completed" ? "default" : 
                            transaction.status === "pending" ? "secondary" : 
                            "destructive"
                          }
                          className="capitalize"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/admin-sales-reports")}
                >
                  View All Transactions
                  <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>Real-time performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Server Load</span>
                  <span className="text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Optimal performance</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Database</span>
                  <span className="text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">High usage detected</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Storage</span>
                  <span className="text-muted-foreground">42%</span>
                </div>
                <Progress value={42} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Sufficient space available</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant="default" className="bg-emerald-600">All Systems Operational</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">Just now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;