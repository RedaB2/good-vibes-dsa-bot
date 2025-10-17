import { useState } from "react";
import Header from "@/components/Header";
import TopicAccordion from "@/components/TopicAccordion";
import ProblemDetail from "@/components/ProblemDetail";
import MissionPanel from "@/components/MissionPanel";
import FloatingRobot from "@/components/FloatingRobot";
import ChatPanel from "@/components/ChatPanel";
import FoundersPopup from "@/components/FoundersPopup";
import { problemDetails } from "@/data/problems";

const Index = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string>();
  const [showSidebar, setShowSidebar] = useState(false);

  const currentProblem = selectedProblemId ? problemDetails[selectedProblemId] : null;

  const handleTextSelect = (text: string) => {
    setSelectedContext(text);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentProblem) {
      // Show sidebar when mouse is within 50px of left edge
      setShowSidebar(e.clientX < 50);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" onMouseMove={handleMouseMove}>
      <Header />

      <main className="container mx-auto px-4 py-6 flex-1 relative">
        <div className={`grid grid-cols-1 gap-6 h-[calc(100vh-200px)] ${
          currentProblem ? 'md:grid-cols-1' : 'md:grid-cols-2'
        }`}>
          {/* Left: Topic Accordion - Hover sidebar when problem selected */}
          {currentProblem ? (
            <aside 
              className={`fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-40 transition-transform duration-300 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="h-full bg-background/95 backdrop-blur-md shadow-2xl">
                <TopicAccordion
                  onProblemSelect={setSelectedProblemId}
                  selectedProblemId={selectedProblemId}
                />
              </div>
            </aside>
          ) : (
            <aside className="md:col-span-1">
              <TopicAccordion
                onProblemSelect={setSelectedProblemId}
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
              />
            </section>
          )}

          {/* Right: Mission Panel - Only shows when no problem selected */}
          {!currentProblem && (
            <aside className="md:col-span-1">
              <MissionPanel />
            </aside>
          )}
        </div>
      </main>

      {/* Founders Popup */}
      <FoundersPopup />

      {/* Floating Robot */}
      <FloatingRobot onClick={() => setIsChatOpen(true)} />

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedContext={selectedContext}
        problemId={selectedProblemId || undefined}
      />
    </div>
  );
};

export default Index;
