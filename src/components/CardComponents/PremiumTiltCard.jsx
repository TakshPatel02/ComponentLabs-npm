import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ROTATION_RANGE = 18; // Reduced for a more subtle, premium feel
const HALF_ROTATION_RANGE = 18 / 2;

export const PremiumTiltCard = ({ 
  title = "Premium Interface", 
  description = "A minimal, physics-driven interaction layer tailored for modern editorial design.",
  href = "#" 
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // For dynamic glare effect
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Subtle spring physics
  const xSpring = useSpring(x, { stiffness: 400, damping: 50 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 50 });
  
  const glareX = useSpring(mouseX, { stiffness: 400, damping: 50 });
  const glareY = useSpring(mouseY, { stiffness: 400, damping: 50 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  
  // Subtle radial gradient for glare that adapts to theme
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--on-surface-variant), transparent 45%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate rotation
    const mouseXPos = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseYPos = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseYPos / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseXPos / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);

    // Calculate glare position (percentages)
    mouseX.set(((e.clientX - rect.left) / width) * 100);
    mouseY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <div className="flex w-full place-content-center px-4 py-12 perspective-distant">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="relative h-100 w-75 rounded-2xl bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] oklab-border cursor-pointer group transition-colors"
      >
        {/* Subtle dynamic glare overlay */}
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500 z-20"
          style={{ background }}
        />

        <div
          style={{
            transform: "translateZ(25px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 flex flex-col justify-between rounded-xl bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] oklab-border overflow-hidden p-6"
        >
          {/* Subtle Background Pattern inside the card */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div
             style={{ transform: "translateZ(45px)" }}
             className="relative z-10 flex flex-col items-start gap-4"
          >
            {/* Minimal Logo / Icon placeholder */}
            <div className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center border oklab-border group-hover:bg-on-surface/10 transition-colors duration-300">
              <span className="font-['Space_Grotesk'] text-[18px] font-bold text-primary opacity-80">⌘</span>
            </div>
            
            {/* Text Content */}
            <div className="text-left mt-1">
              <h3 className="text-[22px] font-['Space_Grotesk'] font-medium text-primary tracking-tight">
                {title}
              </h3>
              <p className="text-[14.5px] font-['Inter'] text-on-surface-variant mt-3 leading-relaxed max-w-55">
                {description}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div 
            style={{ transform: "translateZ(35px)" }} 
            className="relative z-10 mt-auto pt-5 border-t border-border-fallback-10 group-hover:border-on-surface/10 transition-colors"
          >
            <Link 
              to={href}
              className="flex items-center gap-2 text-[14px] font-['Space_Grotesk'] font-semibold tracking-wide text-primary group-hover:text-[#E8567A] transition-colors duration-300 uppercase"
            >
              Explore Component
              <FiArrowRight className="text-[16px] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};