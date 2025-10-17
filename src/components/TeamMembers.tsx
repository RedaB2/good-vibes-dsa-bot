const TeamMembers = () => {
  const members = [
    { image: "/images/member1.jpg", name: "Member 1" },
    { image: "/images/member2.jpg", name: "Member 2" },
    { image: null, name: "Member 3" },
  ];

  return (
    <div className="flex justify-center items-start gap-8 px-4">
      {members.map((member, index) => (
        <div key={index} className="flex flex-col items-center gap-2 relative">
          {/* Curved Chalk Arrow */}
          <svg
            className="w-16 h-20 mb-1"
            viewBox="0 0 100 120"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <defs>
              <filter id={`chalk-texture-${index}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                <feDisplacementMap in="SourceGraphic" scale="1.5" />
              </filter>
            </defs>
            {/* Curved arrow path */}
            <path
              d="M 50 10 Q 30 40, 50 80 M 50 80 L 40 70 M 50 80 L 60 70"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#chalk-texture-${index})`}
              className="text-primary/70"
              style={{
                strokeDasharray: 120,
                strokeDashoffset: 120,
                animation: `chalk-draw 1.5s ease-out ${index * 0.2}s forwards`
              }}
            />
          </svg>

          {/* Member Name (Chalk Style) */}
          <div 
            className="font-display text-lg text-primary/80 tracking-wide mb-2"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {member.name}
          </div>

          {/* Member Image */}
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-3 border-primary/20 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-muted/30 border-2 border-dashed border-primary/20 flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Coming Soon</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
