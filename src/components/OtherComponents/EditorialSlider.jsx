import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VintageFader = ({ 
  min = 0, 
  max = 100, 
  defaultValue = 50, 
  step = 1,
  onChange 
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateValueFromEvent(e);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateValueFromEvent(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const updateValueFromEvent = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const rawValue = (x / rect.width) * (max - min) + min;
    
    // Apply step
    let steppedValue = Math.round(rawValue / step) * step;
    steppedValue = Math.max(min, Math.min(max, steppedValue));
    
    setValue(steppedValue);
    if (onChange) onChange(steppedValue);
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none touch-none font-ui-body py-4 px-2">
      {/* Vintage Labeling */}
      <div className="flex justify-between items-end border-b oklab-border pb-2 transition-colors">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-widest text-on-surface-variant/60 font-bold uppercase">
            CH 1. Master
          </span>
          <span className="font-editorial-standard text-[18px] italic text-primary">
            Gain Fader
          </span>
        </div>
        
        {/* Analog VU readout style */}
        <div className="bg-[#1A1A1A] p-1.5 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.5)]">
          <span className="font-mono text-[16px] text-[#FF4500] font-bold tracking-widest" style={{ textShadow: '0 0 8px rgba(255,69,0,0.6)' }}>
            {Math.round(value).toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <div 
        className="relative w-full h-16 flex items-center cursor-pointer group mt-4"
        onPointerDown={handlePointerDown}
      >
        {/* Tick Marks (Analog Scale) */}
        <div className="absolute left-0 right-0 -top-gutter flex justify-between px-2 pointer-events-none">
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
            <div key={tick} className="flex flex-col items-center">
              <div className={`w-[2px] bg-on-surface/20 transition-colors ${tick % 50 === 0 ? 'h-3' : 'h-1.5'}`} />
              {tick % 50 === 0 && (
                <span className="font-mono text-[8px] text-on-surface-variant/40 mt-1 font-bold">{tick}</span>
              )}
            </div>
          ))}
        </div>

        {/* Deep Recessed Track */}
        <div 
          ref={trackRef}
          className="absolute left-0 right-0 h-4 bg-on-surface/90 dark:bg-black rounded-sm overflow-hidden shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] border-b oklab-border transition-colors"
        >
          {/* Subtle Track Fill (Optional, vintage faders usually don't have fill, but a dim glow looks cool) */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-linear-to-r from-[#8A3324] to-[#C08532] opacity-40 origin-left"
            style={{ width: `${percentage}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>

        {/* Chunky Vintage Fader Knob */}
        <motion.div 
          className="absolute top-1/2 -mt-md w-12 h-lg rounded-[4px] bg-linear-to-b from-surface to-surface-container oklab-border flex items-center justify-center z-10 cursor-grab active:cursor-grabbing transition-colors"
          style={{ 
            left: `calc(${percentage}% - 24px)`,
            boxShadow: '0 8px 12px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,1), inset 0 -2px 4px rgba(0,0,0,0.2)'
          }}
          animate={{
            scale: isDragging ? 1.02 : 1,
            y: isDragging ? 2 : 0,
            boxShadow: isDragging 
              ? '0 12px 20px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,1), inset 0 -2px 4px rgba(0,0,0,0.2)' 
              : '0 8px 12px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,1), inset 0 -2px 4px rgba(0,0,0,0.2)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Inner Index Line (The classic white/black stripe) */}
          <div className="w-[85%] h-[4px] bg-on-surface/80 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
        </motion.div>
      </div>
    </div>
  );
};
