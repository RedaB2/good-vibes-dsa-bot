import { useState } from "react";
import React from "react";
import Header from "@/components/Header";
import TopicAccordion from "@/components/TopicAccordion";
import ProblemDetail from "@/components/ProblemDetail";
import MissionPanel from "@/components/MissionPanel";
import FloatingRobot from "@/components/FloatingRobot";
import ChatPanel from "@/components/ChatPanel";
import FoundersPopup from "@/components/FoundersPopup";
import TeamMembers from "@/components/TeamMembers";
import { problemDetails } from "@/data/problems";

const Index = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string>();
  const [initialChatInput, setInitialChatInput] = useState<string>();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRobotAnimating, setIsRobotAnimating] = useState(false);
  const [showLetsLearn, setShowLetsLearn] = useState(false);
  const [robotAnimationPosition, setRobotAnimationPosition] = useState<{ x: number; y: number } | undefined>();
  const [robotPosition, setRobotPosition] = useState(() => {
    const saved = localStorage.getItem("robot-position");
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 100, y: window.innerHeight - 100 };
  });
  const hideTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    localStorage.setItem("robot-position", JSON.stringify(robotPosition));
  }, [robotPosition]);

  const currentProblem = selectedProblemId ? problemDetails[selectedProblemId] : null;

  const handleProblemSelect = (problemId: string) => {
    // Start animation sequence
    setIsRobotAnimating(true);
    
    // Move to center
    const centerX = window.innerWidth / 2 - 50;
    const centerY = window.innerHeight / 2 - 50;
    setRobotAnimationPosition({ x: centerX, y: centerY });
    
    // Show "Let's learn!" after robot reaches center
    setTimeout(() => {
      setShowLetsLearn(true);
      setSelectedProblemId(problemId);
    }, 800);
    
    // Move to bottom right corner
    setTimeout(() => {
      setShowLetsLearn(false);
      const cornerX = window.innerWidth - 120;
      const cornerY = window.innerHeight - 120;
      setRobotAnimationPosition({ x: cornerX, y: cornerY });
    }, 2300);
    
    // End animation (no auto-open chat)
    setTimeout(() => {
      setIsRobotAnimating(false);
      setRobotAnimationPosition(undefined);
    }, 3100);
  };

  const handleTextSelect = (text: string) => {
    setSelectedContext(text);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  const handleHelpClick = (question: string) => {
    setInitialChatInput(question);
    setIsChatOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentProblem) {
      // Show sidebar when mouse is within 50px of left edge
      if (e.clientX < 50) {
        setShowSidebar(true);
        // Clear any pending hide timeout
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    }
  };

  const handleSidebarMouseLeave = () => {
    // Add a delay before hiding
    hideTimeoutRef.current = setTimeout(() => {
      setShowSidebar(false);
    }, 500); // 500ms delay
  };

  const handleSidebarMouseEnter = () => {
    // Cancel hide when hovering over sidebar
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" onMouseMove={handleMouseMove}>
      {/* Backdrop blur overlay during animation */}
      {isRobotAnimating && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-[1500] animate-fade-in"
          style={{ transition: "all 0.5s ease-in-out" }}
        />
      )}
      
      {/* "Let's learn!" message */}
      {showLetsLearn && (
        <div className="fixed inset-0 z-[1900] flex flex-col items-center justify-center pointer-events-none gap-4">
          <div style={{ height: "80px" }} /> {/* Space for robot */}
          <h2 className="text-6xl font-display text-white animate-scale-in drop-shadow-2xl">
            Let's learn!
          </h2>
        </div>
      )}

      <Header />

      <main className="container mx-auto px-4 py-6 relative h-[calc(100vh-88px)] flex flex-col">
        <div className={`grid grid-cols-1 gap-6 flex-1 overflow-hidden ${
          currentProblem ? 'md:grid-cols-1' : 'md:grid-cols-[320px_1fr]'
        }`}>
          {/* Left: Topic Accordion - Hover sidebar when problem selected */}
          {currentProblem ? (
            <aside 
              className={`fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-40 transition-transform duration-300 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
              }`}
              onMouseEnter={handleSidebarMouseEnter}
              onMouseLeave={handleSidebarMouseLeave}
            >
              <div className="h-full bg-background/95 backdrop-blur-md shadow-2xl">
                <TopicAccordion
                  onProblemSelect={handleProblemSelect}
                  selectedProblemId={selectedProblemId}
                />
              </div>
            </aside>
          ) : (
            <aside className="w-full">
              <TopicAccordion
                onProblemSelect={handleProblemSelect}
                selectedProblemId={selectedProblemId}
              />
            </aside>
          )}

          {/* Center: Problem Detail - Only shows when problem selected */}
          {currentProblem && (
            <section className="w-full">
              <ProblemDetail 
                problem={currentProblem} 
                onTextSelect={handleTextSelect}
                onClose={() => setSelectedProblemId(null)}
                onHelpClick={handleHelpClick}
              />
            </section>
          )}

          {/* Right: Mission Panel - Only shows when no problem selected */}
          {!currentProblem && (
            <aside className="w-full">
              <MissionPanel />
            </aside>
          )}
        </div>

        {/* Team Members Section - Subtle at bottom */}
        {!currentProblem && (
          <div className="mt-4">
            <TeamMembers />
          </div>
        )}
      </main>

      {/* Founders Popup */}
      <FoundersPopup />

      {/* Floating Robot */}
      <FloatingRobot 
        onClick={() => setIsChatOpen(true)} 
        isAnimating={isRobotAnimating}
        animationPosition={robotAnimationPosition}
        position={robotPosition}
        onPositionChange={setRobotPosition}
      />

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedContext={selectedContext}
        problemId={selectedProblemId || undefined}
        initialInput={initialChatInput}
        robotPosition={robotPosition}
        onRobotPositionChange={setRobotPosition}
      />
    </div>
  );
};

export default Index;
