import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-Component: The Morphing Action ---
const MorphingAction = () => {
  const [status, setStatus] = useState('idle'); // idle, processing, complete
  const [progress, setProgress] = useState(0);

  const startSequence = () => {
    setStatus('processing');
    setProgress(0);
  };

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStatus('complete'), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col">
        <h4 className="font-editorial-standard text-lg font-medium text-primary">The Morphing Action</h4>
        <p className="font-system-micro text-[11px] text-on-surface-variant/60 uppercase tracking-wider">Primary CTA with integrated progress state.</p>
      </div>

      <div className="bg-surface-container/20 oklab-border rounded-xl p-6 md:p-10 flex items-center justify-center min-h-[180px] md:min-h-[200px] h-full shadow-sm relative overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' || status === 'complete' ? (
            <motion.button
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={startSequence}
              className="bg-surface oklab-border px-8 py-3 rounded-lg shadow-sm font-system-micro text-[12px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center gap-3 active:scale-95"
            >
              {status === 'complete' ? 'Reset Sequence' : 'Initialize Sequence'}
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </motion.button>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0, width: '0%' }}
              animate={{ opacity: 1, width: '100%' }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[280px] h-10 bg-surface-container/60 rounded-lg oklab-border relative overflow-hidden flex items-center px-4"
            >
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-error-warm/10"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
              />
              <div className="relative z-10 flex justify-between w-full font-system-micro text-[10px] font-bold text-primary/70 uppercase tracking-tighter">
                <span>Processing... {progress}%</span>
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="material-symbols-outlined text-[14px]"
                >
                  sync
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub-Component: Precision Parameter Dial ---
const ParameterDial = () => {
  const [value, setValue] = useState(12.5);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col">
        <h4 className="font-editorial-standard text-lg font-medium text-primary">Precision Parameter Dial</h4>
        <p className="font-system-micro text-[11px] text-on-surface-variant/60 uppercase tracking-wider">High-fidelity value adjustment slider.</p>
      </div>

      <div className="bg-surface-container/20 oklab-border rounded-xl p-6 md:p-10 flex flex-col justify-center min-h-[180px] md:min-h-[200px] h-full shadow-sm relative">
        <div className="flex justify-between items-end mb-6">
          <span className="font-system-micro text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40">Border Radius</span>
          <div className="bg-surface oklab-border px-3 py-1 rounded shadow-sm">
            <span className="font-system-micro text-[12px] font-bold text-primary">{value.toFixed(1)}px</span>
          </div>
        </div>
        
        <div className="relative w-full h-8 flex items-center">
          {/* Ticks */}
          <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
            {[...Array(11)].map((_, i) => (
              <div key={i} className={`w-px ${i % 5 === 0 ? 'h-3 bg-primary/20' : 'h-1.5 bg-primary/10'}`} />
            ))}
          </div>
          
          <input
            type="range"
            min="0"
            max="50"
            step="0.5"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="w-full appearance-none bg-transparent cursor-pointer relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border-fallback-10 [&::-webkit-slider-thumb]:shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Atmospheric Accordion ---
const AtmosphericAccordion = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const items = [
    { title: 'Configuration Options', content: 'Base parameters for system initialization.' },
    { 
      title: 'Advanced Heuristics', 
      content: 'The heuristic engine relies on a multi-pass analysis phase. During the initial pass, surface-level tokens are extracted and mapped to the predefined oklab color space to ensure perceptual uniformity across all rendering contexts.',
      tags: ['Token Parsing', 'AST Mapping']
    },
    { title: 'Telemetry Data', content: 'Real-time performance metrics and diagnostics.' }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col">
        <h4 className="font-editorial-standard text-lg font-medium text-primary">Atmospheric Accordion</h4>
        <p className="font-system-micro text-[11px] text-on-surface-variant/60 uppercase tracking-wider">Deep-shadow layered expansion pattern.</p>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className={`rounded-xl oklab-border overflow-hidden transition-all duration-500 ${openIndex === i ? 'bg-surface shadow-[0_20px_40px_rgba(0,0,0,0.1)] scale-[1.01] z-10' : 'bg-surface-container/40 opacity-70'}`}>
            <button 
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full px-6 py-5 flex justify-between items-center hover:bg-on-surface/5 transition-colors"
            >
              <span className="font-editorial-standard text-md font-medium text-primary">{item.title}</span>
              <motion.span 
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                className="material-symbols-outlined text-[18px] text-primary/40"
              >
                expand_more
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="font-editorial-body text-[15px] text-on-surface-variant leading-relaxed max-w-3xl">
                    {item.content}
                  </p>
                  {item.tags && (
                    <div className="flex gap-2 mt-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-system-micro text-[9px] uppercase tracking-wider px-2 py-1 bg-on-surface/5 rounded-md text-primary/60 oklab-border">{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component: The Data Streamer ---
const DataStreamer = () => {
  const data = [
    { timestamp: '14:02:45.102', id: 'EVT-9821', payload: '{"type": "render_pass", "target": "dom_tree"}', latency: '12ms', status: 'optimal' },
    { timestamp: '14:02:45.115', id: 'EVT-9822', payload: '{"type": "style_calc", "nodes": 1402}', latency: '45ms', status: 'optimal' },
    { timestamp: '14:02:45.189', id: 'EVT-9823', payload: '{"type": "paint_commit", "layer": "composite"}', latency: '8ms', status: 'optimal' },
    { timestamp: '14:02:45.201', id: 'ERR-401', payload: '{"error": "timeout", "resource": "font_asset"}', latency: '380ms', status: 'error' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full mt-12">
      <div className="flex flex-col">
        <h4 className="font-editorial-standard text-lg font-medium text-primary">The Data Streamer</h4>
        <p className="font-system-micro text-[11px] text-on-surface-variant/60 uppercase tracking-wider">Technical metrics feed with structural rigidity.</p>
      </div>

      <div className="w-full bg-surface-container/20 oklab-border rounded-xl overflow-x-auto shadow-sm no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-on-surface/5 border-b oklab-border">
              <th className="px-6 py-3 font-system-micro text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-bold">Timestamp</th>
              <th className="px-6 py-3 font-system-micro text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-bold">Event ID</th>
              <th className="px-6 py-3 font-system-micro text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-bold">Payload</th>
              <th className="px-6 py-3 font-system-micro text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-bold text-right">Latency</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border-fallback-10/50 hover:bg-surface transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] text-primary/60">{row.timestamp}</td>
                <td className="px-6 py-4 font-system-micro text-[11px] font-bold text-primary/80">{row.id}</td>
                <td className="px-6 py-4 font-mono text-[11px] text-primary/50 truncate max-w-[400px]">{row.payload}</td>
                <td className={`px-6 py-4 font-system-micro text-[11px] font-bold text-right ${row.status === 'error' ? 'text-error-warm' : 'text-emerald-500'}`}>{row.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DynamicHero = () => {
  return (
    <div className="w-full flex flex-col pt-12 pb-24">
      <div className="w-full max-w-container-max mx-auto flex flex-col gap-16 px-4 md:px-8">
        {/* Row 1: Morphing & Dial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MorphingAction />
          <ParameterDial />
        </div>

        {/* Row 2: Accordion */}
        <AtmosphericAccordion />

        {/* Row 3: Data Streamer */}
        <DataStreamer />
      </div>
    </div>
  );
};

export default DynamicHero;
