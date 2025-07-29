import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ActionPopup from "@/components/ActionPopup";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [actionType, setActionType] = useState<"reviewed" | "reject" | "message" | "history">("reviewed");

  const handleOpenPopup = (type: "reviewed" | "reject" | "message" | "history") => {
    setActionType(type);
    setPopupOpen(true);
  };

  const handleSubmit = (data: { feedback: string; file: File | null }) => {
    console.log("Submitted:", data);
    setPopupOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">ActionPopup Component Demo</h1>
          <p className="text-xl text-muted-foreground">Click the buttons below to preview different popup types</p>
        </div>
        
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

        <ActionPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          actionType={actionType}
          onSubmit={handleSubmit}
          userEmail="student@example.com"
          file={null}
          submission_id={123}
        />
      </div>
    </div>
  );
};

export default Index;
