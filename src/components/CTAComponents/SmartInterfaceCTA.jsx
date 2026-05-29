import React, { useState } from "react";
import { motion } from "motion/react";
import { DraftingCompass } from "lucide-react";

export const SmartInterfaceCTA = ({
  badgeText = "Trusted by 2,000+ Engineers",
  headline = <>The smartest interface <br className="hidden sm:inline" /> decision you’ve ever made.</>,
  subtitle = <>Experience the precision of an engineered design system combined with the soul of <br className="hidden md:inline" /> premium typography. Build faster, feel better.</>,
  primaryCtaText = "Start Building",
  onPrimaryCtaClick,
  secondaryCtaText = "Book a Demo",
  secondaryCtaHref = "#",
  onSecondaryCtaClick,
  icon = <DraftingCompass className="w-6.5 h-6.5 sm:w-7 sm:h-7" strokeWidth={1.5} />,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Stagger entry animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
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
    <div className={`w-full relative overflow-hidden bg-background text-on-surface py-24 sm:py-32 flex flex-col items-center justify-center min-h-125 transition-colors duration-500 ${className}`}>
      
      {/* ── Main Content Container ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative z-10 w-full max-w-5xl px-6 sm:px-10 flex flex-col items-center text-center"
      >
        {/* 1. Centered Drafting Compass Icon */}
        {icon && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-primary text-on-primary shadow-sm mb-8 border border-border-fallback-10"
          >
            {icon}
          </motion.div>
        )}

        {/* 2. Headline Wrapper containing floated Trust Badge */}
        <motion.div variants={itemVariants} className="relative flex flex-col items-center">
          
          {/* Trust Badge */}
          {badgeText && (
            <div className="md:absolute md:-top-7 md:-right-16 lg:-right-24 mb-4 md:mb-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium tracking-wide shadow-sm border bg-surface-container border-border-fallback-10 text-on-surface-variant whitespace-nowrap">
              <span className="text-amber-500">✨</span>
              <span>{badgeText}</span>
            </div>
          )}

          {/* Headline */}
          {headline && (
            <h2 className="font-section-heading font-medium tracking-tight text-primary text-[38px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] max-w-4xl select-none">
              {headline}
            </h2>
          )}
        </motion.div>

        {/* 3. Serif Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="font-serif italic font-normal text-on-surface-variant text-base sm:text-lg md:text-[19px] leading-relaxed max-w-3xl mt-8 px-4 sm:px-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* 4. Actions Row */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 select-none w-full"
        >
          {/* Start Building Action */}
          {primaryCtaText && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPrimaryCtaClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-sans font-medium text-sm tracking-wide bg-primary text-on-primary hover:bg-primary/90 transition-all duration-200 cursor-pointer shadow-sm border border-border-fallback-10"
            >
              {primaryCtaText}
            </motion.button>
          )}

          {/* Book a Demo Link */}
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              onClick={onSecondaryCtaClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="font-sans font-medium text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1.5 py-3.5 cursor-pointer"
            >
              <span>{secondaryCtaText}</span>
              <motion.span
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="inline-block"
              >
                →
              </motion.span>
            </a>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default SmartInterfaceCTA;