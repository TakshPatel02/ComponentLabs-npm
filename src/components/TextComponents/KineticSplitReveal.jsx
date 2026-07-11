import React, { useState } from "react";

export const KineticSplitReveal = ({
  text = "ENGINEERED SOUL",
  quote = "The tension between the calculated and the felt. A digital heart in a biological cage.",
  className = "",
  textColorClass = "text-primary",
  quoteColorClass = "text-[#cf2d56]",
  fontFamilyClass = "font-sans",
  quoteFontFamilyClass = "font-serif",
  fontSizeClass = "text-4xl sm:text-6xl md:text-8xl lg:text-[110px]",
  quoteFontSizeClass = "text-base sm:text-lg md:text-xl lg:text-[24px]",
  duration = 800, // in ms
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const transitionStyle = {
    transition: `all ${duration}ms ${easing}`,
  };

  return (
    <div
      className={`relative w-full min-h-[300px] flex flex-col justify-center items-center py-12 select-none overflow-hidden ${className}`}
    >
      <div className="relative w-full flex justify-center py-12 overflow-visible">
        {/* Inner Reveal Layer (Quote) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 sm:px-8"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.95)",
            ...transitionStyle,
          }}
        >
          <p
            className={`${quoteFontFamilyClass} ${quoteFontSizeClass} ${quoteColorClass} max-w-2xl text-center leading-relaxed italic`}
          >
            "{quote}"
          </p>
        </div>

        {/* Splitting Layers & Tight Hover Target */}
        <div className="relative inline-block overflow-visible select-none bg-transparent">
          {/* Invisible, stable hover overlay */}
          <div
            className="absolute inset-0 z-20 cursor-crosshair bg-transparent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Top Half */}
          <div
            className="pointer-events-none"
            style={{
              clipPath: "inset(0 0 50% 0)",
              transform: isHovered
                ? "translate3d(0, -45%, 0)"
                : "translate3d(0, 0, 0)",
              ...transitionStyle,
            }}
          >
            <h1
              className={`${fontFamilyClass} ${fontSizeClass} font-black tracking-tighter leading-none ${textColorClass} text-center uppercase whitespace-nowrap m-0 p-0`}
            >
              {text}
            </h1>
          </div>

          {/* Bottom Half (Duplicated) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "inset(50% 0 0 0)",
              transform: isHovered
                ? "translate3d(0, 45%, 0)"
                : "translate3d(0, 0, 0)",
              ...transitionStyle,
            }}
          >
            <h1
              className={`${fontFamilyClass} ${fontSizeClass} font-black tracking-tighter leading-none ${textColorClass} text-center uppercase whitespace-nowrap m-0 p-0`}
            >
              {text}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
