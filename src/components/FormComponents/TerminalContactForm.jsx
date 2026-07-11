import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw, Send } from 'lucide-react';

/* Tiny typewriter — types out `text` char-by-char then calls onDone */
function Typer({ text, onDone, speed = 30 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return (
    <>
      {text.slice(0, i)}
      {i < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          className="inline-block w-2.5 h-[18px] bg-neutral-400 ml-1 align-text-bottom"
        />
      )}
    </>
  );
}

const defaultFields = [
  { key: 'email', prompt: 'To start, could you give us ', hl: 'your email?', type: 'email', ph: 'you@example.com' },
  { key: 'name', prompt: "Awesome! And what's ", hl: 'your name?', type: 'text', ph: 'Your name' },
  { key: 'description', prompt: 'Perfect, and ', hl: 'how can we help you?', type: 'text', ph: 'Describe your project...' },
];

export function TerminalContactForm({
  fields = defaultFields,
  greetingText = "Hey there! We're excited to link 🔗",
  terminalTitle = "contact@componentlabs.in",
  onSubmit,
  successMessage = "Sent! We'll get back to you ASAP 😎",
  className = "",
  typerSpeed = 30,
}) {
  const [step, setStep] = useState(-1);          // -1 = greeting typing
  const [data, setData] = useState({});           // completed values
  const [input, setInput] = useState('');
  const [typed, setTyped] = useState(false);      // current prompt typed?
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const bodyRef = useRef(null);

  const done = step >= fields.length;             // all fields answered

  // auto-scroll & auto-focus
  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
    if (typed && ref.current) {
      const t = setTimeout(() => ref.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [step, typed, sent]);

  const submit = () => {
    if (!input.trim()) return;
    setData(d => ({ ...d, [fields[step].key]: input.trim() }));
    setInput('');
    setTyped(false);
    setStep(s => s + 1);
  };

  const handleFinalSubmit = () => {
    setSent(true);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const restart = () => { 
    setStep(-1); 
    setData({}); 
    setInput(''); 
    setTyped(false); 
    setSent(false); 
  };

  const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <div className={`flex w-full items-center justify-center p-4 ${className}`}>
      {/* Outer shell — matches TerminalTypingCard exactly */}
      <div className="w-full max-w-2xl rounded-xl bg-[#0d0d0d] border border-neutral-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm md:text-base">

        {/* Terminal Header — identical to TerminalTypingCard */}
        <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-neutral-800/80">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="ml-4 flex-1 text-center font-sans text-xs text-neutral-500 font-medium select-none tracking-wide">
            {terminalTitle}
          </div>
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div ref={bodyRef} className="p-6 text-neutral-300 min-h-75 max-h-[500px] overflow-y-auto">

          {/* Greeting */}
          <motion.div {...fadeIn} className="mb-5">
            <p className="text-neutral-200 tracking-tight">
              {step === -1
                ? <Typer text={greetingText} speed={typerSpeed} onDone={() => setTimeout(() => { setStep(0); setTyped(false); }, 400)} />
                : greetingText}
            </p>
            {step >= 0 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }} className="h-px bg-neutral-800/80 mt-4 origin-left" />}
          </motion.div>

          {/* Field steps */}
          <AnimatePresence>
            {fields.map((f, i) => {
              if (i > step) return null;
              const answered = i < step;
              return (
                <motion.div key={f.key} {...fadeIn} transition={{ duration: 0.4, delay: 0.08 }} className="mb-5">
                  <p className="text-neutral-400 font-medium tracking-tight">
                    {i === step && !typed
                      ? <Typer text={f.prompt} speed={typerSpeed} onDone={() => setTyped(true)} />
                      : f.prompt}
                    {(typed || answered) && <span className="text-green-400">{f.hl}</span>}
                  </p>

                  {answered ? (
                    <motion.div {...fadeIn} className="flex items-center gap-2 mt-2 ml-1">
                      <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
                      <span className="text-blue-400">{data[f.key]}</span>
                    </motion.div>
                  ) : typed && (
                    <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="mt-3 ml-1 flex items-center gap-2">
                      <span className="text-blue-500 mr-1 select-none">❯</span>
                      <input ref={ref} type={f.type} value={input} onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && submit()} placeholder={f.ph} autoFocus
                        className="flex-1 bg-transparent text-neutral-200 placeholder:text-neutral-700 outline-none caret-blue-400 py-1 tracking-tight"
                        style={{ fontFamily: 'inherit' }} />
                      <span className="text-xs text-neutral-600 hidden sm:inline">press enter ↵</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Summary + actions */}
          {done && (
            <motion.div {...fadeIn} transition={{ delay: 0.12 }} className="mb-2">
              <p className="text-neutral-400 font-medium tracking-tight mb-4">Beautiful! Here's what we've got:</p>
              <div className="ml-1 space-y-1.5 mb-5">
                {fields.map((f, i) => (
                  <motion.div key={f.key} {...fadeIn} transition={{ delay: 0.1 + i * 0.1 }} className="flex gap-2 tracking-tight">
                    <span className="text-green-400">{f.key}:</span>
                    <span className="text-neutral-200">{data[f.key]}</span>
                  </motion.div>
                ))}
              </div>

              {!sent ? (
                <motion.div {...fadeIn} transition={{ delay: 0.45 }}>
                  <p className="text-neutral-400 font-medium tracking-tight mb-4">Look good?</p>
                  <div className="flex gap-3 ml-1">
                    <button onClick={handleFinalSubmit}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20 transition-all duration-300 hover:bg-green-500/20 hover:border-green-500/40 active:scale-[0.97]">
                      <Send className="w-3.5 h-3.5" /> Submit
                    </button>
                    <button onClick={restart}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/40 active:scale-[0.97]">
                      <RotateCcw className="w-3.5 h-3.5" /> Restart
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex items-center gap-2.5 ml-1">
                  <Check className="w-4.5 h-4.5 text-green-400" strokeWidth={3} />
                  <span className="text-green-400 font-medium">{successMessage}</span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Blinking cursor at the end when idle */}
          {step === -1 && (
            <div className="text-neutral-200 mt-2 tracking-tight">
              <span className="text-blue-500 mr-3">❯</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}