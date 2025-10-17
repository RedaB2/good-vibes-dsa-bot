import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { topics, problemsByTopic } from "@/data/problems";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={300}>
      <nav className="h-full overflow-y-auto p-4">
        <div className="space-y-2">
          {topics.map((topic) => {
            const isExpanded = expandedTopics.has(topic);
            const problems = problemsByTopic[topic] || [];

            return (
              <div key={topic} className="rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <button
                  onClick={() => toggleTopic(topic)}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
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
                  <div className="bg-muted/10">
                    {problems.map((problem) => {
                      const isSelected = selectedProblemId === problem.id;
                      return (
                        <Tooltip key={problem.id}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => onProblemSelect(problem.id)}
                              className={cn(
                                "w-full text-left p-3 hover:bg-muted/30 transition-colors border-t border-border/50 first:border-t-0",
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
                          </TooltipTrigger>
                          {problem.description && (
                            <TooltipContent side="right" className="max-w-xs">
                              <p className="text-sm">{problem.description}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default TopicAccordion;
