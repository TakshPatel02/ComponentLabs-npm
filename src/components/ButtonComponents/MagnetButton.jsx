import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({ children, isHovered }) => {
  const characters = children.split("");
  return (
    <div className="relative block overflow-hidden whitespace-nowrap font-bold tracking-wide">
      <div className="flex">
        {characters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            initial="initial"
            animate={isHovered ? "hovered" : "initial"}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {characters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            initial="initial"
            animate={isHovered ? "hovered" : "initial"}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export const MagnetButton = ({ text = "Hover Me", onClick }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      containerRef.current.getBoundingClientRect();

    // Calculate the distance from mouse to the center of the element
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Adjust the multiplier to control the magnet strength
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    // Outer container provides a larger hit area for the magnetic effect to start early
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleMouseEnter}
      className="relative p-8 cursor-pointer group items-center justify-center flex w-fit mx-auto"
    >
      <div className="relative inline-block">
        {/* Solid Shadow Base - This stays anchored and doesn't move with the magnet */}
        <div className="absolute inset-0 bg-[#11100a] group-hover:bg-[#cf2d56] transition-colors duration-500 rounded-lg translate-y-1.5 translate-x-1.5" />

        {/* Top Magnetic Button Layer */}
        <motion.button
          animate={{ x: position.x, y: position.y }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          onClick={onClick}
          className="relative px-10 py-5 bg-[#fdf8f7] text-[#11100a] border-2 border-[#11100a] rounded-xl text-lg uppercase font-bold focus:outline-none transition-colors duration-300 whitespace-nowrap min-w-[160px]"
        >
          <FlipText isHovered={isHovered}>{text}</FlipText>
        </motion.button>
      </div>
    </div>
  );
};
