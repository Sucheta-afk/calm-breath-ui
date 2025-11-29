import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPalette, palettes, type PaletteType } from "@/components/ColorPalette";
import { MusicControls } from "@/components/MusicControls";

type BreathPhase = "ready" | "inhale" | "hold-in" | "exhale" | "hold-out";

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("ready");
  const [selectedPalette, setSelectedPalette] = useState<PaletteType>("teal");

  const currentPalette = palettes[selectedPalette];

  const phaseConfig = {
    ready: { duration: 0, label: "Press Start", scale: 1 },
    inhale: { duration: 4000, label: "Inhale", scale: 1.45 },
    "hold-in": { duration: 2000, label: "Hold", scale: 1.45 },
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

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-all duration-1000"
      style={{ background: currentPalette.gradient }}
    >
      <div
        className="absolute inset-0 opacity-50 animate-pulse"
        style={{ background: currentPalette.glow }}
      />

      {/* FULL SCREEN WRAPPER WITH MAX-HEIGHT CONSTRAINT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-xl"
           style={{ maxHeight: "92vh" }}>

        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white tracking-wide mb-1">
            CalmBreath
          </h1>
          <p className="text-sm md:text-base text-white/80 font-light">
            Guided Breathing
          </p>
        </div>



        {/* Circle with safe spacing */}
        <div className="relative flex items-center justify-center mt-2 mb-4 md:mb-6 pt-6 pb-6">

          {/* Outer glow */}
          <motion.div
            animate={{
              scale: phaseConfig[phase].scale,
              opacity: isActive ? [0.35, 0.55, 0.35] : 0.35,
            }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: "easeInOut",
              opacity: { duration: 2, repeat: Infinity },
            }}
            className="absolute 
                       w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 
                       rounded-full bg-white/10 backdrop-blur-sm"
          />

          {/* Main circle */}
          <motion.div
            animate={{ scale: phaseConfig[phase].scale }}
            transition={{
              duration: phaseConfig[phase].duration / 1000,
              ease: "easeInOut",
            }}
            className="relative 
                       w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48
                       rounded-full bg-white/20 backdrop-blur-md 
                       flex items-center justify-center"
            style={{ boxShadow: currentPalette.shadow }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
          </motion.div>
        </div>

        {/* Phase Label */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-wide mb-2 md:mb-4">
          {phaseConfig[phase].label}
        </p>

        {/* Buttons */}
        {!isActive ? (
          <Button
            onClick={() => setIsActive(true)}
            className="bg-white/20 hover:bg-white/30 text-white 
                       border border-white/30 backdrop-blur-md 
                       px-8 py-2 text-sm sm:text-base rounded-full mb-2"
          >
            Start
          </Button>
        ) : (
          <Button
            onClick={() => { setIsActive(false); setPhase("ready"); }}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 
                       px-6 py-2 text-sm sm:text-base rounded-full mb-2"
          >
            Stop
          </Button>
        )}

        {/* Palette selector */}
        <div className="scale-90 md:scale-100 mb-1">
          <ColorPalette selected={selectedPalette} onSelect={setSelectedPalette} />
        </div>

        {/* Footer text */}
        <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-2">
          Follow the circle to guide your breathing rhythm.
        </p>
      </div>

      <MusicControls isBreathingActive={isActive} />
    </main>
  );
};

export default Index;
