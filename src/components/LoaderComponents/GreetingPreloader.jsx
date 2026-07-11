import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * GreetingPreloader Component
 * A premium, editorial page loader that cycles through multi-lingual greetings
 * and reveals the underlying page content with a sleek layout transition.
 *
 * Matches the reference behavior: text swaps in-place (no sliding/fading per word),
 * then the entire preloader curtain slides up to reveal content.
 */
export const GreetingPreloader = ({
  greetings = ["Hello", "Bonjour", "Hola", "Ciao", "Namaste", "Konnichiwa", "Salam"],
  durationPerWord = 400,
  subTitle = "Initializing Experience",
  isGlobal = true,
  onComplete,
  children,
}) => {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  // Background and Text color styling tokens
  const bgClass = "bg-[#f2f1ed] dark:bg-[#11100a]";
  const textClass = "text-[#11100a] dark:text-[#f2f1ed]";
  const lineBg = "bg-[#11100a]/20 dark:bg-[#fdf8f7]/20";
  const lineFill = "bg-[#11100a] dark:bg-[#fdf8f7]";

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current < greetings.length) {
        setCurrentGreeting(greetings[indexRef.current]);
      } else {
        clearInterval(interval);
        // Small delay before the reveal to let the last greeting be seen
        setTimeout(() => {
          setIsComplete(true);
          if (onComplete) onComplete();
        }, durationPerWord);
      }
    }, durationPerWord);

    return () => clearInterval(interval);
  }, [greetings, durationPerWord, onComplete]);

  return (
    <div className={`relative overflow-hidden w-full ${isGlobal ? "min-h-screen" : "h-112.5"}`}>
      {/* ── Preloader Curtain ── */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.95, ease: [0.87, 0, 0.13, 1] },
            }}
            className={`${
              isGlobal ? "fixed" : "absolute"
            } inset-0 z-[100] flex flex-col items-center justify-center ${bgClass} ${textClass}`}
          >
            {/* Greeting text — simple in-place swap, no per-word animation */}
            <span
              className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tight text-center select-none"
            >
              {currentGreeting}
            </span>

            {/* Bottom progress line & metadata */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
              <div className={`w-0.5 h-16 ${lineBg} rounded-full overflow-hidden relative`}>
                <motion.div
                  initial={{ height: "0%" }}
                  animate={{ height: "100%" }}
                  transition={{
                    duration: greetings.length * (durationPerWord / 1000),
                    ease: "linear",
                  }}
                  className={`w-full ${lineFill} origin-top`}
                />
              </div>
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.3em] opacity-50">
                {subTitle}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Revealed Main Content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full h-full"
      >
        {children || (
          <div className="flex flex-col items-center justify-center min-h-120 text-center p-8 bg-[#fdf8f7] dark:bg-[#1a1a1a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-xl select-none m-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk'] mb-4 text-[#11100a] dark:text-[#fdf8f7]">
              Welcome to Your Amazing Landing Page!
            </h2>
            <p className="text-[#11100a]/60 dark:text-[#fdf8f7]/60 font-['Newsreader'] italic text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              This premium viewport was seamlessly revealed after a high-end multi-lingual greetings sequence.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GreetingPreloader;
