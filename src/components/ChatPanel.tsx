import { useState, useEffect, useRef } from "react";
import { X, Send, Minimize2, Maximize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContext?: string;
  problemId?: string;
  initialInput?: string;
  robotPosition: { x: number; y: number };
  onRobotPositionChange: (pos: { x: number; y: number }) => void;
}

const ChatPanel = ({ isOpen, onClose, selectedContext, problemId, initialInput, robotPosition, onRobotPositionChange }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate chat position relative to robot
  const chatOffset = { x: -420, y: -620 }; // Position chat to the left and above robot

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpening(false);
      }, 300); // Match animation duration
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (initialInput && isOpen) {
      setInput(initialInput);
    }
  }, [initialInput, isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    const chatX = robotPosition.x + chatOffset.x;
    const chatY = robotPosition.y + chatOffset.y;
    setDragOffset({
      x: e.clientX - chatX,
      y: e.clientY - chatY,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    // Calculate new robot position based on drag
    const chatWidth = isMinimized ? 300 : 400;
    const chatHeight = isMinimized ? 60 : 600;
    const newRobotX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x - chatOffset.x));
    const newRobotY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y - chatOffset.y));
    onRobotPositionChange({ x: newRobotX, y: newRobotY });
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

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage]
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
      setIsLoading(false);
    }
  };

  if (!isOpen && !isClosing) return null;

  const chatX = robotPosition.x + chatOffset.x;
  const chatY = robotPosition.y + chatOffset.y;

  return (
    <Card
      data-chat-panel
      style={{
        position: "fixed",
        left: `${chatX}px`,
        top: `${chatY}px`,
        width: isMinimized ? "300px" : "400px",
        height: isMinimized ? "60px" : "600px",
        zIndex: 1001,
        transformOrigin: "bottom right",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out",
        transform: isClosing ? "scale(0)" : isOpening ? "scale(0)" : "scale(1)",
        opacity: isClosing ? 0 : isOpening ? 0 : 1,
        animation: isOpening ? "expandFromRobot 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards" : undefined,
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
          Vibes
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
            onClick={handleClose}
            className="h-8 w-8 hover:bg-secondary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
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
