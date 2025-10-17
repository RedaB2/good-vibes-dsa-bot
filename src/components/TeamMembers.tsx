const TeamMembers = () => {
  const members = [
    { image: "/images/member1.jpg", name: "Member 1" },
    { image: "/images/member2.jpg", name: "Member 2" },
    { image: null, name: "Member 3" },
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

          {/* Member Image */}
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border border-primary/15"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted/20 border border-dashed border-primary/15 flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Soon</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
