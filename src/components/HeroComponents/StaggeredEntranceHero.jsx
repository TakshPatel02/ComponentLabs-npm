import React from 'react';
import { motion } from 'framer-motion';

export const StaggeredEntranceHero = () => {
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
    <div className="w-full flex flex-col items-center justify-center pt-4 pb-20 px-4">
      {/* Hero Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-container-max bg-cursor-cream/50 rounded-[20px] oklab-border p-8 sm:p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(38,37,30,0.08)]"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display-hero text-4xl sm:text-5xl md:text-[84px] leading-[1.1] text-primary tracking-tighter mb-8 max-w-4xl"
          >
            Design systems with{" "}
            <motion.span 
              variants={highlightVariants}
              className="italic text-error-warm"
            >
              literary
            </motion.span>{" "}
            soul.
          </motion.h1>

          {/* Sub-description */}
          <motion.p 
            variants={itemVariants}
            className="font-editorial-body text-xl md:text-2xl text-on-surface-variant max-w-2xl italic leading-relaxed mb-12 opacity-80"
          >
            We combine the aggressive, engineered precision of compressed gothic typography with the warm, calligraphic soul of classic serifs. A delicate balance of logic and emotion.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button className="bg-primary text-on-primary font-button-label text-button-label px-10 py-5 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-[0.98]">
              Explore Typography
            </button>
            <button className="bg-transparent oklab-border text-primary font-button-label text-button-label px-10 py-5 rounded-lg hover:bg-on-surface/5 transition-all active:scale-[0.98]">
              View Guidelines
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
