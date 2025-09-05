import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Eye,
  MessageCircle,
  Search,
  Filter,
  TrendingUp,
  Users,
  BookOpen,
  Clock,
  Award,
  Target,
  Send,
  Paperclip,
  Smile,
  Link,
  Globe,
  Video,
  FileText,
  Headphones,
  Download
} from "lucide-react";

// Demo Data
const mockCourses = [
  { id: "1", name: "React Fundamentals", students: 45 },
  { id: "2", name: "Advanced JavaScript", students: 32 },
  { id: "3", name: "Node.js Backend", students: 28 },
  { id: "4", name: "Database Design", students: 38 }
];

const mockTopics = [
  { id: "1", name: "Components & Props", courseId: "1" },
  { id: "2", name: "State Management", courseId: "1" },
  { id: "3", name: "ES6 Features", courseId: "2" },
  { id: "4", name: "Async Programming", courseId: "2" },
  { id: "5", name: "Express.js Basics", courseId: "3" },
  { id: "6", name: "Authentication", courseId: "3" },
  { id: "7", name: "SQL Fundamentals", courseId: "4" },
  { id: "8", name: "Database Optimization", courseId: "4" }
];

const mockStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
    course: "React Fundamentals",
    liveClass: { attended: true, courseName: "Components & Props", date: "2024-01-08" },
    video: { watched: "State Management Basics", duration: "25 min", date: "2024-01-08" },
    quiz: { completed: "React Quiz #3", score: "85%", date: "2024-01-07" },
    pdf: { viewed: "React Best Practices", pages: 12, date: "2024-01-07" },
    assignment: { submitted: "Todo App Project", grade: "A", date: "2024-01-06" },
    revision: { topic: "Component Lifecycle", time: "45 min", date: "2024-01-08" },
    totalTime: "4h 30m"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/avatars/bob.jpg",
    course: "Advanced JavaScript",
    liveClass: { attended: false, courseName: "Absent", date: "2024-01-08" },
    video: { watched: "Promises & Async/Await", duration: "35 min", date: "2024-01-08" },
    quiz: { completed: "ES6 Quiz #2", score: "92%", date: "2024-01-08" },
    pdf: { viewed: "JavaScript Patterns", pages: 8, date: "2024-01-07" },
    assignment: { submitted: "API Integration", grade: "B+", date: "2024-01-05" },
    revision: { topic: "Closures & Scope", time: "30 min", date: "2024-01-07" },
    totalTime: "3h 45m"
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    avatar: "/avatars/carol.jpg",
    course: "Node.js Backend",
    liveClass: { attended: true, courseName: "Express Middleware", date: "2024-01-08" },
    video: { watched: "Authentication Setup", duration: "40 min", date: "2024-01-08" },
    quiz: { completed: "Node.js Quiz #1", score: "78%", date: "2024-01-07" },
    pdf: { viewed: "REST API Guidelines", pages: 15, date: "2024-01-07" },
    assignment: { submitted: "User Authentication", grade: "A-", date: "2024-01-06" },
    revision: { topic: "Middleware Functions", time: "20 min", date: "2024-01-08" },
    totalTime: "5h 15m"
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    avatar: "/avatars/david.jpg",
    course: "Database Design",
    liveClass: { attended: true, courseName: "SQL Joins", date: "2024-01-08" },
    video: { watched: "Database Normalization", duration: "30 min", date: "2024-01-08" },
    quiz: { completed: "SQL Quiz #4", score: "96%", date: "2024-01-08" },
    pdf: { viewed: "Database Performance", pages: 20, date: "2024-01-07" },
    assignment: { submitted: "E-commerce DB Schema", grade: "A+", date: "2024-01-06" },
    revision: { topic: "Indexing Strategies", time: "55 min", date: "2024-01-07" },
    totalTime: "6h 20m"
  },
  {
    id: "5",
    name: "Eva Davis",
    email: "eva@example.com",
    avatar: "/avatars/eva.jpg",
    course: "React Fundamentals",
    liveClass: { attended: false, courseName: "Absent", date: "2024-01-08" },
    video: { watched: "Hooks Deep Dive", duration: "45 min", date: "2024-01-07" },
    quiz: { completed: "React Quiz #2", score: "88%", date: "2024-01-07" },
    pdf: { viewed: "React Performance", pages: 10, date: "2024-01-06" },
    assignment: { submitted: "Weather App", grade: "B", date: "2024-01-05" },
    revision: { topic: "useEffect Hook", time: "35 min", date: "2024-01-07" },
    totalTime: "3h 50m"
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@example.com",
    avatar: "/avatars/frank.jpg",
    course: "Advanced JavaScript",
    liveClass: { attended: true, courseName: "Module Systems", date: "2024-01-08" },
    video: { watched: "Error Handling", duration: "20 min", date: "2024-01-08" },
    quiz: { completed: "Advanced JS Quiz #3", score: "91%", date: "2024-01-08" },
    pdf: { viewed: "Design Patterns", pages: 18, date: "2024-01-07" },
    assignment: { submitted: "Calculator App", grade: "A", date: "2024-01-06" },
    revision: { topic: "Prototype Chain", time: "40 min", date: "2024-01-08" },
    totalTime: "4h 10m"
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace@example.com",
    avatar: "/avatars/grace.jpg",
    course: "Node.js Backend",
    liveClass: { attended: true, courseName: "API Testing", date: "2024-01-08" },
    video: { watched: "Database Integration", duration: "50 min", date: "2024-01-08" },
    quiz: { completed: "Backend Quiz #2", score: "83%", date: "2024-01-07" },
    pdf: { viewed: "Microservices Guide", pages: 25, date: "2024-01-07" },
    assignment: { submitted: "Blog API", grade: "A-", date: "2024-01-06" },
    revision: { topic: "Database Queries", time: "25 min", date: "2024-01-08" },
    totalTime: "5h 30m"
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry@example.com",
    avatar: "/avatars/henry.jpg",
    course: "Database Design",
    liveClass: { attended: false, courseName: "Absent", date: "2024-01-08" },
    video: { watched: "Transaction Management", duration: "35 min", date: "2024-01-07" },
    quiz: { completed: "Database Quiz #1", score: "79%", date: "2024-01-07" },
    pdf: { viewed: "ACID Properties", pages: 12, date: "2024-01-06" },
    assignment: { submitted: "Library DB System", grade: "B+", date: "2024-01-05" },
    revision: { topic: "Foreign Keys", time: "30 min", date: "2024-01-07" },
    totalTime: "4h 00m"
  },
  {
    id: "9",
    name: "Ivy Chen",
    email: "ivy@example.com",
    avatar: "/avatars/ivy.jpg",
    course: "React Fundamentals",
    liveClass: { attended: true, courseName: "Context API", date: "2024-01-08" },
    video: { watched: "Component Testing", duration: "30 min", date: "2024-01-08" },
    quiz: { completed: "React Quiz #4", score: "94%", date: "2024-01-08" },
    pdf: { viewed: "Testing Strategies", pages: 14, date: "2024-01-07" },
    assignment: { submitted: "Shopping Cart", grade: "A+", date: "2024-01-06" },
    revision: { topic: "State Patterns", time: "50 min", date: "2024-01-08" },
    totalTime: "5h 45m"
  },
  {
    id: "10",
    name: "Jack Taylor",
    email: "jack@example.com",
    avatar: "/avatars/jack.jpg",
    course: "Advanced JavaScript",
    liveClass: { attended: true, courseName: "Performance Optimization", date: "2024-01-08" },
    video: { watched: "Memory Management", duration: "25 min", date: "2024-01-08" },
    quiz: { completed: "Performance Quiz #1", score: "87%", date: "2024-01-07" },
    pdf: { viewed: "Optimization Guide", pages: 16, date: "2024-01-07" },
    assignment: { submitted: "Performance Test", grade: "A", date: "2024-01-06" },
    revision: { topic: "Event Loop", time: "45 min", date: "2024-01-07" },
    totalTime: "4h 25m"
  }
];

