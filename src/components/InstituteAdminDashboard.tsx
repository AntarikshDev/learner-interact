import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, subDays, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Bell,
  ChevronDown,
  IndianRupee,
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
  Calendar as CalendarIcon,
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
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  User,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

type DateFilter = "today" | "7days" | "15days" | "30days" | "90days" | "365days";
type TransactionFilter = "all" | "completed" | "pending" | "failed";

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
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
  const navigate = useNavigate();
  const [isInstructorMode, setIsInstructorMode] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handlePresetDateRange = (preset: DateFilter) => {
    const today = new Date();
    let startDate = today;

    switch (preset) {
      case "today":
        startDate = today;
        break;
      case "7days":
        startDate = subDays(today, 6);
        break;
      case "15days":
        startDate = subDays(today, 14);
        break;
      case "30days":
        startDate = subDays(today, 29);
        break;
      case "90days":
        startDate = subDays(today, 89);
        break;
      case "365days":
        startDate = subDays(today, 364);
        break;
    }

    setCustomDateRange({ from: startDate, to: today });
    setDateFilter(preset);
  };

  const getFormattedDateRange = () => {
    if (!customDateRange?.from) return { start: "Select date", end: "" };
    
    return {
      start: format(customDateRange.from, "dd MMM yyyy"),
      end: customDateRange.to ? format(customDateRange.to, "dd MMM yyyy") : format(customDateRange.from, "dd MMM yyyy"),
    };
  };

  const dateRange = getFormattedDateRange();

  // Mock data - will be replaced with API calls
  const stats: DashboardStats[] = [
    { title: "Total Sales", value: "₹1,25,670.00", change: "+12%", trend: "up", icon: IndianRupee, color: "text-blue-600" },
    { title: "Active Users", value: "1,248", change: "+5%", trend: "up", icon: Users, color: "text-green-600" },
    { title: "Total Courses", value: "156", change: "+3%", trend: "up", icon: BookOpen, color: "text-purple-600" },
    { title: "New Signups", value: "45", change: "+18%", trend: "up", icon: UserPlus, color: "text-orange-600" },
    { title: "Live Classes", value: "8", change: "1 active", trend: "up", icon: Video, color: "text-red-600" },
    { title: "Quiz Attempts", value: "234", change: "+28 today", trend: "up", icon: FileText, color: "text-indigo-600" },
  ];

  const transactions: Transaction[] = [
    { id: "TXN001", student: "John Doe", course: "React Masterclass", amount: 299, date: "2024-01-15", status: "completed" },
    { id: "TXN002", student: "Jane Smith", course: "Python Fundamentals", amount: 199, date: "2024-01-15", status: "pending" },
    { id: "TXN003", student: "Mike Johnson", course: "Data Science Bootcamp", amount: 499, date: "2024-01-14", status: "completed" },
    { id: "TXN004", student: "Sarah Wilson", course: "JavaScript Advanced", amount: 349, date: "2024-01-14", status: "failed" },
    { id: "TXN005", student: "David Lee", course: "Web Development", amount: 599, date: "2024-01-13", status: "completed" },
    { id: "TXN006", student: "Emily Chen", course: "UI/UX Design", amount: 449, date: "2024-01-13", status: "pending" },
    { id: "TXN007", student: "Michael Brown", course: "Node.js Fundamentals", amount: 279, date: "2024-01-12", status: "completed" },
    { id: "TXN008", student: "Lisa Anderson", course: "Database Design", amount: 399, date: "2024-01-12", status: "completed" },
    { id: "TXN009", student: "James Wilson", course: "Cloud Computing", amount: 699, date: "2024-01-11", status: "failed" },
    { id: "TXN010", student: "Emma Davis", course: "Machine Learning", amount: 899, date: "2024-01-11", status: "completed" },
  ];

  const notifications = [
    { id: 1, type: "payment", message: "New payment received from John Doe", time: "5 min ago", read: false },
    { id: 2, type: "user", message: "3 new instructor registrations pending approval", time: "1 hour ago", read: false },
    { id: 3, type: "course", message: "React Masterclass completed by 15 students", time: "2 hours ago", read: false },
    { id: 4, type: "system", message: "System backup completed successfully", time: "5 hours ago", read: true },
    { id: 5, type: "alert", message: "Server maintenance scheduled for tonight", time: "1 day ago", read: true },
  ];

  const liveClasses: LiveClass[] = [
    { id: "LC001", title: "Advanced JavaScript Concepts", instructor: "Sarah Wilson", time: "14:00", duration: 90, students: 45, status: "upcoming", startUrl: "https://zoom.us/start/123" },
    { id: "LC002", title: "Database Design Workshop", instructor: "Mark Thompson", time: "16:30", duration: 120, students: 32, status: "live" },
    { id: "LC003", title: "UI/UX Design Principles", instructor: "Emily Chen", time: "19:00", duration: 60, students: 28, status: "upcoming" },
  ];

  const quickActions = [
    { 
      title: "Manage Students", 
      description: "View & manage student accounts",
      icon: Users, 
      color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
      action: () => toast({ title: "Manage Students", description: "Opening student management..." })
    },
    { 
      title: "Manage Instructors", 
      description: "Oversee instructor profiles",
      icon: UserPlus, 
      color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
      action: () => toast({ title: "Manage Instructors", description: "Opening instructor management..." })
    },
    { 
      title: "Send Announcements", 
      description: "Broadcast to all users",
      icon: Megaphone, 
      color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
      action: () => toast({ title: "Send Announcements", description: "Opening announcement composer..." })
    },
    { 
      title: "Generate Reports", 
      description: "Analytics & insights",
      icon: BarChart3, 
      color: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      action: () => toast({ title: "Generate Reports", description: "Opening report generator..." })
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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EduInstitute
            </h1>
          </div>

          {/* Right side */}
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
              <PopoverContent className="w-80 p-0 bg-background" align="end">
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
              <PopoverContent className="w-64 p-2 bg-background" align="end">
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
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => {
                      navigate("/admin-profile-settings");
                      setProfileOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => {
                      navigate("/admin-billing");
                      setProfileOpen(false);
                    }}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => {
                      navigate("/admin-preferences");
                      setProfileOpen(false);
                    }}
                  >
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
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Date Range Filter */}
        <Card className="bg-gradient-to-r from-card via-card to-accent/5">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Date Range Display */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground mb-0.5">Start Date</p>
                    <p className="text-sm font-bold">{dateRange.start}</p>
                  </div>
                </div>
                
                <div className="h-9 w-px bg-border" />
                
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground mb-0.5">End Date</p>
                  <p className="text-sm font-bold">{dateRange.end}</p>
                </div>
              </div>
              
              {/* Calendar Picker */}
              <Popover open={dateRangeOpen} onOpenChange={setDateRangeOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-1.5 h-8 text-sm px-3">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Select Dates
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card z-50" align="end">
                  <div className="p-4 border-b bg-muted/30">
                    <h3 className="font-semibold text-sm mb-3">Select Date Range</h3>
                    
                    {/* Quick Presets */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "Today", value: "today" as DateFilter },
                        { label: "7 Days", value: "7days" as DateFilter },
                        { label: "15 Days", value: "15days" as DateFilter },
                        { label: "30 Days", value: "30days" as DateFilter },
                        { label: "90 Days", value: "90days" as DateFilter },
                        { label: "365 Days", value: "365days" as DateFilter },
                      ].map((preset) => (
                        <Button
                          key={preset.value}
                          variant={dateFilter === preset.value ? "default" : "outline"}
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handlePresetDateRange(preset.value)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Calendar */}
                  <div className="p-4 bg-background">
                    <Calendar
                      mode="range"
                      selected={customDateRange}
                      onSelect={setCustomDateRange}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: cn(
                          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                        ),
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md"
                        ),
                        day_range_start: "day-range-start rounded-l-md",
                        day_range_end: "day-range-end rounded-r-md",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground font-semibold",
                        day_outside:
                          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle:
                          "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                    
                    {/* Legend */}
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Legend</p>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                          <span className="text-[10px] text-primary-foreground font-semibold">S</span>
                        </div>
                        <span className="text-muted-foreground">Selected Range</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="h-6 w-6 rounded bg-accent flex items-center justify-center">
                          <span className="text-[10px] font-semibold">T</span>
                        </div>
                        <span className="text-muted-foreground">Today</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => setDateRangeOpen(false)}
                    >
                      Apply Date Range
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* KPI Stats Grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-lg hover:scale-[1.02] border-l-[3px]" style={{ borderLeftColor: stat.color.includes('blue') ? 'hsl(var(--chart-2))' : stat.color.includes('green') ? 'hsl(var(--chart-1))' : stat.color.includes('purple') ? 'hsl(var(--chart-3))' : stat.color.includes('orange') ? 'hsl(var(--chart-4))' : stat.color.includes('red') ? 'hsl(var(--chart-5))' : 'hsl(var(--chart-3))' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 px-3 pt-3">
                <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color.includes('blue') ? 'from-blue-500/10 to-blue-500/5' : stat.color.includes('green') ? 'from-green-500/10 to-green-500/5' : stat.color.includes('purple') ? 'from-purple-500/10 to-purple-500/5' : stat.color.includes('orange') ? 'from-orange-500/10 to-orange-500/5' : stat.color.includes('red') ? 'from-red-500/10 to-red-500/5' : 'from-indigo-500/10 to-indigo-500/5'}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="text-2xl font-bold mb-1.5">{stat.value}</div>
                <div className="flex items-center gap-1.5">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                  )}
                  <span className={`text-xs font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] overflow-hidden relative"
                onClick={action.action}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2.5">
                    <div className={`p-3 rounded-2xl transition-all ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions and Live Classes */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
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
                          <p className="font-semibold text-sm">{formatCurrency(transaction.amount)}</p>
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
                  onClick={() => console.log("View all transactions")}
                >
                  View All Transactions
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
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
        {isInstructorMode && (
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