import React from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Shield, Sparkles } from "lucide-react";

const CircuitBoardBg = () => {
  // SVG paths for the circuit traces
  const traces = [
    "M 140 130 L 140 160 L 220 160 L 220 220",
    "M 170 100 L 210 100 L 210 50 L 270 50",
    "M 170 120 L 230 120 L 230 180 L 290 180",
    "M 120 70 L 120 40 L 70 40 L 70 10",
    "M 70 100 L 30 100 L 30 150 L 10 150",
    "M 100 130 L 100 180 L 50 180 L 50 230",
  ];

  return (
    <div className="absolute right-0 bottom-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none select-none opacity-[0.15] dark:opacity-[0.25] transition-opacity duration-300">
      <svg
        className="w-full h-full text-primary"
        viewBox="0 0 300 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gradient for the glow pulses */}
          <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor="#cf2d56"
              stopOpacity="0.1"
            />
            <stop
              offset="50%"
              stopColor="#cf2d56"
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor="#cf2d56"
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>

        {/* ── Background Grid (blueprint grid effect) ── */}
        <pattern
          id="microGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#microGrid)" />

        {/* ── Static Trace Lines (Background) ── */}
        {traces.map((d, index) => (
          <path
            key={`static-${index}`}
            d={d}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}

        {/* ── Animated Glowing Pulses ── */}
        {traces.map((d, index) => (
          <motion.path
            key={`pulse-${index}`}
            d={d}
            stroke="url(#circuitGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ strokeDasharray: "20 180", strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -200 }}
            transition={{
              repeat: Infinity,
              duration: 4 + index * 0.8, // staggered speeds
              ease: "linear",
            }}
          />
        ))}

        {/* ── Silicon Chip Package in Center/Left of SVG ── */}
        {/* Chip Body */}
        <rect
          x="70"
          y="70"
          width="100"
          height="60"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="fill-[#e5e2db] dark:fill-[#333333] transition-colors duration-300"
        />

        {/* Silicon Core / Inner square */}
        <rect
          x="95"
          y="85"
          width="50"
          height="30"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
          className="fill-[#fdf8f7] dark:fill-[#1a1a1a] transition-colors duration-300"
        />

        {/* Decorative central mark */}
        <circle
          cx="120"
          cy="100"
          r="6"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <circle cx="120" cy="100" r="2" fill="currentColor" fillOpacity="0.4" />

        {/* Chip Pins / Legs */}
        {/* Top Pins */}
        <line
          x1="90"
          y1="70"
          x2="90"
          y2="62"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="110"
          y1="70"
          x2="110"
          y2="62"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="130"
          y1="70"
          x2="130"
          y2="62"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="150"
          y1="70"
          x2="150"
          y2="62"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Bottom Pins */}
        <line
          x1="90"
          y1="130"
          x2="90"
          y2="138"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="110"
          y1="130"
          x2="110"
          y2="138"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="130"
          y1="130"
          x2="130"
          y2="138"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="150"
          y1="130"
          x2="150"
          y2="138"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Left Pins */}
        <line
          x1="70"
          y1="85"
          x2="62"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="70"
          y1="100"
          x2="62"
          y2="100"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="70"
          y1="115"
          x2="62"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Right Pins */}
        <line
          x1="170"
          y1="85"
          x2="178"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="170"
          y1="100"
          x2="178"
          y2="100"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <line
          x1="170"
          y1="115"
          x2="178"
          y2="115"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Connection nodes (glowing dots at trace ends) */}
        <circle cx="270" cy="50" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="290" cy="180" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="70" cy="10" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="10" cy="150" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
};

export const CreativeTeamsFeature = ({
  title = "The foundation for creative teams management",
  description = "Lyra is evolving to be more than just the models. It supports an entire ecosystem of APIs and platforms helping developers and businesses innovate with soulful precision.",
  className = ""
}) => {
  // Variants for staggered entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className={`w-full bg-[#fdf8f7] dark:bg-[#1a1a1a] text-[#11100a] dark:text-[#fdf8f7] py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center transition-colors duration-300 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl flex flex-col items-stretch"
      >
        {/* ── Header Block ── */}
        <motion.div
          variants={itemVariants}
          className="text-center flex flex-col items-center gap-5 mb-16 md:mb-20"
        >
          <h2 className="font-section-heading text-[38px] md:text-[54px] lg:text-[60px] font-bold text-[#11100a] dark:text-[#fdf8f7] tracking-tight leading-[1.1] max-w-4xl">
            {title}
          </h2>
          <p className="font-editorial-standard text-base md:text-[18px] lg:text-[20px] text-[#48473f] dark:text-[#fdf8f7]/80 italic font-light max-w-3xl leading-relaxed mt-2 select-none">
            {description}
          </p>
        </motion.div>

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: Faaaaast Integration (md:col-span-7) */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className="group md:col-span-7 rounded-2xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#f1edeb]/40 dark:bg-[#1a1a1a]/60 p-8 lg:p-10 flex flex-col items-start text-left relative overflow-hidden transition-all duration-150 shadow-sm hover:shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-[#fdf8f7] dark:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a] dark:text-[#fdf8f7] mb-6 transition-all duration-150 group-hover:scale-105">
              <Zap className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-section-heading text-xl md:text-[22px] font-bold text-[#11100a] dark:text-[#fdf8f7] mb-3.5 tracking-tight transition-colors">
              Faaaaast Integration
            </h3>
            <p className="font-ui-body text-[14px] md:text-[15px] leading-[1.6] text-[#48473f]/85 dark:text-[#fdf8f7]/85 max-w-2xl">
              Engineered for sub-millisecond response times. ComponentLab
              ensures your interface remains fluid and reactive, bridging the
              gap between design intent and machine execution.
            </p>
          </motion.div>

          {/* Card 2: Powerful Core (md:col-span-5) */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className="group md:col-span-5 rounded-2xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#f1edeb]/40 dark:bg-[#1a1a1a]/60 p-8 lg:p-10 flex flex-col items-start text-left relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-[#fdf8f7] dark:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a] dark:text-[#fdf8f7] mb-6 transition-all duration-150 group-hover:scale-105">
              <Cpu className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-section-heading text-xl md:text-[22px] font-bold text-[#11100a] dark:text-[#fdf8f7] mb-3.5 tracking-tight transition-colors">
              Powerful Core
            </h3>
            <p className="font-ui-body text-[14px] md:text-[15px] leading-[1.6] text-[#48473f]/85 dark:text-[#fdf8f7]/85">
              A robust, typed-safe core library that handles the heavy lifting
              of state and layout.
            </p>
          </motion.div>

          {/* Card 3: Security First (md:col-span-5) */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className="group md:col-span-5 rounded-2xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#f1edeb]/40 dark:bg-[#1a1a1a]/60 p-8 lg:p-10 flex flex-col items-start text-left relative overflow-hidden transition-all duration-150 shadow-sm hover:shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-[#fdf8f7] dark:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a] dark:text-[#fdf8f7] mb-6 transition-all duration-150 group-hover:scale-105">
              <Shield className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-section-heading text-xl md:text-[22px] font-bold text-[#11100a] dark:text-[#fdf8f7] mb-3.5 tracking-tight transition-colors">
              Security First
            </h3>
            <p className="font-ui-body text-[14px] md:text-[15px] leading-[1.6] text-[#48473f]/85 dark:text-[#fdf8f7]/85">
              Enterprise-grade encryption and access controls built directly
              into every component.
            </p>
          </motion.div>

          {/* Card 4: Intelligent Layouts (md:col-span-7) */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className="group md:col-span-7 rounded-2xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#f1edeb]/40 dark:bg-[#1a1a1a]/60 p-8 lg:p-10 flex flex-col items-start text-left relative overflow-hidden transition-all duration-150 shadow-sm hover:shadow-md"
          >
            {/* Vector circuit background pattern with microchip */}
            <CircuitBoardBg />

            <div className="relative z-10 p-2.5 rounded-xl bg-[#fdf8f7] dark:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a] dark:text-[#fdf8f7] mb-6 transition-all duration-150 group-hover:scale-105">
              <Sparkles className="w-6 h-6 stroke-[1.75]" />
            </div>

            <div className="relative z-10 max-w-2xl flex flex-col">
              <h3 className="font-section-heading text-xl md:text-[22px] font-bold text-[#11100a] dark:text-[#fdf8f7] mb-3.5 tracking-tight transition-colors">
                Intelligent Layouts
              </h3>
              <p className="font-ui-body text-[14px] md:text-[15px] leading-[1.6] text-[#48473f]/85 dark:text-[#fdf8f7]/85">
                Dynamic adaptation to any viewport using our proprietary fluid
                grid system, maintaining literary soul across all devices.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};