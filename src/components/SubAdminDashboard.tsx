import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Users, MessageSquare, BookOpen, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";

const SubAdminDashboard = () => {
  const stats = [
    { title: "Assigned Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Pending Reviews", value: "18", change: "-5", icon: Clock, color: "text-orange-600" },
    { title: "Support Tickets", value: "34", change: "+3", icon: MessageSquare, color: "text-purple-600" },
    { title: "Content Approved", value: "156", change: "+24", icon: CheckCircle, color: "text-green-600" },
  ];

  const pendingReviews = [
    {
      type: "Course",
      title: "Advanced Python Programming",
      instructor: "Dr. Sarah Wilson",
      submitted: "2 hours ago",
      priority: "high",
      avatar: "/placeholder.svg"
    },
    {
      type: "User",
      title: "Instructor Application",
      instructor: "Michael Chen",
      submitted: "5 hours ago",
      priority: "medium",
      avatar: "/placeholder.svg"
    },
    {
      type: "Content",
      title: "Video Lesson Update",
      instructor: "Emma Davis",
      submitted: "1 day ago",
      priority: "low",
      avatar: "/placeholder.svg"
    },
  ];

  const supportTickets = [
    { id: "#1234", user: "Alice Johnson", issue: "Payment not processing", status: "Open", priority: "High" },
    { id: "#1235", user: "Bob Smith", issue: "Course access issue", status: "In Progress", priority: "Medium" },
    { id: "#1236", user: "Carol White", issue: "Video playback problem", status: "Resolved", priority: "Low" },
  ];

  const recentActivities = [
    { action: "Approved course", item: "React Masterclass", user: "John Doe", time: "10 min ago" },
    { action: "Resolved ticket", item: "#1230", user: "Support", time: "25 min ago" },
    { action: "User verification", item: "New instructor", user: "Admin", time: "1 hour ago" },
  ];

  const moderationQueue = [
    { type: "Comment", content: "Great course! Really helpful...", author: "Student123", status: "Pending" },
    { type: "Review", content: "Excellent instructor, clear explanations...", author: "LearnerX", status: "Pending" },
    { type: "Forum Post", content: "Need help with assignment 3...", author: "CodeNewbie", status: "Approved" },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sub Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage content reviews, user support, and platform moderation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Moderate
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
                <span className={stat.change.startsWith('+') ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span> from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Reviews
            </CardTitle>
            <CardDescription>Content and applications awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{review.title}</p>
                      <p className="text-xs text-muted-foreground">by {review.instructor}</p>
                      <p className="text-xs text-muted-foreground">{review.submitted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{review.type}</Badge>
                    <Badge variant={
                      review.priority === "high" ? "destructive" :
                      review.priority === "medium" ? "default" : "secondary"
                    }>
                      {review.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support Tickets
            </CardTitle>
            <CardDescription>User support requests and issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportTickets.map((ticket, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{ticket.id}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user}</p>
                    </div>
                    <Badge variant={
                      ticket.status === "Open" ? "destructive" :
                      ticket.status === "In Progress" ? "default" : "secondary"
                    }>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm">{ticket.issue}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {ticket.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Moderation Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Moderation Queue
            </CardTitle>
            <CardDescription>User-generated content awaiting moderation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moderationQueue.map((item, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <Badge variant={item.status === "Pending" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">"{item.content}"</p>
                  <p className="text-xs text-muted-foreground">by {item.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
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
    </div>
  );
};

export default SubAdminDashboard;