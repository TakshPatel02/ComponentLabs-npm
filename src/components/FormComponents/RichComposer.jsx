import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bold, Italic, List, Link, Image } from 'lucide-react';

const COMMANDS = {
  Bold: "bold",
  Italic: "italic",
  List: "insertUnorderedList",
  Link: null,
  Image: null,
};

const TOOLBAR = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: List, label: "List" },
  { icon: Link, label: "Link" },
  { sep: true },
  { icon: Image, label: "Image" },
];

const RichComposer = () => {
  const [charCount, setCharCount] = useState(0);
  const [active, setActive] = useState({});
  const [thinking, setThinking] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const timerRef = useRef(null);
  const editorRef = useRef(null);

  const updateState = useCallback(() => {
    const text = editorRef.current?.innerText || "";
    const len = text.trim().length;
    setCharCount(len);
    setHasContent(len > 0);

    // Check which formatting is active at cursor
    setActive({
      Bold: document.queryCommandState("bold"),
      Italic: document.queryCommandState("italic"),
      List: document.queryCommandState("insertUnorderedList"),
    });

    // Trigger thinking animation
    setThinking(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setThinking(false), 1500);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const execCommand = (label) => {
    const cmd = COMMANDS[label];
    if (!cmd) return;

    // Handle link insertion
    if (label === "Link") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
    } else {
      document.execCommand(cmd, false, null);
    }

    editorRef.current?.focus();
    // Re-check active states after command
    setTimeout(() => {
      setActive({
        Bold: document.queryCommandState("bold"),
        Italic: document.queryCommandState("italic"),
        List: document.queryCommandState("insertUnorderedList"),
      });
    }, 0);
  };

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="bg-surface rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] oklab-border max-w-2xl w-full transition-colors">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-on-surface-variant/40">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          <h2 className="text-[22px] text-primary font-medium tracking-tight">Rich Composer</h2>
        </div>

        {/* Editor */}
        <div className="bg-surface rounded-xl oklab-border overflow-hidden transition-colors">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-4 py-3 border-b oklab-border bg-on-surface/5 transition-colors">
            {TOOLBAR.map((t, i) =>
              t.sep ? <div key={i} className="w-px h-5 bg-on-surface/10 mx-1.5" /> : (
                <button
                  key={t.label}
                  onMouseDown={e => { e.preventDefault(); execCommand(t.label); }}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${active[t.label] ? 'bg-on-surface/10 text-primary' : 'text-on-surface-variant/40 hover:text-primary hover:bg-on-surface/10'}`}
                >
                  <t.icon size={18} strokeWidth={active[t.label] ? 2.5 : 1.8} />
                </button>
              )
            )}
          </div>

          {/* ContentEditable area */}
          <div className="relative">
            {!hasContent && (
              <div className="absolute top-4 left-5 text-on-surface-variant/20 italic text-[15px] font-serif pointer-events-none select-none">
                Begin crafting your narrative...
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateState}
              onKeyUp={updateState}
              onMouseUp={updateState}
              className="w-full min-h-[200px] px-5 py-4 text-[15px] text-primary/80 outline-none leading-relaxed font-serif bg-transparent [&_b]:font-bold [&_i]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-blue-600 [&_a]:underline"
            />
          </div>
        </div>

        {/* Footer status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-6 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {thinking && hasContent ? (
                <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="text-[11px] tracking-[0.12em] uppercase font-semibold text-on-surface-variant/60 truncate">
                    Thinking... Generating semantic insights
                  </span>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] tracking-[0.12em] uppercase font-semibold text-on-surface-variant/40">Ready</span>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-[11px] tracking-[0.12em] uppercase text-on-surface-variant/40 shrink-0">{charCount.toLocaleString()} Characters</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-[14px] font-medium hover:bg-error-warm transition-colors cursor-pointer shrink-0"
          >
            Publish Content
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RichComposer;
