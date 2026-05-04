import React, { useState } from "react";
import { motion } from "motion/react";
import { ZodiacGeminiIcon } from "lucide-react";

export const NeumorphismButton = ({ text = "Initialize AI" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      // For neumorphism to work, the button background must match its container.
      // We use a light cream gray similar to the layout surface.
      className={`
        relative px-8 py-4 rounded-full 
        flex items-center justify-center gap-3 
        text-[#11100a] bg-[#ebeae5]
        font-medium uppercase tracking-widest text-sm font-['Space_Grotesk',sans-serif]
        shadow-[-6px_-6px_14px_rgba(255,255,255,0.9),6px_6px_14px_rgba(0,0,0,0.1)]
        transition-all duration-300
        hover:shadow-[inset_-3px_-3px_7px_rgba(255,255,255,0.9),inset_3px_3px_7px_rgba(0,0,0,0.15),-2px_-2px_4px_rgba(255,255,255,0.5),2px_2px_4px_rgba(0,0,0,0.05)]
        hover:text-[#cf2d56] overflow-hidden group
      `}
    >
      {/* AI Pulse Ring Effect */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          className="absolute z-0 w-12 h-12 rounded-full border border-[#cf2d56]/50"
        />
      )}

      {/* Futuristic sweeping particle (the "AI touch") */}
      <motion.div
        initial={{ x: "-100%", y: "-100%", opacity: 0 }}
        animate={{
          x: isHovered ? ["-100%", "200%"] : "-100%",
          y: isHovered ? ["-100%", "200%"] : "-100%",
          opacity: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute z-0 w-10 h-10 rounded-full blur-md bg-[#cf2d56]/40 pointer-events-none mix-blend-overlay"
      />

      <div className="relative z-10 flex items-center justify-center gap-3">
        {/* Dynamic Material Icon */}
        <motion.span
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${
            isHovered ? "text-[#cf2d56]" : "text-[#11100a]"
          }`}
        >
          {isHovered ? <ZodiacGeminiIcon /> : <ZodiacGeminiIcon />}
        </motion.span>
        <span>{text}</span>
      </div>
    </motion.button>
  );
};
