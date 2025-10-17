import { useState } from "react";
import { ProblemDetail as ProblemDetailType } from "@/data/problems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemDetailProps {
  problem: ProblemDetailType;
  onTextSelect?: (text: string) => void;
  onClose?: () => void;
  onHelpClick?: (question: string) => void;
}

const ProblemDetail = ({ problem, onTextSelect, onClose, onHelpClick }: ProblemDetailProps) => {
  const [visibleHints, setVisibleHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [selectionPopup, setSelectionPopup] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 0 && text.length <= 800) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      if (rect) {
        setSelectionPopup({
          text,
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
      }
    } else {
      setSelectionPopup(null);
    }
  };

  const handleAskNewton = () => {
    if (selectionPopup) {
      onTextSelect?.(selectionPopup.text);
      setSelectionPopup(null);
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  // Close popup when clicking outside
  const handleClickOutside = () => {
    setSelectionPopup(null);
  };

  return (
    <>
      {/* Selection Popup */}
      {selectionPopup && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={handleClickOutside}
          />
          <div
            className="fixed z-50 animate-scale-in"
            style={{
              left: `${selectionPopup.x}px`,
              top: `${selectionPopup.y}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <Button
              onClick={handleAskNewton}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
              size="sm"
            >
              Ask Newton
            </Button>
          </div>
        </>
      )}

      <div className="h-full p-4" onMouseUp={handleMouseUp}>
      <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all">
        <div className="p-6 bg-muted/10 rounded-t-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
            aria-label="Close problem"
          >
            <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          </button>
          <div className="flex items-start justify-between gap-4 pr-12">
            <h2 className="text-2xl font-semibold text-foreground">
              {problem.title}
            </h2>
            <Badge
              variant={problem.difficulty === "Easy" ? "default" : "secondary"}
              className={cn(
                "text-sm px-3 py-1",
                problem.difficulty === "Easy"
                  ? "bg-success text-success-foreground"
                  : "bg-warning text-warning-foreground"
              )}
            >
              {problem.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{problem.topic}</p>
        </div>

        <div className="space-y-6 p-6">
          {/* Problem Statement */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">Problem Statement</h3>
              <button
                onClick={() => onHelpClick?.("What does 'Problem Statement' mean in DSA?")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Learn about Problem Statement"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <p className="text-foreground leading-relaxed">{problem.statement}</p>
          </section>

          {/* Constraints */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">Constraints</h3>
              <button
                onClick={() => onHelpClick?.("What does 'Constraints' mean in DSA?")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Learn about Constraints"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </section>

          {/* Examples */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">Examples</h3>
              <button
                onClick={() => onHelpClick?.("What are 'Examples' in DSA problems?")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Learn about Examples"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
                  <div className="text-foreground">
                    <span className="font-semibold">Input:</span> {example.in}
                  </div>
                  <div className="text-foreground mt-1">
                    <span className="font-semibold">Output:</span> {example.out}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hints */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  Hints
                </h3>
                <button
                  onClick={() => onHelpClick?.("What are 'Hints' for in DSA problems?")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Learn about Hints"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              {visibleHints < problem.hints.length && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setVisibleHints((prev) => Math.min(prev + 1, problem.hints.length))}
                >
                  Show Hint {visibleHints + 1}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {problem.hints.slice(0, visibleHints).map((hint, idx) => (
                <div key={idx} className="bg-accent/10 border-l-4 border-accent rounded p-3">
                  <p className="text-foreground">
                    <span className="font-semibold">Hint {idx + 1}:</span> {hint}
                  </p>
                </div>
              ))}
              {visibleHints === 0 && (
                <p className="text-muted-foreground italic">Click to reveal hints one at a time</p>
              )}
            </div>
          </section>

          {/* Solution Outline */}
          <section>
            <Button
              variant="secondary"
              onClick={() => setShowSolution(!showSolution)}
              className="w-full mb-3"
            >
              {showSolution ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Hide Solution Outline
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Show Solution Outline
                </>
              )}
            </Button>

            {showSolution && (
              <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Approach</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {problem.outline.map((step, idx) => (
                    <li key={idx} className="text-foreground">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProblemDetail;
