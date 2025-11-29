import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MusicControlsProps {
  isBreathingActive: boolean;
}

export const MusicControls = ({ isBreathingActive }: MusicControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Auto-start music when breathing starts
    if (isBreathingActive && isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [isBreathingActive, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/calm-ambient.mp3"
      />

      {/* Music Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed bottom-8 right-8 flex flex-col items-end gap-3"
      >
        {/* Volume Slider */}
        <AnimatePresence>
          {showControls && isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-3 border border-white/20"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {volume > 0 ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-24"
              />
              <span className="text-white/70 text-sm font-light w-8 text-right">
                {volume}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Music Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleMusic}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            size="icon"
            className={`h-14 w-14 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 shadow-breath"
                : "bg-white/10 hover:bg-white/20 text-white/70 border-2 border-white/20"
            }`}
          >
            <Music className={`h-6 w-6 ${isPlaying ? "animate-pulse" : ""}`} />
          </Button>
        </motion.div>

        {/* Label */}
        {!isPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/50 text-xs font-light"
          >
            Add Music
          </motion.p>
        )}
      </motion.div>
    </>
  );
};
