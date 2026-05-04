import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const STEPS = [
  { label: "THINKING", desc: "Analyzing repository structures and context graph.", dot: "#C4856C", color: "#C4856C" },
  { label: "GREP SEARCH", desc: "Identifying specific class definitions and imports.", dot: "#6B9E6B", color: "#6B9E6B" },
  { label: "READING", desc: "Parsing local file contents for logic verification.", dot: "#7B9EC4", color: "#7B9EC4" },
  { label: "EDIT CODE", desc: "Applying suggested modifications to target lines.", dot: "#A0A0A0", color: "#A0A0A0" },
];

const DELAY = 1200;

const AgenticFlowCard = () => {
  const [visible, setVisible] = useState(0);
  const [phase, setPhase] = useState("running"); // running | review | accepted | rejected
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    if (visible < STEPS.length) {
      const t = setTimeout(() => setVisible(v => v + 1), DELAY);
      return () => clearTimeout(t);
    }
    // All steps shown — wait a beat then show review
    const t = setTimeout(() => setPhase("review"), 800);
    return () => clearTimeout(t);
  }, [visible, phase]);

  // Progress bar syncs with step count
  useEffect(() => {
    if (phase === "running") setProgress((visible / STEPS.length) * 100);
    else if (phase === "review") setProgress(100);
  }, [visible, phase]);

  const reset = () => { setVisible(0); setPhase("running"); setProgress(0); };

  return (
    <div className="w-full flex justify-center py-12 px-4">
      <div className="relative bg-surface rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] oklab-border w-full overflow-hidden transition-colors">

        <h2 className="text-[26px] text-primary font-medium mb-8 tracking-tight">Agentic Flow</h2>

        {/* Steps */}
        <div className="flex flex-col gap-1 mb-8">
          <AnimatePresence>
            {STEPS.slice(0, visible).map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="flex gap-4 py-4">
                {/* Dot + line */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.dot }} />
                  {i < STEPS.length - 1 && <div className="w-px grow bg-on-surface-variant/20 mt-1" />}
                </div>
                {/* Text */}
                <div>
                  <span className="text-[13px] font-bold tracking-[0.15em] uppercase block mb-1.5" style={{ color: s.color }}>{s.label}</span>
                  <p className="text-[16px] text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom status / review */}
        <AnimatePresence mode="wait">
          {phase === "running" && (
            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-on-surface/5 rounded-xl px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[15px] text-primary/80 font-medium">Awaiting completion signal...</span>
              </div>
              <span className="text-[13px] text-on-surface-variant/40 ml-[18px]">Processing latency: 124ms</span>
            </motion.div>
          )}

          {phase === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="bg-on-surface/5 rounded-xl px-5 py-4">
              <p className="text-[15px] text-primary/70 mb-4">Changes ready. Apply modifications?</p>
              <div className="flex gap-3">
                <button onClick={() => setPhase("accepted")} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 text-white text-[14px] font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"><Check size={15} /> Accept</button>
                <button onClick={() => setPhase("rejected")} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-on-surface/10 text-on-surface-variant text-[14px] font-semibold hover:bg-error-warm/10 hover:text-error-warm transition-colors cursor-pointer"><X size={15} /> Reject</button>
              </div>
            </motion.div>
          )}

          {phase === "accepted" && (
            <motion.div key="accepted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-[14px] text-emerald-800 font-medium">Changes applied successfully.</span></div>
              <button onClick={reset} className="text-[12px] text-emerald-600 underline underline-offset-2 hover:text-emerald-800 cursor-pointer">Replay</button>
            </motion.div>
          )}

          {phase === "rejected" && (
            <motion.div key="rejected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-[14px] text-red-800 font-medium">Changes discarded.</span></div>
              <button onClick={reset} className="text-[12px] text-red-600 underline underline-offset-2 hover:text-red-800 cursor-pointer">Replay</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgenticFlowCard;
