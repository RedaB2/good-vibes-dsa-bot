import { useState, useEffect, useRef } from "react";
import { X, Send, Minimize2, Maximize2, HelpCircle, Lightbulb, MessageCircle, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContext?: string;
  problemId?: string;
}

const modes = [
  { id: "Explain", icon: HelpCircle, label: "Explain" },
  { id: "Hint", icon: Lightbulb, label: "Hint" },
  { id: "Socratic", icon: MessageCircle, label: "Socratic" },
  { id: "Complexity", icon: Zap, label: "Complexity" },
  { id: "Pseudocode", icon: Code, label: "Pseudocode" },
] as const;

type Mode = typeof modes[number]["id"];

const ChatPanel = ({ isOpen, onClose, selectedContext, problemId }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("Explain");
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("chat-position");
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 450, y: 100 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("chat-position", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: Implement actual API call to Lovable AI
    // For now, mock response
    setTimeout(() => {
      const mockResponse: Message = {
        role: "assistant",
        content: `I'll help you with that in ${mode} mode! ${
          selectedContext ? `\n\nContext: "${selectedContext}"` : ""
        }\n\n(AI integration coming soon - this is a placeholder response)`,
      };
      setMessages((prev) => [...prev, mockResponse]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Card
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? "300px" : "400px",
        height: isMinimized ? "60px" : "600px",
        zIndex: 1001,
      }}
      className="shadow-2xl border-2 border-secondary/20 overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 bg-secondary text-secondary-foreground cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Tutor
        </h3>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 hover:bg-secondary-foreground/20"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 hover:bg-secondary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Mode Selector */}
          <div className="p-2 border-b border-border bg-muted/30 flex gap-1 flex-wrap">
            {modes.map((m) => {
              const Icon = m.icon;
              return (
                <Badge
                  key={m.id}
                  variant={mode === m.id ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    mode === m.id && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => setMode(m.id)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {m.label}
                </Badge>
              );
            })}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">
                    Hi! I'm your friendly DSA tutor. Ask me anything or select text on the page to get
                    context-aware help.
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-lg p-3 max-w-[85%]",
                    msg.role === "user"
                      ? "ml-auto bg-secondary text-secondary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-muted rounded-lg p-3 max-w-[85%] text-foreground">
                  <p className="text-sm">Thinking...</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            {selectedContext && (
              <div className="mb-2 text-xs text-muted-foreground bg-muted/50 rounded p-2">
                <strong>Selected:</strong> {selectedContext.slice(0, 100)}
                {selectedContext.length > 100 && "..."}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-secondary hover:bg-secondary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ChatPanel;
