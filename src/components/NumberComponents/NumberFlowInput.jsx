import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

function DigitSlot({ digit, isPlaceholder }) {
  return (
    <div className="relative w-6 h-12 sm:w-8 sm:h-16 md:w-10 md:h-20 flex items-center justify-center">
      {/* Digit slot wrapper to contain absolute animations */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <AnimatePresence>
          <motion.span
            key={digit + (isPlaceholder ? "-p" : "-a")}
            initial={{ y: "80%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-80%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 14, // Lower damping for a super juicy, springy bounce!
              mass: 0.8,
            }}
            className={`absolute flex items-center justify-center font-['Inter','Space_Grotesk',system-ui,sans-serif] text-[30px] sm:text-[40px] md:text-[50px] font-bold leading-none select-none transition-colors duration-300 ${
              isPlaceholder ? "text-[#11100a]/12 dark:text-[#fdf8f7]/12" : "text-[#11100a] dark:text-[#fdf8f7]"
            }`}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function NumberFlowInput({ maxDigits = 10, className = "" }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    // Allow only digits and limit to 100 digits (practically unlimited)
    if (/^\d*$/.test(val) && val.length <= 100) {
      setValue(val);
    }
  };

  const hasInput = value.length > 0;

  // Build the array of digits to display.
  // We only show the last `maxDigits` characters of `value`.
  const digitsList = [];
  const startIdx = Math.max(0, value.length - maxDigits);
  const visiblePart = value.slice(startIdx);

  for (let i = 0; i < maxDigits; i++) {
    // Fill from the right (calculator style)
    const charIndex = i - (maxDigits - visiblePart.length);
    if (charIndex >= 0 && charIndex < visiblePart.length) {
      digitsList.push({ digit: visiblePart[charIndex], isPlaceholder: false });
    } else {
      digitsList.push({ digit: "0", isPlaceholder: true });
    }
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-105 bg-[#fdf8f7] dark:bg-[#1a1a1a] hover:bg-[#f2f1ed] dark:hover:bg-[#2a2a2a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-2xl select-none overflow-hidden py-12 px-6 transition-all duration-400 group ${className}`}
    >
      {/* Invisible actual input capturing all keyboard and touch/click events */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20"
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={100}
        aria-label="Number input"
      />

      {/* Modern minimal visual container */}
      <div className="relative flex flex-col items-center justify-center pointer-events-none z-10">
        
        {/* Animated Prompt Text */}
        <div className="h-10 flex items-center justify-center mb-2">
          <AnimatePresence>
            {!hasInput && (
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-['Space_Grotesk',system-ui,sans-serif] text-xs font-semibold tracking-[0.2em] text-[#11100a]/40 dark:text-[#fdf8f7]/40 uppercase leading-none">
                  TRY ENTERING
                </span>
                <span className="font-['Space_Grotesk',system-ui,sans-serif] text-xs font-semibold tracking-[0.2em] text-[#11100a]/40 dark:text-[#fdf8f7]/40 uppercase leading-none">
                  A NUMBER
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small gap */}
        <div className="h-4" />

        {/* Digital display panel */}
        <div className="bg-[#f2f1ed] dark:bg-[#11100a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5 flex items-center justify-center gap-0 shadow-inner relative">
          {digitsList.map((item, i) => (
            <DigitSlot
              key={i}
              digit={item.digit}
              isPlaceholder={item.isPlaceholder}
            />
          ))}

          {/* Glowing pipe cursor blinking at the very last position */}
          {isFocused && (
            <div className="w-[2px] h-6 sm:h-8 md:h-10 bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] dark:shadow-[0_0_10px_rgba(96,165,250,0.8)] rounded-full animate-nfi-blink ml-1 sm:ml-1.5 self-center z-10" />
          )}
        </div>
      </div>
    </div>
  );
}
