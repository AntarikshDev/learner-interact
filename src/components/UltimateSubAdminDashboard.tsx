import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Users, MessageSquare, BookOpen, AlertCircle, CheckCircle, Clock, 
  Filter, Bell, Search, Settings, LogOut, RefreshCw, Download, Send,
  Eye, Edit, Trash2, UserCheck, Ban, MessageCircle, Phone, Mail,
  Calendar, Star, TrendingUp, Activity, BarChart3, Target,
  Plus, Upload, FileText, Video, Camera, ChevronRight, ExternalLink,
  MoreHorizontal, Zap, Globe, Award, GraduationCap, Lightbulb
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const UltimateSubAdminDashboard = () => {
  const [isAlsoInstructor, setIsAlsoInstructor] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [respondTicketOpen, setRespondTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Mock Data
  const stats = [
    { title: "Assigned Users", value: "2,847", change: "+12%", icon: Users, color: "text-primary", trend: "up" },
    { title: "Support Tickets", value: "34", change: "+3", icon: MessageSquare, color: "text-orange-500", trend: "up" },
    { title: "Pending Reviews", value: "18", change: "-5", icon: Clock, color: "text-blue-500", trend: "down" },
    { title: "Content Moderated", value: "156", change: "+24", icon: Shield, color: "text-green-500", trend: "up" },
  ];

  const instructorStats = [
    { title: "My Students", value: "423", change: "+18", icon: GraduationCap, color: "text-purple-500" },
    { title: "Course Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-500" },
    { title: "Live Classes", value: "3", change: "Today", icon: Video, color: "text-red-500" },
    { title: "Revenue", value: "$2,450", change: "+15%", icon: Target, color: "text-green-500" },
  ];

  const supportTickets = [
    { 
      id: "#ST-2024-001", 
      user: "Alice Johnson", 
      email: "alice.j@email.com",
      issue: "Payment not processing for premium course", 
      status: "Open", 
      priority: "High",
      category: "Payment",
      created: "2 hours ago",
      lastResponse: "Waiting for customer",
      avatar: "/placeholder.svg"
    },
    { 
      id: "#ST-2024-002", 
      user: "Bob Smith", 
      email: "bob.smith@email.com",
      issue: "Cannot access purchased course materials", 
      status: "In Progress", 
      priority: "Medium",
      category: "Access",
      created: "5 hours ago",
      lastResponse: "Support team working",
      avatar: "/placeholder.svg"
    },
    { 
      id: "#ST-2024-003", 
      user: "Carol White", 
      email: "carol.w@email.com",
      issue: "Video playback issues on mobile device", 
      status: "Resolved", 
      priority: "Low",
      category: "Technical",
      created: "1 day ago",
      lastResponse: "Resolved by tech team",
      avatar: "/placeholder.svg"
    },
    { 
      id: "#ST-2024-004", 
      user: "David Brown", 
      email: "d.brown@email.com",
      issue: "Request for course completion certificate", 
      status: "Open", 
      priority: "Medium",
      category: "Certificate",
      created: "3 hours ago",
      lastResponse: "Pending verification",
      avatar: "/placeholder.svg"
    },
  ];

  const pendingReviews = [
    {
      type: "Course",
      title: "Advanced AI & Machine Learning",
      instructor: "Dr. Sarah Wilson",
      submitted: "2 hours ago",
      priority: "high",
      status: "pending",
      category: "New Course",
      avatar: "/placeholder.svg"
    },
    {
      type: "Content",
      title: "React Hooks Deep Dive - Video Update",
      instructor: "Michael Chen",
      submitted: "5 hours ago",
      priority: "medium",
      status: "pending",
      category: "Content Update",
      avatar: "/placeholder.svg"
    },
    {
      type: "User",
      title: "New Instructor Application",
      instructor: "Emma Davis",
      submitted: "1 day ago",
      priority: "low",
      status: "under_review",
      category: "Account Verification",
      avatar: "/placeholder.svg"
    },
  ];

  const moderationQueue = [
    { 
      type: "Review", 
      content: "This course is absolutely amazing! The instructor explains everything clearly and the projects are very practical. Highly recommended for anyone wanting to learn React!", 
      author: "StudentTechie", 
      status: "Pending",
      course: "React Masterclass",
      rating: 5,
      flagged: false
    },
    { 
      type: "Comment", 
      content: "I'm having trouble with the advanced concepts. Could someone help explain the useCallback hook?", 
      author: "LearnerX", 
      status: "Approved",
      course: "React Hooks Deep Dive",
      flagged: false
    },
    { 
      type: "Forum Post", 
      content: "This is the worst course ever! Total waste of money. The instructor doesn't know what they're talking about!", 
      author: "AngryUser123", 
      status: "Flagged",
      course: "JavaScript Fundamentals",
      flagged: true
    },
  ];

  const recentActivities = [
    { action: "Resolved ticket", item: "#ST-2024-003", user: "You", time: "10 min ago", type: "ticket" },
    { action: "Approved course", item: "Python Data Science", user: "You", time: "25 min ago", type: "approval" },
    { action: "Moderated content", item: "Inappropriate comment", user: "You", time: "1 hour ago", type: "moderation" },
    { action: "Updated user role", item: "John Doe → Instructor", user: "Admin", time: "2 hours ago", type: "user" },
    { action: "New ticket created", item: "#ST-2024-004", user: "System", time: "3 hours ago", type: "ticket" },
  ];

  const quickActions = [
    { icon: MessageSquare, label: "New Ticket", action: () => setNewTicketOpen(true), color: "bg-blue-500" },
    { icon: UserCheck, label: "Verify User", action: () => toast({ title: "User verification started" }), color: "bg-green-500" },
    { icon: Shield, label: "Moderate Content", action: () => toast({ title: "Opening moderation panel" }), color: "bg-purple-500" },
    { icon: Download, label: "Export Reports", action: () => toast({ title: "Generating reports..." }), color: "bg-orange-500" },
    { icon: Send, label: "Send Announcement", action: () => toast({ title: "Opening announcement composer" }), color: "bg-pink-500" },
    { icon: RefreshCw, label: "Sync Data", action: () => toast({ title: "Syncing data..." }), color: "bg-cyan-500" },
  ];

  const handleTicketAction = (ticket, action) => {
    if (action === "respond") {
      setSelectedTicket(ticket);
      setRespondTicketOpen(true);
    } else if (action === "escalate") {
      toast({ title: `Ticket ${ticket.id} escalated to senior support` });
    } else if (action === "close") {
      toast({ title: `Ticket ${ticket.id} marked as resolved` });
    }
  };

  const handleContentModeration = (content, action) => {
    if (action === "approve") {
      toast({ title: "Content approved" });
    } else if (action === "reject") {
      toast({ title: "Content rejected" });
    } else if (action === "flag") {
      toast({ title: "Content flagged for review" });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open": return "destructive";
      case "in progress": return "default";
      case "resolved": return "secondary";
      case "pending": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Sub Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Ultimate Control Center</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search tickets, users, content..." 
                className="pl-10 w-80 bg-background/50"
              />
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
              <Label htmlFor="instructor-toggle" className="text-sm font-medium">
                Also Instructor
              </Label>
              <Switch
                id="instructor-toggle"
                checked={isAlsoInstructor}
                onCheckedChange={setIsAlsoInstructor}
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                5
              </span>
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Admin" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Sub Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      subadmin@institute.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:scale-105 transition-all duration-200"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  from last week
                  <TrendingUp className={`h-3 w-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructor Stats (when toggle is on) */}
        {isAlsoInstructor && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Instructor Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {instructorStats.map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Support Tickets */}
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      Recent Support Tickets
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("tickets")}>
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportTickets.slice(0, 3).map((ticket, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={ticket.avatar} />
                              <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{ticket.id}</p>
                              <p className="text-xs text-muted-foreground">{ticket.user}</p>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{ticket.issue}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                            {ticket.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{ticket.created}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span> {activity.item}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6 mt-6">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    Support Tickets Management
                  </CardTitle>
                  <Button onClick={() => setNewTicketOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.avatar} />
                            <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{ticket.id}</p>
                            <p className="text-sm text-muted-foreground">{ticket.user}</p>
                            <p className="text-xs text-muted-foreground">{ticket.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                          <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm mb-2">{ticket.issue}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Category: {ticket.category}</span>
                          <span>Created: {ticket.created}</span>
                          <span>Last: {ticket.lastResponse}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleTicketAction(ticket, "respond")}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Respond
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTicketAction(ticket, "escalate")}
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Escalate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleTicketAction(ticket, "close")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Close
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Pending Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.instructor.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.title}</p>
                            <p className="text-sm text-muted-foreground">by {review.instructor}</p>
                            <p className="text-xs text-muted-foreground">{review.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{review.type}</Badge>
                          <Badge variant={getPriorityColor(review.priority)}>
                            {review.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Ban className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6 mt-6">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Content Moderation Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moderationQueue.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${item.flagged ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20' : 'bg-card'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          {item.flagged && <Badge variant="destructive">Flagged</Badge>}
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          )}
                        </div>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm mb-2">"{item.content}"</p>
                        <p className="text-xs text-muted-foreground">
                          by {item.author} on {item.course}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleContentModeration(item, "approve")}
                          disabled={item.status === "Approved"}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleContentModeration(item, "flag")}
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Flag
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleContentModeration(item, "reject")}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Ticket Dialog */}
      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Create a new support ticket for a user or system issue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user-email">User Email</Label>
              <Input id="user-email" placeholder="user@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issue">Issue Description</Label>
              <Textarea 
                id="issue" 
                placeholder="Describe the issue in detail..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({ title: "Support ticket created successfully" });
              setNewTicketOpen(false);
            }}>
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Respond to Ticket Dialog */}
      <Dialog open={respondTicketOpen} onOpenChange={setRespondTicketOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Respond to Ticket</DialogTitle>
            <DialogDescription>
              {selectedTicket && `Responding to ticket ${selectedTicket.id} from ${selectedTicket.user}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="response">Response</Label>
              <Textarea 
                id="response" 
                placeholder="Type your response to the user..."
                className="min-h-[150px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Update Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="internal-note" />
              <Label htmlFor="internal-note" className="text-sm">
                Add as internal note (not visible to user)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRespondTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({ title: "Response sent successfully" });
              setRespondTicketOpen(false);
            }}>
              <Send className="h-4 w-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UltimateSubAdminDashboard;