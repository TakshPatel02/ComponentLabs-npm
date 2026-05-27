import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  SiNvidia,
  SiGithub,
  SiLaravel,
  SiOpenai,
  SiTailwindcss,
  SiVercel,
  SiZapier,
} from "react-icons/si";

const defaultCompanies = [
  { name: "Nvidia", icon: <SiNvidia />, showText: true },
  { name: "Column", icon: null, showText: true },
  { name: "GitHub", icon: <SiGithub />, showText: true },
  { name: "Nike", icon: null, showText: true },
  { name: "Laravel", icon: <SiLaravel />, showText: true },
  { name: "Lilly", icon: null, showText: true },
  { name: "OpenAI", icon: <SiOpenai />, showText: true },
  { name: "Tailwind", icon: <SiTailwindcss />, showText: true },
  { name: "Vercel", icon: <SiVercel />, showText: true },
  { name: "Zapier", icon: <SiZapier />, showText: true },
];

export const CrosshairLogoCloud = ({
  headline = "ComponentLabs is trusted by leading teams from Generative AI Companies, Hosting Providers, Payments Providers, Streaming Providers",
  companies = defaultCompanies,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full bg-surface-container py-16 px-4 md:px-12 flex flex-col items-center font-sans overflow-hidden rounded-xl border oklab-border ${className}`}
    >
      {/* Interactive Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(120,120,120,0.06), transparent 40%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-4xl text-center mb-12 relative z-10"
      >
        <p className="font-editorial-standard text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {headline}
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto z-10">
        {/* Crosshair markers extending beyond the main border box */}
        <div className="absolute -left-2 top-0 w-4 h-px bg-outline-variant z-10 pointer-events-none"></div>
        <div className="absolute left-0 -top-2 w-px h-4 bg-outline-variant z-10 pointer-events-none"></div>

        <div className="absolute -right-2 top-0 w-4 h-px bg-outline-variant z-10 pointer-events-none"></div>
        <div className="absolute right-0 -top-2 w-px h-4 bg-outline-variant z-10 pointer-events-none"></div>

        <div className="absolute -left-2 bottom-0 w-4 h-px bg-outline-variant z-10 pointer-events-none"></div>
        <div className="absolute left-0 -bottom-2 w-px h-4 bg-outline-variant z-10 pointer-events-none"></div>

        <div className="absolute -right-2 bottom-0 w-4 h-px bg-outline-variant z-10 pointer-events-none"></div>
        <div className="absolute right-0 -bottom-2 w-px h-4 bg-outline-variant z-10 pointer-events-none"></div>

        {/* The Grid Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 border border-outline-variant relative bg-surface-container"
        >
          {companies.map((company, idx) => {
            // Apply right border unless it's the last item in a row
            const isMdRightCol = (idx + 1) % 5 === 0;
            const isSmRightCol = (idx + 1) % 2 === 0;
            const rightBorderClass = `border-r border-outline-variant ${
              isMdRightCol ? "md:border-r-0" : ""
            } ${isSmRightCol ? "max-md:border-r-0" : ""}`;

            // Apply bottom border unless it's in the last row
            const isMdBottomRow = idx >= companies.length - 5;
            const isSmBottomRow = idx >= companies.length - 2;
            const bottomBorderClass = `border-b border-outline-variant ${
              isMdBottomRow ? "md:border-b-0" : ""
            } ${isSmBottomRow && isMdBottomRow ? "max-md:border-b-0" : "max-md:border-b"}`;

            return (
              <div
                key={idx}
                className={`py-10 px-4 flex items-center justify-center relative group/logo transition-colors duration-300 ${rightBorderClass} ${bottomBorderClass} hover:bg-surface-container-highest`}
              >
                <div className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary transition-all duration-500 w-full h-full cursor-pointer grayscale group-hover/logo:grayscale-0 opacity-70 group-hover/logo:opacity-100 group-hover/logo:rotate-1 group-hover/logo:scale-[1.08] active:scale-[0.95]">
                  {company.icon && (
                    <span className="text-2xl md:text-3xl flex items-center drop-shadow-sm group-hover/logo:drop-shadow-md">
                      {company.icon}
                    </span>
                  )}
                  {(company.showText || (!company.icon && company.name)) && (
                    <span className="font-editorial-standard text-xl font-bold tracking-tighter">
                      {company.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};