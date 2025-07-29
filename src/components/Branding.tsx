import React, { useState, ChangeEvent } from "react";
import { X, Upload, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BrandingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BrandingData) => void;
}

interface BrandingData {
  title: string;
  lessonType: "paid" | "trial";
  shortDescription: string;
  description: string;
  displayInSyllabus: boolean;
  thumbnail: File | null;
}

const Branding: React.FC<BrandingProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("Video Introduction");
  const [lessonType, setLessonType] = useState<"paid" | "trial">("paid");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [displayInSyllabus, setDisplayInSyllabus] = useState(true);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    // Clean up the object URL
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
  };

  const handleSave = () => {
    const data: BrandingData = {
      title,
      lessonType,
      shortDescription,
      description,
      displayInSyllabus,
      thumbnail,
    };
    onSave(data);
    onClose();
  };

  const handleCancel = () => {
    // Reset form to initial state
    setTitle("Video Introduction");
    setLessonType("paid");
    setShortDescription("");
    setDescription("");
    setDisplayInSyllabus(true);
    handleRemoveThumbnail();
    onClose();
  };

  if (!isOpen) return null;

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
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
              <ImageIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Lesson Branding</h2>
              <p className="text-sm text-muted-foreground">Add details about your lesson and manage brand settings</p>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="title" className="block text-sm font-medium text-foreground">
                Title <span className="text-destructive">*</span>
              </label>
              <span className="text-xs text-muted-foreground">{title.length}/60</span>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Lesson Type */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Lesson Type</h3>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="lessonType"
                  value="paid"
                  checked={lessonType === "paid"}
                  onChange={() => setLessonType("paid")}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">Paid Lesson</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="lessonType"
                  value="trial"
                  checked={lessonType === "trial"}
                  onChange={() => setLessonType("trial")}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">Trial Lesson</span>
              </label>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-foreground">
              Short Description
            </label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={255}
              rows={2}
              placeholder="Write short description"
              className="resize-none"
            />
            <div className="text-right">
              <span className="text-xs text-muted-foreground">{shortDescription.length}/255</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <div className="border border-border rounded-lg bg-background">
              {/* Simple Toolbar */}
              <div className="flex items-center space-x-2 p-2 border-b border-border">
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" type="button">
                  <strong>B</strong>
                </button>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors italic" type="button">
                  I
                </button>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors underline" type="button">
                  U
                </button>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Add description..."
                className="border-none focus:ring-0 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Lesson Thumbnail */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Lesson Thumbnail
            </label>
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-border rounded-lg bg-muted/30">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-24 h-24 rounded-lg object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveThumbnail}
                  disabled={!thumbnail}
                >
                  Remove
                </Button>
                <Button variant="default" size="sm" asChild>
                  <label className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Upload image with resolution of 1024 x 576 pixels
              </p>
            </div>
          </div>

          {/* Display in Syllabus */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Display in syllabus</h3>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="displayInSyllabus"
                  value="hide"
                  checked={!displayInSyllabus}
                  onChange={() => setDisplayInSyllabus(false)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <EyeOff className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Hide</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="displayInSyllabus"
                  value="show"
                  checked={displayInSyllabus}
                  onChange={() => setDisplayInSyllabus(true)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Show</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-gradient-subtle">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Branding;