import React from "react";
import { motion } from "framer-motion";

const MinimalFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <footer className="w-full bg-surface-container border-t oklab-border py-16 px-4 md:px-8 font-ui-body">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Top Section */}
        <div className="flex flex-col items-start gap-4 mb-12">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <path d="M10 10l4 4" />
              <path d="M14 10l-4 4" />
            </svg>
            <span className="font-bold text-xl tracking-tight text-primary">
              ComponentLabs
            </span>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-on-surface-variant max-w-2xl text-sm md:text-base leading-relaxed"
          >
            The modern integration platform for teams who ship fast and build
            beautiful interfaces.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-5 mt-2">
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              {/* Twitter/X icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              {/* GitHub icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 active:scale-95"
            >
              {/* LinkedIn icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Links Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-black/10 dark:border-white/10 py-8 flex flex-wrap gap-x-8 gap-y-4"
        >
          {["Home", "Features", "Pricing", "About", "Blog", "Contact"].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            )
          )}
        </motion.div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-black/10 dark:border-white/10">
          <p className="text-sm text-on-surface-variant/70">
            © 2026 ComponentLabs, Inc. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default MinimalFooter;
