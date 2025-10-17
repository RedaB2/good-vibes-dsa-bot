import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { topics, problemsByTopic } from "@/data/problems";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TopicAccordionProps {
  onProblemSelect: (problemId: string) => void;
  selectedProblemId?: string;
}

const TopicAccordion = ({ onProblemSelect, selectedProblemId }: TopicAccordionProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(["Arrays"]));

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  };

  return (
    <nav className="h-full overflow-y-auto bg-card rounded-xl border border-border shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Topics</h2>
      <div className="space-y-2">
        {topics.map((topic) => {
          const isExpanded = expandedTopics.has(topic);
          const problems = problemsByTopic[topic] || [];

          return (
            <div key={topic} className="border border-border rounded-lg overflow-hidden bg-background">
              <button
                onClick={() => toggleTopic(topic)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors"
                aria-expanded={isExpanded}
              >
                <span className="font-medium text-foreground">{topic}</span>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border bg-muted/30">
                  {problems.map((problem) => {
                    const isSelected = selectedProblemId === problem.id;
                    return (
                      <button
                        key={problem.id}
                        onClick={() => onProblemSelect(problem.id)}
                        className={cn(
                          "w-full text-left p-3 hover:bg-muted transition-colors border-t border-border first:border-t-0",
                          isSelected && "bg-secondary/10 border-l-4 border-l-secondary"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-body">{problem.title}</span>
                          <Badge
                            variant={problem.difficulty === "Easy" ? "default" : "secondary"}
                            className={cn(
                              "text-xs",
                              problem.difficulty === "Easy"
                                ? "bg-success text-success-foreground"
                                : "bg-warning text-warning-foreground"
                            )}
                          >
                            {problem.difficulty}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default TopicAccordion;
