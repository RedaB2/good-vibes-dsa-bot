import { useState, useEffect } from "react";
import robotImage from "@/assets/robot-chatbot.png";

interface FloatingRobotProps {
  onClick: () => void;
  isAnimating?: boolean;
  animationPosition?: { x: number; y: number };
}

const FloatingRobot = ({ onClick, isAnimating = false, animationPosition }: FloatingRobotProps) => {
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

  const displayPosition = isAnimating && animationPosition ? animationPosition : position;

  return (
    <div
      style={{
        position: "fixed",
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
        zIndex: isAnimating ? 2000 : 1000,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isAnimating ? "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
      onMouseDown={isAnimating ? undefined : handleMouseDown}
    >
      <div
        className={`h-20 w-20 rounded-full shadow-lg transition-all ${
          isAnimating ? "" : "animate-bob hover:animate-pulse-glow"
        }`}
        style={{
          background: "transparent",
          pointerEvents: isAnimating ? "none" : "auto",
        }}
      >
        <img 
          src={robotImage} 
          alt="AI Tutor Robot" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default FloatingRobot;
