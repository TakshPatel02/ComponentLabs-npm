import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Zap, SlidersHorizontal, Image } from 'lucide-react';

const DepthPerceptionCard = () => {
  const [layers, setLayers] = useState(2);
  const [executed, setExecuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [fanned, setFanned] = useState(false);

  const execute = () => {
    if (executed) return;
    setExecuted(true);
    setFanned(true);

    // Fan out → show toast → collapse back
    setTimeout(() => setShowToast(true), 400);
    setTimeout(() => {
      setFanned(false);
      setTimeout(() => {
        setShowToast(false);
        setExecuted(false);
      }, 1800);
    }, 1600);
  };

  const addLayer = () => setLayers(l => Math.min(l + 1, 5));

  // Build layer configs (back to front)
  const layerConfigs = Array.from({ length: layers }, (_, i) => {
    const isTop = i === layers - 1;
    const base = layers - 1 - i; // 0 for top, increasing for back
    return {
      rotate: fanned ? (i - Math.floor(layers / 2)) * 12 : -3 + base * 3,
      x: fanned ? (i - Math.floor(layers / 2)) * 40 : base * 6,
      y: fanned ? -10 : base * 8,
      scale: 1 - base * 0.03,
      shadow: `0 ${20 + base * 15}px ${40 + base * 30}px rgba(0,0,0,${0.04 + base * 0.02})`,
      isTop,
    };
  });

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="bg-[#fdf8f7] rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] oklab-border w-full relative overflow-hidden transition-colors">

        {/* + Button */}
        <motion.button
          onClick={addLayer}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#11100a] text-[#ffffff] flex items-center justify-center z-20 shadow-lg cursor-pointer hover:bg-[#cf2d56] transition-colors"
        >
          <Plus size={20} />
        </motion.button>

        {/* Header */}
        <h2 className="text-[26px] text-[#11100a] font-medium tracking-tight mb-2">Depth Perception</h2>
        <p className="text-[#48473f]/40 text-[16px] mb-10">Layered elements using atmospheric shadows and Z-index offsets.</p>

        {/* Stack area */}
        <div className="relative w-full h-[280px] flex items-center justify-center mb-6">
          
          {/* Notification Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, x: 30 }}
                animate={{ opacity: 1, y: 0, x: 30 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-0 right-0 z-30 bg-[#fdf8f7] rounded-xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] oklab-border flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#cf2d56]/10 flex items-center justify-center">
                  <Zap size={14} className="text-[#cf2d56]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold tracking-widest uppercase text-[#11100a]/70 block">Action Triggered</span>
                  <span className="text-[11px] text-[#48473f]/40">24ms ago</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cards */}
          <AnimatePresence>
            {layerConfigs.map((cfg, i) => (
              <motion.div
                key={i}
                className="absolute w-[220px] h-[200px] rounded-2xl oklab-border bg-linear-to-br from-[#ebeae5] to-[#f1edeb] flex items-center justify-center transition-colors"
                animate={{
                  rotate: cfg.rotate,
                  x: cfg.x,
                  y: cfg.y,
                  scale: cfg.scale,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                style={{ boxShadow: cfg.shadow, zIndex: i + 1 }}
              >
                {cfg.isTop && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#48473f]/20">
                    <path d="M12 2l5 10H7l5-10z" /><path d="M12 22l-5-10h10l-5 10z" />
                  </svg>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Execute Button */}
          <motion.button
            onClick={execute}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="absolute bottom-0 z-20 bg-[#11100a] text-[#ffffff] px-7 py-3 rounded-full text-[14px] font-medium flex items-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#cf2d56] transition-colors"
          >
            Execute Function <Image size={16} />
          </motion.button>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-6 pt-6 oklab-border border-t transition-colors">
          <p className="text-[10px] tracking-[0.12em] uppercase text-[#48473f]/40 leading-relaxed max-w-[280px] font-medium">
            Atmospheric shadows utilize 70px blurs with ultra-low opacity for depth without visual clutter.
          </p>
          <div className="w-9 h-9 rounded-full oklab-border flex items-center justify-center text-[#48473f]/40 hover:text-[#11100a] transition-colors cursor-pointer">
            <SlidersHorizontal size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthPerceptionCard;
