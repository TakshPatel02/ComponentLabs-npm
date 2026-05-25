import React, { useState, useMemo } from "react";
import { motion } from "motion/react";

export const GeometricReconstitution = ({
  text = "ENGINEERED SOUL",
  className = "",
  textColorClass = "text-[#11100a] dark:text-[#f2f1ed]",
  fontFamilyClass = "font-sans",
  fontSizeClass = "text-4xl sm:text-6xl md:text-8xl lg:text-[110px]",
  stiffness = 200,
  damping = 14,
  mass = 0.9,
  scatterRangeX = 60, // max px distance to scatter on X
  scatterRangeY = 60, // max px distance to scatter on Y
  scatterRangeRotate = 25, // max deg to rotate
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split text into words, then characters
  const words = useMemo(() => {
    return text.split(" ").filter(Boolean).map((word) => word.split(""));
  }, [text]);

  // Generate unique consistent scattered target offsets for each character on text change
  const characterOffsets = useMemo(() => {
    const offsets = [];
    for (let w = 0; w < words.length; w++) {
      const wordOffsets = [];
      for (let c = 0; c < words[w].length; c++) {
        wordOffsets.push({
          x: (Math.random() - 0.5) * scatterRangeX,
          y: (Math.random() - 0.5) * scatterRangeY,
          rotate: (Math.random() - 0.5) * scatterRangeRotate,
          scale: 0.85 + Math.random() * 0.3,
          opacity: 0.35 + Math.random() * 0.3,
          blur: 1.0 + Math.random() * 1.5,
        });
      }
      offsets.push(wordOffsets);
    }
    return offsets;
  }, [words, scatterRangeX, scatterRangeY, scatterRangeRotate]);

  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center py-12 select-none ${className}`}
    >
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${fontFamilyClass} ${fontSizeClass} ${textColorClass} font-bold tracking-tighter leading-none inline-flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em] cursor-default select-none pointer-events-auto overflow-visible bg-transparent m-0 p-0`}
      >
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block overflow-visible pointer-events-none"
            style={{ display: "inline-block" }}
          >
            {/* Ambient liquid floating motion using motion keyframes */}
            <motion.span
              className="inline-block overflow-visible pointer-events-none"
              style={{ display: "inline-block" }}
              animate={{
                y: [0, -4, 4, 0],
                x: [0, 2, -2, 0],
              }}
              transition={{
                duration: 5 + wIdx * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {word.map((char, cIdx) => {
                const offset = characterOffsets[wIdx]?.[cIdx] || {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  blur: 0,
                };
                return (
                  <motion.span
                    key={cIdx}
                    className="inline-block origin-center pointer-events-none"
                    style={{ display: "inline-block" }}
                    animate={{
                      x: isHovered ? offset.x : 0,
                      y: isHovered ? offset.y : 0,
                      rotate: isHovered ? offset.rotate : 0,
                      scale: isHovered ? offset.scale : 1,
                      opacity: isHovered ? offset.opacity : 1,
                      filter: isHovered
                        ? `blur(${offset.blur}px)`
                        : "blur(0px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: stiffness,
                      damping: damping,
                      mass: mass,
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </motion.span>
          </span>
        ))}
      </h1>
    </div>
  );
};
