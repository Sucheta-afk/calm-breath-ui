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
  const [panelOpen, setPanelOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isBreathingActive && isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [isBreathingActive, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPanelOpen(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      setPanelOpen(true);
    }
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 50);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/music/calm-ambient.mp3" />

      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex flex-col items-end">

        {/* Music Button */}
        <Button
          onClick={() => {
            toggleMusic();
            setPanelOpen(!panelOpen);
          }}
          size="icon"
          className={`h-12 w-12 rounded-full transition-all duration-300
            ${isPlaying 
              ? "bg-white/20 text-white border border-white/40 shadow-sm backdrop-blur-md"
              : "bg-white/10 text-white/70 border border-white/20 backdrop-blur-sm"
            }`}
        >
          <Music className="h-5 w-5" />
        </Button>

        {!isPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/50 text-xs mt-2 font-light"
          >
            Add Music
          </motion.p>
        )}

        {/* STATIC (NO Y MOVEMENT) PANEL */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 
                         border border-white/20 shadow-sm flex items-center gap-3"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                {volume > 0 ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>

              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                max={100}
                step={1}
                className="w-24"
              />

              <span className="text-white/70 text-xs w-8 text-right">
                {volume}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
