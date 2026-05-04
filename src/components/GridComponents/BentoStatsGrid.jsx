import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

const AnimatedCounter = ({ from, to, duration = 2, delay = 0, suffix = "" }) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(v) {
        setValue(Math.floor(v));
      }
    });
    return () => controls.stop();
  }, [from, to, duration, delay]);

  return <span>{value}{suffix}</span>;
};

const Sparkline = ({ color, reversed = false }) => {
  const d = reversed 
    ? "M0 30 Q 20 10, 40 25 T 80 15 T 100 20" 
    : "M0 40 Q 25 20, 50 30 T 100 10";
    
  const fillD = reversed
    ? "M0 30 Q 20 10, 40 25 T 80 15 T 100 20 L100 100 L0 100 Z"
    : "M0 40 Q 25 20, 50 30 T 100 10 L100 100 L0 100 Z";

  return (
    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        d={fillD}
        fill={color}
        stroke="none"
      />
    </svg>
  );
};

const StatCard = ({ title, value, tag, className, delay, accentColor = "#B09E99", showGraph = false, reversedSparkline = false, suffix = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative bg-surface-container/60 rounded-[16px] oklab-border p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-300 ${className}`}
    >
      <div className="relative z-10 flex justify-between items-start mb-6">
        <span className="font-system-micro text-[10px] tracking-[0.2em] text-on-surface-variant/40 uppercase">
          {tag}
        </span>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      
      <div className="mt-auto relative z-10">
        <h3 className="font-editorial-standard text-primary/80 text-lg mb-1">{title}</h3>
        <div className="font-section-heading text-primary text-4xl md:text-5xl mb-2">
          <AnimatedCounter from={0} to={value} suffix={suffix} />
        </div>
      </div>

      {showGraph && (
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-60 pointer-events-none">
          <Sparkline color={accentColor} reversed={reversedSparkline} />
        </div>
      )}
    </motion.div>
  );
};

const BentoStatsGrid = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] gap-4 md:gap-6">
        
        {/* Large Card 1 */}
        <StatCard 
          className="md:col-span-2 md:row-span-2 h-[280px] md:h-[340px]" 
          tag="COMPONENTS" 
          title="Total UI Elements" 
          value={142} 
          delay={0.1}
          accentColor="#C8A6A6" // Dusty Rose
          showGraph={true}
        />
        
        {/* Small Card 1 */}
        <StatCard 
          className="md:col-span-1 md:row-span-1 h-[140px] md:h-[160px]" 
          tag="NPM INSTALLS" 
          title="Weekly DLs" 
          value={8540} 
          delay={0.2}
          accentColor="#9A9F8E" // Olive
          suffix="+"
        />

        {/* Small Card 2 */}
        <StatCard 
          className="md:col-span-1 md:row-span-1 h-[140px] md:h-[160px]" 
          tag="STARS" 
          title="Github Repo" 
          value={329} 
          delay={0.3}
          accentColor="#D0B8A8" // Muted Beige
        />

        {/* Small Card 3 (Bottom Left) */}
        <StatCard 
          className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-[140px] md:h-[160px]" 
          tag="LATENCY" 
          title="Avg Render" 
          value={12} 
          delay={0.4}
          accentColor="#9A9F8E"
          suffix="ms"
        />

        {/* Small Card 4 (Bottom Left) */}
        <StatCard 
          className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3 h-[140px] md:h-[160px]" 
          tag="COVERAGE" 
          title="Test Suite" 
          value={98} 
          delay={0.5}
          accentColor="#D0B8A8"
          suffix="%"
        />

        {/* Large Card 2 */}
        <StatCard 
          className="md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-2 h-[280px] md:h-[340px]" 
          tag="RETENTION" 
          title="Active Monthly Users" 
          value={12050} 
          delay={0.6}
          accentColor="#C8A6A6"
          suffix="+"
          showGraph={true}
          reversedSparkline
        />

      </div>
    </div>
  );
};

export default BentoStatsGrid;
