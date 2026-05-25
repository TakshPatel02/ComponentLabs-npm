import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const GeometricPathButton = ({
  children,
  text = "Trace Path",
  onClick,
  strokeColor = "#cf2d56",
  particleColor = "#cf2d56",
  className = "",
  wrapperClassName = "",
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [edgeTimes, setEdgeTimes] = useState([0, 0.25, 0.5, 0.75, 1]);
  const content = children || text;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${wrapperClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* SVG Border Trace — linear ease matches the particle's uniform speed */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ zIndex: 15 }}
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="8"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "linear" }}
        />
      </svg>

      {/* Main Interactive Button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative z-10 bg-[#ebeae5]  font-['Space_Grotesk'] text-[14px] font-medium tracking-widest uppercase
          py-4 px-12 rounded-lg text-primary hover:bg-[#f2f1ed]  transition-colors duration-300
          border border-transparent cursor-pointer
          ${className}
        `}
      >
        {content}
      </motion.button>
    </div>
  );
};