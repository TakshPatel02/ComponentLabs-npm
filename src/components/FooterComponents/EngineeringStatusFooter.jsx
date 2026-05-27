import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const EngineeringStatusFooter = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);

  const navLinks = [
    { label: "Gallery", href: "#", isPill: false },
    { label: "Documentation", href: "#", isPill: false },
    { label: "API Reference", href: "#", isPill: false },
    { label: "Book a Demo", href: "#", isPill: true },
    { label: "Changelog", href: "#", isPill: false },
    { label: "Security", href: "#", isPill: false },
    { label: "Community", href: "#", isPill: false },
  ];

  const handleWordmarkMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const wordmarkLetters = "COMPONENTLAB".split("");

  // Premium container spring staggered animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div>
      <footer className="w-full font-sans overflow-hidden border-t border-border-fallback-10 transition-colors duration-500 relative flex flex-col justify-between bg-surface-container text-on-surface">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full p-6 sm:p-10 md:p-14 flex flex-col justify-between"
        >
          {/* Ambient Top Light Reflection Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border-fallback-10 to-transparent" />

          {/* ── 1. Top Status Grid Row (4 Columns in Desktop) ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-6 border-b text-[11px] sm:text-xs max-w-6xl mx-auto w-full items-center border-border-fallback-10"
          >
            {/* System Registry */}
            <div className="flex items-center gap-3 justify-start">
              <div className="rounded-xs w-6.5 h-6.5 flex items-center justify-center font-mono font-medium text-xs shadow-sm select-none border border-border-fallback-10 text-primary bg-surface">
                2
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold leading-none text-on-surface-variant">
                  System Registry
                </div>
                <div className="font-mono font-bold mt-1 text-[11px] sm:text-xs text-primary">
                  v2.0.4 - <span className="opacity-90">STABLE_BUILD</span>
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className="text-left lg:text-center">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold leading-none text-on-surface-variant">
                Global Presence
              </div>
              <div className="font-mono font-bold mt-1 text-[11px] sm:text-xs tracking-wider text-primary">
                SF + LON + TYO
              </div>
            </div>

            {/* Operational Status */}
            <div className="flex items-center justify-start lg:justify-end gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              </span>
              <div className="text-left">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold leading-none text-on-surface-variant">
                  Operational Status
                </div>
                <div className="font-mono font-bold mt-1 text-[11px] sm:text-xs underline decoration-emerald-500/20 underline-offset-3 cursor-default transition-colors text-emerald-600 dark:text-[#9ebc9e] hover:text-emerald-500 dark:hover:text-emerald-300">
                  ALL SYSTEMS NOMINAL
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 2. Navigation Row ── */}
          <motion.div
            variants={itemVariants}
            className="py-10 max-w-6xl mx-auto w-full flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-5 gap-y-3.5 text-xs sm:text-[13px] font-medium"
          >
            {navLinks.map((link, idx) => {
              const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
              
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="select-none text-[10px] sm:text-xs pointer-events-none text-border-fallback-10">·</span>
                  )}
                  
                  {link.isPill ? (
                    <motion.a
                      href={link.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      whileHover="hover"
                      whileTap={{ scale: 0.97 }}
                      className="px-4.5 py-1.5 rounded-full font-semibold transition-colors shadow-sm text-xs sm:text-[13px] tracking-wide flex items-center gap-1.5 cursor-pointer bg-primary text-on-primary hover:bg-primary/95"
                    >
                      <span>{link.label}</span>
                      <motion.span
                        variants={{
                          hover: { x: 3, transition: { type: "spring", stiffness: 350, damping: 10 } }
                        }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ) : (
                    <motion.a
                      href={link.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      animate={{ opacity: isDimmed ? 0.45 : 1 }}
                      transition={{ duration: 0.25 }}
                      className="transition-colors py-1 cursor-pointer font-semibold tracking-wide relative group flex items-center text-on-surface-variant hover:text-primary"
                    >
                      {link.label}
                      {/* Sliding underline */}
                      <span className="absolute bottom-0.5 left-0 w-0 h-micro-1 transition-all duration-300 ease-out group-hover:w-full bg-primary" />
                    </motion.a>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>

          {/* ── 3. Giant Wordmark with Interactive Backlight Spotlight & Tactile Letters ── */}
          <motion.div
            variants={itemVariants}
            onMouseMove={handleWordmarkMouseMove}
            onMouseEnter={() => setIsWordmarkHovered(true)}
            onMouseLeave={() => setIsWordmarkHovered(false)}
            className="py-4 md:py-8 select-none relative flex justify-center items-center overflow-visible w-full max-w-6xl mx-auto cursor-default"
          >
            {/* Dynamic Spotlight Glow Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
              {/* Dynamic Spotlight for Dark Mode */}
              <motion.div
                className="hidden dark:block absolute rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
                  width: "400px",
                  height: "220px",
                  left: mousePos.x - 200,
                  top: mousePos.y - 110,
                  position: "absolute",
                }}
                animate={{
                  scale: isWordmarkHovered ? 1.25 : 0.8,
                  opacity: isWordmarkHovered ? 0.9 : 0,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 22 }}
              />
              {/* Dynamic Spotlight for Light Mode */}
              <motion.div
                className="block dark:hidden absolute rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(25, 25, 21, 0.03) 0%, transparent 60%)",
                  width: "400px",
                  height: "220px",
                  left: mousePos.x - 200,
                  top: mousePos.y - 110,
                  position: "absolute",
                }}
                animate={{
                  scale: isWordmarkHovered ? 1.15 : 0.8,
                  opacity: isWordmarkHovered ? 0.75 : 0,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 22 }}
              />
            </div>

            {/* Letter by Letter interactive spring wordmark */}
            <h2 
              className="font-section-heading font-bold tracking-[-0.04em] leading-none text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.2vw] uppercase text-center transition-colors duration-300 relative z-10 select-none flex items-center justify-center overflow-visible text-primary"
              style={{
                textShadow: "0 0 35px rgba(0, 0, 0, 0.02)",
              }}
            >
              {wordmarkLetters.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block origin-bottom cursor-default transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.06)] dark:hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                  whileHover={{
                    scaleY: 1.05,
                    scaleX: 0.97,
                    y: -6,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          {/* ── 4. Monospace & Serif Copyright Bottom Bar ── */}
          <motion.div
            variants={itemVariants}
            className="pt-6 mt-4 border-t flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-6xl mx-auto w-full transition-colors duration-500 border-border-fallback-10"
          >
            {/* Left elegant Georgia-style serif copyright */}
            <div className="text-center sm:text-left font-serif italic text-xs tracking-wide select-none text-on-surface-variant">
              &copy; 2026 ComponentLab. Engineered with precision. Built for humans.
            </div>

            {/* Right link list (spaced out legal) */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-mono-code text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em]">
              {["PRIVACY", "TERMS", "CONTACT"].map((legal, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="transition-colors duration-250 cursor-pointer text-on-surface-variant hover:text-primary"
                >
                  {legal}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};

export default EngineeringStatusFooter;
