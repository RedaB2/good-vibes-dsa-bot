import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, SkipForward } from "lucide-react";

interface FloatingMusicPlayerProps {
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
}

const FloatingMusicPlayer = ({ position, onPositionChange }: FloatingMusicPlayerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube lofi/study music videos (audio only playback)
  const tracks = [
    {
      name: "Lofi Hip Hop Radio",
      videoId: "jfKfPfyJRdk" // Lofi Girl - beats to relax/study to
    },
    {
      name: "Chill Lofi Beats",
      videoId: "5qap5aO4i9A" // ChilledCow lofi hip hop radio
    },
    {
      name: "Study & Focus",
      videoId: "lTRiuFIWV54" // Lofi hip hop mix
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
    onPositionChange({ x: newX, y: newY });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const togglePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow?.postMessage(message, '*');
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    setIsPlaying(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 2500,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3 min-w-[200px] animate-fade-in hover:shadow-xl transition-shadow"
    >
      {/* Hidden YouTube iframe for audio playback */}
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        src={`https://www.youtube.com/embed/${tracks[currentTrack].videoId}?enablejsapi=1&autoplay=0&controls=0`}
        allow="autoplay"
        title="Background Music"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center text-white"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <div className="flex-1">
          <div className="text-xs font-medium text-foreground truncate">
            {tracks[currentTrack].name}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Volume2 size={12} />
            {isPlaying ? "Playing" : "Paused"}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextTrack();
          }}
          className="text-primary hover:text-primary/80 transition-colors p-2 rounded-lg hover:bg-primary/10"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;
