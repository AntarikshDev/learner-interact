import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Search,
  Plus,
  GripVertical,
  Play,
  FileText,
  HelpCircle,
  Video,
  ChevronDown,
  ChevronRight,
  Save,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Volume2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import ActionDropdown from "./ActionDropdown";
import ContentViewerModal from "./ContentViewerModal";
import ConfirmationDialog from "./ConfirmationDialog";
import AddLessonPopup from "./AddLessonPopup";
import AddContentPopup from "./AddContentPopup";
import CourseTutorial from "./CourseTutorial";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  content_id: number;
  content_title: string;
  content_type: "Video" | "Raw" | "Audio" | "PDF" | "Quiz" | "Assignment" | "Article" | "Live Class";
  content_url: string;
  duration?: number;
  is_free: "Free" | "Paid";
  is_published: boolean;
  status: "Published" | "Draft";
  added_date: string;
  order_index: number;
  asset_type?: string;
  quiz_type?: string;
  live_class_status?: string;
  start_time?: string;
  class_duration?: number;
  start_url?: string;
  details?: any;
}

interface CourseSection {
  section_id: number;
  section_title: string;
  is_expanded: boolean;
  content_items: ContentItem[];
  lesson_id?: number;
  lesson_status?: "Published" | "Draft";
}

interface Permission {
  permission_name: string;
  value: boolean;
}

// Mock API functions - replace with actual API calls
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Mock API hooks - replace with actual API implementations
const useGetLessonListQuery = (lessonId: number, options: any) => ({
  data: null,
  isLoading: false,
  error: null,
});

