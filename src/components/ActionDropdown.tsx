import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Settings, FileText, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ToggleButtonProps {
  content_id: number;
  initialStatus: boolean;
  recordType: string;
  onToggle: (newStatus: boolean) => void;
}

interface ActionDropdownProps {
  contentId: number;
  contentType: string;
  contentDetails: any;
  initialFreeStatus: boolean;
  recordType: ToggleButtonProps["recordType"];
  onView: () => void;
  onToggleFree: (newStatus: boolean) => void;
  onTogglePublish: (newStatus: boolean) => void;
  initialPublishStatus: boolean;
  canEdit?: boolean;
  isProcessing: string;
}

// Professional ToggleButton component
const ToggleButton: React.FC<ToggleButtonProps> = ({
  content_id,
  initialStatus,
  recordType,
  onToggle,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newStatus = !status;
      setStatus(newStatus);
      onToggle(newStatus);
    } catch (error) {
      // Revert on error
      setStatus(status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-foreground">
        {recordType === "free" ? "Free Access" : "Premium Access"}
      </span>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 ${
          status ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            status ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  contentId,
  contentType,
  contentDetails,
  initialFreeStatus,
  recordType,
  onView,
  onToggleFree,
  onTogglePublish,
  initialPublishStatus,
  isProcessing,
  canEdit = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePublishToggle = () => {
    onTogglePublish(!initialPublishStatus);
    setIsOpen(false);
  };

  const handleView = () => {
    onView();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDropdown}
        className="h-8 w-8 hover:bg-secondary hover:border-primary/20"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className={`absolute right-0 z-50 mt-2 w-64 p-0 shadow-large border-border bg-modal-background transition-all duration-200 ease-out ${
          isOpen ? 'animate-scale-in' : 'animate-scale-out'
        }`}>
          <div className="py-2">
            {/* Header */}
            <div className="px-4 py-2 border-b border-border bg-gradient-subtle">
              <h3 className="text-sm font-semibold text-foreground">Content Actions</h3>
              <p className="text-xs text-muted-foreground">{contentType}</p>
            </div>

            {/* Actions */}
            <div className="py-2">
              {/* View Action */}
              <button
                onClick={handleView}
                className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <Eye className="h-4 w-4 mr-3 text-primary" />
                <span>View Content</span>
              </button>

              {/* Free/Premium Toggle */}
              <div className="px-4 py-2 border-t border-border">
                <ToggleButton
                  content_id={contentId}
                  initialStatus={initialFreeStatus}
                  recordType={recordType}
                  onToggle={onToggleFree}
                />
              </div>

              {/* Publish/Draft Toggle - Hidden for Live Class */}
              {contentType !== "Live Class" && (
                <div className="border-t border-border">
                  <button
                    onClick={handlePublishToggle}
                    disabled={!canEdit || contentType === "Live Class"}
                    className={`flex w-full items-center px-4 py-3 text-sm transition-colors ${
                      canEdit && contentType !== "Live Class"
                        ? "text-foreground hover:bg-secondary cursor-pointer"
                        : "text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {initialPublishStatus ? (
                      <>
                        <FileText className="h-4 w-4 mr-3 text-warning" />
                        <div className="flex-1 text-left">
                          <p className="font-medium">Set as Draft</p>
                          <p className="text-xs text-muted-foreground">Make content private</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-3 text-success" />
                        <div className="flex-1 text-left">
                          <p className="font-medium">Publish Content</p>
                          <p className="text-xs text-muted-foreground">Make content live</p>
                        </div>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Status Indicator */}
              <div className="px-4 py-2 border-t border-border bg-gradient-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      initialPublishStatus ? 'bg-success' : 'bg-warning'
                    }`}></div>
                    <span className="text-xs font-medium text-foreground">
                      {initialPublishStatus ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                
                {isProcessing && (
                  <div className="flex items-center mt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-2"></div>
                    <span className="text-xs text-muted-foreground">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ActionDropdown;