import React, { useMemo } from "react";
import { motion } from "motion/react";

export const AtmosphericDistortion = ({
  text = "ATMOSPHERIC",
  className = "",
  textColorClass = "text-[#11100a] dark:text-[#f2f1ed]",
  hoverColor = "#cf2d56",
  fontFamilyClass = "font-sans",
  fontSizeClass = "text-[60px] sm:text-[100px] md:text-[125px] lg:text-[150px]",
  stiffness = 160,
  damping = 10,
  mass = 0.8,
  driftX = 12,
  driftY = -25,

  rotateAngle = 10,
  blurAmount = 4,
}) => {
  // Split text into characters
  const characters = useMemo(() => {
    return text.split("");
  }, [text]);

  const springTransition = {
    type: "spring",
    stiffness,
    damping,
    mass,
  };

  const layoutTransition = {
    type: "spring",
    stiffness: 120,
    damping: 15,
  };

  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center py-12 select-none overflow-visible ${className}`}
    >
      <h1
        className={`${fontFamilyClass} ${fontSizeClass} ${textColorClass} font-black tracking-[-0.08em] leading-none inline-flex flex-wrap justify-center overflow-visible select-none cursor-default m-0 p-0`}
      >
        {characters.map((char, index) => {
          // Calculate unique wave frequencies for ambient float based on index
          const durationX = 4.5 + (index % 3) * 1.5;
          const durationY = 3.5 + (index % 2) * 1.2;

          return (
            <span
              key={index}
              className="inline-block overflow-visible"
              style={{ display: "inline-block" }}
            >
              {/* Layer 1: Ambient Float Motion (Living atmosphere) */}
              <motion.span
                className="inline-block overflow-visible"
                animate={{
                  y: [-3, 3, -3],
                  x: [-1.5, 1.5, -1.5],
                }}
                transition={{
                  duration: durationY,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              >
                {/* Layer 2: Interactive Spring Distortion with Native Layout displacement */}
                <motion.span
                  layout
                  className="inline-block origin-center whitespace-pre cursor-pointer transition-colors duration-300"
                  style={{ display: "inline-block" }}
                  whileHover={{
                    x: driftX * (index % 2 === 0 ? 1 : -1),
                    y: driftY,
                    rotate: rotateAngle * (index % 2 === 0 ? 1 : -1),
                    scale: 1.25,
                    filter: `blur(${blurAmount}px)`,
                    color: hoverColor,
                  }}
                  transition={{
                    default: springTransition,
                    layout: layoutTransition,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </motion.span>
            </span>
          );
        })}
      </h1>
    </div>
  );
};