const useDeleteLessonMutation = () => [
  async (lessonId: number) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useDeleteLessonContentMutation = () => [
  async (contentId: string) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useDeleteQuizMutation = () => [
  async (quizId: string) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useDeleteArticalContentMutation = () => [
  async (articleId: string) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useDeleteAssignmentMutation = () => [
  async (assignmentId: string) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useDeleteLiveClassRecordMutation = () => [
  async (liveClassId: string) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useUpdateLessonTitleMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const usePublishLessonsMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const usePublishLessonsAssetsMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const usePublishLessonsArticalMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const usePublishAssignmentMasterMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const usePublishLessonsQuizMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve() }),
  { isLoading: false }
] as const;

const useUpdateContentOrderMutation = () => [
  async (data: any) => ({ unwrap: () => Promise.resolve({ success: true }) }),
  { isLoading: false }
] as const;

const useCheckPermissionofInstructorMutation = () => [
  async () => ({ unwrap: () => Promise.resolve({ success: true, data: [] }) }),
  { isLoading: false }
] as const;

const useGetProfileQuery = (param: any, options: any) => ({
  data: { data: [{ user_role: "Admin" }] },
  isLoading: false,
});

const AdminCourseManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [viewerModalOpen, setViewerModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<{ id: number; title: string } | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
  const [permissionCheckAction, setPermissionCheckAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type?: "danger" | "warning" | "info";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "danger",
    onConfirm: () => {},
  });
  
  const [addLessonDialog, setAddLessonDialog] = useState(false);
  const [addContentDialog, setAddContentDialog] = useState<{
    isOpen: boolean;
    sectionId: number | null;
  }>({
    isOpen: false,
    sectionId: null,
  });

  // API hooks
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(undefined, {});
  const [deleteLesson, { isLoading: deletingLesson }] = useDeleteLessonMutation();
  const [deleteLessonContent, { isLoading: deletingContent }] = useDeleteLessonContentMutation();
  const [deleteQuiz, { isLoading: deletingQuiz }] = useDeleteQuizMutation();
  const [deleteArtical, { isLoading: deletingArticle }] = useDeleteArticalContentMutation();
  const [deleteAssignment, { isLoading: deletingAssignment }] = useDeleteAssignmentMutation();
  const [deleteLiveClassRecord, { isLoading: deletingLiveClass }] = useDeleteLiveClassRecordMutation();
  const [updateLessonTitle, { isLoading: updatingTitle }] = useUpdateLessonTitleMutation();
  const [publishLessons, { isLoading: publishingLesson }] = usePublishLessonsMutation();
  const [publishLessonsAssets, { isLoading: publishingAssets }] = usePublishLessonsAssetsMutation();
  const [publishLessonsArtical, { isLoading: publishingArticle }] = usePublishLessonsArticalMutation();
  const [publishAssignmentMaster, { isLoading: publishingAssignment }] = usePublishAssignmentMasterMutation();
  const [publishLessonsQuiz, { isLoading: publishingQuiz }] = usePublishLessonsQuizMutation();
  const [updateContentOrder, { isLoading: updatingOrder }] = useUpdateContentOrderMutation();
  const [checkPermission, { isLoading: checkingPermission }] = useCheckPermissionofInstructorMutation();

  const userRole = profileData?.data?.[0]?.user_role || "User";
  const canEdit = userRole === "Admin" || userRole === "Instructor";
  const canDelete = userRole === "Admin";

  const [courseSections, setCourseSections] = useState<CourseSection[]>([
    {
      section_id: 1,
      section_title: "Introduction",
      is_expanded: true,
      lesson_id: 1,
      lesson_status: "Published",
      content_items: [
        {
          content_id: 1,
          content_title: "Course Overview",
          content_type: "Video",
          content_url: "intro-video",
          duration: 15,
          is_free: "Free",
          is_published: true,
          status: "Published",
          added_date: "24/07/2025, 16:34:03",
          order_index: 0,
        },
      ],
    },
    {
      section_id: 2,
      section_title: "Concept Building Problems (CBPs)",
      is_expanded: true,
      lesson_id: 2,
      lesson_status: "Published",
      content_items: [
        {
          content_id: 2,
          content_title: "CBP_#1_Mineral Properties",
          content_type: "Quiz",
          content_url: "quiz-1",
          is_free: "Paid",
          is_published: true,
          status: "Published",
          added_date: "24/07/2025, 16:34:03",
          order_index: 0,
          quiz_type: "Section Quiz",
        },
        {
          content_id: 3,
          content_title: "CBP_#2_Primary structures and Unconformity",
          content_type: "Quiz",
          content_url: "quiz-2",
          is_free: "Paid",
          is_published: true,
          status: "Published",
          added_date: "24/07/2025, 16:34:03",
          order_index: 1,
          quiz_type: "Practice Quiz",
        },
      ],
    },
    {
      section_id: 3,
      section_title: "Mineralogy and Crystallography",
      is_expanded: false,
      lesson_id: 3,
      lesson_status: "Draft",
      content_items: [
        {
          content_id: 4,
          content_title: "GATE-NET-UPSC CGSE Live Online Classes 2025-26 2025_Mineralogy_1_Introduction",
          content_type: "Video",
          content_url: "mineralogy-intro",
          duration: 45,
          is_free: "Paid",
          is_published: true,
          status: "Published",
          added_date: "24/07/2025, 16:34:03",
          order_index: 0,
        },
        {
          content_id: 5,
          content_title: "Geomorphology_#1_Glacial",
          content_type: "PDF",
          content_url: "geomorphology-glacial.pdf",
          is_free: "Free",
          is_published: false,
          status: "Draft",
          added_date: "24/07/2025, 17:54:18",
          order_index: 1,
        },
        {
          content_id: 6,
          content_title: "Live Discussion on Mineralogy",
          content_type: "Live Class",
          content_url: "live-class-1",
          is_free: "Paid",
          is_published: false,
          status: "Draft",
          added_date: "24/07/2025, 18:00:00",
          order_index: 2,
          live_class_status: "scheduled",
          start_time: "2025-01-28T10:00:00+05:30",
          class_duration: 60,
          start_url: "https://zoom.us/j/123456789",
        },
      ],
    },
  ]);

  // Permission checking
  useEffect(() => {
    const verifyPermission = async () => {
      if (userRole === "Admin" || !["Instructor", "SubAdmin"].includes(userRole)) {
        setPermissions([]);
        return;
      }
      try {
        const result = await checkPermission();
        const response = await result.unwrap();
        if (response.success && response.data) {
          setPermissions(response.data);
        }
      } catch (err) {
        console.error("Permission check failed:", err);
        setPermissions([]);
      }
    };
    
    if (!profileLoading && userRole) {
      verifyPermission();
    }
  }, [checkPermission, userRole, profileLoading]);

  // Handle beforeunload event for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
        setShowSavePrompt(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const getContentIcon = (type: string, quizType?: string) => {
    switch (type) {
      case "Video":
      case "Raw":
        return <Play className="h-4 w-4 text-primary" />;
      case "Audio":
        return <Volume2 className="h-4 w-4 text-primary" />;
      case "PDF":
        return <FileText className="h-4 w-4 text-primary" />;
      case "Quiz":
        return <HelpCircle className="h-4 w-4 text-primary" />;
      case "Assignment":
        return <BookOpen className="h-4 w-4 text-primary" />;
      case "Article":
        return <FileText className="h-4 w-4 text-primary" />;
      case "Live Class":
        return <Video className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  // Live class button visibility logic
  const getCurrentISTDate = (): Date => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const parts = new Intl.DateTimeFormat("en-GB", options)
      .formatToParts(now)
      .reduce((acc: any, part) => {
        if (part.type !== "literal") acc[part.type] = part.value;
        return acc;
      }, {});
    return new Date(
      `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+05:30`
    );
  };

  const isLiveClassButtonVisible = (item: ContentItem): boolean => {
    if (item.content_type !== "Live Class" || !item.start_time || item.live_class_status === "end") {
      return false;
    }

    let startTimeStr = item.start_time;
    if (startTimeStr.endsWith("+00:00")) {
      startTimeStr = startTimeStr.replace("+00:00", "");
    } else if (startTimeStr.endsWith("Z")) {
      startTimeStr = startTimeStr.slice(0, -1);
    }

    const startTimeIST = new Date(`${startTimeStr}+05:30`);
    if (isNaN(startTimeIST.getTime())) {
      return false;
    }

    const durationInMinutes = item.class_duration || 12;
    const durationMs = durationInMinutes * 60 * 1000;
    const endTimeIST = new Date(startTimeIST.getTime() + durationMs);
    const fifteenMinBeforeIST = new Date(startTimeIST.getTime() - 15 * 60 * 1000);
    const thirtyMinAfterIST = new Date(endTimeIST.getTime() + 30 * 60 * 1000);
    const currentTime = getCurrentISTDate();

    return (
      currentTime >= fifteenMinBeforeIST &&
      currentTime <= thirtyMinAfterIST &&
      !!item.start_url
    );
  };

  const toggleSection = (sectionId: number) => {
    setCourseSections(prev =>
      prev.map(section =>
        section.section_id === sectionId
          ? { ...section, is_expanded: !section.is_expanded }
          : section
      )
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceSectionIndex = parseInt(source.droppableId.split('-')[1]);
    const destSectionIndex = parseInt(destination.droppableId.split('-')[1]);

    setCourseSections(prev => {
      const newSections = [...prev];
      
      if (sourceSectionIndex === destSectionIndex) {
        const section = newSections[sourceSectionIndex];
        const items = Array.from(section.content_items);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        
        items.forEach((item, index) => {
          item.order_index = index;
        });
        
        newSections[sourceSectionIndex] = {
          ...section,
          content_items: items,
        };
      } else {
        const sourceSection = newSections[sourceSectionIndex];
        const destSection = newSections[destSectionIndex];
        const sourceItems = Array.from(sourceSection.content_items);
        const destItems = Array.from(destSection.content_items);
        
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedItem);
        
        sourceItems.forEach((item, index) => {
          item.order_index = index;
        });
        destItems.forEach((item, index) => {
          item.order_index = index;
        });
        
        newSections[sourceSectionIndex] = {
          ...sourceSection,
          content_items: sourceItems,
        };
        newSections[destSectionIndex] = {
          ...destSection,
          content_items: destItems,
        };
      }
      
      setHasUnsavedChanges(true);
      return newSections;
    });
  };

  const handleView = (content: ContentItem) => {
    setSelectedContent(content);
    setViewerModalOpen(true);
  };

  const handleToggleFree = (contentId: number, newStatus: boolean) => {
    if (!canEdit) {
      setPermissionCheckAction(`change content access`);
      setShowUnauthorizedPopup(true);
      return;
    }

    setCourseSections(prev =>
      prev.map(section => ({
        ...section,
        content_items: section.content_items.map(item =>
          item.content_id === contentId
            ? { ...item, is_free: newStatus ? "Free" : "Paid" }
            : item
        ),
      }))
    );
    
    toast({
      title: "Access Updated",
      description: `Content access changed to ${newStatus ? "Free" : "Paid"}`,
    });
  };

  const handleTogglePublish = async (contentId: number, newStatus: boolean) => {
    if (!canEdit) {
      setPermissionCheckAction(`publish/unpublish content`);
      setShowUnauthorizedPopup(true);
      return;
    }

    const content = courseSections
      .flatMap(section => section.content_items)
      .find(item => item.content_id === contentId);

    if (!content) return;

    // Don't allow publish toggle for Live Class
    if (content.content_type === "Live Class") return;

    const status = newStatus ? "Published" : "Draft";
    setLoading(true);

        try {
          switch (content.content_type) {
            case "Raw":
            case "Video":
            case "Audio":
              const assetResult = await publishLessonsAssets({
                content_id: contentId,
                status,
              });
              await assetResult.unwrap();
              break;
            case "Article":
              const articleResult = await publishLessonsArtical({
                article_id: contentId,
                status,
              });
              await articleResult.unwrap();
              break;
            case "Assignment":
              const assignmentResult = await publishAssignmentMaster({
                assignment_master_id: contentId,
                status,
              });
              await assignmentResult.unwrap();
              break;
            case "Quiz":
              const quizResult = await publishLessonsQuiz({ quiz_id: contentId, status });
              await quizResult.unwrap();
              break;
            default:
              throw new Error(`Unsupported content type: ${content.content_type}`);
          }

      setCourseSections(prev =>
        prev.map(section => ({
          ...section,
          content_items: section.content_items.map(item =>
            item.content_id === contentId
              ? { 
                  ...item, 
                  is_published: newStatus,
                  status: newStatus ? "Published" : "Draft"
                }
              : item
          ),
        }))
      );
      
      toast({
        title: "Publication Status Updated",
        description: `Content ${newStatus ? "published" : "unpublished"} successfully`,
      });
    } catch (err: any) {
      console.error(`Error updating ${content.content_type} status:`, err);
      toast({
        title: "Error",
        description: err?.data?.message || `Failed to update ${content.content_type} status.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (contentId: number) => {
    if (!canDelete) {
      setPermissionCheckAction("delete content");
      setShowUnauthorizedPopup(true);
      return;
    }

    const content = courseSections
      .flatMap(section => section.content_items)
      .find(item => item.content_id === contentId);

    if (!content) return;

    setConfirmDialog({
      isOpen: true,
      title: "Delete Content",
      description: `Are you sure you want to delete "${content.content_title}"? This action cannot be undone.`,
      type: "danger",
      onConfirm: async () => {
        setLoading(true);
        try {
          switch (content.content_type) {
            case "Quiz":
              const quizResult = await deleteQuiz(contentId.toString());
              await quizResult.unwrap();
              break;
            case "Article":
              const articleResult = await deleteArtical(contentId.toString());
              await articleResult.unwrap();
              break;
            case "Assignment":
              const assignmentResult = await deleteAssignment(contentId.toString());
              await assignmentResult.unwrap();
              break;
            case "Live Class":
              const liveClassResult = await deleteLiveClassRecord(contentId.toString());
              await liveClassResult.unwrap();
              break;
            case "Raw":
            case "Video":
            case "Audio":
              const contentResult = await deleteLessonContent(contentId.toString());
              await contentResult.unwrap();
              break;
            default:
              const defaultResult = await deleteLessonContent(contentId.toString());
              await defaultResult.unwrap();
              break;
          }

          setCourseSections(prev =>
            prev.map(section => ({
              ...section,
              content_items: section.content_items.filter(item => item.content_id !== contentId),
            }))
          );
          
          toast({
            title: "Content Deleted",
            description: `${content.content_type} has been successfully deleted`,
            variant: "destructive",
          });
        } catch (err: any) {
          console.error(`Error deleting ${content.content_type}:`, err);
          toast({
            title: "Error",
            description: err?.data?.message || `Failed to delete ${content.content_type}.`,
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleSaveOrder = () => {
    if (!canEdit) {
      setPermissionCheckAction("save content order");
      setShowUnauthorizedPopup(true);
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: "Save Content Order",
      description: "Are you sure you want to save the current content order? This will update the course structure.",
      type: "info",
      onConfirm: async () => {
        setLoading(true);
        try {
          const payload = {
            assets: courseSections.flatMap(section =>
              section.content_items.map((item, index) => ({
                lesson_id: section.lesson_id || section.section_id,
                asset_id: item.content_id,
                asset_type: item.content_type,
                order_no: index + 1,
              }))
            ),
          };

          const orderResult = await updateContentOrder(payload);
          const response = await orderResult.unwrap();
          if (response.success) {
            setHasUnsavedChanges(false);
            toast({
              title: "Order Saved",
              description: "Content order has been successfully saved",
            });
          } else {
            throw new Error("Failed to save content order");
          }
        } catch (err: any) {
          console.error("Error saving content order:", err);
          toast({
            title: "Error",
            description: err?.data?.message || "Failed to save content order.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleMoveUp = (sectionIndex: number, itemIndex: number) => {
    if (itemIndex === 0 || !canEdit) return;

    setCourseSections(prev => {
      const newSections = [...prev];
      const section = newSections[sectionIndex];
      const items = [...section.content_items];
      
      [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]];
      
      items.forEach((item, index) => {
        item.order_index = index;
      });

      newSections[sectionIndex] = { ...section, content_items: items };
      setHasUnsavedChanges(true);
      return newSections;
    });
  };

  const handleMoveDown = (sectionIndex: number, itemIndex: number) => {
    const section = courseSections[sectionIndex];
    if (itemIndex === section.content_items.length - 1 || !canEdit) return;

    setCourseSections(prev => {
      const newSections = [...prev];
      const currentSection = newSections[sectionIndex];
      const items = [...currentSection.content_items];
      
      [items[itemIndex], items[itemIndex + 1]] = [items[itemIndex + 1], items[itemIndex]];
      
      items.forEach((item, index) => {
        item.order_index = index;
      });

      newSections[sectionIndex] = { ...currentSection, content_items: items };
      setHasUnsavedChanges(true);
      return newSections;
    });
  };

  const handleStartLiveClass = (startUrl: string) => {
    if (startUrl) {
      const newWindow = window.open(startUrl, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        toast({
          title: "Error",
          description: "Failed to open meeting. Please allow popups.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Start URL is not available. Please check meeting details.",
        variant: "destructive",
      });
    }
  };

  const handleSectionEdit = (sectionId: number, newTitle: string) => {
    if (!canEdit) {
      setPermissionCheckAction("edit section title");
      setShowUnauthorizedPopup(true);
      return;
    }

    setCourseSections(prev =>
      prev.map(section =>
        section.section_id === sectionId
          ? { ...section, section_title: newTitle }
          : section
      )
    );
    setEditingSection(null);
  };

  const handleSectionDelete = (sectionId: number) => {
    if (!canDelete) {
      setPermissionCheckAction("delete section");
      setShowUnauthorizedPopup(true);
      return;
    }

    const section = courseSections.find(s => s.section_id === sectionId);
    if (!section) return;

    setConfirmDialog({
      isOpen: true,
      title: "Delete Section",
      description: `Are you sure you want to delete "${section.section_title}" and all its content? This action cannot be undone.`,
      type: "danger",
      onConfirm: async () => {
        setLoading(true);
        try {
          if (section.lesson_id) {
            const result = await deleteLesson(section.lesson_id);
            await result.unwrap();
          }
          
          setCourseSections(prev => prev.filter(s => s.section_id !== sectionId));
          
          toast({
            title: "Section Deleted",
            description: "Section has been successfully deleted",
            variant: "destructive",
          });
        } catch (err: any) {
          console.error("Error deleting section:", err);
          toast({
            title: "Error",
            description: err?.data?.message || "Failed to delete the section.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleLessonPublishToggle = async (sectionId: number) => {
    if (!canEdit) {
      setPermissionCheckAction("publish/unpublish lesson");
      setShowUnauthorizedPopup(true);
      return;
    }

    const section = courseSections.find(s => s.section_id === sectionId);
    if (!section || !section.lesson_id) return;

    const newStatus = section.lesson_status === "Published" ? "Draft" : "Published";
    
    try {
      const result = await publishLessons({ lessonId: section.lesson_id, status: newStatus });
      await result.unwrap();
      
      setCourseSections(prev =>
        prev.map(s =>
          s.section_id === sectionId
            ? { ...s, lesson_status: newStatus }
            : s
        )
      );
      
      toast({
        title: "Lesson Status Updated",
        description: `Lesson set to ${newStatus} successfully!`,
      });
    } catch (err: any) {
      console.error("Error updating lesson status:", err);
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to update lesson status.",
        variant: "destructive",
      });
    }
  };

  const closeUnauthorizedPopup = () => {
    setShowUnauthorizedPopup(false);
    setPermissionCheckAction(null);
  };

  const handleSavePromptConfirm = async () => {
    await handleSaveOrder();
    setShowSavePrompt(false);
  };

  const handleSavePromptCancel = () => {
    setShowSavePrompt(false);
    setHasUnsavedChanges(false);
  };

  const filteredSections = courseSections.map(section => ({
    ...section,
    content_items: section.content_items.filter(item =>
      item.content_title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(section => section.content_items.length > 0 || searchTerm === "");

  return (
    <TooltipProvider>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              GATE/NET/UPSC CGSE Live Online Classes 2025-26
            </h1>
            <p className="text-muted-foreground mt-1">Manage course content and structure</p>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <Button onClick={handleSaveOrder} className="bg-success hover:bg-success/90" disabled={!canEdit}>
                <Save className="h-4 w-4 mr-2" />
                Save Order
              </Button>
            )}
            <CourseTutorial />
            <Button variant="outline">Settings</Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="ghost" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        </div>

        {/* Loading states */}
        {(checkingPermission || profileLoading || updatingOrder || loading) && (
          <div className="flex justify-center p-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">
                {updatingOrder ? "Saving order..." : loading ? "Processing..." : "Loading..."}
              </p>
            </div>
          </div>
        )}

        {/* Course Sections */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-4">
            {filteredSections.map((section, sectionIndex) => (
              <Card key={section.section_id} className="border-border">
                <Collapsible 
                  open={section.is_expanded} 
                  onOpenChange={() => toggleSection(section.section_id)}
                >
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left hover:bg-muted/50 rounded-lg p-2 -m-2">
                      <div className="flex items-center gap-3">
                        {section.is_expanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                        {editingSection?.id === section.section_id ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Input
                              value={editingSection.title}
                              onChange={(e) => setEditingSection({
                                ...editingSection,
                                title: e.target.value
                              })}
                              className="text-xl font-semibold"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSectionEdit(section.section_id, editingSection.title);
                                } else if (e.key === 'Escape') {
                                  setEditingSection(null);
                                }
                              }}
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSectionEdit(section.section_id, editingSection.title)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingSection(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <h2 className="text-xl font-semibold text-foreground">
                            {section.section_title}
                          </h2>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {section.content_items.length} items
                        </Badge>
                        {section.lesson_status && (
                          <Badge
                            variant={section.lesson_status === "Published" ? "default" : "secondary"}
                            className={section.lesson_status === "Published" ? "bg-success text-success-foreground" : ""}
                          >
                            {section.lesson_status}
                          </Badge>
                        )}
                        
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {section.lesson_status && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleLessonPublishToggle(section.section_id)}
                                  disabled={!canEdit}
                                >
                                  {section.lesson_status === "Published" ? "Unpublish" : "Publish"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {section.lesson_status === "Published" ? "Set as Draft" : "Set as Published"}
                              </TooltipContent>
                            </Tooltip>
                          )}
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingSection({ id: section.section_id, title: section.section_title })}
                                disabled={!canEdit}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Section Title</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSectionDelete(section.section_id)}
                                disabled={!canDelete}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Section</TooltipContent>
                          </Tooltip>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setAddContentDialog({ isOpen: true, sectionId: section.section_id })}
                          >
                            <Plus className="h-4 w-4" />
                            Add Content
                          </Button>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <Droppable droppableId={`section-${sectionIndex}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-2 min-h-[50px] rounded-lg transition-colors ${
                              snapshot.isDraggingOver ? 'bg-muted/30' : ''
                            }`}
                          >
                            {section.content_items.map((item, index) => (
                              <Draggable
                                key={item.content_id}
                                draggableId={`content-${item.content_id}`}
                                index={index}
                                isDragDisabled={!canEdit}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`bg-background border border-border rounded-lg transition-all ${
                                      snapshot.isDragging ? 'shadow-lg rotate-2' : 'hover:shadow-md'
                                    }`}
                                  >
                                    <div className="flex items-center gap-4 p-4">
                                      {canEdit && (
                                        <div
                                          {...provided.dragHandleProps}
                                          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                                        >
                                          <GripVertical className="h-5 w-5" />
                                        </div>
                                      )}
                                      
                                      {/* Move buttons */}
                                      <div className="flex flex-col gap-1">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => handleMoveUp(sectionIndex, index)}
                                              disabled={index === 0 || !canEdit}
                                              className="h-6 w-6 p-0"
                                            >
                                              <ArrowUp className="h-3 w-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Move Up</TooltipContent>
                                        </Tooltip>
                                        
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => handleMoveDown(sectionIndex, index)}
                                              disabled={index === section.content_items.length - 1 || !canEdit}
                                              className="h-6 w-6 p-0"
                                            >
                                              <ArrowDown className="h-3 w-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Move Down</TooltipContent>
                                        </Tooltip>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className="flex-shrink-0">
                                          {getContentIcon(item.content_type, item.quiz_type)}
                                        </div>
                                        
                                        <div className="min-w-0 flex-1">
                                          <h3 className="font-medium text-foreground truncate">
                                            {index + 1}. {item.content_type}
                                            {item.content_type === "Quiz" && item.quiz_type && ` (${item.quiz_type})`}
                                            : {item.content_title}
                                          </h3>
                                          <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">
                                              Added on: {item.added_date}
                                            </span>
                                            {item.duration && (
                                              <>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <span className="text-xs text-muted-foreground">
                                                  {item.duration} minutes
                                                </span>
                                              </>
                                            )}
                                            {item.content_type !== "Live Class" && (
                                              <>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <span className="text-xs text-muted-foreground">
                                                  Status: {item.is_published ? "Published" : "Draft"}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            variant={item.is_published ? "default" : "secondary"}
                                            className={item.is_published ? "bg-success text-success-foreground" : ""}
                                          >
                                            {item.status}
                                          </Badge>
                                          
                                          <Badge
                                            variant={item.is_free === "Free" ? "outline" : "default"}
                                            className={item.is_free === "Free" ? "border-success text-success" : ""}
                                          >
                                            {item.is_free}
                                          </Badge>
                                          
                                          {item.content_type === "Live Class" && isLiveClassButtonVisible(item) && (
                                            <Button
                                              size="sm"
                                              onClick={() => handleStartLiveClass(item.start_url!)}
                                              className="bg-success hover:bg-success/90"
                                            >
                                              Launch Meeting
                                            </Button>
                                          )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <ActionDropdown
                                            contentId={item.content_id}
                                            contentType={item.content_type}
                                            contentDetails={item.details || {}}
                                            initialFreeStatus={item.is_free === "Free"}
                                            recordType={
                                              item.content_type === "Quiz" ? "Quiz" :
                                              item.content_type === "Article" ? "Article" :
                                              item.content_type === "Assignment" ? "Assignment" :
                                              "Content"
                                            }
                                            onView={() => handleView(item)}
                                            onToggleFree={(newStatus) => handleToggleFree(item.content_id, newStatus)}
                                            onTogglePublish={(newStatus) => handleTogglePublish(item.content_id, newStatus)}
                                            initialPublishStatus={item.is_published}
                                            canEdit={canEdit}
                                            isProcessing={["Raw", "Video", "video", "Audio"].includes(item.content_type) ? "true" : "false"}
                                          />
                                          
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item.content_id)}
                                                disabled={!canDelete}
                                                className="text-destructive hover:text-destructive"
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete Content</TooltipContent>
                                          </Tooltip>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            
                            {section.content_items.length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                No content available for this section.
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </DragDropContext>

        {/* Floating Add Lesson Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setAddLessonDialog(true)}
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Add Lesson</TooltipContent>
        </Tooltip>

        {/* Modals and Dialogs */}
        {selectedContent && (
          <ContentViewerModal
            isOpen={viewerModalOpen}
            onClose={() => {
              setViewerModalOpen(false);
              setSelectedContent(null);
            }}
            content={{
              content_id: selectedContent.content_id,
              content_title: selectedContent.content_title,
              content_type: selectedContent.content_type as any,
              content_url: selectedContent.content_url,
              is_free: selectedContent.is_free,
              is_published: selectedContent.is_published,
              status: selectedContent.status,
              quiz_type: selectedContent.quiz_type,
              live_class_status: selectedContent.live_class_status,
              start_time: selectedContent.start_time,
              class_duration: selectedContent.class_duration,
              start_url: selectedContent.start_url,
            }}
          />
        )}

        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          description={confirmDialog.description}
          type={confirmDialog.type}
        />

        <AddLessonPopup
          isOpen={addLessonDialog}
          onClose={() => setAddLessonDialog(false)}
          onSave={(title) => {
            const newSection: CourseSection = {
              section_id: Date.now(),
              section_title: title,
              is_expanded: true,
              lesson_id: Date.now(),
              lesson_status: "Draft",
              content_items: [],
            };
            setCourseSections(prev => [...prev, newSection]);
            setAddLessonDialog(false);
            toast({
              title: "Lesson Added",
              description: `New lesson "${title}" has been created`,
            });
          }}
        />

        <AddContentPopup
          isOpen={addContentDialog.isOpen}
          onClose={() => setAddContentDialog({ isOpen: false, sectionId: null })}
          sectionId={addContentDialog.sectionId}
          onSave={(type, title) => {
            if (addContentDialog.sectionId) {
              const newContent: ContentItem = {
                content_id: Date.now(),
                content_title: title,
                content_type: type as any,
                content_url: `${type.toLowerCase()}-${Date.now()}`,
                is_free: "Paid",
                is_published: false,
                status: "Draft",
                added_date: new Date().toLocaleString(),
                order_index: 0,
              };
              
              setCourseSections(prev =>
                prev.map(section =>
                  section.section_id === addContentDialog.sectionId
                    ? {
                        ...section,
                        content_items: [...section.content_items, newContent]
                      }
                    : section
                )
              );
              
              setAddContentDialog({ isOpen: false, sectionId: null });
              toast({
                title: "Content Added",
                description: `New ${type} "${title}" has been added`,
              });
            }
          }}
        />

        {/* Unauthorized Popup */}
        {showUnauthorizedPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-background p-6 shadow-lg max-w-md mx-4">
              <h3 className="mb-4 text-lg font-semibold text-destructive">
                Unauthorized
              </h3>
              <p className="mb-4 text-muted-foreground">
                You are not authorized to {permissionCheckAction || "perform this action"}. 
                Please contact the administrator.
              </p>
              <div className="flex justify-end">
                <Button onClick={closeUnauthorizedPopup}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Save Prompt */}
        {showSavePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-background p-6 shadow-lg max-w-md mx-4">
              <h3 className="mb-4 text-lg font-semibold text-warning">
                Unsaved Changes
              </h3>
              <p className="mb-4 text-muted-foreground">
                You have unsaved changes in the content order. Would you like to save them before leaving?
              </p>
              <div className="flex justify-end gap-4">
                <Button onClick={handleSavePromptConfirm}>
                  Save and Leave
                </Button>
                <Button variant="ghost" onClick={handleSavePromptCancel}>
                  Discard and Leave
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default AdminCourseManagement;