import logoImage from "@/assets/good-vibes-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-6 relative">
        <h1 className="text-center text-5xl font-display text-secondary animate-float">
          Good Vibes DSA Tutor
        </h1>
        <img 
          src={logoImage} 
          alt="Good Vibes Only" 
          className="absolute top-4 right-4 w-24 h-24 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
