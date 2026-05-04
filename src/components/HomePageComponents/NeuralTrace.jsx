import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const defaultSteps = [
  {
    id: 1,
    label: "THINKING",
    color: "#fbbf24",
    duration: 1500,
    description: "Analyzing the request...",
  }, // amber-400
  {
    id: 2,
    label: "GREP SEARCH",
    color: "#22c55e",
    duration: 1000,
    description: "Scanning relevant files...",
  }, // green-500
  {
    id: 3,
    label: "READING CONTEXT",
    color: "#3b82f6",
    duration: 1500,
    description: "Parsing context window...",
  }, // blue-500
  {
    id: 4,
    label: "APPLYING EDITS",
    color: "#a855f7",
    duration: 2000,
    description: "Writing changes...",
  }, // purple-500
];

export default function NeuralTrace({
  steps = defaultSteps,
  stepDelay = 400,
  isDark: isDarkProp,
}) {
  
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    if (!started) return;
    if (currentStep >= steps.length) return;

    const delay =
      currentStep === -1 ? stepDelay : steps[currentStep]?.duration || 1000;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [started, currentStep, steps, stepDelay]);

  const handleMouseEnter = () => {
    setStarted(true);
    if (currentStep >= steps.length) {
      setCurrentStep(-1);
    }
  };

  const handleMouseLeave = () => {
    setStarted(false);
    setCurrentStep(-1);
  };

  const textColor = isDark ? "text-white" : "text-primary";
  const descColor = isDark ? "text-gray-400" : "text-on-surface-variant";
  const lineColorBase = isDark ? "bg-white/10" : "bg-black/10";

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-center relative cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              className={`text-[10px] tracking-widest uppercase font-system-micro ${textColor} opacity-50 border border-current rounded-full px-3 py-1`}
            >
              Hover to Trace
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-5 w-full relative z-10 px-2 justify-center h-full">
        <AnimatePresence>
          {started &&
            steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isVisible = index <= currentStep;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 relative items-start"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-1 top-4 -bottom-5 w-px ${lineColorBase} z-0`}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{
                            duration: steps[index].duration / 1000,
                            ease: "linear",
                          }}
                          className="w-full"
                          style={{ backgroundColor: step.color }}
                        />
                      )}
                    </div>
                  )}

                  {/* Dot */}
                  <div className="relative mt-1 shrink-0 z-10 w-2 h-2 flex justify-center items-center">
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={
                        isActive ? { repeat: Infinity, duration: 1.2 } : {}
                      }
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: step.color,
                        opacity: !isActive && !isCompleted ? 0.3 : 1,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="-mt-0.5 flex flex-col">
                    <span
                      className={`font-system-micro text-[10px] tracking-widest uppercase ${textColor}`}
                      style={{ color: isActive ? step.color : undefined }}
                    >
                      {step.label}
                    </span>
                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`text-xs mt-1 italic font-editorial-standard ${descColor}`}
                        >
                          {step.description}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}

          {/* Done State */}
          {started && currentStep >= steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 relative items-center"
            >
              <div className="relative shrink-0 z-10 w-2 h-2 flex justify-center items-center">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDark ? "bg-white" : "bg-primary"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-system-micro text-[10px] tracking-widest uppercase ${textColor}`}
                >
                  DONE
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
