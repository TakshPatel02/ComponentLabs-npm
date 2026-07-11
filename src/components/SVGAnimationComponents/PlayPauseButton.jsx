import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SPRING = { type: "spring", stiffness: 500, damping: 30 };

// ── Path morph definitions ──────────────────────────────────────────
// Two paths are always rendered. Their `d` attribute morphs between
// pause-bar shapes and play-triangle shapes.
// Both shapes use 4-point paths so the vertex count matches → smooth morph.
// Path 1 becomes the FULL triangle; Path 2 collapses to the tip → no seam.

// Path 1: left pause bar  ⟷  full play triangle
const PAUSE_LEFT  = "M 6 5  L 10.5 5   L 10.5 19  L 6 19   Z";
const PLAY_LEFT   = "M 8 5  L 19 12    L 19 12    L 8 19   Z";

// Path 2: right pause bar ⟷  collapses to triangle tip (invisible)
const PAUSE_RIGHT = "M 13.5 5  L 18 5  L 18 19  L 13.5 19  Z";
const PLAY_RIGHT  = "M 19 12   L 19 12 L 19 12  L 19 12    Z";

const MORPH_TRANSITION = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };

export const PlayPauseButton = ({
  size = 64,
  bgColor = "#1a1a1a",
  iconColor = "#ffffff",
  hoverScale = 1.08,
  activeScale = 0.92,
  initialPlaying = false,
  onToggle,
  showRipple = true,
  showLabel = true,
  bare = false,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [ripples, setRipples] = useState([]);

  const handleClick = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    onToggle?.(next);

    if (showRipple && !bare) {
      const id = Date.now();
      setRipples((prev) => [...prev, id]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r !== id));
      }, 600);
    }
  };

  const iconSize = bare ? size : size * 0.45;
  const borderWidth = size * 0.03;

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
                borderRadius: "50%",
                boxShadow: `0 0 0 ${borderWidth}px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }),
        }}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: activeScale }}
        transition={SPRING}
      >
        {/* Subtle radial gradient overlay for depth (hidden in bare mode) */}
        {!bare && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Ripple effect on click (hidden in bare mode) */}
        {!bare && (
          <AnimatePresence>
            {ripples.map((id) => (
              <motion.div
                key={id}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `2px solid ${iconColor}` }}
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        )}

        {/* SVG icon — two persistent paths that morph in-place */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Left path: bar ⟷ full triangle */}
          <motion.path
            animate={{ d: isPlaying ? PAUSE_LEFT : PLAY_LEFT }}
            transition={MORPH_TRANSITION}
            fill={iconColor}
          />
          {/* Right path: bar ⟷ collapses to tip */}
          <motion.path
            animate={{ d: isPlaying ? PAUSE_RIGHT : PLAY_RIGHT }}
            transition={MORPH_TRANSITION}
            fill={iconColor}
          />
        </svg>
      </motion.button>

      {/* Status label */}
      {showLabel && (
        <motion.span
          className="font-mono text-[11px] tracking-wider select-none text-[#48473f] dark:text-[#fdf8f7]/80"
          key={isPlaying ? "playing" : "paused"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? "PLAYING" : "PAUSED"}
        </motion.span>
      )}
    </div>
  );
};