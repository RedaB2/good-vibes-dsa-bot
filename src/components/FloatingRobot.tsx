import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingRobotProps {
  onClick: () => void;
}

const FloatingRobot = ({ onClick }: FloatingRobotProps) => {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("robot-position");
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 100, y: window.innerHeight - 100 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem("robot-position", JSON.stringify(position));
  }, [position]);

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
    const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      // Check if this was a click (not a drag)
      const deltaX = Math.abs(e.clientX - (position.x + dragOffset.x));
      const deltaY = Math.abs(e.clientY - (position.y + dragOffset.y));
      if (deltaX < 5 && deltaY < 5) {
        onClick();
      }
    }
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

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <Button
        size="lg"
        className="h-20 w-20 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg animate-bob hover:animate-pulse-glow transition-all"
        aria-label="Open AI Tutor"
      >
        <Bot className="h-10 w-10" />
      </Button>
    </div>
  );
};

export default FloatingRobot;
