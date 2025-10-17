import logoImage from "@/assets/good-vibes-logo.png";

const Header = () => {
  return (
    <header className="bg-card/50 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-6 relative">
        <h1 className="text-center text-5xl font-display text-white">
          Newton
        </h1>
        <img 
          src={logoImage} 
          alt="Good Vibes Only" 
          className="absolute top-4 right-4 w-16 h-16 object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
