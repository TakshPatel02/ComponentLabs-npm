import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { StarIcon } from "lucide-react"; 

const GithubStarsButton = ({ targetStars = 8492 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString(),
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // A highly realistic cinematic deceleration curve (easeOutExpo)
    // Starts fast and smoothly crawls to the exact final number
    const controls = animate(count, targetStars, {
      duration: 4.2,
      ease: [0.16, 1, 0.3, 1],
    });

    return controls.stop;
  }, [count, targetStars]);

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-lg border-2 border-[#11100a] bg-[#fdf8f7] px-6 py-3 font-semibold text-[#11100a] transition-colors duration-500 hover:bg-[#11100a] hover:text-[#fdf8f7] hover:shadow-[0_0_30px_rgba(40,40,40,0.2)] md:min-w-70"
    >
      <div className="relative z-10 flex items-center gap-3">
        {/* Star Icon flipping out on hover */}
        <motion.span
          animate={{
            rotate: isHovered ? [0, -10, 180] : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`material-symbols-outlined text-[24px] ${isHovered ? "text-[#cf2d56]" : ""}`}
        >
          <StarIcon />
        </motion.span>
        <span className="uppercase tracking-widest text-sm font-['Space_Grotesk',sans-serif]">
          GitHub
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-2 border-l-2 border-[#11100a]/20 pl-6 group-hover:border-[#fdf8f7]/20 transition-colors duration-500 overflow-hidden">
        <motion.span className="font-mono text-xl tracking-tight relative -translate-y-0.5">
          {rounded}
        </motion.span>
      </div>

      {/* Aesthetic Glint Sweep on Hover */}
      <motion.div
        initial={{ x: "-100%", skewX: -15 }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-0 w-1/3 bg-linear-to-r from-transparent via-[#fdf8f7]/30 to-transparent mix-blend-overlay pointer-events-none"
      />
    </motion.button>
  );
};

export default GithubStarsButton;
