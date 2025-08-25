import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, HelpCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
  color: string;
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Course Management",
    description: "This is your course management dashboard where you can organize your course content, manage lessons, and track your progress.",
    target: "header",
    position: "bottom",
    color: "from-primary/20 to-primary/10 border-primary/30",
    action: "Get Started"
  },
  {
    id: 2,
    title: "Course Sections",
    description: "Each card represents a course section. Click the expand/collapse button to view or hide section contents.",
    target: "section-card",
    position: "right",
    color: "from-blue-500/20 to-blue-400/10 border-blue-400/30",
    action: "Try Expanding"
  },
  {
    id: 3,
    title: "Add New Content",
    description: "Click this button to add new content items like videos, PDFs, or quizzes to your section.",
    target: "add-content",
    position: "left",
    color: "from-green-500/20 to-green-400/10 border-green-400/30",
    action: "Add Content"
  },
  {
    id: 4,
    title: "Content Management",
    description: "Each content item can be reordered by dragging, and you can use the action menu to manage visibility and access.",
    target: "content-item",
    position: "top",
    color: "from-purple-500/20 to-purple-400/10 border-purple-400/30",
    action: "Manage Content"
  },
  {
    id: 5,
    title: "Action Menu",
    description: "Use this dropdown to view content, toggle free/paid access, publish/unpublish, or delete items.",
    target: "action-dropdown",
    position: "left",
    color: "from-orange-500/20 to-orange-400/10 border-orange-400/30",
    action: "Explore Actions"
  },
  {
    id: 6,
    title: "Save Changes",
    description: "When you reorder content, don't forget to save your changes using the Save Order button.",
    target: "save-button",
    position: "bottom",
    color: "from-emerald-500/20 to-emerald-400/10 border-emerald-400/30",
    action: "Save Order"
  },
  {
    id: 7,
    title: "Add New Lesson",
    description: "Use this floating button to create new course sections/lessons anytime. It's always accessible as you scroll.",
    target: "floating-button",
    position: "left",
    color: "from-rose-500/20 to-rose-400/10 border-rose-400/30",
    action: "Create Lesson"
  },
  {
    id: 8,
    title: "Search & Filter",
    description: "Use the search bar to quickly find specific content within your course.",
    target: "search-bar",
    position: "bottom",
    color: "from-cyan-500/20 to-cyan-400/10 border-cyan-400/30",
    action: "Try Searching"
  }
];

const CourseTutorial: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleTutorial = () => {
    setIsVisible(!isVisible);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    setIsVisible(false);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const currentTutorialStep = tutorialSteps[currentStep];

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleTutorial}
          variant="outline"
          size="sm"
          className="bg-background/95 backdrop-blur-sm hover:bg-muted/90 border-primary/20"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Tutorial
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Tutorial Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleTutorial}
          variant="outline"
          size="sm"
          className="bg-background/95 backdrop-blur-sm hover:bg-muted/90 border-primary/20"
        >
          <X className="h-4 w-4 mr-2" />
          Close Tutorial
        </Button>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40" />

      {/* Tutorial Card */}
      {!isCompleted && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-[90vw]">
          <div className={`
            bg-gradient-to-br ${currentTutorialStep?.color}
            backdrop-blur-md rounded-2xl shadow-2xl border
            p-6 animate-scale-in
          `}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </Badge>
                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                onClick={completeTutorial}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentTutorialStep?.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentTutorialStep?.description}
              </p>
            </div>

            {/* Action Button */}
            {currentTutorialStep?.action && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
                >
                  <Play className="h-3 w-3 mr-2" />
                  {currentTutorialStep.action}
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="ghost"
                size="sm"
                className="bg-background/30 backdrop-blur-sm hover:bg-background/50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="text-xs text-muted-foreground">
                {currentStep + 1} / {tutorialSteps.length}
              </div>
              
              <Button
                onClick={nextStep}
                size="sm"
                className="bg-primary/80 backdrop-blur-sm hover:bg-primary/90"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Card */}
      {isCompleted && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-[90vw]">
          <div className="
            bg-gradient-to-br from-success/20 to-success/10 border-success/30
            backdrop-blur-md rounded-2xl shadow-2xl border
            p-6 text-center animate-scale-in
          ">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tutorial Completed!
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              You're now ready to manage your course content like a pro. Start creating amazing educational experiences!
            </p>
            <Button
              onClick={completeTutorial}
              className="w-full bg-success hover:bg-success/90"
            >
              Start Managing Course
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseTutorial;