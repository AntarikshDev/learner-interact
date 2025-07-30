import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play,
  Volume2,
  FileText,
  Clock,
  Users,
  Award,
  BookOpen,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LessonContent {
  content_id: number;
  content_title: string;
  content_type: "Video" | "Audio" | "PDF" | "Raw";
  content_url: string;
  duration?: number;
  is_free: "Free" | "Paid";
  content_download?: boolean;
}

interface Quiz {
  quiz_id: number;
  quiz_title: string;
  total_attempts: number;
}

interface Assignment {
  assignment_id: number;
  assignment_title: string;
  created_at: string;
}

interface Article {
  article_id: number;
  title: string;
  content: string;
}

interface ClassData {
  live_class_id: number;
  topic: string;
  class_date: string;
  duration: number;
  status: string;
}

interface Lesson {
  lesson_id: number;
  lesson_title: string;
  lesson_contents: LessonContent[];
  lesson_articles: Article[];
  lesson_assignments: Assignment[];
  lesson_quizs: Quiz[];
  lesson_recorded_classes: ClassData[];
}

const StudentCourseDetails: React.FC = () => {
  const navigate = useNavigate();
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [activeTab, setActiveTab] = useState("transcript");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for demonstration
  const course = {
    title: "Advanced React Development",
    description: "Master React with hooks, context, and advanced patterns",
    instructor: "John Doe",
    duration: "12 weeks",
    students: 1245,
  };

  const lessons: Lesson[] = [
    {
      lesson_id: 1,
      lesson_title: "Introduction to React Hooks",
      lesson_contents: [
        {
          content_id: 1,
          content_title: "useState and useEffect Basics",
          content_type: "Video",
          content_url: "video1.mp4",
          duration: 25,
          is_free: "Free",
        },
        {
          content_id: 2,
          content_title: "Custom Hooks",
          content_type: "Video",
          content_url: "video2.mp4",
          duration: 30,
          is_free: "Paid",
        },
        {
          content_id: 3,
          content_title: "React Hooks Cheatsheet",
          content_type: "PDF",
          content_url: "cheatsheet.pdf",
          duration: 5,
          is_free: "Free",
        },
      ],
      lesson_articles: [
        {
          article_id: 1,
          title: "Understanding React Hooks",
          content: "Article content here...",
        },
      ],
      lesson_assignments: [
        {
          assignment_id: 1,
          assignment_title: "Build a Todo App with Hooks",
          created_at: "2024-01-15",
        },
      ],
      lesson_quizs: [
        {
          quiz_id: 1,
          quiz_title: "Hooks Knowledge Check",
          total_attempts: 3,
        },
      ],
      lesson_recorded_classes: [
        {
          live_class_id: 1,
          topic: "Live Q&A on Hooks",
          class_date: "2024-01-20",
          duration: 60,
          status: "completed",
        },
      ],
    },
    {
      lesson_id: 2,
      lesson_title: "State Management",
      lesson_contents: [
        {
          content_id: 4,
          content_title: "Context API Deep Dive",
          content_type: "Video",
          content_url: "video3.mp4",
          duration: 35,
          is_free: "Paid",
        },
        {
          content_id: 5,
          content_title: "Redux vs Context",
          content_type: "Audio",
          content_url: "audio1.mp3",
          duration: 20,
          is_free: "Paid",
        },
      ],
      lesson_articles: [],
      lesson_assignments: [],
      lesson_quizs: [],
      lesson_recorded_classes: [],
    },
  ];

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Play className="h-4 w-4" />;
      case "Audio":
        return <Volume2 className="h-4 w-4" />;
      case "PDF":
      case "Raw":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "text-blue-600 dark:text-blue-400";
      case "Audio":
        return "text-green-600 dark:text-green-400";
      case "PDF":
      case "Raw":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const handleLessonToggle = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleContentSelect = (content: any, type: string) => {
    setSelectedContent(content);
    setSelectedContentType(type);
  };

  const renderContentCard = (content: LessonContent) => (
    <Card 
      key={content.content_id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedContent?.content_id === content.content_id
          ? "ring-2 ring-primary border-primary"
          : "border-border hover:border-primary/50"
      }`}
      onClick={() => handleContentSelect(content, "content")}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ${getContentTypeColor(content.content_type)}`}>
            {getContentTypeIcon(content.content_type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {content.content_title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {content.duration || 0} min
              </span>
              {content.is_free === "Free" && (
                <Badge variant="secondary" className="text-xs">Free</Badge>
              )}
              {content.is_free === "Paid" && (
                <Lock className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuizCard = (quiz: Quiz) => (
    <Card 
      key={quiz.quiz_id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedContent?.quiz_id === quiz.quiz_id
          ? "ring-2 ring-primary border-primary"
          : "border-border hover:border-primary/50"
      }`}
      onClick={() => handleContentSelect(quiz, "quiz")}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
            <Award className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {quiz.quiz_title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {quiz.total_attempts} attempts allowed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAssignmentCard = (assignment: Assignment) => (
    <Card 
      key={assignment.assignment_id}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedContent?.assignment_id === assignment.assignment_id
          ? "ring-2 ring-primary border-primary"
          : "border-border hover:border-primary/50"
      }`}
      onClick={() => handleContentSelect(assignment, "assignment")}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {assignment.assignment_title}
            </h4>
            <span className="text-xs text-muted-foreground">
              Due: {new Date(assignment.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSelectedContent = () => {
    if (!selectedContent) {
      return (
        <Card className="h-96">
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a content item to view details
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getContentTypeIcon(selectedContent.content_type || "Video")}
            {selectedContent.content_title || selectedContent.quiz_title || selectedContent.assignment_title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Content viewer would be here</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground">
          <button 
            onClick={() => navigate(-1)}
            className="hover:text-foreground"
          >
            My Courses
          </button>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-foreground font-medium">{course.title}</span>
        </div>

        {/* Course Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? "block" : "hidden lg:block"} space-y-4`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div key={lesson.lesson_id}>
                        <button
                          className="w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          onClick={() => handleLessonToggle(lesson.lesson_id)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{lesson.lesson_title}</h3>
                            <ChevronRight 
                              className={`h-4 w-4 transition-transform ${
                                expandedLesson === lesson.lesson_id ? "rotate-90" : ""
                              }`} 
                            />
                          </div>
                        </button>
                        
                        {expandedLesson === lesson.lesson_id && (
                          <div className="mt-3 space-y-2 pl-2 animate-fade-in">
                            {/* Content Items */}
                            {lesson.lesson_contents.map(renderContentCard)}
                            
                            {/* Quizzes */}
                            {lesson.lesson_quizs.map(renderQuizCard)}
                            
                            {/* Assignments */}
                            {lesson.lesson_assignments.map(renderAssignmentCard)}
                            
                            {/* Articles */}
                            {lesson.lesson_articles.map((article) => (
                              <Card 
                                key={article.article_id}
                                className="cursor-pointer transition-all duration-200 hover:shadow-md border-border hover:border-primary/50"
                                onClick={() => handleContentSelect(article, "article")}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
                                      <FileText className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm truncate">
                                        {article.title}
                                      </h4>
                                      <span className="text-xs text-muted-foreground">
                                        Article
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              {renderSelectedContent()}
            </div>

            {/* Content Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="notes">My Notes</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transcript" className="mt-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground">
                        Transcript content will appear here when available for video content.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-6">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Add your notes here..."
                        className="min-h-[100px]"
                      />
                      <Button>Save Note</Button>
                      <Separator />
                      <p className="text-muted-foreground text-center py-8">
                        No notes added yet.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Discussion forum will be available here.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetails;