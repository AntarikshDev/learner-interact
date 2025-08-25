import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, 
  Volume2, 
  FileText, 
  MessageSquare, 
  Presentation,
  Monitor,
  PenTool,
  BookOpen,
  ArrowLeft 
} from "lucide-react";

interface AddContentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: number | null;
  onSave: (contentData: { type: string; title: string }) => void;
}

const AddContentPopup: React.FC<AddContentPopupProps> = ({ 
  isOpen, 
  onClose, 
  sectionId, 
  onSave 
}) => {
  const contentTypes = [
    { type: "Video", icon: Video, color: "text-blue-600", label: "Video" },
    { type: "Audio", icon: Volume2, color: "text-orange-600", label: "Audio" },
    { type: "PDF", icon: FileText, color: "text-red-600", label: "PDF" },
    { type: "Article", icon: BookOpen, color: "text-green-600", label: "Article" },
    { type: "Live", icon: MessageSquare, color: "text-red-500", label: "Live" },
    { type: "Slides", icon: Presentation, color: "text-purple-600", label: "Slides" },
    { type: "Scorm/Tincan", icon: Monitor, color: "text-teal-600", label: "Scorm/Tincan" },
    { type: "Assessment/Quiz/Test", icon: PenTool, color: "text-yellow-600", label: "Assessment Quiz/Test" },
    { type: "Assignment", icon: FileText, color: "text-indigo-600", label: "Assignment" },
  ];

  const handleContentTypeSelect = (type: string) => {
    onSave({ type, title: `New ${type}` });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold">Add Content</DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Choose a content type and start creating content.
          </p>
        </DialogHeader>

        <div className="pt-4">
          <div className="grid grid-cols-3 gap-4">
            {contentTypes.map((content) => {
              const IconComponent = content.icon;
              return (
                <Card 
                  key={content.type}
                  className="cursor-pointer transition-all hover:shadow-md hover:scale-105 border-2 hover:border-primary/20"
                  onClick={() => handleContentTypeSelect(content.type)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className={`mb-3 ${content.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-medium text-sm text-foreground">
                      {content.label}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <div className="text-muted-foreground text-sm mb-4">OR</div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Import Options</h4>
              <Button
                variant="outline"
                className="w-full max-w-md"
                onClick={() => {
                  // Handle assets library import
                  onSave({ type: "Import", title: "Imported from Assets Library" });
                }}
              >
                Import from Assets Library
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentPopup;