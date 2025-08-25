import React from "react";
import { X, Maximize, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

interface ContentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentItem | null;
}

const ContentViewerModal: React.FC<ContentViewerModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  if (!content) return null;

  const renderVideoViewer = () => (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1"></div>
          </div>
          <p className="text-sm opacity-80">Video Player</p>
          <p className="text-xs opacity-60 mt-1">{content.content_title}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{content.content_title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Duration: {content.duration} minutes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );

  const renderQuizViewer = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{content.content_title}</h3>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
            <span className="font-medium">Quiz Settings</span>
            <span className="text-muted-foreground">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border border-border rounded-lg bg-background">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Questions:</span>
                <span className="ml-2 font-medium">5</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time Limit:</span>
                <span className="ml-2 font-medium">30 minutes</span>
              </div>
              <div>
                <span className="text-muted-foreground">Attempts Allowed:</span>
                <span className="ml-2 font-medium">3</span>
              </div>
              <div>
                <span className="text-muted-foreground">Passing Score:</span>
                <span className="ml-2 font-medium">70%</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
            <span className="font-medium">Questions (5)</span>
            <span className="text-muted-foreground">▼</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-4">
            <div className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Question 1 (Correct Answer, +2, -0.66)</h4>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-primary">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Select the correct mineral and chemical formula pair(s) from given option
              </p>
              
              <div className="space-y-2">
                <div className="p-2 bg-success/10 rounded border border-success/20">
                  <span className="text-sm">Anorthite - CaAl₂Si₂O₈</span>
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="text-sm">Heulandite - CaAl₂Si₆O₁₆ · 7H₂O</span>
                </div>
                <div className="p-2 bg-success/10 rounded border border-success/20">
                  <span className="text-sm">Albite - NaAlSi₃O₈</span>
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="text-sm">Leucite - KAlSi₂O₆</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>Explanation:</strong> No explanation available
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );

  const renderPDFViewer = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{content.content_title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="aspect-[3/4] bg-muted rounded-lg border border-border flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm font-medium">PDF Document</p>
          <p className="text-xs mt-1">Click Edit to modify content</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="rounded" />
          Allow Download
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (content.content_type) {
      case "Video":
        return renderVideoViewer();
      case "Quiz":
        return renderQuizViewer();
      case "PDF":
        return renderPDFViewer();
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Content type not supported</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl">{content.content_type} Details</DialogTitle>
            <div className="flex items-center gap-2">
              <Badge variant={content.is_published ? "default" : "secondary"}>
                {content.status}
              </Badge>
              <Badge variant={content.is_free === "Free" ? "outline" : "default"}>
                {content.is_free}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Separator />

        <div className="py-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentViewerModal;