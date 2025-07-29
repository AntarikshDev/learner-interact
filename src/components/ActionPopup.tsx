import React, { useState, useEffect } from "react";
import { X, MessageSquare, CheckCircle, XCircle, Clock, FileText, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { LoadingState, LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

// Mock API hooks - replace with your actual implementation
interface ApiHook {
  isLoading: boolean;
}

interface HistoryEntry {
  reviewed_at?: string;
  review_comments?: string;
  status?: string;
  submitted_file_url?: string;
  file_name?: string;
  file_size?: string;
}

interface HistoryResponse {
  data?: HistoryEntry[];
}

// Replace these with your actual API hooks
const useGetSubmitedAssignmentHistoryQuery = (id: number, options: any): { data?: HistoryResponse; isLoading: boolean } => ({
  data: undefined,
  isLoading: false
});

const useAssignmentApproveRejectMutation = (): [any, ApiHook] => [
  async () => ({ unwrap: async () => {} }),
  { isLoading: false }
];

const useSendMessageToStudentMutation = (): [any, ApiHook] => [
  async () => ({ unwrap: async () => {} }),
  { isLoading: false }
];

type ActionType = "reviewed" | "reject" | "message" | "history";

interface ActionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: ActionType;
  onSubmit: (data: { feedback: string; file: File | null }) => void;
  userEmail: string;
  file: File | null;
  submission_id: number | null;
}

const ActionPopup: React.FC<ActionPopupProps> = ({
  isOpen,
  onClose,
  actionType,
  onSubmit,
  userEmail,
  file,
  submission_id,
}) => {
  const [feedback, setFeedback] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: history, isLoading: isHistoryLoading } =
    useGetSubmitedAssignmentHistoryQuery(submission_id ?? 0, {
      skip: !isOpen || actionType !== "history" || !submission_id,
    });

  const [assignmentApproveReject, { isLoading: isApproving }] =
    useAssignmentApproveRejectMutation();
  const [sendMessageToStudent, { isLoading: isSendingMessage }] =
    useSendMessageToStudentMutation();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFeedback("");
      setSelectedFile(null);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getActionConfig = () => {
    switch (actionType) {
      case "reviewed":
        return {
          title: "Approve Assignment",
          subtitle: "Provide feedback and approve this submission",
          icon: CheckCircle,
          iconColor: "text-success",
          iconBg: "bg-success/10",
          feedbackPlaceholder: "Provide positive feedback and any additional notes...",
          uploadEnabled: true,
          submitText: "Approve Submission",
          submitVariant: "success" as const,
        };
      case "reject":
        return {
          title: "Reject Assignment",
          subtitle: "Explain why this submission needs improvement",
          icon: XCircle,
          iconColor: "text-destructive",
          iconBg: "bg-destructive/10",
          feedbackPlaceholder: "Explain what needs to be improved and provide guidance...",
          uploadEnabled: true,
          submitText: "Reject Submission",
          submitVariant: "destructive" as const,
        };
      case "message":
        return {
          title: "Send Message",
          subtitle: "Communicate directly with the student",
          icon: MessageSquare,
          iconColor: "text-primary",
          iconBg: "bg-primary/10",
          feedbackPlaceholder: "Type your message to the student...",
          uploadEnabled: false,
          submitText: "Send Message",
          submitVariant: "default" as const,
        };
      case "history":
        return {
          title: "Learner History",
          subtitle: "View all submission history and feedback",
          icon: Clock,
          iconColor: "text-muted-foreground",
          iconBg: "bg-muted/10",
          feedbackPlaceholder: "",
          uploadEnabled: false,
          submitText: "",
          submitVariant: "default" as const,
        };
      default:
        return {
          title: "Action",
          subtitle: "",
          icon: FileText,
          iconColor: "text-foreground",
          iconBg: "bg-muted/10",
          feedbackPlaceholder: "",
          uploadEnabled: false,
          submitText: "Submit",
          submitVariant: "default" as const,
        };
    }
  };

  const config = getActionConfig();
  const IconComponent = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!submission_id || isNaN(submission_id)) {
      setError("Invalid submission ID. Please try again.");
      return;
    }

    if ((actionType === "reviewed" || actionType === "reject" || actionType === "message") && !feedback.trim()) {
      setError("Please provide feedback or a message.");
      return;
    }

    try {
      if (actionType === "reviewed" || actionType === "reject") {
        const formData = new FormData();
        formData.append("submission_id", submission_id.toString());
        formData.append("review_comments", feedback);
        formData.append(
          "status",
          actionType === "reviewed" ? "reviewed" : "reject",
        );
        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        await assignmentApproveReject(formData).unwrap();
        onSubmit({ feedback, file: selectedFile });
      } else if (actionType === "message") {
        const messageData = {
          submission_id,
          email: userEmail,
          send_message: feedback,
        };

        await sendMessageToStudent(messageData).unwrap();
        onSubmit({ feedback, file: null });
      }

      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      setError("Failed to submit. Please try again.");
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      reviewed: { text: "Approved", color: "bg-success text-success-foreground" },
      reject: { text: "Rejected", color: "bg-destructive text-destructive-foreground" },
      pending: { text: "Pending", color: "bg-warning text-warning-foreground" },
      submitted: { text: "Submitted", color: "bg-primary text-primary-foreground" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || 
                   { text: status, color: "bg-muted text-muted-foreground" };

    return (
      <span className={cn("px-2 py-1 text-xs font-medium rounded-full", config.color)}>
        {config.text}
      </span>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'hsl(var(--modal-backdrop))' }}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-modal-background rounded-xl shadow-large animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-subtle">
          <div className="flex items-center space-x-4">
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", config.iconBg)}>
              <IconComponent className={cn("w-6 h-6", config.iconColor)} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{config.title}</h2>
              <p className="text-sm text-muted-foreground">{config.subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Student Info */}
        <div className="px-6 py-4 bg-muted/30 border-b border-border">
          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Student:</span>
            <span className="text-muted-foreground">{userEmail}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {actionType === "history" ? (
            <div>
              {isHistoryLoading ? (
                <LoadingState message="Loading submission history..." />
              ) : history && history.data && history.data.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-foreground bg-table-header">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground bg-table-header">Feedback</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground bg-table-header">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground bg-table-header">Files</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.data.map((entry: HistoryEntry, index: number) => (
                          <tr 
                            key={index} 
                            className="border-b border-border hover:bg-table-row-hover transition-colors duration-150"
                          >
                            <td className="py-4 px-4 text-muted-foreground">
                              {entry.reviewed_at
                                ? formatDate(entry.reviewed_at)
                                : "—"}
                            </td>
                            <td className="py-4 px-4 max-w-xs">
                              <p className="text-foreground text-sm line-clamp-2">
                                {entry.review_comments || "—"}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              {entry.status ? getStatusBadge(entry.status) : "—"}
                            </td>
                            <td className="py-4 px-4">
                              {entry.submitted_file_url ? (
                                <a
                                  href={entry.submitted_file_url}
                                  className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-150"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Download className="w-3 h-3" />
                                  <span className="text-xs">
                                    {entry.file_name || "Download"} 
                                    {entry.file_size && ` (${entry.file_size})`}
                                  </span>
                                </a>
                              ) : (
                                "—"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No submission history available.</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {actionType === "message" ? "Message" : "Feedback"}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={config.feedbackPlaceholder}
                  className="w-full min-h-32 p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200"
                  required
                />
              </div>

              {config.uploadEnabled && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Attach File (Optional)
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    error={error}
                    maxSize={100}
                  />
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-gradient-subtle">
          <Button
            variant="professional"
            onClick={onClose}
            disabled={isApproving || isSendingMessage}
          >
            {actionType === "history" ? "Close" : "Cancel"}
          </Button>
          
          {actionType !== "history" && (
            <Button
              type="submit"
              variant={config.submitVariant}
              onClick={handleSubmit}
              disabled={isApproving || isSendingMessage || !feedback.trim()}
              className="min-w-32"
            >
              {isApproving || isSendingMessage ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Processing...</span>
                </div>
              ) : (
                config.submitText
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionPopup;