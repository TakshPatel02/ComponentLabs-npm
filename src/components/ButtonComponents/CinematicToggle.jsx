import React, { useState } from "react";
import { motion } from "motion/react";
import { MoonIcon, SunIcon } from 'lucide-react';

const SPRING = { type: "spring", stiffness: 300, damping: 20 };

export const CinematicToggle = ({
  onToggle,
  defaultActive = false,
  activeLabel = "LUNAR_ACTIVE",
  inactiveLabel = "SOLAR_ACTIVE",
  showLabel = true,
  className = "",
}) => {
  const [isActive, setIsActive] = useState(defaultActive);

  const handleToggle = () => {
    const next = !isActive;
    setIsActive(next);
    onToggle?.(next);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        onClick={handleToggle}
        className="relative w-24 h-12 rounded-full p-1 cursor-pointer border-none outline-none"
        animate={{ backgroundColor: isActive ? "#1d1b1e" : "#11100a" }}
        transition={{ duration: 0.3 }}
      >
        {/* Thumb — slides via GPU-accelerated x transform */}
        <motion.div
          className="absolute left-1 top-1 w-10 h-10 bg-[#f2f1ed] dark:bg-[#1a1a1a] rounded-full shadow-lg flex items-center justify-center"
          animate={{ x: isActive ? 48 : 0 }}
          transition={SPRING}
        >
          {/* Icon — rotates cinematically on state change */}
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={SPRING}
            className="text-[#11100a] dark:text-[#f2f1ed] text-lg select-none flex items-center justify-center"
          >
            {isActive ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </motion.span>
        </motion.div>
      </motion.button>

      {/* Status Label */}
      {showLabel && (
        <span className="font-mono text-[11px] tracking-wider text-[#48473f] dark:text-[#cac6bc] select-none">
          STATUS: {isActive ? activeLabel : inactiveLabel}
        </span>
      )}
    </div>
  );
};