import React from "react";
import { motion } from "framer-motion";
import { Zap, SlidersHorizontal, Sparkles } from "lucide-react";

const defaultFeatures = [
  {
    icon: Zap,
    title: "Customizable",
    description: "Extensive customization options, allowing you to tailor every aspect to meet your specific needs.",
    accentClass: "text-amber-500 group-hover:text-amber-400 dark:group-hover:text-amber-400",
    spotlightBg: "rgba(245, 158, 11, 0.07)",
    spotlightBorder: "rgba(245, 158, 11, 0.25)"
  },
  {
    icon: SlidersHorizontal,
    title: "You have full control",
    description: "From design elements to functionality, you have complete control to create a unique and personalized experience.",
    accentClass: "text-indigo-500 group-hover:text-indigo-400 dark:group-hover:text-indigo-400",
    spotlightBg: "rgba(99, 102, 241, 0.07)",
    spotlightBorder: "rgba(99, 102, 241, 0.25)"
  },
  {
    icon: Sparkles,
    title: "Powered By AI",
    description: "Elements to functionality, you have complete control to create a unique and personalized experience.",
    accentClass: "text-emerald-500 group-hover:text-emerald-400 dark:group-hover:text-emerald-400",
    spotlightBg: "rgba(16, 185, 129, 0.07)",
    spotlightBorder: "rgba(16, 185, 129, 0.25)"
  }
];

const TechnicalGrid = () => (
  <div className="relative w-36 h-36 flex items-center justify-center select-none overflow-hidden rounded-lg bg-[#fdf8f7] dark:bg-[#1a1a1a] transition-colors duration-300">
    {/* SVG technical blueprint grid */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.12] transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="techGrid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-[#11100a] dark:text-[#fdf8f7]" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGrid)" />
      {/* Dynamic central crosshair */}
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#11100a] dark:text-[#fdf8f7]" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#11100a] dark:text-[#fdf8f7]" />
    </svg>

    {/* Elegant crosshair corner marks */}
    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#11100a]/20 dark:border-[#fdf8f7]/40"></span>
    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#11100a]/20 dark:border-[#fdf8f7]/40"></span>
    <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#11100a]/20 dark:border-[#fdf8f7]/40"></span>
    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#11100a]/20 dark:border-[#fdf8f7]/40"></span>

    {/* Glowing indicator rings */}
    <div className="absolute w-24 h-24 rounded-full border border-[#11100a]/10 dark:border-[#fdf8f7]/10 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-[#11100a]/10 dark:border-[#fdf8f7]/20 border-dashed"></div>
    </div>
  </div>
);

export const InteractiveSpotlightFeatures = ({
  title = "Built to cover your needs",
  description = "A suite of modular, high-performance primitives engineered to give you absolute control over your digital product's design, customization, and intelligence.",
  features = defaultFeatures,
  className = ""
}) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className={`w-full relative overflow-hidden bg-[#fdf8f7] dark:bg-[#1a1a1a] text-[#11100a] dark:text-[#fdf8f7] py-14 sm:py-18 flex justify-center items-center transition-colors duration-300 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-6xl px-6 sm:px-10 flex flex-col gap-16 md:gap-20"
      >
        {/* Header Block */}
        <motion.div variants={itemVariants} className="text-center flex flex-col items-center gap-4">
          <h2 className="font-section-heading text-[36px] md:text-[44px] font-bold leading-tight tracking-tight text-[#11100a] dark:text-[#fdf8f7]">
            {title}
          </h2>
          <p className="font-ui-body text-base md:text-lg text-[#48473f] dark:text-[#fdf8f7]/80 max-w-2xl leading-relaxed select-none">
            {description}
          </p>
        </motion.div>

        {/* 3-Column Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseMove={handleMouseMove}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative p-px rounded-2xl overflow-hidden bg-[#11100a]/10 dark:bg-[#fdf8f7]/10 hover:bg-transparent transition-all duration-500 cursor-default"
                style={{
                  "--spotlight-bg": feature.spotlightBg,
                  "--spotlight-border": feature.spotlightBorder
                }}
              >
                {/* 1. Outer Border Spotlight Glow (Outside card content boundary) */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), 
                      var(--spotlight-border), 
                      transparent 80%)`
                  }}
                />

                {/* 2. Inner Card Content Layer */}
                <div className="relative flex flex-col items-center text-center p-8 lg:p-10 rounded-[15px] bg-[#fdf8f7] dark:bg-[#1a1a1a] group-hover:bg-[#fdf8f7]/95 dark:group-hover:bg-[#1a1a1a]/95 overflow-hidden transition-all duration-300 z-10 w-full h-full">
                  {/* 3. Inner Background Spotlight Glow (Inside card content boundary) */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{
                      background: `radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), 
                        var(--spotlight-bg), 
                        transparent 80%)`
                    }}
                  />

                  {/* Grid Visual Layer with Icon */}
                  <div className="relative mb-8 z-10">
                    <TechnicalGrid />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-3.5 rounded-xl bg-[#f1edeb] dark:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 shadow-sm transition-colors duration-300 ${feature.accentClass}`}
                      >
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Metadata Details */}
                  <div className="flex flex-col gap-3.5 z-10 relative select-none">
                    <h3 className="font-section-heading text-lg md:text-xl font-bold tracking-tight text-[#11100a] dark:text-[#fdf8f7] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-ui-body text-[14px] leading-relaxed text-[#48473f]/80 dark:text-[#fdf8f7]/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};