import { useState } from "react";
import { motion } from "motion/react";

export const ElasticStretchText = ({ 
  text = "CREATIVE", 
  className = "" 
}) => {
  const characters = text.split("");

  return (
    <div className={`flex items-center justify-center h-[200px] overflow-hidden ${className}`}>
      <div className="flex gap-2">
        {characters.map((char, i) => (
          <Char key={i} char={char} />
        ))}
      </div>
    </div>
  );
};

const Char = ({ char }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scaleY: isHovered ? 1.4 : 1,
        scaleX: isHovered ? 0.8 : 1,
        color: isHovered ? "#E8567A" : "currentColor",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1
      }}
      className="cursor-default select-none text-[#11100a] dark:text-[#fdf8f7]"
    >
      <span className="font-['Space_Grotesk'] text-6xl md:text-8xl font-black uppercase inline-block origin-center tracking-tighter">
        {char}
      </span>
    </motion.div>
  );
};