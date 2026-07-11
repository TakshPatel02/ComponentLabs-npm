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
    <div className={`w-full relative overflow-hidden bg-[#fdf8f7] dark:bg-[#0a0a0a] text-[#11100a] dark:text-[#fdf8f7] py-24 sm:py-32 flex flex-col items-center justify-center min-h-125 transition-colors duration-500 ${className}`}>
      
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
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-[#11100a] dark:bg-[#fdf8f7] text-[#fdf8f7] dark:text-[#11100a] shadow-sm mb-8 border border-[#11100a]/10 dark:border-[#fdf8f7]/10"
          >
            {icon}
          </motion.div>
        )}

        {/* 2. Headline Wrapper containing floated Trust Badge */}
        <motion.div variants={itemVariants} className="relative flex flex-col items-center">
          
          {/* Trust Badge */}
          {badgeText && (
            <div className="md:absolute md:-top-7 md:-right-16 lg:-right-24 mb-4 md:mb-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium tracking-wide shadow-sm border bg-[#f1edeb] dark:bg-[#1a1a1a] border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#48473f] dark:text-[#fdf8f7]/80 whitespace-nowrap">
              <span className="text-amber-500">✨</span>
              <span>{badgeText}</span>
            </div>
          )}

          {/* Headline */}
          {headline && (
            <h2 className="font-section-heading font-medium tracking-tight text-[#11100a] dark:text-[#fdf8f7] text-[38px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] max-w-4xl select-none">
              {headline}
            </h2>
          )}
        </motion.div>

        {/* 3. Serif Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="font-serif italic font-normal text-[#48473f] dark:text-[#fdf8f7]/80 text-base sm:text-lg md:text-[19px] leading-relaxed max-w-3xl mt-8 px-4 sm:px-8"
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-sans font-medium text-sm tracking-wide bg-[#11100a] dark:bg-[#fdf8f7] text-[#fdf8f7] dark:text-[#11100a] hover:bg-[#11100a]/90 dark:hover:bg-[#fdf8f7]/90 transition-all duration-200 cursor-pointer shadow-sm border border-[#11100a]/10 dark:border-[#fdf8f7]/10"
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
              className="font-sans font-medium text-sm text-[#48473f] dark:text-[#fdf8f7]/80 hover:text-[#11100a] dark:hover:text-[#fdf8f7] transition-colors duration-200 flex items-center gap-1.5 py-3.5 cursor-pointer"
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