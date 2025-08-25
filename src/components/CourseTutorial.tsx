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
    color: "from-green-400 to-emerald-500 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)]",
    action: "Get Started"
  },
  {
    id: 2,
    title: "Course Sections",
    description: "Each card represents a course section. Click the expand/collapse button to view or hide section contents.",
    target: "section-card",
    position: "right",
    color: "from-blue-400 to-cyan-500 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    action: "Try Expanding"
  },
  {
    id: 3,
    title: "Add New Content",
    description: "Click this button to add new content items like videos, PDFs, or quizzes to your section.",
    target: "add-content",
    position: "left",
    color: "from-lime-400 to-green-500 border-lime-400 shadow-[0_0_30px_rgba(132,204,22,0.5)]",
    action: "Add Content"
  },
  {
    id: 4,
    title: "Content Management",
    description: "Each content item can be reordered by dragging, and you can use the action menu to manage visibility and access.",
    target: "content-item",
    position: "top",
    color: "from-purple-400 to-violet-500 border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.5)]",
    action: "Manage Content"
  },
  {
    id: 5,
    title: "Action Menu",
    description: "Use this dropdown to view content, toggle free/paid access, publish/unpublish, or delete items.",
    target: "action-dropdown",
    position: "left",
    color: "from-orange-400 to-red-500 border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.5)]",
    action: "Explore Actions"
  },
  {
    id: 6,
    title: "Save Changes",
    description: "When you reorder content, don't forget to save your changes using the Save Order button.",
    target: "save-button",
    position: "bottom",
    color: "from-emerald-400 to-teal-500 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.5)]",
    action: "Save Order"
  },
  {
    id: 7,
    title: "Add New Lesson",
    description: "Use this floating button to create new course sections/lessons anytime. It's always accessible as you scroll.",
    target: "floating-button",
    position: "left",
    color: "from-pink-400 to-rose-500 border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.5)]",
    action: "Create Lesson"
  },
  {
    id: 8,
    title: "Search & Filter",
    description: "Use the search bar to quickly find specific content within your course.",
    target: "search-bar",
    position: "bottom",
    color: "from-cyan-400 to-blue-500 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]",
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

  // Get positioning for floating cards based on step target
  const getCardPosition = (step: TutorialStep) => {
    const positions = {
      header: { top: "80px", left: "50%", transform: "translateX(-50%)" },
      "section-card": { top: "200px", right: "20px" },
      "add-content": { top: "300px", left: "20px" },
      "content-item": { bottom: "300px", left: "50%", transform: "translateX(-50%)" },
      "action-dropdown": { top: "250px", left: "20px" },
      "save-button": { bottom: "120px", left: "50%", transform: "translateX(-50%)" },
      "floating-button": { bottom: "150px", left: "20px" },
      "search-bar": { top: "140px", left: "50%", transform: "translateX(-50%)" }
    };
    return positions[step.target] || { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  };

  // Get arrow position for pointing to target
  const getArrowClasses = (position: string) => {
    const arrows = {
      top: "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-l-[15px] after:border-r-[15px] after:border-t-[15px] after:border-l-transparent after:border-r-transparent",
      bottom: "before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-l-[15px] before:border-r-[15px] before:border-b-[15px] before:border-l-transparent before:border-r-transparent",
      left: "after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-t-[15px] after:border-b-[15px] after:border-l-[15px] after:border-t-transparent after:border-b-transparent",
      right: "before:absolute before:top-1/2 before:right-full before:-translate-y-1/2 before:border-t-[15px] before:border-b-[15px] before:border-r-[15px] before:border-t-transparent before:border-b-transparent"
    };
    return arrows[position] || "";
  };

  const getArrowColor = (color: string, position: string) => {
    const colorMap = {
      "green-400": "after:border-t-green-400 before:border-b-green-400",
      "blue-400": "after:border-t-blue-400 before:border-b-blue-400", 
      "lime-400": "after:border-t-lime-400 before:border-b-lime-400",
      "purple-400": "after:border-t-purple-400 before:border-b-purple-400",
      "orange-400": "after:border-t-orange-400 before:border-b-orange-400",
      "emerald-400": "after:border-t-emerald-400 before:border-b-emerald-400",
      "pink-400": "after:border-t-pink-400 before:border-b-pink-400",
      "cyan-400": "after:border-t-cyan-400 before:border-b-cyan-400"
    };
    
    // Extract color from the color string
    const colorKey = Object.keys(colorMap).find(key => color.includes(key));
    const colorClass = colorKey ? colorMap[colorKey] : "after:border-t-green-400 before:border-b-green-400";
    
    if (position === "left") return colorClass.replace("border-t-", "border-l-").replace("border-b-", "border-l-");
    if (position === "right") return colorClass.replace("border-t-", "border-r-").replace("border-b-", "border-r-");
    
    return colorClass;
  };

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

  const cardPosition = getCardPosition(currentTutorialStep);
  const arrowClasses = getArrowClasses(currentTutorialStep.position);
  const arrowColor = getArrowColor(currentTutorialStep.color, currentTutorialStep.position);

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
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" />

      {/* Floating Tutorial Card */}
      {!isCompleted && (
        <div 
          className="fixed z-50 w-80 max-w-[90vw] animate-fade-in"
          style={cardPosition}
        >
          <div className={`
            bg-gradient-to-br ${currentTutorialStep?.color}
            backdrop-blur-lg rounded-2xl border-2
            p-6 relative ${arrowClasses} ${arrowColor}
            bg-black/10 text-white
          `}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </Badge>
                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                onClick={completeTutorial}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-white/20 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">
                {currentTutorialStep?.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed drop-shadow">
                {currentTutorialStep?.description}
              </p>
            </div>

            {/* Action Button */}
            {currentTutorialStep?.action && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
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
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 text-white border-white/30"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="text-xs text-white/80 font-medium">
                {currentStep + 1} / {tutorialSteps.length}
              </div>
              
              <Button
                onClick={nextStep}
                size="sm"
                className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white border-white/30"
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
            bg-gradient-to-br from-green-400 to-emerald-500 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.6)]
            backdrop-blur-lg rounded-2xl border-2 bg-black/10
            p-6 text-center animate-scale-in text-white
          ">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
              Tutorial Completed!
            </h3>
            <p className="text-white/90 text-sm mb-6 drop-shadow">
              You're now ready to manage your course content like a pro. Start creating amazing educational experiences!
            </p>
            <Button
              onClick={completeTutorial}
              className="w-full bg-white/30 hover:bg-white/40 text-white border-white/30"
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