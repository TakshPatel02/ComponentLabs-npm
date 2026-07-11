import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw } from "lucide-react";

// Reusable character-by-character bounce animator
function KineticChar({ char, index }) {
  // Determine character width for perfect layout alignment without layout collapse
  const getWidthClass = (c) => {
    if (c === "," || c === "." || c === ":") return "w-[0.22em]";
    if (c === "$") return "w-[0.48em]";
    if (c === " ") return "w-[0.25em]";
    return "w-[0.55em]";
  };

  return (
    <div
      className={`relative h-[1.2em] overflow-hidden flex items-center justify-center ${getWidthClass(char)}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char + "-" + index}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 15,
            mass: 0.8,
          }}
          className="absolute font-bold font-['Space_Grotesk','Inter',sans-serif] leading-none"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function KineticText({ value }) {
  return (
    <div className="flex items-center justify-center tracking-tight leading-none">
      {value.split("").map((char, index) => (
        <KineticChar key={index} char={char} index={index} />
      ))}
    </div>
  );
}

export function KineticNumberShowcase({ initialTime = 60, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  // Countdown timer interval logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? initialTime : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, initialTime]);

  const handleResetCountdown = () => {
    setTimeLeft(initialTime);
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  return (
    <div
      className={`relative w-85 sm:w-100 max-w-full mx-auto bg-white dark:bg-[#1a1a1a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-3xl select-none overflow-hidden p-6 shadow-lg flex flex-col items-center gap-6 transition-all duration-400 ${className}`}
    >
      {/* Header Label */}
      <div className="w-full flex justify-center border-b border-[#11100a]/10 dark:border-[#fdf8f7]/10 pb-4">
        <span className="font-['Space_Grotesk',system-ui,sans-serif] text-xs font-semibold tracking-[0.2em] text-[#11100a]/40 dark:text-[#fdf8f7]/40 uppercase leading-none">
          COUNTDOWN TIMER
        </span>
      </div>

      {/* Main kinetic display screen */}
      <div className="relative w-full flex flex-col items-center justify-center bg-[#f2f1ed] dark:bg-[#11100a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-2xl py-12 px-6 shadow-inner min-h-48">
        <div className="text-[12vw] sm:text-[60px] md:text-[90px] font-bold text-[#11100a] dark:text-[#fdf8f7] select-none flex items-center justify-center">
          <KineticText value={`0:${timeLeft.toString().padStart(2, "0")}`} />
        </div>
      </div>

      {/* Controls Footer */}
      <div className="flex items-center gap-3 w-full justify-center">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#11100a] dark:bg-[#fdf8f7] text-[#fdf8f7] dark:text-[#11100a] text-sm font-semibold hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          {isPaused ? (
            <Play className="h-4 w-4 fill-current" />
          ) : (
            <Pause className="h-4 w-4 fill-current" />
          )}
          {isPaused ? "Play" : "Pause"}
        </button>

        <button
          onClick={handleResetCountdown}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f1ed] dark:bg-[#11100a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 text-[#11100a]/70 dark:text-[#fdf8f7]/70 hover:text-[#11100a] dark:hover:text-[#fdf8f7] hover:bg-[#11100a]/5 dark:hover:bg-[#fdf8f7]/5 transition-colors cursor-pointer"
          title="Reset countdown"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
