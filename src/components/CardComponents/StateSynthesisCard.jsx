import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { RefreshCw, Play, Check, ExternalLink } from 'lucide-react';

const Counter = ({ value, duration = 1.5 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = animate(0, value, { duration, ease: "easeOut", onUpdate: v => { if (ref.current) ref.current.textContent = `${Math.floor(v)}%`; } });
    return () => c.stop();
  }, [value, duration]);
  return <span ref={ref}>0%</span>;
};

const slide = { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -15 }, transition: { duration: 0.3, ease: "easeOut" } };

const CIRC = 2 * Math.PI * 22; // ~138.2

const STATES = [
  { key: "idle", title: "SYSTEM IDLE", sub: "Awaiting user interaction",
    icon: <div className="w-[52px] h-[52px] rounded-full bg-[#1c1b1b]/5 dark:bg-[#fdf8f7]/5 group-hover:bg-[#1c1b1b]/10 dark:group-hover:bg-[#fdf8f7]/10 transition-colors flex items-center justify-center"><Play size={20} className="text-[#48473f]/60 dark:text-[#fdf8f7]/60 ml-1" /></div>,
    titleColor: "text-[#11100a] dark:text-[#fdf8f7]", subColor: "text-[#48473f]/40 dark:text-[#fdf8f7]/40" },
  { key: "processing", title: "PROCESSING REQUEST", sub: "TID: 0x442-99B",
    icon: (
      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-sm">
          <circle cx="26" cy="26" r="22" stroke="currentColor" className="text-[#1c1b1b]/10 dark:text-[#fdf8f7]/10" strokeWidth="2.5" fill="none" />
          <motion.circle cx="26" cy="26" r="22" stroke="currentColor" className="text-[#cf2d56]" strokeWidth="2.5" fill="none" strokeDasharray={CIRC} initial={{ strokeDashoffset: CIRC }} animate={{ strokeDashoffset: CIRC * 0.32 }} transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round" />
        </svg>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><RefreshCw size={20} className="text-[#cf2d56]" /></motion.div>
      </div>
    ),
    titleColor: "text-[#11100a] dark:text-[#fdf8f7]", subColor: "text-[#48473f]/40 dark:text-[#fdf8f7]/40",
    counter: { value: 68, color: "text-[#cf2d56]" } },
  { key: "success", title: "SYNTHESIS COMPLETE", sub: "Data stream verified",
    icon: (
      <div className="w-[52px] h-[52px] rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}><Check size={24} className="text-emerald-500" /></motion.div>
      </div>
    ),
    titleColor: "text-emerald-500", subColor: "text-emerald-500/40",
    counter: { value: 100, duration: 0.8, color: "text-emerald-500" } },
];

export const StateSynthesisCard = ({
  states = STATES,
  title = "State Synthesis",
  description = "Seamlessly transitioning between user input and background processing.",
  badgeText = "Interactive Morph",
  className = ""
}) => {
  const [step, setStep] = useState(1);

  return (
    <div className={`w-full flex justify-center py-12 px-4 ${className}`}>
      <div className="bg-[#fdf8f7] dark:bg-[#1a1a1a] rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 flex flex-col gap-8 max-w-2xl w-full cursor-pointer group transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]" onClick={() => setStep(s => (s + 1) % 3)}>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[28px] text-[#11100a] dark:text-[#fdf8f7] font-medium mb-3 tracking-tight">{title}</h2>
            <p className="text-[#48473f]/60 dark:text-[#fdf8f7]/60 font-serif text-lg leading-relaxed">{description}</p>
          </div>
          <div className="bg-[#1c1b1b]/5 dark:bg-[#fdf8f7]/5 text-[#11100a]/60 dark:text-[#fdf8f7]/60 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mt-2">{badgeText}</div>
        </div>

        <div className="bg-[#f1edeb]/30 dark:bg-[#11100a]/30 rounded-xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] p-2 min-h-[140px] flex items-center relative overflow-hidden mt-2 transition-colors">
          <AnimatePresence mode="wait">
            {states.map((s, i) => step === i && (
              <motion.div key={s.key} className="flex flex-col sm:flex-row items-center sm:items-center w-full px-4 sm:px-6 py-4 sm:py-3 gap-4 sm:gap-0" {...slide}>
                <div className="flex items-center shrink-0 sm:mr-6">
                  {s.icon}
                </div>
                <div className="flex flex-col grow text-center sm:text-left">
                  <span className={`text-[16px] font-bold tracking-tight mb-0.5 ${s.titleColor}`}>{s.title}</span>
                  <span className={`text-[14px] font-serif ${s.subColor}`}>{s.sub}</span>
                </div>
                {s.counter && (
                  <div className={`font-bold text-base tracking-wide mt-2 sm:mt-0 sm:mr-2 ${s.counter.color}`}>
                    <Counter value={s.counter.value} duration={s.counter.duration} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          {[0, 1, 2].map(i => <motion.div key={i} className={`w-2 h-2 rounded-full ${step === i ? 'bg-[#cf2d56]' : 'bg-[#1c1b1b]/10 dark:bg-[#fdf8f7]/10'}`} layout transition={{ duration: 0.3 }} />)}
        </div>

        <div className="border-t border-[#11100a]/10 dark:border-[#fdf8f7]/10 pt-8 mt-2 flex justify-between items-center transition-colors">
          <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#48473f]/40 dark:text-[#fdf8f7]/40">Framer Motion API: AnimatePresence</span>
          <ExternalLink size={16} className="text-[#48473f]/20 dark:text-[#fdf8f7]/20" />
        </div>
      </div>
    </div>
  );
};