import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ActionDropdown from "./ActionDropdown";
import ContentViewerModal from "./ContentViewerModal";
import ConfirmationDialog from "./ConfirmationDialog";
import AddLessonPopup from "./AddLessonPopup";
import AddContentPopup from "./AddContentPopup";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  content_id: number;
  content_title: string;
  content_type: "Video" | "PDF" | "Quiz" | "Assignment" | "Article";
  content_url: string;
  duration?: number;
  is_free: "Free" | "Paid";
  is_published: boolean;
  status: "Published" | "Draft";
  added_date: string;
  order_index: number;
}

interface CourseSection {
  section_id: number;
  section_title: string;
  is_expanded: boolean;
  content_items: ContentItem[];
}

const AdminCourseManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [viewerModalOpen, setViewerModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
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

  const [courseSections, setCourseSections] = useState<CourseSection[]>([
    {
      section_id: 1,
      section_title: "Introduction",
      is_expanded: true,
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
        },
      ],
    },
    {
      section_id: 3,
      section_title: "Mineralogy and Crystallography",
      is_expanded: false,
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
      ],
    },
  ]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Play className="h-4 w-4 text-primary" />;
      case "PDF":
        return <FileText className="h-4 w-4 text-primary" />;
      case "Quiz":
        return <HelpCircle className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
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
    
    // Extract section and item indices from droppableId
    const sourceSectionIndex = parseInt(source.droppableId.split('-')[1]);
    const destSectionIndex = parseInt(destination.droppableId.split('-')[1]);

    setCourseSections(prev => {
      const newSections = [...prev];
      
      if (sourceSectionIndex === destSectionIndex) {
        // Reordering within the same section
        const section = newSections[sourceSectionIndex];
        const items = Array.from(section.content_items);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        
        // Update order indices
        items.forEach((item, index) => {
          item.order_index = index;
        });
        
        newSections[sourceSectionIndex] = {
          ...section,
          content_items: items,
        };
      } else {
        // Moving between sections
        const sourceSection = newSections[sourceSectionIndex];
        const destSection = newSections[destSectionIndex];
        const sourceItems = Array.from(sourceSection.content_items);
        const destItems = Array.from(destSection.content_items);
        
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedItem);
        
        // Update order indices for both sections
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

  const handleTogglePublish = (contentId: number, newStatus: boolean) => {
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
  };

  const handleDelete = (contentId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Content",
      description: "Are you sure you want to delete this content? This action cannot be undone.",
      onConfirm: () => {
        setCourseSections(prev =>
          prev.map(section => ({
            ...section,
            content_items: section.content_items.filter(item => item.content_id !== contentId),
          }))
        );
        
        toast({
          title: "Content Deleted",
          description: "Content has been successfully deleted",
          variant: "destructive",
        });
        
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleSaveOrder = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Save Content Order",
      description: "Are you sure you want to save the current content order? This will update the course structure.",
      onConfirm: () => {
        // Here you would make API call to save the order
        setHasUnsavedChanges(false);
        
        toast({
          title: "Order Saved",
          description: "Content order has been successfully saved",
        });
        
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const filteredSections = courseSections.map(section => ({
    ...section,
    content_items: section.content_items.filter(item =>
      item.content_title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(section => section.content_items.length > 0 || searchTerm === "");

  return (
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
            <Button onClick={handleSaveOrder} className="bg-success hover:bg-success/90">
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
          )}
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
                      <h2 className="text-xl font-semibold text-foreground">
                        {section.section_title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {section.content_items.length} items
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddContentDialog({ isOpen: true, sectionId: section.section_id });
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Add Content
                      </Button>
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
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                                    >
                                      <GripVertical className="h-5 w-5" />
                                    </div>
                                    
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      <div className="flex-shrink-0">
                                        {getContentIcon(item.content_type)}
                                      </div>
                                      
                                      <div className="min-w-0 flex-1">
                                        <h3 className="font-medium text-foreground truncate">
                                          {item.content_title}
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
                                      </div>
                                    </div>
                                    
                                    <ActionDropdown
                                      contentId={item.content_id}
                                      contentType={item.content_type}
                                      contentDetails={item}
                                      initialFreeStatus={item.is_free === "Free"}
                                      recordType="free"
                                      onView={() => handleView(item)}
                                      onToggleFree={handleToggleFree}
                                      onTogglePublish={handleTogglePublish}
                                      initialPublishStatus={item.is_published}
                                      canEdit={true}
                                      isProcessing=""
                                      onDelete={() => handleDelete(item.content_id)}
                                    />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          
                          {section.content_items.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>No content items found</p>
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

      {/* Modals */}
      <ContentViewerModal
        isOpen={viewerModalOpen}
        onClose={() => setViewerModalOpen(false)}
        content={selectedContent}
      />

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
      />

      <AddLessonPopup
        isOpen={addLessonDialog}
        onClose={() => setAddLessonDialog(false)}
        onSave={(lessonTitle) => {
          // Add lesson logic here
          toast({
            title: "Lesson Added",
            description: `"${lessonTitle}" has been added to the course`,
          });
          setAddLessonDialog(false);
        }}
      />

      <AddContentPopup
        isOpen={addContentDialog.isOpen}
        onClose={() => setAddContentDialog({ isOpen: false, sectionId: null })}
        sectionId={addContentDialog.sectionId}
        onSave={(contentData) => {
          // Add content logic here
          toast({
            title: "Content Added",
            description: `"${contentData.title}" has been added to the lesson`,
          });
          setAddContentDialog({ isOpen: false, sectionId: null });
        }}
      />

      {/* Floating Add Lesson Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setAddLessonDialog(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default AdminCourseManagement;