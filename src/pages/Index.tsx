import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ActionPopup from "@/components/ActionPopup";
import AddLessonPopup from "@/components/AddLessonPopup";
import AddLessonPopupZoho from "@/components/AddLessonPopupZoho";
import ActionDropdown from "@/components/ActionDropdown";
import AssetsLibraryPopup from "@/components/AssetsLibraryPopup";
import Branding from "@/components/Branding";
import ChatCard from "@/components/ChatCard";
import AdminDashboard from "@/components/AdminDashboard";
import InstructorDashboard from "@/components/InstructorDashboard";
import SubAdminDashboard from "@/components/SubAdminDashboard";
import StudentDashboard from "@/components/StudentDashboard";
import StudentCourseDetails from "@/components/StudentCourseDetails";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [actionType, setActionType] = useState<"reviewed" | "reject" | "message" | "history">("reviewed");
  const [lessonPopupOpen, setLessonPopupOpen] = useState(false);
  const [zohoPopupOpen, setZohoPopupOpen] = useState(false);
  const [assetsLibraryOpen, setAssetsLibraryOpen] = useState(false);
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  const handleOpenPopup = (type: "reviewed" | "reject" | "message" | "history") => {
    setActionType(type);
    setPopupOpen(true);
  };

  const handleSubmit = (data: { feedback: string; file: File | null }) => {
    console.log("Submitted:", data);
    setPopupOpen(false);
  };

  // Lesson popup handlers
  const handleLessonUpload = (type: string) => {
    console.log(`Upload ${type} content`);
    setLessonPopupOpen(false);
  };

  // Assets library handlers
  const handleAssetsLibraryAdd = (assets: any[]) => {
    console.log("Added assets:", assets);
    setAssetsLibraryOpen(false);
  };

  // Branding handlers
  const handleBrandingSave = (data: any) => {
    console.log("Branding saved:", data);
    setBrandingOpen(false);
  };

  if (showCourseDetails) {
    return <StudentCourseDetails />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">LMS Component Demo</h1>
          <p className="text-xl text-muted-foreground">Preview our professional learning management system components</p>
        </div>
        
        {/* Action Popup Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Action Popup</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Button 
            variant="success" 
            onClick={() => handleOpenPopup("reviewed")}
            className="w-full"
          >
            Approve Assignment
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={() => handleOpenPopup("reject")}
            className="w-full"
          >
            Reject Assignment
          </Button>
          
          <Button 
            variant="default" 
            onClick={() => handleOpenPopup("message")}
            className="w-full"
          >
            Send Message
          </Button>
          
          <Button 
            variant="professional" 
            onClick={() => handleOpenPopup("history")}
            className="w-full"
          >
            View History
          </Button>
          </div>
        </div>

        {/* Action Dropdown Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Action Dropdown</h2>
          <div className="flex justify-center">
            <ActionDropdown
              contentId={1}
              contentType="Video"
              contentDetails={{ title: "Sample Video" }}
              initialFreeStatus={false}
              recordType="free"
              onView={() => console.log("View content")}
              onToggleFree={(status) => console.log("Toggle free:", status)}
              onTogglePublish={(status) => console.log("Toggle publish:", status)}
              initialPublishStatus={true}
              canEdit={true}
              isProcessing=""
            />
          </div>
        </div>

        {/* Add Lesson Popup Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Add Lesson Popups</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <Button 
              variant="default" 
              onClick={() => setLessonPopupOpen(true)}
              className="w-full"
            >
              Professional Theme
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setZohoPopupOpen(true)}
              className="w-full"
            >
              Zoho-Inspired Theme
            </Button>
          </div>
        </div>

        {/* Assets Library Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Assets Library</h2>
          <div className="flex justify-center">
            <Button 
              variant="default" 
              onClick={() => setAssetsLibraryOpen(true)}
              className="w-full max-w-md"
            >
              Open Assets Library
            </Button>
          </div>
        </div>

        {/* Branding Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Lesson Branding</h2>
          <div className="flex justify-center">
            <Button 
              variant="default" 
              onClick={() => setBrandingOpen(true)}
              className="w-full max-w-md"
            >
              Open Branding Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCourseDetails(true)}
              className="w-full max-w-md"
            >
              View Course Details Page
            </Button>
            <Button 
              variant="professional" 
              onClick={() => window.open('/landing', '_blank')}
              className="w-full max-w-md"
            >
              View Landing Page
            </Button>
          </div>
        </div>

        {/* Dashboard Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Dashboard Demos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant={activeDashboard === "admin" ? "default" : "outline"}
              onClick={() => setActiveDashboard(activeDashboard === "admin" ? null : "admin")}
            >
              Admin Dashboard
            </Button>
            <Button 
              variant={activeDashboard === "instructor" ? "default" : "outline"}
              onClick={() => setActiveDashboard(activeDashboard === "instructor" ? null : "instructor")}
            >
              Instructor Dashboard
            </Button>
            <Button 
              variant={activeDashboard === "subadmin" ? "default" : "outline"}
              onClick={() => setActiveDashboard(activeDashboard === "subadmin" ? null : "subadmin")}
            >
              Sub Admin Dashboard
            </Button>
            <Button 
              variant={activeDashboard === "student" ? "default" : "outline"}
              onClick={() => setActiveDashboard(activeDashboard === "student" ? null : "student")}
            >
              Student Dashboard
            </Button>
          </div>
        </div>

        {/* Active Dashboard */}
        {activeDashboard && (
          <div className="bg-muted/30 rounded-lg">
            {activeDashboard === "admin" && <AdminDashboard />}
            {activeDashboard === "instructor" && <InstructorDashboard />}
            {activeDashboard === "subadmin" && <SubAdminDashboard />}
            {activeDashboard === "student" && <StudentDashboard />}
          </div>
        )}

        {/* Chat Card Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Chat Card</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ChatCard />
            </div>
          </div>
        </div>

        <ActionPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          actionType={actionType}
          onSubmit={handleSubmit}
          userEmail="student@example.com"
          file={null}
          submission_id={123}
        />

        <AddLessonPopupZoho
          isOpen={zohoPopupOpen}
          onClose={() => setZohoPopupOpen(false)}
          onOpenVideoUpload={() => handleLessonUpload("video")}
          onOpenAudioUpload={() => handleLessonUpload("audio")}
          onOpenPdfUpload={() => handleLessonUpload("pdf")}
          onOpenSlideUpload={() => handleLessonUpload("slide")}
          onOpenLiveUpload={() => handleLessonUpload("live")}
          onOpenLinkUpload={() => handleLessonUpload("link")}
          onOpenArticleUpload={() => handleLessonUpload("article")}
          onOpenAssignmentUpload={() => handleLessonUpload("assignment")}
          onOpenSectionQuizUpload={() => handleLessonUpload("quiz")}
          onOpenScormUpload={() => handleLessonUpload("scorm")}
          lesson_id={123}
        />

        <AddLessonPopup
          isOpen={lessonPopupOpen}
          onClose={() => setLessonPopupOpen(false)}
          onOpenVideoUpload={() => handleLessonUpload("video")}
          onOpenAudioUpload={() => handleLessonUpload("audio")}
          onOpenPdfUpload={() => handleLessonUpload("pdf")}
          onOpenSlideUpload={() => handleLessonUpload("slide")}
          onOpenLiveUpload={() => handleLessonUpload("live")}
          onOpenLinkUpload={() => handleLessonUpload("link")}
          onOpenArticleUpload={() => handleLessonUpload("article")}
          onOpenAssignmentUpload={() => handleLessonUpload("assignment")}
          onOpenSectionQuizUpload={() => handleLessonUpload("quiz")}
          onOpenScormUpload={() => handleLessonUpload("scorm")}
          lesson_id={123}
        />

        <AssetsLibraryPopup
          isOpen={assetsLibraryOpen}
          onClose={() => setAssetsLibraryOpen(false)}
          onAddToLesson={handleAssetsLibraryAdd}
          lesson_id={123}
        />

        <Branding
          isOpen={brandingOpen}
          onClose={() => setBrandingOpen(false)}
          onSave={handleBrandingSave}
        />
      </div>
    </div>
  );
};

export default Index;
