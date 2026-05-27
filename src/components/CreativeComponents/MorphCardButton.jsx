import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";

const SPRING = { type: "spring", stiffness: 400, damping: 30 };

export const MorphCardButton = ({
  buttonText = "Click Me",
  tag = "Lab Report",
  badge = "07",
  heading = "Precision UI: Engineered for the modern stack",
  subtitle = "ComponentLab Studios",
  imageSrc,
  onExpand,
  onCollapse,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutId = useId();

  const expand = () => {
    setIsExpanded(true);
    onExpand?.();
  };

  const collapse = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
    onCollapse?.();
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="button"
            layoutId={`morph-container-${layoutId}`}
            onClick={expand}
            transition={SPRING}
            className="bg-primary px-16 py-5 rounded-2xl border-none outline-none cursor-pointer flex items-center justify-center hover:bg-primary/90 active:scale-[0.98]"
          >
            <motion.span
              layoutId={`morph-text-${layoutId}`}
              className="font-mono-code text-[14px] text-surface tracking-widest select-none"
            >
              {buttonText}
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            key="card"
            layoutId={`morph-container-${layoutId}`}
            transition={SPRING}
            className="w-full max-w-130 bg-surface-container-low border border-outline/20 p-6 shadow-xl overflow-hidden"
            style={{ borderRadius: 16 }}
          >
            <div className="flex justify-between items-start mb-5">
              <motion.button
                onClick={collapse}
                className="w-3.5 h-3.5 rounded-full bg-error-warm border-none cursor-pointer outline-none shrink-0"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
                transition={SPRING}
              />
              <motion.span
                layoutId={`morph-text-${layoutId}`}
                className="font-mono-code text-[11px] text-primary/0 tracking-widest select-none h-0 overflow-hidden"
              >
                {buttonText}
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-5"
            >
              {/* Text column */}
              <div className="flex-1 min-w-0 flex flex-col gap-3">
                {/* Tag + badge */}
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-[13px] text-on-surface-variant tracking-wider">
                    {tag}
                  </span>
                  <span className="font-mono-code text-[11px] text-on-surface-variant/80 bg-on-surface-variant/10 px-1.5 py-0.5 rounded border border-on-surface-variant/10">
                    {badge}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-section-heading text-[20px] font-bold text-primary leading-tight tracking-tight">
                  {heading}
                </h3>

                {/* Subtitle */}
                <p className="font-mono-code text-[13px] text-on-surface-variant">
                  {subtitle}
                </p>
              </div>

              {/* Image column */}
              {imageSrc ? (
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-lg overflow-hidden border border-outline/10 shrink-0 bg-surface">
                  <img
                    src={imageSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-lg border border-outline/10 shrink-0 bg-surface flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1.5 opacity-20">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-sm bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};