// Chat Messages Demo Data
const mockChatMessages = [
  {
    id: "1",
    senderId: "instructor",
    senderName: "You",
    message: "Hi! How are you doing with the React concepts?",
    timestamp: new Date(Date.now() - 300000),
    type: "text"
  },
  {
    id: "2",
    senderId: "student",
    senderName: "Alice Johnson",
    message: "Hello! I'm doing well, but I'm having some trouble with useEffect.",
    timestamp: new Date(Date.now() - 240000),
    type: "text"
  },
  {
    id: "3",
    senderId: "instructor",
    senderName: "You", 
    message: "That's totally normal! Let me share this helpful resource.",
    timestamp: new Date(Date.now() - 180000),
    type: "text"
  },
  {
    id: "4",
    senderId: "instructor",
    senderName: "You",
    message: "https://react.dev/reference/react/useEffect",
    timestamp: new Date(Date.now() - 120000),
    type: "link",
    linkPreview: {
      title: "useEffect – React",
      description: "useEffect is a React Hook that lets you perform side effects in function components.",
      image: "https://react.dev/favicon.ico"
    }
  }
];

const StudentActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // States
  const [filterType, setFilterType] = useState("course");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");

  // WebSocket simulation
  useEffect(() => {
    // Simulate WebSocket connection
    const interval = setInterval(() => {
      if (Math.random() > 0.9) { // 10% chance of new message
        const newMsg = {
          id: Date.now().toString(),
          senderId: "student",
          senderName: selectedStudent?.name || "Student",
          message: "Thanks for the help! 😊",
          timestamp: new Date(),
          type: "text"
        };
        setChatMessages(prev => [...prev, newMsg]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedStudent]);

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = mockStudents;

    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter) {
      if (filterType === "course") {
        filtered = filtered.filter(student => student.course === selectedFilter);
      }
      // Add topic and group filtering logic here
    }

    setFilteredStudents(filtered);
  }, [searchTerm, filterType, selectedFilter]);

  // Calculate KPIs
  const totalStudents = filteredStudents.length;
  const avgEngagement = filteredStudents.reduce((acc, student) => {
    const timeInHours = parseFloat(student.totalTime.replace('h', '').replace('m', '')) || 0;
    return acc + timeInHours;
  }, 0) / totalStudents;
  const attendanceRate = (filteredStudents.filter(s => s.liveClass.attended).length / totalStudents) * 100;
  const avgQuizScore = filteredStudents.reduce((acc, student) => {
    const score = parseFloat(student.quiz.score.replace('%', '')) || 0;
    return acc + score;
  }, 0) / totalStudents;

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleStartChat = (student) => {
    setSelectedStudent(student);
    setIsChatModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: "instructor",
      senderName: "You",
      message: newMessage,
      timestamp: new Date(),
      type: "text"
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: `Message sent to ${selectedStudent?.name}`
    });
  };

  const getFilterOptions = () => {
    switch (filterType) {
      case "course":
        return mockCourses.map(course => ({ value: course.name, label: course.name }));
      case "topic":
        return mockTopics.map(topic => ({ value: topic.name, label: topic.name }));
      case "group":
        return [
          { value: "Group A", label: "Group A" },
          { value: "Group B", label: "Group B" },
          { value: "Group C", label: "Group C" }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/instructor-dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Student Activity</h1>
              <p className="text-muted-foreground">Track and analyze student engagement across all courses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Active in current filters
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">
                Daily study time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                Live class attendance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Quiz Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgQuizScore.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                Assessment performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course">Course wise activity</SelectItem>
                    <SelectItem value="topic">Topic wise activity</SelectItem>
                    <SelectItem value="group">Group wise activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={`Select ${filterType}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilterOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Activity Overview</CardTitle>
            <CardDescription>
              Detailed tracking of student engagement across different learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Live Class</TableHead>
                    <TableHead>Video</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Revision</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.course}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.liveClass.attended ? "default" : "destructive"}>
                          {student.liveClass.courseName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.video.watched}</div>
                          <div className="text-muted-foreground">{student.video.duration}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.quiz.completed}</div>
                          <Badge variant="outline">{student.quiz.score}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.pdf.viewed}</div>
                          <div className="text-muted-foreground">{student.pdf.pages} pages</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.assignment.submitted}</div>
                          <Badge variant="outline">{student.assignment.grade}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.revision.topic}</div>
                          <div className="text-muted-foreground">{student.revision.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(student)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartChat(student)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedStudent?.avatar} />
                <AvatarFallback>
                  {selectedStudent?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {selectedStudent?.name} - Activity Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{selectedStudent.totalTime}</div>
                      <div className="text-sm text-muted-foreground">Total Study Time</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{selectedStudent.quiz.score}</div>
                      <div className="text-sm text-muted-foreground">Latest Quiz Score</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Activity Breakdown</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Live Class</span>
                    <Badge variant={selectedStudent.liveClass.attended ? "default" : "destructive"}>
                      {selectedStudent.liveClass.courseName}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Video Watched</span>
                    <span className="text-sm">{selectedStudent.video.watched} ({selectedStudent.video.duration})</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Quiz Completed</span>
                    <span className="text-sm">{selectedStudent.quiz.completed} - {selectedStudent.quiz.score}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">PDF Viewed</span>
                    <span className="text-sm">{selectedStudent.pdf.viewed} ({selectedStudent.pdf.pages} pages)</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Assignment</span>
                    <span className="text-sm">{selectedStudent.assignment.submitted} - Grade: {selectedStudent.assignment.grade}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Revision</span>
                    <span className="text-sm">{selectedStudent.revision.topic} ({selectedStudent.revision.time})</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={isChatModalOpen} onOpenChange={setIsChatModalOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedStudent?.avatar} />
                <AvatarFallback>
                  {selectedStudent?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              Chat with {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Language Selector */}
          <div className="flex items-center gap-2 px-2">
            <Globe className="h-4 w-4" />
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Chat Messages */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'instructor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.senderId === 'instructor'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.type === 'link' ? (
                      <div>
                        <div className="mb-2">{message.message}</div>
                        {message.linkPreview && (
                          <div className="border rounded p-2 bg-background/50">
                            <div className="flex items-center gap-2">
                              <Link className="h-4 w-4" />
                              <div>
                                <div className="font-medium text-sm">{message.linkPreview.title}</div>
                                <div className="text-xs text-muted-foreground">{message.linkPreview.description}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{message.message}</div>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[60px] pr-24"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Attachment Options */}
            <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
              <Button size="sm" variant="ghost" className="h-6 text-xs">
                <FileText className="h-3 w-3 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="ghost" className="h-6 text-xs">
                <Headphones className="h-3 w-3 mr-1" />
                Audio
              </Button>
              <Button size="sm" variant="ghost" className="h-6 text-xs">
                <Video className="h-3 w-3 mr-1" />
                Video
              </Button>
              <Button size="sm" variant="ghost" className="h-6 text-xs">
                <Download className="h-3 w-3 mr-1" />
                File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentActivityPage;