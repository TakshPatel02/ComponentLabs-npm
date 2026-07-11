import React from "react";

export const FillButton = ({
  children,
  onClick,
  className = "",
  fillColorClass = "bg-[#11100a] dark:bg-[#fdf8f7]",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3.5 font-['Space_Grotesk',sans-serif] text-[13px] font-medium tracking-widest uppercase border border-[#11100a] dark:border-[#fdf8f7] text-[#11100a] dark:text-[#fdf8f7] overflow-hidden group/btn active:scale-[0.98] transition-transform ${className}`}
    >
      <span className="relative z-10 group-hover/btn:text-[#fdf8f7] dark:group-hover/btn:text-[#11100a] transition-colors duration-300 delay-200 ease-in-out">
        {children}
      </span>
      <span
        className={`fill-bg absolute bottom-0 left-0 z-0 ${fillColorClass}`}
      ></span>
      <style>{`
        .fill-bg {
          width: 0%;
          height: 2px;
          transition: height 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
        }
        button:hover .fill-bg {
          width: 100%;
          height: 100%;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
        }
      `}</style>
    </button>
  );
};