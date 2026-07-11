import React from 'react';
import { motion } from 'framer-motion';

export const StaggeredEntranceHero = ({
  titlePre = "Design systems with",
  highlightWord = "literary",
  titlePost = "soul.",
  description = "We combine the aggressive, engineered precision of compressed gothic typography with the warm, calligraphic soul of classic serifs. A delicate balance of logic and emotion.",
  primaryButtonText = "Explore Typography",
  secondaryButtonText = "View Guidelines",
  onPrimaryClick,
  onSecondaryClick,
  className = ""
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      },
    },
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-4 pb-20 px-4 ${className}`}>
      {/* Hero Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-container-max bg-[#f2f1ed]/50 dark:bg-[#1a1a1a]/50 rounded-[20px] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 p-8 sm:p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(38,37,30,0.08)] dark:hover:shadow-[0_40px_100px_-20px_rgba(253,248,247,0.08)]"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display-hero text-4xl sm:text-5xl md:text-[84px] leading-[1.1] text-[#11100a] dark:text-[#fdf8f7] tracking-tighter mb-8 max-w-4xl"
          >
            {titlePre}{" "}
            <motion.span 
              variants={highlightVariants}
              className="italic text-[#cf2d56]"
            >
              {highlightWord}
            </motion.span>{" "}
            {titlePost}
          </motion.h1>

          {/* Sub-description */}
          <motion.p 
            variants={itemVariants}
            className="font-editorial-body text-xl md:text-2xl text-[#48473f] dark:text-[#fdf8f7]/80 max-w-2xl italic leading-relaxed mb-12 opacity-80"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button onClick={onPrimaryClick} className="bg-[#11100a] dark:bg-[#fdf8f7] text-[#ffffff] dark:text-[#11100a] font-button-label text-button-label px-10 py-5 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-[0.98]">
              {primaryButtonText}
            </button>
            <button onClick={onSecondaryClick} className="bg-transparent border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a] dark:text-[#fdf8f7] font-button-label text-button-label px-10 py-5 rounded-lg hover:bg-[#1c1b1b]/5 dark:hover:bg-[#fdf8f7]/10 transition-all active:scale-[0.98]">
              {secondaryButtonText}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
