import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * StaircasePreloader Component
 * A premium preloader that cycles through multi-lingual greetings with a fade effect,
 * then reveals content with a staggered staircase panel animation where
 * 5 vertical strips slide up one-by-one with cascading delays.
 */
export const StaircasePreloader = ({
  greetings = [
    "Hello",
    "Bonjour",
    "नमस्ते",
    "Hola",
    "Ciao",
    "Olá",
    "こんにちは",
    "Привет",
  ],
  durationPerWord = 250,
  panelCount = 5,
  panelStaggerMs = 100,
  isGlobal = true,
  onComplete,
  children,
}) => {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [textVisible, setTextVisible] = useState(true);
  const [phase, setPhase] = useState("cycling"); // 'cycling' | 'exiting' | 'done'
  const indexRef = useRef(0);

  // Background and Text color styling tokens
  const bgClass = "bg-[#f2f1ed] dark:bg-[#11100a]";
  const textClass = "text-[#11100a] dark:text-[#fdf8f7]";
  const accentClass = "bg-[#d24200] dark:bg-[#cf2d56]";

  // Greeting cycling logic — matches reference: fade out, swap text, fade in
  useEffect(() => {
    if (phase !== "cycling") return;

    const interval = setInterval(() => {
      // Fade out
      setTextVisible(false);

      setTimeout(() => {
        indexRef.current += 1;
        if (indexRef.current < greetings.length) {
          setCurrentGreeting(greetings[indexRef.current]);
          setTextVisible(true);
        } else {
          clearInterval(interval);
          // Begin exit sequence
          setTimeout(() => {
            setPhase("exiting");
            // After panels finish sliding, mark complete
            const totalPanelDuration =
              800 + (panelCount - 1) * panelStaggerMs + 200;
            setTimeout(() => {
              setPhase("done");
              if (onComplete) onComplete();
            }, totalPanelDuration);
          }, 400);
        }
      }, 150);
    }, durationPerWord);

    return () => clearInterval(interval);
  }, [greetings, durationPerWord, panelCount, panelStaggerMs, phase, onComplete]);

  // Build the panel array
  const panels = Array.from({ length: panelCount }, (_, i) => i);

  if (phase === "done") {
    return (
      <div className={`w-full ${isGlobal ? "min-h-screen" : "h-112.5"}`}>
        {children || (
          <div className="flex flex-col items-center justify-center min-h-120 text-center p-8 bg-[#fdf8f7] dark:bg-[#1a1a1a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-xl select-none m-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk'] mb-4 text-[#11100a] dark:text-[#fdf8f7]">
              Welcome to Your Amazing Page!
            </h2>
            <p className="text-[#11100a]/60 dark:text-[#fdf8f7]/60 font-['Newsreader'] italic text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              The staircase curtain has lifted, revealing your content with a
              premium cascading entrance.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden w-full ${isGlobal ? "min-h-screen" : "h-112.5"} bg-[#fdf8f7] dark:bg-[#120f13]`}
    >
      {/* ── Children rendered below the overlay ── */}
      <div className="absolute inset-0 z-0">
        {children || (
          <div className="flex flex-col items-center justify-center min-h-120 text-center p-8 bg-[#fdf8f7] dark:bg-[#1a1a1a] border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-xl select-none m-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk'] mb-4 text-[#11100a] dark:text-[#fdf8f7]">
              Welcome to Your Amazing Page!
            </h2>
            <p className="text-[#11100a]/60 dark:text-[#fdf8f7]/60 font-['Newsreader'] italic text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              The staircase curtain has lifted, revealing your content with a
              premium cascading entrance.
            </p>
          </div>
        )}
      </div>

      {/* ── Preloader Overlay — 5 Vertical Strips ── */}
      <div
        className={`${isGlobal ? "fixed" : "absolute"} inset-0 z-100 flex pointer-events-none`}
      >
        {panels.map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={
              phase === "exiting"
                ? { y: "-100%" }
                : { y: 0 }
            }
            transition={
              phase === "exiting"
                ? {
                    duration: 0.8,
                    ease: [0.77, 0, 0.175, 1],
                    delay: i * (panelStaggerMs / 1000),
                  }
                : {}
            }
            className={`h-full flex-1 ${bgClass} ${i < panelCount - 1 ? 'border-r border-[#11100a]/10 dark:border-[#fdf8f7]/10' : ''}`}
          />
        ))}

        {/* ── Center Greeting Text ── */}
        <motion.div
          className={`${isGlobal ? "fixed" : "absolute"} inset-0 flex items-center justify-center pointer-events-none`}
          animate={
            phase === "exiting" ? { opacity: 0 } : { opacity: 1 }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full shrink-0 ${accentClass}`}
            />
            <span
              className={`font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium uppercase tracking-[0.2em] select-none whitespace-nowrap ${textClass}`}
              style={{
                opacity: textVisible ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {currentGreeting}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StaircasePreloader;
