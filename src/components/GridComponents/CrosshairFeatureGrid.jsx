import React from 'react';
import { motion } from 'framer-motion';

const Crosshair = ({ top, left, bottom, right }) => (
  <div 
    className="absolute w-4 h-4 flex items-center justify-center z-10 pointer-events-none"
    style={{ top, left, bottom, right, transform: 'translate(-50%, -50%)' }}
  >
    <div className="absolute w-px h-full bg-on-surface opacity-20"></div>
    <div className="absolute h-px w-full bg-on-surface opacity-20"></div>
  </div>
);

const FeatureCell = ({ title, description, icon, delay, borderRight = false, borderBottom = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`
        group/cell relative flex flex-col p-8 md:p-10 cursor-default bg-surface text-primary 
        hover:bg-on-surface hover:text-surface transition-colors duration-500
        ${borderRight ? 'oklab-border border-r' : ''}
        ${borderBottom ? 'oklab-border border-b' : ''}
      `}
    >
      <div className="mb-6 text-primary group-hover/cell:text-surface transition-colors duration-500">
        {icon}
      </div>
      <h3 className="font-section-heading text-xl md:text-2xl mb-2 font-bold">{title}</h3>
      <p className="font-editorial-standard text-[16px] opacity-80 leading-relaxed max-w-[280px]">
        {description}
      </p>
    </motion.div>
  );
};

const CrosshairFeatureGrid = () => {
  return (
    <div className="w-full flex justify-center items-center">
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 w-full oklab-border rounded-sm overflow-hidden shadow-sm bg-surface">
        
        {/* Row 1 */}
        <FeatureCell 
          title="Component Architecture" 
          description="Modular UI patterns designed for infinite scalability and minimal friction."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
          borderRight
          borderBottom
          delay={0.1}
        />
        <FeatureCell 
          title="Semantic Variables" 
          description="Strict adherence to tokenized color palettes and spacing scales."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
          borderRight
          borderBottom
          delay={0.2}
        />
        <FeatureCell 
          title="Interaction Design" 
          description="Fluid, physics-based micro-interactions powered by Framer Motion."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
          borderBottom
          delay={0.3}
        />

        {/* Row 2 */}
        <FeatureCell 
          title="Type Hierarchy" 
          description="Editorial layout structures using dynamic, responsive font scaling."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>}
          borderRight
          delay={0.4}
        />
        <FeatureCell 
          title="Dark Mode Support" 
          description="Automatic color inversion with perceptually balanced contrast ratios."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>}
          borderRight
          delay={0.5}
        />
        <FeatureCell 
          title="Accessibility First" 
          description="ARIA compliance, keyboard navigation, and screen reader readiness."
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
          delay={0.6}
        />

        {/* Internal Crosshair Markers (Hidden on small screens since it stacks) */}
        <div className="hidden md:block">
          <Crosshair top="50%" left="33.33%" />
          <Crosshair top="50%" left="66.66%" />
        </div>

      </div>
    </div>
  );
};

export default CrosshairFeatureGrid;
