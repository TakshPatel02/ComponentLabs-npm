import React from "react";
import { motion } from "motion/react";

export const CreativeHighlightText = ({ text, decorText, para }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent w-full h-full p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl md:text-5xl lg:text-6xl font-['Space_Grotesk',sans-serif] text-[#1c1b1b] tracking-tighter leading-snug relative z-10"
      >
        {text}{" "}
        <span className="relative inline-block whitespace-nowrap px-2">
          <span className="relative z-10">{decorText}</span>

          {/* Creative SVG wrapper matching site aesthetic */}
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[#cf2d56]"
            style={{ width: "calc(100% + 40px)", height: "auto" }}
          >
            {/* Soft background path */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Sharp inner core path in accent color */}
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "circInOut", delay: 0.4 }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Dashed energetic accent path trailing behind */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.6 }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
              style={{ transform: "scale(1.03) translate(-2px, -1px)" }}
            />
          </svg>

          {/* Floating subtle sparkles matched to site layout */}
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-[#cf2d56] rounded-full opacity-60"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
                y: [0, -15 - Math.random() * 15],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: 0.8 + i * 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-['Inter',sans-serif] text-[13px] md:text-xl font-medium text-[#cf2d56] tracking-[0.2em] uppercase mt-12 mb-4 text-center"
      >
        not just to decorate.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-4 text-center font-['Newsreader',serif] text-[19.2px] font-medium leading-[1.5] text-[#11100a] max-w-150 w-full mx-auto md:min-w-100 italic relative z-10 px-4"
      >
        {para}
      </motion.p>
    </div>
  );
};
