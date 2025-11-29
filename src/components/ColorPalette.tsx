import { motion } from "framer-motion";

export type PaletteType = "teal" | "lavender" | "coral" | "forest" | "ocean";

export interface Palette {
  name: string;
  gradient: string;
  glow: string;
  shadow: string;
  preview: string;
}

export const palettes: Record<PaletteType, Palette> = {
  teal: {
    name: "Teal Serenity",
    gradient: "linear-gradient(135deg, hsl(186, 65%, 65%), hsl(174, 65%, 70%))",
    glow: "radial-gradient(circle, hsl(186 65% 75% / 0.4), transparent)",
    shadow: "0 0 60px hsl(186 65% 65% / 0.5)",
    preview: "hsl(186, 65%, 65%)",
  },
  lavender: {
    name: "Lavender Dreams",
    gradient: "linear-gradient(135deg, hsl(260, 55%, 70%), hsl(280, 60%, 75%))",
    glow: "radial-gradient(circle, hsl(270 60% 75% / 0.4), transparent)",
    shadow: "0 0 60px hsl(270 60% 70% / 0.5)",
    preview: "hsl(270, 60%, 70%)",
  },
  coral: {
    name: "Coral Sunset",
    gradient: "linear-gradient(135deg, hsl(10, 75%, 75%), hsl(30, 70%, 80%))",
    glow: "radial-gradient(circle, hsl(20 70% 78% / 0.4), transparent)",
    shadow: "0 0 60px hsl(20 70% 75% / 0.5)",
    preview: "hsl(20, 70%, 75%)",
  },
  forest: {
    name: "Forest Calm",
    gradient: "linear-gradient(135deg, hsl(140, 45%, 60%), hsl(160, 50%, 65%))",
    glow: "radial-gradient(circle, hsl(150 48% 65% / 0.4), transparent)",
    shadow: "0 0 60px hsl(150 48% 62% / 0.5)",
    preview: "hsl(150, 48%, 62%)",
  },
  ocean: {
    name: "Ocean Deep",
    gradient: "linear-gradient(135deg, hsl(220, 60%, 60%), hsl(200, 70%, 70%))",
    glow: "radial-gradient(circle, hsl(210 65% 68% / 0.4), transparent)",
    shadow: "0 0 60px hsl(210 65% 65% / 0.5)",
    preview: "hsl(210, 65%, 65%)",
  },
};

interface ColorPaletteProps {
  selected: PaletteType;
  onSelect: (palette: PaletteType) => void;
}

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <p className="text-white/70 text-sm font-light tracking-wide">Choose Your Calm</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {(Object.keys(palettes) as PaletteType[]).map((key) => (
          <motion.button
            key={key}
            onClick={() => onSelect(key)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full transition-all duration-300 ${
              selected === key
                ? "ring-4 ring-white/60 ring-offset-2 ring-offset-transparent"
                : "ring-2 ring-white/20 hover:ring-white/40"
            }`}
            style={{ background: palettes[key].preview }}
            aria-label={palettes[key].name}
          />
        ))}
      </div>
    </motion.div>
  );
};
