import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

// --- Utility: Encrypted text scramble on hover ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const useScrambleText = (original, isActive, speed = 30) => {
  const [text, setText] = useState(original);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setText(original);
      return;
    }

    let iteration = 0;
    clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setText(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= original.length) {
        clearInterval(frameRef.current);
      }
    }, speed);

    return () => clearInterval(frameRef.current);
  }, [isActive, original, speed]);

  return text;
};

// --- Floating Particles ---
const FloatingParticles = ({ isActive }) => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    delay: Math.random() * 0.6,
    duration: Math.random() * 1.5 + 1.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isActive
              ? {
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0.5],
                  y: [0, -30, -60],
                  x: [0, (Math.random() - 0.5) * 30],
                }
              : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: isActive ? Infinity : 0,
            ease: "easeOut",
          }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "var(--color-error-warm)",
          }}
        />
      ))}
    </div>
  );
};

// --- Single Link Row ---
const NeuralLink = ({ heading, imgSrc, subheading, href, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  const imgTop = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const imgLeft = useTransform(mouseXSpring, [0.5, -0.5], ["55%", "70%"]);

  const scrambledSub = useScrambleText(subheading, isHovered, 25);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
      whileHover="whileHover"
      className="group/link relative flex items-center justify-between border-b border-primary/15 py-5 md:py-8 transition-colors duration-500 hover:border-error-warm/40"
    >
      {/* Neural Scan Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-error-warm), transparent)",
        }}
        initial={{ width: "0%", opacity: 0 }}
        animate={
          isHovered
            ? { width: "100%", opacity: 1 }
            : { width: "0%", opacity: 0 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Hover Glow Background */}
      <motion.div
        className="absolute inset-0 z-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(207, 45, 86, 0.03), transparent 60%)",
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles isActive={isHovered} />

      {/* Left: Text Content */}
      <div className="relative z-10">
        {/* Index Number */}
        <motion.span
          className="font-mono-code text-[10px] text-error-warm/60 tracking-widest uppercase block mb-1"
          initial={{ opacity: 0.4 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Heading with Per-Letter Animation */}
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -12 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.04,
            delayChildren: 0.1,
          }}
          className="relative z-10 block font-section-heading text-[36px] md:text-[56px] leading-none text-primary transition-colors duration-500 group-hover/link:text-error-warm tracking-tight"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0, y: 0 },
                whileHover: { x: 12, y: -2 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>

        {/* Scrambled Subheading */}
        <span className="relative z-10 mt-2 block font-mono-code text-[12px] md:text-[13px] text-on-surface-variant tracking-wider transition-colors duration-500 group-hover/link:text-error-warm/70">
          {scrambledSub}
        </span>
      </div>

      {/* Hover Image */}
      <motion.div
        style={{
          top: imgTop,
          left: imgLeft,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute z-5 pointer-events-none"
      >
        {/* Outer glow ring */}
        <motion.div
          variants={{
            initial: { scale: 0, opacity: 0 },
            whileHover: { scale: 1.15, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
          className="absolute -inset-1.5 rounded-xl border border-error-warm/20"
        />

        {/* The Image */}
        <motion.img
          variants={{
            initial: { scale: 0, rotate: "-8deg", filter: "blur(8px) saturate(0)" },
            whileHover: { scale: 1, rotate: "4deg", filter: "blur(0px) saturate(1.1)" },
          }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          src={imgSrc}
          className="h-24 w-36 md:h-48 md:w-64 rounded-xl object-cover shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] oklab-border"
          alt={`Preview for ${heading}`}
        />

        {/* Overlay scan effect on image */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            whileHover: { opacity: 1 },
          }}
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        >
          <motion.div
            animate={
              isHovered
                ? { y: ["100%", "-100%"] }
                : { y: "100%" }
            }
            transition={{
              duration: 1.8,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
            className="absolute inset-x-0 h-8"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(207,45,86,0.08), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Right: Arrow + AI Sparkle */}
      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="relative z-10 flex items-center gap-2 p-4"
      >
        <motion.div
          animate={isHovered ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
          transition={{
            duration: 1.2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-4 h-4 text-error-warm/60" />
        </motion.div>
        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover/link:text-error-warm transition-colors" />
      </motion.div>
    </motion.a>
  );
};

// --- Main Component ---
const LINKS_DATA = [
  {
    heading: "About",
    subheading: "Learn what we do here",
    imgSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    href: "#",
  },
  {
    heading: "Clients",
    subheading: "We work with great people",
    imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
    href: "#",
  },
  {
    heading: "Portfolio",
    subheading: "Our work speaks for itself",
    imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    href: "#",
  },
  {
    heading: "Careers",
    subheading: "We want cool people",
    imgSrc: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80",
    href: "#",
  },
  {
    heading: "Fun",
    subheading: "In case you're bored",
    imgSrc: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80",
    href: "#",
  },
];

export const NeuralHoverLinks = () => {
  return (
    <section className="relative overflow-hidden rounded-xl border border-primary/15 bg-cursor-cream p-6 md:p-10">
      {/* Subtle grid background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top-left AI badge */}
      <div className="relative z-10 flex items-center gap-2 mb-6 md:mb-8">
        <span className="material-symbols-outlined text-[16px] text-error-warm">
          neurology
        </span>
        <span className="font-system-micro text-[10px] text-error-warm/80 tracking-widest uppercase">
          Neural Navigation · Hover to Explore
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {LINKS_DATA.map((link, i) => (
          <NeuralLink
            key={link.heading}
            heading={link.heading}
            subheading={link.subheading}
            imgSrc={link.imgSrc}
            href={link.href}
            index={i}
          />
        ))}
      </div>

      {/* Bottom corner ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, rgba(207,45,86,0.06), transparent 60%)",
        }}
      />
    </section>
  );
};

export default NeuralHoverLinks;
