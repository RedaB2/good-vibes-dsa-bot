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
        {/* Curved Chalk Arrow */}
        <svg className="w-12 h-14" viewBox="0 0 100 120">
          <defs>
            <filter id={`chalk-${name}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feDisplacementMap in="SourceGraphic" scale="1.5" />
            </filter>
          </defs>
          <path
            d="M 50 10 Q 30 35, 50 70 M 50 70 L 42 62 M 50 70 L 58 62"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#chalk-${name})`}
            className="text-primary/60"
          />
        </svg>

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
              className="w-20 h-20 object-cover cursor-move select-none"
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
            className="w-20 h-20 bg-muted/10 flex items-center justify-center cursor-move relative"
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
      name: "Member 1",
      quote: "Making algorithms accessible is our mission!",
      initialX: 100,
      initialY: window.innerHeight - 150,
    },
    {
      image: "/images/member2.jpg",
      name: "Member 2",
      quote: "Learning should be fun, not frustrating.",
      initialX: 200,
      initialY: window.innerHeight - 180,
    },
    {
      image: null,
      name: "Member 3",
      quote: "Join us on this journey!",
      initialX: 300,
      initialY: window.innerHeight - 180,
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
