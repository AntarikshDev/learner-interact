import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface AddLessonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lessonTitle: string) => void;
}

const AddLessonPopup: React.FC<AddLessonPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 60;

  const handleTitleChange = (value: string) => {
    if (value.length <= maxChars) {
      setLessonTitle(value);
      setCharCount(value.length);
    }
  };

  const handleSave = () => {
    if (lessonTitle.trim()) {
      onSave(lessonTitle.trim());
      setLessonTitle("");
      setCharCount(0);
    }
  };

  const handleCancel = () => {
    setLessonTitle("");
    setCharCount(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold">Add Lesson</DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Add a new lesson to the course.
          </p>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="lesson-title" className="text-sm font-medium">
              Lesson Title*
            </Label>
            <Input
              id="lesson-title"
              value={lessonTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Lesson Title With Lesson Name"
              className="w-full"
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span></span>
              <span>{charCount}/{maxChars}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={!lessonTitle.trim()}
              className="bg-success hover:bg-success/90 text-white px-8"
            >
              SAVE
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-8"
            >
              CANCEL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonPopup;