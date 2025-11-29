import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPalette, palettes, type PaletteType } from "@/components/ColorPalette";

type BreathPhase = "ready" | "inhale" | "hold-in" | "exhale" | "hold-out";

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("ready");
  const [selectedPalette, setSelectedPalette] = useState<PaletteType>("teal");
  
  const currentPalette = palettes[selectedPalette];

  const phaseConfig = {
    ready: { duration: 0, label: "Press Start", scale: 1 },
    inhale: { duration: 4000, label: "Inhale", scale: 1.5 },
    "hold-in": { duration: 2000, label: "Hold", scale: 1.5 },
    exhale: { duration: 4000, label: "Exhale", scale: 1 },
    "hold-out": { duration: 2000, label: "Hold", scale: 1 },
  };

  useEffect(() => {
    if (!isActive) return;

    const cyclePhases: BreathPhase[] = ["inhale", "hold-in", "exhale", "hold-out"];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const runCycle = () => {
      const currentPhase = cyclePhases[currentIndex];
      setPhase(currentPhase);

      timeoutId = setTimeout(() => {
        currentIndex = (currentIndex + 1) % cyclePhases.length;
        runCycle();
      }, phaseConfig[currentPhase].duration);
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase("ready");
  };

  return (
    <main 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-1000"
      style={{ background: currentPalette.gradient }}
    >
      {/* Ambient glow background */}
      <div 
        className="absolute inset-0 opacity-60 animate-pulse"
        style={{ background: currentPalette.glow }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-wide mb-2">
            CalmBreath
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light">
            Guided Breathing Exercise
          </p>
        </motion.div>

        {/* Breathing Circle Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <motion.div
            animate={{
              scale: phaseConfig[phase].scale,
              opacity: isActive ? [0.4, 0.6, 0.4] : 0.4,
            }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: "easeInOut",
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm"
          />

          {/* Main breathing circle */}
          <motion.div
            animate={{
              scale: phaseConfig[phase].scale,
            }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: "easeInOut",
            }}
            className="relative w-48 h-48 md:w-60 md:h-60 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
            style={{ boxShadow: currentPalette.shadow }}
          >
            {/* Inner highlight */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          </motion.div>
        </div>

        {/* Phase Label */}
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-light text-white tracking-wider">
            {phaseConfig[phase].label}
          </p>
        </motion.div>

        {/* Control Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!isActive ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-md px-12 py-6 text-lg font-light tracking-wide rounded-full transition-all duration-300 hover:scale-105 hover:shadow-breath"
            >
              Start
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              variant="ghost"
              size="lg"
              className="text-white/70 hover:text-white hover:bg-white/10 px-8 py-4 text-base font-light tracking-wide rounded-full transition-all duration-300"
            >
              Stop
            </Button>
          )}
        </motion.div>

        {/* Color Palette Selector */}
        <ColorPalette selected={selectedPalette} onSelect={setSelectedPalette} />

        {/* Instruction text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/60 text-sm md:text-base font-light text-center max-w-md"
        >
          Follow the expanding and contracting circle to guide your breathing rhythm
        </motion.p>
      </div>
    </main>
  );
};

export default Index;
