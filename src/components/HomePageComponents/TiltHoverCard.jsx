import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export default function TiltHoverCard() {
  const ref = useRef(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animation for smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Calculate shine background position based on mouse position
  // The multipliers ensure the shine sweeps across the whole card
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], [100, -100]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], [100, -100]);
  const shineOpacity = useTransform(
    mouseYSpring,
    [-0.5, 0, 0.5],
    [0.5, 0, 0.5],
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full h-full min-h-100 flex items-center justify-center relative overflow-hidden group perspective-[1000px] rounded-lg">
      <div
        className="absolute inset-0 z-0 opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-65 aspect-3/4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer oklab-border transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-10 bg-black/5"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1669287731461-bd8ce3126710?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
        />

        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none z-20" />

        <motion.div
          className="absolute pointer-events-none mix-blend-overlay z-30"
          style={{
            background: `radial-gradient(
              circle at center, 
              rgba(0,0,0,0.2) 20%, 
              rgba(0,0,0,0.1) 80%
            )`,
            left: useTransform(shineX, (x) => `calc(50% + ${x}%)`),
            top: useTransform(shineY, (y) => `calc(50% + ${y}%)`),
            width: "250%",
            height: "250%",
            transform: "translate(-50%, -50%)",
            opacity: shineOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}
