import React from "react";
import { motion } from "motion/react";
import { Network } from "lucide-react";

export const CreativeIntelligenceCTA = ({
  headline = "Create with Intelligence",
  subtitle = "Scale your digital footprint through an automated mind that learns your tone, logic, and creative rhythm.",
  ctaText = "Begin Creation",
  onCtaClick,
  imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "Flowing bronze waves representing automated creativity",
  icon = <Network className="w-8 h-8" strokeWidth={1.5} />,
  className = "",
}) => {
  // Stagger entry animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
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
    <div className={`w-full relative overflow-hidden bg-surface-container text-on-surface py-12 md:py-18 flex flex-col items-center justify-center transition-colors duration-300 ${className}`}>
      {/* ── Main Content Container ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative z-10 w-full max-w-5xl px-6 sm:px-10 flex flex-col items-center text-center"
      >
        {/* 1. Centered network node icon styled in metallic bronze/copper */}
        {icon && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.08, rotate: 10, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            className="w-12 h-12 flex items-center justify-center mb-6 text-[#c58c67]"
          >
            {icon}
          </motion.div>
        )}

        {/* 2. Headline */}
        {headline && (
          <motion.h2
            variants={itemVariants}
            className="font-section-heading font-normal tracking-tight text-primary text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] max-w-4xl select-none"
          >
            {headline}
          </motion.h2>
        )}

        {/* 3. Serif Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="font-serif italic font-normal text-on-surface-variant text-base sm:text-lg md:text-[19px] leading-relaxed max-w-2xl mt-6 px-4"
          >
            {subtitle}
          </motion.p>
        )}

        {/* 4. Action Button - Pill Shaped "BEGIN CREATION" */}
        {ctaText && (
          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center select-none"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCtaClick}
              className="px-8 py-3 rounded-full font-button-label text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase bg-surface text-on-surface-variant border border-border-fallback-10 hover:text-primary transition-all duration-200 cursor-pointer shadow-xs"
            >
              {ctaText}
            </motion.button>
          </motion.div>
        )}

        {/* 5. Waves Visual Card - Rounded large card below the button */}
        {imageUrl && (
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 rounded-xl md:rounded-2xl border border-border-fallback-10 overflow-hidden shadow-sm bg-surface"
          >
            <motion.img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-100 object-cover select-none"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreativeIntelligenceCTA;