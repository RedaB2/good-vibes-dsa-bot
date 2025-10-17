import { useState } from "react";

const TeamMembers = () => {
  const [activeQuote, setActiveQuote] = useState<number | null>(null);
  
  const members = [
    { 
      image: "/images/member1.jpg", 
      name: "Member 1",
      quote: "Making algorithms accessible is our mission!"
    },
    { 
      image: "/images/member2.jpg", 
      name: "Member 2",
      quote: "Learning should be fun, not frustrating."
    },
    { 
      image: null, 
      name: "Member 3",
      quote: "Join us on this journey!"
    },
  ];

  return (
    <div className="flex justify-center items-start gap-6 opacity-70">
      {members.map((member, index) => (
        <div key={index} className="flex flex-col items-center gap-1 relative">
          {/* Curved Chalk Arrow */}
          <svg
            className="w-12 h-14"
            viewBox="0 0 100 120"
          >
            <defs>
              <filter id={`chalk-texture-${index}`}>
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
              filter={`url(#chalk-texture-${index})`}
              className="text-primary/60"
            />
          </svg>

          {/* Member Name */}
          <div className="font-display text-sm text-primary/70 mb-1">
            {member.name}
          </div>

          {/* Member Image - Clickable */}
          {member.image ? (
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                onClick={() => setActiveQuote(activeQuote === index ? null : index)}
                className="w-20 h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
                style={{ clipPath: "none" }}
              />
              
              {/* Quote Bubble */}
              {activeQuote === index && (
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border border-primary/20 animate-scale-in whitespace-nowrap z-50"
                  onClick={() => setActiveQuote(null)}
                >
                  <div className="text-xs text-foreground">
                    "{member.quote}"
                  </div>
                  {/* Speech bubble arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card/95"></div>
                </div>
              )}
            </div>
          ) : (
            <div 
              onClick={() => setActiveQuote(activeQuote === index ? null : index)}
              className="w-20 h-20 bg-muted/20 border border-dashed border-primary/15 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
            >
              <span className="text-muted-foreground text-xs">Soon</span>
              
              {/* Quote Bubble */}
              {activeQuote === index && (
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border border-primary/20 animate-scale-in whitespace-nowrap z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveQuote(null);
                  }}
                >
                  <div className="text-xs text-foreground">
                    "{member.quote}"
                  </div>
                  {/* Speech bubble arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card/95"></div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
