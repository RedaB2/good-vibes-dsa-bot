import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface FloatingMusicPlayerProps {
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
}

const FloatingMusicPlayer = ({ position, onPositionChange }: FloatingMusicPlayerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Lofi/white noise tracks (using free music from various sources)
  const tracks = [
    {
      name: "Lofi Study",
      url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
    },
    {
      name: "Chill Beats",
      url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4deafc7339.mp3"
    },
    {
      name: "Ambient Focus",
      url: "https://cdn.pixabay.com/audio/2022/11/22/audio_ba50541daf.mp3"
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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', nextTrack);
      return () => audio.removeEventListener('ended', nextTrack);
    }
  }, [currentTrack]);

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
      <audio ref={audioRef} loop>
        <source src={tracks[currentTrack].url} type="audio/mpeg" />
      </audio>

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
          className="text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;
