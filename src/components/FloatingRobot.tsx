import { useState, useEffect } from "react";
import robotImage from "@/assets/robot-chatbot.png";

interface FloatingRobotProps {
  onClick: () => void;
  isAnimating?: boolean;
  animationPosition?: { x: number; y: number };
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
}

const FloatingRobot = ({ onClick, isAnimating = false, animationPosition, position, onPositionChange }: FloatingRobotProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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
    onPositionChange({ x: newX, y: newY });
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
    <img 
      src={robotImage} 
      alt="AI Tutor Robot" 
      draggable={false}
      style={{
        position: "fixed",
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
        width: "80px",
        height: "80px",
        zIndex: 2500,
        cursor: isDragging ? "grabbing" : "pointer",
        transition: isAnimating ? "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        pointerEvents: isAnimating ? "none" : "auto",
        userSelect: "none",
      }}
      className={isAnimating ? "" : "animate-bob hover:scale-110 transition-transform"}
      onMouseDown={isAnimating ? undefined : handleMouseDown}
      onDragStart={(e) => e.preventDefault()}
    />
  );
};

export default FloatingRobot;
