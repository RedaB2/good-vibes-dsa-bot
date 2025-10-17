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
      <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-md border-2 border-secondary/30 shadow-2xl p-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors group"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Chalk arrows pointing to video */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-90">
              <defs>
                <filter id="chalk-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
              </defs>
              <path
                d="M 10 100 Q 50 60, 100 80 T 180 100"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
              />
              <path
                d="M 180 100 L 165 90 M 180 100 L 165 110"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
              />
            </svg>
          </div>

          <div className="absolute -right-20 top-1/3 w-32 h-32 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-90">
              <path
                d="M 190 100 Q 150 140, 100 120 T 20 100"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
              />
              <path
                d="M 20 100 L 35 90 M 20 100 L 35 110"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#chalk-texture)"
                className="chalk-stroke"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-display text-secondary mb-2">
                Meet the Founders ✨
              </h2>
              <p className="text-foreground/80">
                Learn why we created Newton and our mission to make DSA learning accessible to everyone
              </p>
            </div>

            {/* Video placeholder */}
            <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-secondary/20 shadow-lg">
              <p className="text-muted-foreground text-center px-4">
                YouTube video will be embedded here
                <br />
                <span className="text-xs">(Coming soon)</span>
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all shadow-md hover:shadow-lg"
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
