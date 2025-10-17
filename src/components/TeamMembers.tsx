import { useState } from "react";

interface DraggableMemberProps {
  image: string | null;
  name: string;
  quote: string;
  initialX: number;
  initialY: number;
}

const DraggableMember = ({ image, name, quote, initialX, initialY }: DraggableMemberProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showQuote, setShowQuote] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed z-[2000] opacity-70 hover:opacity-100 transition-opacity"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-col items-center gap-1 relative">
        {/* Member Name */}
        <div className="font-display text-sm text-white mb-1">{name}</div>

        {/* Member Image */}
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt={name}
                onMouseDown={handleMouseDown}
                onClick={() => setShowQuote(!showQuote)}
                className="max-w-[120px] max-h-[120px] object-contain cursor-move select-none"
                draggable={false}
              />

            {/* Quote Bubble */}
            {showQuote && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border border-primary/20 animate-scale-in whitespace-nowrap z-50">
                <div className="text-xs text-foreground">"{quote}"</div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card/95"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            onMouseDown={handleMouseDown}
            onClick={() => setShowQuote(!showQuote)}
            className="w-28 h-28 bg-muted/10 flex items-center justify-center cursor-move relative"
          >
            <span className="text-muted-foreground text-xs">Soon</span>
          </div>
        )}
      </div>
    </div>
  );
};

const TeamMembers = () => {
  const members = [
    {
      image: "/images/member1.jpg",
      name: "Reda",
      quote: "Making algorithms accessible is our mission!",
      initialX: 150,
      initialY: window.innerHeight - 200,
    },
    {
      image: "/images/member2.jpg",
      name: "Rohit",
      quote: "Learning should be fun, not frustrating.",
      initialX: window.innerWidth / 2 - 200,
      initialY: window.innerHeight - 180,
    },
    {
      image: null,
      name: "Jainam",
      quote: "Join us on this journey!",
      initialX: window.innerWidth - 300,
      initialY: window.innerHeight - 220,
    },
  ];

  return (
    <>
      {members.map((member, index) => (
        <DraggableMember key={index} {...member} />
      ))}
    </>
  );
};

export default TeamMembers;
