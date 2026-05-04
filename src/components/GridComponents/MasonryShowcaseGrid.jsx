import React from 'react';
import { motion } from 'framer-motion';

const ShowcaseCard = ({ category, title, previewHeight, caption, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group/card break-inside-avoid mb-6 bg-surface oklab-border hover:border-error-warm transition-all duration-300 p-2 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
    >
      <div className="p-4 flex justify-between items-start">
        <div>
          <span className="font-system-micro text-[10px] tracking-[0.15em] text-on-surface-variant/40 uppercase group-hover/card:text-error-warm transition-colors duration-300 block mb-2">
            {category}
          </span>
          <h3 className="font-section-heading text-2xl text-primary leading-tight">{title}</h3>
        </div>
        <button className="text-on-surface-variant/40 hover:text-primary transition-colors p-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      
      {/* Interactive Preview Area */}
      <div 
        className="w-full bg-[#1A1A1A] rounded-[8px] flex items-center justify-center overflow-hidden relative mt-2"
        style={{ height: previewHeight }}
      >
        <div className="w-16 h-16 bg-white/5 rounded-full blur-xl absolute" />
        <div className="w-20 h-10 bg-white/10 rounded-md backdrop-blur-sm border border-white/10 shadow-sm" />
      </div>

      <div className="p-4">
        <p className="font-editorial-standard italic text-on-surface-variant/60 text-sm">{caption}</p>
      </div>
    </motion.div>
  );
};

const MasonryShowcaseGrid = () => {
  return (
    <div className="w-full">
      <div className="columns-1 md:columns-3 gap-6 space-y-6">
        <ShowcaseCard 
          category="Feedback"
          title="Toast Notifications"
          previewHeight="200px"
          caption="A transient message component for non-interruptive updates."
          delay={0.1}
        />
        <ShowcaseCard 
          category="Navigation"
          title="Command Palette"
          previewHeight="320px"
          caption="Fast, keyboard-driven navigation interface."
          delay={0.2}
        />
        <ShowcaseCard 
          category="Data Entry"
          title="Date Picker"
          previewHeight="260px"
          caption="Calendar interface for precise date selection."
          delay={0.3}
        />
        <ShowcaseCard 
          category="Data Display"
          title="Hover Cards"
          previewHeight="240px"
          caption="Secondary information displayed on hover."
          delay={0.4}
        />
        <ShowcaseCard 
          category="Feedback"
          title="Skeleton Loaders"
          previewHeight="180px"
          caption="Placeholder content for asynchronous operations."
          delay={0.5}
        />
        <ShowcaseCard 
          category="Navigation"
          title="Breadcrumbs"
          previewHeight="140px"
          caption="Hierarchical navigation indicators."
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default MasonryShowcaseGrid;
