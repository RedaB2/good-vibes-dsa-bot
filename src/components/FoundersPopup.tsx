import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const FoundersPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on first load
    const hasSeenPopup = localStorage.getItem("hasSeenFoundersVideo");
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenFoundersVideo", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-transparent border-0 shadow-none p-0 overflow-visible">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 z-50 p-2 rounded-full bg-secondary/90 hover:bg-secondary transition-all shadow-lg"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Chalk arrows pointing to video - Left side */}
          <div className="absolute -left-32 top-1/4 w-40 h-40 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
              <defs>
                <filter id="chalk-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
              </defs>
              <path
                d="M 10 80 Q 60 40, 120 70 T 190 90"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.1s" }}
              />
              <path
                d="M 190 90 L 175 80 M 190 90 L 175 100"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.1s" }}
              />
            </svg>
          </div>

          {/* Arrow from bottom left */}
          <div className="absolute -left-28 bottom-1/4 w-40 h-40 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
              <path
                d="M 20 180 Q 80 140, 140 120 T 190 110"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.3s" }}
              />
              <path
                d="M 190 110 L 175 105 M 190 110 L 180 120"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.3s" }}
              />
            </svg>
          </div>

          {/* Arrow from right side */}
          <div className="absolute -right-32 top-1/3 w-40 h-40 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
              <path
                d="M 190 100 Q 140 120, 80 110 T 10 100"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.2s" }}
              />
              <path
                d="M 10 100 L 25 90 M 10 100 L 25 110"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.2s" }}
              />
            </svg>
          </div>

          {/* Arrow from top right */}
          <div className="absolute -right-28 top-10 w-40 h-40 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
              <path
                d="M 180 20 Q 130 60, 70 90 T 10 120"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.4s" }}
              />
              <path
                d="M 10 120 L 20 110 M 10 120 L 25 120"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.4s" }}
              />
            </svg>
          </div>

          {/* Arrow from bottom right */}
          <div className="absolute -right-32 bottom-20 w-40 h-40 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
              <path
                d="M 190 160 Q 140 140, 80 130 T 10 120"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M 10 120 L 25 115 M 10 120 L 20 130"
                stroke="hsl(var(--secondary))"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
                style={{ animationDelay: "0.5s" }}
              />
            </svg>
          </div>

          {/* Floating video card */}
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 animate-float">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-display text-secondary mb-2">
                Meet the Founders ✨
              </h2>
              <p className="text-foreground/80">
                Learn why we created Newton and our mission to make DSA learning accessible to everyone
              </p>
            </div>

            {/* Video placeholder */}
            <div className="aspect-video bg-background rounded-xl flex items-center justify-center shadow-lg">
              <p className="text-muted-foreground text-center px-4">
                YouTube video will be embedded here
                <br />
                <span className="text-xs">(Coming soon)</span>
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoundersPopup;
