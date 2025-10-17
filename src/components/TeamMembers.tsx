const TeamMembers = () => {
  const members = [
    { image: "/images/member1.heic", name: "Member 1" },
    { image: "/images/member2.heic", name: "Member 2" },
    { image: null, name: "Member 3" },
  ];

  return (
    <section className="w-full py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display text-center mb-12 text-foreground">
          The Team
        </h2>
        
        <div className="flex justify-center items-end gap-12 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-4 relative">
              {/* Chalk Arrow */}
              <svg
                className="w-24 h-24 mb-2 animate-chalk-draw"
                viewBox="0 0 100 100"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <defs>
                  <filter id={`chalk-${index}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                    <feDisplacementMap in="SourceGraphic" scale="2" />
                  </filter>
                </defs>
                <path
                  d="M 50 10 L 50 70 M 50 70 L 35 55 M 50 70 L 65 55"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  filter={`url(#chalk-${index})`}
                  className="text-primary/80"
                  style={{
                    strokeDasharray: 150,
                    strokeDashoffset: 150,
                    animation: `chalk-draw 1.5s ease-out ${index * 0.2}s forwards`
                  }}
                />
              </svg>

              {/* Member Name (Chalk Style) */}
              <div 
                className="font-display text-xl text-primary/90 tracking-wide"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  filter: "contrast(1.2)"
                }}
              >
                {member.name}
              </div>

              {/* Member Image */}
              <div className="relative">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary/30 shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-muted/50 border-4 border-dashed border-primary/30 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Coming Soon</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
