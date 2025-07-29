import React, { useState } from "react";
import { X, Video, Headphones, FileText, Edit3, Radio, Monitor, Laptop, ClipboardList, BookOpen, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AddLessonPopupZohoProps {
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

const zohoLessonOptions = [
  { 
    label: "Video", 
    icon: Video, 
    color: "bg-blue-50 text-blue-600 border-blue-200",
    hoverColor: "hover:bg-blue-100 hover:border-blue-300",
    action: "video",
    description: "MP4, AVI, MOV files"
  },
  { 
    label: "Audio", 
    icon: Headphones, 
    color: "bg-purple-50 text-purple-600 border-purple-200",
    hoverColor: "hover:bg-purple-100 hover:border-purple-300",
    action: "audio",
    description: "MP3, WAV files"
  },
  { 
    label: "PDF Document", 
    icon: FileText, 
    color: "bg-red-50 text-red-600 border-red-200",
    hoverColor: "hover:bg-red-100 hover:border-red-300",
    action: "pdf",
    description: "PDF documents"
  },
  { 
    label: "Article", 
    icon: Edit3, 
    color: "bg-green-50 text-green-600 border-green-200",
    hoverColor: "hover:bg-green-100 hover:border-green-300",
    action: "article",
    description: "Rich text content"
  },
  {
    label: "Live Session",
    icon: Radio,
    color: "bg-red-50 text-red-600 border-red-200",
    hoverColor: "hover:bg-red-100 hover:border-red-300",
    action: "live",
    description: "Real-time sessions"
  },
  { 
    label: "Presentation", 
    icon: Monitor, 
    color: "bg-orange-50 text-orange-600 border-orange-200",
    hoverColor: "hover:bg-orange-100 hover:border-orange-300",
    action: "slide",
    description: "PPT, PPTX files"
  },
  { 
    label: "SCORM Package", 
    icon: Laptop, 
    color: "bg-teal-50 text-teal-600 border-teal-200",
    hoverColor: "hover:bg-teal-100 hover:border-teal-300",
    action: "scorm",
    description: "Interactive content"
  },
  { 
    label: "Assessment", 
    icon: ClipboardList, 
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    hoverColor: "hover:bg-indigo-100 hover:border-indigo-300",
    action: "quiz",
    description: "Quizzes & tests"
  },
  { 
    label: "Assignment", 
    icon: BookOpen, 
    color: "bg-pink-50 text-pink-600 border-pink-200",
    hoverColor: "hover:bg-pink-100 hover:border-pink-300",
    action: "assignment",
    description: "Student tasks"
  },
];

const AddLessonPopupZoho: React.FC<AddLessonPopupZohoProps> = ({
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
      {/* Zoho-style backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      {/* Zoho-style side panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-lg transition-transform duration-200 ease-out ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Zoho-style header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Add Content</h2>
              <p className="text-sm text-gray-500">Select content type</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Content types - Zoho grid style */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Content Types</h3>
                <div className="grid grid-cols-2 gap-2">
                  {zohoLessonOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <div
                        key={option.label}
                        className={`group relative cursor-pointer rounded-zoho border p-3 transition-all duration-150 ${
                          selectedOption === option.action
                            ? 'border-zoho-primary bg-zoho-primary/5 shadow-zoho'
                            : `${option.color} ${option.hoverColor} shadow-sm hover:shadow-zoho`
                        }`}
                        onClick={() => handleOptionClick(option.action)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                            selectedOption === option.action
                              ? 'bg-zoho-primary text-white'
                              : 'bg-white shadow-sm'
                          }`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900 leading-tight">
                              {option.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Zoho-style selection indicator */}
                        {selectedOption === option.action && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-zoho-primary border-2 border-white">
                            <div className="h-full w-full rounded-full bg-zoho-primary flex items-center justify-center">
                              <div className="h-1 w-1 rounded-full bg-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Zoho-style divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-2 text-xs text-gray-400 bg-white">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Import section - Zoho style */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Import Content</h3>
                <div
                  className="flex items-center p-3 border border-dashed border-gray-300 rounded-zoho hover:border-zoho-primary hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => console.log("Import from library")}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 group-hover:bg-zoho-primary group-hover:text-white transition-colors">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Assets Library</p>
                    <p className="text-xs text-gray-500">Import existing content</p>
                  </div>
                </div>
              </div>

              {/* Selected feedback - Zoho style */}
              {selectedOption && (
                <div className="bg-green-50 border border-green-200 rounded-zoho p-3">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-green-800">
                      {zohoLessonOptions.find(opt => opt.action === selectedOption)?.label} selected
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zoho-style footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-zoho hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!selectedOption}
                onClick={() => {
                  if (selectedOption) {
                    console.log(`Creating ${selectedOption} content...`);
                    onClose();
                  }
                }}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-zoho-primary border border-zoho-primary rounded-zoho hover:bg-zoho-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLessonPopupZoho;