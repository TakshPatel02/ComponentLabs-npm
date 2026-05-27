import React from "react";
import { motion } from "framer-motion";

const SaaSFooter = () => {
  return (
    <footer className="w-full bg-surface-container pt-8 pb-8 px-4 md:px-8 overflow-hidden">
      {/* Top CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto bg-surface rounded-t-[32px] md:rounded-t-[48px] rounded-b-[16px] md:rounded-b-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/5 dark:border-white/5 pt-16 pb-0 px-6 md:px-12 text-center relative overflow-hidden flex flex-col items-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight w-full text-center"
        >
          Create, Sell and Grow
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-on-surface-variant w-full max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed text-center"
        >
          Join a community of over 1000+ companies and developers who have
          already discovered the power of ComponentLabs.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded-lg font-medium transition-colors z-10 shadow-sm"
        >
          Contact Sales
        </motion.button>

        {/* Decorative Arch Graphic */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 8, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mt-8 w-32 h-24 md:w-48 md:h-32 border-16 md:border-24 border-surface-container rounded-t-[40px] md:rounded-t-[60px] border-b-0 translate-y-2 opacity-80" 
        />
      </motion.div>

      {/* Main Footer Links */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
          }
        }}
        className="max-w-6xl mx-auto mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 px-4 md:px-8"
      >
        {/* Brand & Description */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="col-span-1 md:col-span-4 lg:col-span-5"
        >
          <div className="flex items-center gap-2 mb-4 text-primary">
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
          </div>
          <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
            ComponentLabs is a platform for building AI-powered applications.
          </p>
        </motion.div>

        {/* Links Columns */}
        <div className="col-span-1 md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Product */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4">
            <h4 className="font-semibold text-primary text-sm mb-2">
              Product
            </h4>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Solution
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Partnerships
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Mobile App
            </a>
          </motion.div>

          {/* Company */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4">
            <h4 className="font-semibold text-primary text-sm mb-2">
              Company
            </h4>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Licence
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Privacy
            </a>
          </motion.div>

          {/* Community */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-primary text-sm mb-2">
              Community
            </h4>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <a href="#" className="hover:text-primary transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Legal/Status */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-6xl mx-auto mt-16 md:mt-24 pt-8 border-t border-gray-200 border-dashed dark:border-white/10 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-sm text-on-surface-variant">
          © 2026 ComponentLabs, All rights reserved
        </p>
        <button className="flex items-center gap-2 bg-surface/50 border border-black/5 dark:border-white/10 rounded-full px-4 py-1.5 shadow-sm text-sm font-medium text-primary transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95">
          <span className="w-2 h-2 rounded-full bg-emerald-400 relative">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
          </span>
          All Systems Normal
        </button>
      </motion.div>
    </footer>
  );
};

export default SaaSFooter;
