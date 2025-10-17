import { useState } from "react";
import Header from "@/components/Header";
import TopicAccordion from "@/components/TopicAccordion";
import ProblemDetail from "@/components/ProblemDetail";
import MissionPanel from "@/components/MissionPanel";
import FloatingRobot from "@/components/FloatingRobot";
import ChatPanel from "@/components/ChatPanel";
import { problemDetails } from "@/data/problems";

const Index = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string>();

  const currentProblem = selectedProblemId ? problemDetails[selectedProblemId] : null;

  const handleTextSelect = (text: string) => {
    setSelectedContext(text);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Left: Topic Accordion */}
          <aside className="md:col-span-3">
            <TopicAccordion
              onProblemSelect={setSelectedProblemId}
              selectedProblemId={selectedProblemId}
            />
          </aside>

          {/* Center: Problem Detail */}
          <section className="md:col-span-6">
            {currentProblem ? (
              <ProblemDetail problem={currentProblem} onTextSelect={handleTextSelect} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a problem to get started
              </div>
            )}
          </section>

          {/* Right: Mission Panel */}
          <aside className="md:col-span-3">
            <MissionPanel />
          </aside>
        </div>
      </main>

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
