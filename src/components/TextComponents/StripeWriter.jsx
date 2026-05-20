import { motion } from 'motion/react';

export const StripeWriter = ({ 
  text = "Building the internet's infrastructure.",
  delay = 0,
  speed = 0.03,
  className = "",
  cursorClassName = "bg-[#11100a]",
  triggerOnce = true
}) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: speed, 
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 0.8
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      scale: 0.8,
      filter: "blur(8px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, amount: 0.3 }}
      className={`flex flex-wrap items-center justify-center perspective-[1000px] ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block white-space-pre origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ 
          opacity: [0, 1, 0],
          scaleY: [0.8, 1.1, 0.8],
        }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: characters.length * speed + delay
        }}
        className={`inline-block w-micro-2 h-[1.2em] ml-2 align-middle rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] ${cursorClassName}`}
      />
    </motion.div>
  );
};