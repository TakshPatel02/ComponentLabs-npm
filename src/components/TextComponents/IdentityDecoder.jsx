import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";

const defaultSegments = [
  {
    key: "name",
    label: "Name",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    range: [0, 10], // takshpatel
  },
  {
    key: "github",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    range: [0, 12], // takshpatel02
  },
  {
    key: "email",
    label: "Email",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    range: [0, 31], // takshpatel02@component-labs.com
  },
  {
    key: "website",
    label: "Website",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    range: [13, 31], // component-labs.com
  },
];

const defaultSpringConfig = { type: "spring", stiffness: 200, damping: 24 };

export const IdentityDecoder = ({
  identity = "takshpatel02@component-labs.com",
  segments = defaultSegments,
  accentColor = "#d24200",
  springConfig = defaultSpringConfig,
  onSegmentChange,
  className = "",
}) => {
  const [activeKey, setActiveKey] = useState(null);
  const containerRef = useRef(null);

  // Keep the last active coordinates in state so they can animate out/in beautifully
  const [coords, setCoords] = useState({
    charLeft: 0,
    charRight: 0,
    charCenter: 0,
    charY: 0,
    iconCenterX: 0,
    iconTopY: 0,
  });

  const [isAnyActive, setIsAnyActive] = useState(false);
  const activeSegment = segments.find((s) => s.key === activeKey);

  // Measure relative positions inside container
  const measure = useCallback(() => {
    if (!activeKey || !containerRef.current) return;
    const parent = containerRef.current;
    const parentRect = parent.getBoundingClientRect();

    const activeSeg = segments.find((s) => s.key === activeKey);
    if (!activeSeg) return;
    const [start, end] = activeSeg.range;

    // Defensively clamp indices to the actual identity length to prevent out-of-bounds errors
    const startIndex = Math.max(0, Math.min(start, identity.length - 1));
    const endIndex = Math.max(0, Math.min(end - 1, identity.length - 1));

    const firstSpan = parent.querySelector(`[data-ci="${startIndex}"]`);
    const lastSpan = parent.querySelector(`[data-ci="${endIndex}"]`);
    const iconEl = parent.querySelector(`[data-icon-key="${activeKey}"]`);

    if (!firstSpan || !lastSpan || !iconEl) return;

    const firstR = firstSpan.getBoundingClientRect();
    const lastR = lastSpan.getBoundingClientRect();
    const iconR = iconEl.getBoundingClientRect();

    const charLeft = firstR.left - parentRect.left;
    const charRight = lastR.right - parentRect.left;
    const charWidth = charRight - charLeft;
    const charCenter = charLeft + charWidth / 2;
    const charY = firstR.bottom - parentRect.top;

    const iconCenterX = iconR.left - parentRect.left + iconR.width / 2;
    const iconTopY = iconR.top - parentRect.top;

    setCoords({
      charLeft,
      charRight,
      charCenter,
      charY,
      iconCenterX,
      iconTopY,
    });
  }, [activeKey, identity.length, segments]);

  useEffect(() => {
    if (activeKey) {
      setIsAnyActive(true);
      measure();
    } else {
      setIsAnyActive(false);
    }
    if (onSegmentChange) {
      onSegmentChange(activeKey);
    }
  }, [activeKey, measure, onSegmentChange]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    // Measure twice to ensure font loading and layout settling
    const timer1 = setTimeout(measure, 50);
    const timer2 = setTimeout(measure, 200);
    document.fonts?.ready?.then(() => {
      measure();
    });
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [measure]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none w-full max-w-2xl mx-auto py-16 px-4 ${className}`}
      style={{ minHeight: "280px" }}
    >
      {/* ── SVG Overlay for Diagram Connector Lines & Brackets ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        {/* Sliding |___| Bracket */}
        <motion.path
          animate={{
            d: `M ${coords.charLeft} ${coords.charY + 6} 
                L ${coords.charLeft} ${coords.charY + 16} 
                L ${coords.charRight} ${coords.charY + 16} 
                L ${coords.charRight} ${coords.charY + 6}`,
            opacity: isAnyActive ? 1 : 0,
          }}
          transition={springConfig}
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 2px 6px ${accentColor}40)`,
          }}
        />

        {/* Stem Connector Line linking Bracket center to top-center of active icon */}
        <motion.path
          animate={{
            d: `M ${coords.charCenter} ${coords.charY + 16} 
                L ${coords.iconCenterX} ${coords.iconTopY - 6}`,
            opacity: isAnyActive ? 0.75 : 0,
          }}
          transition={springConfig}
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
          style={{
            filter: `drop-shadow(0 2px 4px ${accentColor}30)`,
          }}
        />
      </svg>

      {/* ── Identity Characters Text ── */}
      <div className="relative mb-24 z-20">
        <div className="flex items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl tracking-wider whitespace-nowrap">
          {identity.split("").map((char, i) => {
            const isHighlighted =
              activeSegment &&
              i >= activeSegment.range[0] &&
              i < activeSegment.range[1];

            return (
              <motion.span
                key={i}
                data-ci={i}
                animate={{
                  color: isHighlighted
                    ? accentColor
                    : isAnyActive
                      ? "var(--color-on-surface-variant, rgba(158, 157, 151, 0.35))"
                      : "var(--color-primary, #11100a)",
                  opacity: isAnyActive && !isHighlighted ? 0.4 : 1,
                  filter:
                    isAnyActive && !isHighlighted ? "blur(1.5px)" : "blur(0px)",
                  scale: isHighlighted ? 1.05 : 1,
                  fontWeight: isHighlighted ? 700 : 400,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="inline-block"
                style={{
                  textShadow: isHighlighted
                    ? `0 0 12px ${accentColor}30`
                    : "none",
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* ── Navigation Icons Row ── */}
      <div className="mt-auto flex items-center justify-center gap-6 sm:gap-10 z-20 w-full">
        {segments.map((seg) => {
          const isActive = activeKey === seg.key;

          return (
            <div
              key={seg.key}
              data-icon-key={seg.key}
              onMouseEnter={() => setActiveKey(seg.key)}
              onMouseLeave={() => setActiveKey(null)}
              onTouchStart={(e) => {
                e.preventDefault();
                setActiveKey(seg.key);
              }}
              onTouchEnd={() => setActiveKey(null)}
              className="flex flex-col items-center gap-3 cursor-pointer select-none group relative"
            >
              {/* Animated Icon Circle */}
              <motion.div
                animate={{
                  backgroundColor: isActive
                    ? accentColor
                    : "var(--color-surface-container-low, rgba(255,255,255,0.03))",
                  color: isActive
                    ? "#ffffff"
                    : "var(--color-on-surface-variant, #48473f)",
                  scale: isActive ? 1.2 : 1,
                  borderColor: isActive
                    ? accentColor
                    : "var(--color-outline-variant, rgba(202, 198, 188, 0.3))",
                  boxShadow: isActive
                    ? `0 0 25px ${accentColor}50, 0 4px 15px ${accentColor}30`
                    : "0 4px 12px rgba(0,0,0,0.03)",
                }}
                transition={springConfig}
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-shadow duration-300"
              >
                {seg.icon}
              </motion.div>

              {/* Animated Label */}
              <motion.span
                animate={{
                  color: isActive
                    ? accentColor
                    : "var(--color-on-surface-variant, #48473f)",
                  scale: isActive ? 1.05 : 1,
                  opacity: isAnyActive && !isActive ? 0.4 : 1,
                  filter: isAnyActive && !isActive ? "blur(1px)" : "blur(0px)",
                }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm font-ui-body tracking-wider font-semibold uppercase"
              >
                {seg.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IdentityDecoder;
