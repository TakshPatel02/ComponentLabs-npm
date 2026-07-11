import React, { useState } from "react";
import { motion } from "motion/react";

// ── Line endpoint morph definitions ─────────────────────────────────
// Three SVG lines are always rendered. Their x1/y1/x2/y2 attributes
// morph between hamburger bars and X-cross diagonals.
// ViewBox is 24×24.

const LINES = {
  hamburger: {
    top:    { x1: 4, y1: 6,  x2: 20, y2: 6  },
    middle: { x1: 4, y1: 12, x2: 20, y2: 12 },
    bottom: { x1: 4, y1: 18, x2: 20, y2: 18 },
  },
  cross: {
    top:    { x1: 5, y1: 5,  x2: 19, y2: 19 },
    middle: { x1: 12, y1: 12, x2: 12, y2: 12 }, // collapses to center point
    bottom: { x1: 5, y1: 19, x2: 19, y2: 5  },
  },
};

const MORPH_TRANSITION = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
const SPRING = { type: "spring", stiffness: 400, damping: 25 };

export const HamburgerCross = ({
  size = 48,
  strokeWidth = 2,
  bgColor = "#1a1a1a",
  strokeColor = "#ffffff",
  hoverScale = 1.06,
  activeScale = 0.92,
  initialOpen = false,
  onToggle,
  rounded = true,
  showLabel = true,
  bare = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleClick = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  const state = isOpen ? "cross" : "hamburger";
  const iconSize = bare ? size : size * 0.5;
  const borderWidth = Math.max(1, size * 0.025);
  const borderRadius = rounded ? "50%" : size * 0.18;

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        onClick={handleClick}
        className="relative flex items-center justify-center cursor-pointer border-none outline-none select-none"
        style={{
          width: size,
          height: size,
          ...(bare
            ? { background: "transparent" }
            : {
                backgroundColor: bgColor,
                borderRadius,
                boxShadow: `0 0 0 ${borderWidth}px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }),
        }}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: activeScale }}
        transition={SPRING}
      >
        {/* Subtle radial gradient overlay for depth (hidden in bare mode) */}
        {!bare && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius,
              background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* SVG — three persistent lines that morph in-place */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Top line → cross diagonal \ */}
          <motion.line
            animate={LINES[state].top}
            transition={MORPH_TRANSITION}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Middle line → collapses to center point */}
          <motion.line
            animate={{
              ...LINES[state].middle,
              opacity: isOpen ? 0 : 1,
            }}
            transition={MORPH_TRANSITION}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Bottom line → cross diagonal / */}
          <motion.line
            animate={LINES[state].bottom}
            transition={MORPH_TRANSITION}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      </motion.button>

      {/* Status label */}
      {showLabel && (
        <motion.span
          className="font-mono text-[11px] tracking-wider select-none text-[#48473f] dark:text-[#fdf8f7]/80"
          key={isOpen ? "close" : "menu"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? "CLOSE" : "MENU"}
        </motion.span>
      )}
    </div>
  );
};