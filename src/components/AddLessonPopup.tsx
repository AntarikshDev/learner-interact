import React, { useState } from "react";
import { X, Video, Headphones, FileText, Edit3, Radio, Monitor, Laptop, ClipboardList, BookOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AddLessonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideoUpload: () => void;
  onOpenAudioUpload: () => void;
  onOpenPdfUpload: () => void;
  onOpenSlideUpload: () => void;
  onOpenLiveUpload: () => void;
  onOpenLinkUpload: () => void;
  onOpenArticleUpload: () => void;
  onOpenAssignmentUpload: () => void;
  onOpenSectionQuizUpload: () => void;
  onOpenScormUpload: () => void;
  lesson_id: number;
}

const lessonOptions = [
  { 
    label: "Video", 
    icon: Video, 
    variant: "default" as const,
    action: "video",
    description: "Upload video content"
  },
  { 
    label: "Audio", 
    icon: Headphones, 
    variant: "secondary" as const,
    action: "audio",
    description: "Add audio lessons"
  },
  { 
    label: "PDF", 
    icon: FileText, 
    variant: "outline" as const,
    action: "pdf",
    description: "Upload PDF documents"
  },
  { 
    label: "Article", 
    icon: Edit3, 
    variant: "default" as const,
    action: "article",
    description: "Create text content"
  },
  {
    label: "Live",
    icon: Radio,
    variant: "destructive" as const,
    action: "live",
    description: "Schedule live sessions"
  },
  { 
    label: "Slides", 
    icon: Monitor, 
    variant: "secondary" as const,
    action: "slide",
    description: "Upload presentations"
  },
  { 
    label: "Scorm/Tincan", 
    icon: Laptop, 
    variant: "default" as const,
    action: "scorm",
    description: "Interactive content"
  },
  { 
    label: "Assessment", 
    icon: ClipboardList, 
    variant: "outline" as const,
    action: "quiz",
    description: "Create quizzes & tests"
  },
  { 
    label: "Assignment", 
    icon: BookOpen, 
    variant: "secondary" as const,
    action: "assignment",
    description: "Student assignments"
  },
];

const AddLessonPopup: React.FC<AddLessonPopupProps> = ({
  isOpen,
  onClose,
  onOpenVideoUpload,
  onOpenAudioUpload,
  onOpenPdfUpload,
  onOpenSlideUpload,
  onOpenLiveUpload,
  onOpenLinkUpload,
  onOpenArticleUpload,
  onOpenAssignmentUpload,
  onOpenSectionQuizUpload,
  onOpenScormUpload,
  lesson_id,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (action: string) => {
    setSelectedOption(action);
    
    // Call the appropriate handler based on action
    switch (action) {
      case "video":
        onOpenVideoUpload();
        break;
      case "audio":
        onOpenAudioUpload();
        break;
      case "pdf":
        onOpenPdfUpload();
        break;
      case "article":
        onOpenArticleUpload();
        break;
      case "slide":
        onOpenSlideUpload();
        break;
      case "live":
        onOpenLiveUpload();
        break;
      case "scorm":
        onOpenScormUpload();
        break;
      case "quiz":
        onOpenSectionQuizUpload();
        break;
      case "assignment":
        onOpenAssignmentUpload();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-modal-backdrop backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Slide Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-modal-background shadow-large transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-gradient-subtle px-6 py-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Add Lesson Content</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose content type to create engaging lessons
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-background/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {/* Lesson Types Grid */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Content Types</h3>
                <div className="grid grid-cols-2 gap-3">
                  {lessonOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Card
                        key={option.label}
                        className={`group cursor-pointer border-2 p-4 transition-all duration-200 hover:shadow-medium hover:-translate-y-1 ${
                          selectedOption === option.action
                            ? 'border-primary bg-primary/5 shadow-medium'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleOptionClick(option.action)}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className={`p-3 rounded-full transition-colors ${
                            selectedOption === option.action
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                          }`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {option.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-3 text-sm text-muted-foreground bg-background">OR</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              {/* Import Options */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Import Options</h3>
                <Card className="p-4 border-dashed border-2 border-border hover:border-primary/50 transition-colors">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 justify-start"
                    onClick={() => console.log("Import from Assets Library")}
                  >
                    <Upload className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Import from Assets Library</p>
                      <p className="text-sm text-muted-foreground">
                        Reuse existing content from your library
                      </p>
                    </div>
                  </Button>
                </Card>
              </div>

              {/* Selected Option Feedback */}
              {selectedOption && (
                <Card className="p-4 bg-accent/10 border-accent">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
                    <p className="text-sm text-accent-foreground">
                      Selected: {lessonOptions.find(opt => opt.action === selectedOption)?.label}
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-gradient-subtle px-6 py-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={!selectedOption}
                onClick={() => {
                  if (selectedOption) {
                    console.log(`Creating ${selectedOption} content...`);
                    onClose();
                  }
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLessonPopup;