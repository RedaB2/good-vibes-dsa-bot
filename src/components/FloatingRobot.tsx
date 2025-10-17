import { useState, useEffect } from "react";
import robotImage from "@/assets/robot-chatbot.png";

interface FloatingRobotProps {
  onClick: () => void;
  isAnimating?: boolean;
  animationPosition?: { x: number; y: number };
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  hasProblemSelected?: boolean;
}

const FloatingRobot = ({ onClick, isAnimating = false, animationPosition, position, onPositionChange, hasProblemSelected = false }: FloatingRobotProps) => {
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
    <>
      {/* Thought bubble - only when problem is selected */}
      {hasProblemSelected && !isAnimating && (
        <div
          style={{
            position: "fixed",
            left: `${displayPosition.x - 240}px`,
            top: `${displayPosition.y - 20}px`,
            zIndex: 2499,
          }}
          className="animate-fade-in"
        >
          <div className="relative">
            {/* Thought bubble circles */}
            <div className="absolute -right-8 top-8">
              <div className="w-2 h-2 bg-white rounded-full animate-scale-in" />
            </div>
            <div className="absolute -right-4 top-4">
              <div className="w-3 h-3 bg-white rounded-full animate-scale-in" style={{ animationDelay: '0.1s' }} />
            </div>
            
            {/* Main thought bubble */}
            <div className="relative bg-white rounded-3xl px-4 py-3 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm text-primary whitespace-nowrap">
                Have a solution? Ask me if it's correct! 💡
              </p>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default FloatingRobot;
