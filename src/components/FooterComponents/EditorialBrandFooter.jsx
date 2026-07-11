import React, { useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_COLUMNS = [
  {
    title: "PRODUCT",
    links: [
      { label: "Showcase", href: "#" },
      { label: "Components", href: "#" },
      { label: "Pro Templates", href: "#" },
      { label: "Releases", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Figma File", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "License", href: "#" },
    ],
  },
];

export const EditorialBrandFooter = ({
  columns = DEFAULT_COLUMNS,
  wordmarkText = "COMPONENTLAB",
  designLabel = "design",
  copyright = "© 2026 COMPONENTLAB. ALL RIGHTS RESERVED.",
  socialLinks = ["TWITTER", "GITHUB", "DRIBBBLE", "LINKEDIN"],
  className = ""
}) => {
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);

  const handleWordmarkMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const wordmarkLetters = wordmarkText.split("");

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

  // Flattened link index helper for global sibling dimming
  let absoluteLinkCounter = 0;

  return (
    <div>
      <footer className={`w-full font-sans overflow-hidden border-t border-[#11100a]/10 dark:border-[#fdf8f7]/10 transition-colors duration-500 relative bg-[#f1edeb] dark:bg-[#1a1a1a] text-[#11100a] dark:text-[#fdf8f7] ${className}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full p-6 sm:p-10 md:p-14 flex flex-col justify-between"
        >
          {/* Ambient Top Light Reflection Edge Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#11100a]/10 dark:via-[#fdf8f7]/10 to-transparent" />

          {/* ── 1. Top Brand Header Area (Wordmark + Serif design word) ── */}
          <motion.div
            variants={itemVariants}
            onMouseMove={handleWordmarkMouseMove}
            onMouseEnter={() => setIsWordmarkHovered(true)}
            onMouseLeave={() => setIsWordmarkHovered(false)}
            className="pt-6 pb-12 select-none relative flex flex-col items-center justify-center overflow-visible w-full max-w-6xl mx-auto cursor-default"
          >
            {/* Dynamic Spotlight Glow Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
              {/* Spotlight for Dark Mode */}
              <motion.div
                className="hidden dark:block absolute rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 60%)",
                  width: "420px",
                  height: "240px",
                  left: mousePos.x - 210,
                  top: mousePos.y - 120,
                  position: "absolute",
                }}
                animate={{
                  scale: isWordmarkHovered ? 1.25 : 0.8,
                  opacity: isWordmarkHovered ? 0.9 : 0,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 22 }}
              />
              {/* Spotlight for Light Mode */}
              <motion.div
                className="block dark:hidden absolute rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(25, 25, 21, 0.02) 0%, transparent 60%)",
                  width: "420px",
                  height: "240px",
                  left: mousePos.x - 210,
                  top: mousePos.y - 120,
                  position: "absolute",
                }}
                animate={{
                  scale: isWordmarkHovered ? 1.15 : 0.8,
                  opacity: isWordmarkHovered ? 0.75 : 0,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 22 }}
              />
            </div>

            {/* Wordmark with a circled dynamic logo badge */}
            <div className="relative flex items-center justify-center overflow-visible">
              <h2 
                className="font-section-heading font-bold tracking-tighter leading-none text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.2vw] uppercase text-center transition-colors duration-300 relative z-10 select-none flex items-center justify-center overflow-visible text-[#11100a] dark:text-[#fdf8f7]"
              >
                {wordmarkText}
              </h2>

              {/* Centered Segmented Circular Custom SVG Logo Badge matching mockup */}
              <div className="absolute -top-3 md:-top-4 -right-5 md:-right-7 select-none z-20">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 20, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                  whileTap={{ scale: 0.95 }}
                  className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#11100a] dark:bg-[#fdf8f7] shadow-md flex items-center justify-center relative overflow-hidden cursor-pointer border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#fdf8f7] dark:text-[#11100a]"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Concentric rings background */}
                    <circle cx="50" cy="50" r="32" stroke="white" strokeWidth="5" strokeDasharray="4 4" opacity="0.25" />
                    {/* Segmented Quadrants */}
                    <path d="M50 18V38" stroke="#ff5b5b" strokeWidth="11" strokeLinecap="round" /> {/* Red/Orange quadrant */}
                    <path d="M50 62V82" stroke="#4d7eff" strokeWidth="11" strokeLinecap="round" /> {/* Blue quadrant */}
                    <path d="M18 50H38" stroke="#ffbd4a" strokeWidth="11" strokeLinecap="round" /> {/* Yellow/Gold quadrant */}
                    <path d="M62 50H82" stroke="#2ecc71" strokeWidth="11" strokeLinecap="round" /> {/* Green quadrant */}
                    {/* Glowing center core */}
                    <circle cx="50" cy="50" r="9" fill="white" />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Centered flowing lowercase design label in elegant Georgia serif */}
            <motion.div
              variants={itemVariants}
              className="font-serif italic font-normal text-[5.5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[3.2vw] mt-2 select-none z-10 transition-colors duration-300 text-[#48473f] dark:text-[#fdf8f7]/80"
            >
              {designLabel}
            </motion.div>
          </motion.div>

          {/* ── 2. Links Columns Grid Row ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-12 border-t max-w-6xl mx-auto w-full border-[#11100a]/10 dark:border-[#fdf8f7]/10"
          >
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-5">
                <h3 className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#48473f]/60 dark:text-[#fdf8f7]/60">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5 sm:gap-3 text-[13px] sm:text-sm">
                  {col.links.map((link, linkIdx) => {
                    const currentIdx = absoluteLinkCounter++;
                    const isDimmed = hoveredLinkIdx !== null && hoveredLinkIdx !== currentIdx;
                    
                    return (
                      <li key={linkIdx}>
                        <motion.a
                          href={link.href}
                          onMouseEnter={() => setHoveredLinkIdx(currentIdx)}
                          onMouseLeave={() => setHoveredLinkIdx(null)}
                          animate={{ opacity: isDimmed ? 0.45 : 1 }}
                          transition={{ duration: 0.25 }}
                          className="transition-colors duration-200 font-ui-body font-semibold tracking-wide inline-block py-0.5 relative group text-[#48473f] dark:text-[#fdf8f7]/80 hover:text-[#11100a] dark:hover:text-[#fdf8f7]"
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-micro-1 transition-all duration-300 ease-out group-hover:w-full bg-[#11100a] dark:bg-[#fdf8f7]" />
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* ── 3. Monospace copyright and social links bottom row ── */}
          <motion.div
            variants={itemVariants}
            className="pt-6 mt-4 border-t flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between max-w-6xl mx-auto w-full border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#48473f]/80 dark:text-[#fdf8f7]/80"
          >
            {/* Monospace copyright */}
            <div className="text-center sm:text-left font-mono-code text-[10px] sm:text-xs font-semibold uppercase tracking-widest select-none">
              {copyright}
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono-code text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="transition-colors duration-250 cursor-pointer hover:text-[#11100a] dark:hover:text-[#fdf8f7]"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};