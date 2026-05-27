import React, { useEffect, useRef } from 'react';
import { useMotionTemplate, useMotionValue, motion, animate } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';

const DEFAULT_AURORA_COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

/* ── Canvas Starfield ── */
function Starfield({ count = 200 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => { 
      if (!canvas) return;
      canvas.width = (canvas.offsetWidth || window.innerWidth) * 2; 
      canvas.height = (canvas.offsetHeight || window.innerHeight) * 2; 
    };
    resize();
    window.addEventListener('resize', resize);

    // generate stars once
    const stars = Array.from({ length: count }, () => ({
      x: Math.random(), 
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.3,
    }));

    const draw = (t) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const opacity = 0.35 + 0.65 * ((Math.sin(t * 0.001 * s.speed + s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ── Aurora Hero ── */
export const AuroraHero = ({
  badgeText = "Beta Now Live!",
  title = "Decrease your SaaS churn by over 90%",
  description = "Predict at-risk users before they leave. Our AI-powered retention engine identifies churn signals in real-time, so you can act fast and keep your customers engaged.",
  ctaText = "Start free trial",
  onCtaClick,
  starCount = 250,
  colors = DEFAULT_AURORA_COLORS,
  className = "",
}) => {
  const color = useMotionValue(colors[0]);

  useEffect(() => {
    animate(color, colors, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [colors]);

  const bg = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const glow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage: bg }}
      className={`relative grid min-h-[500px] md:min-h-[600px] place-content-center overflow-hidden rounded-xl bg-gray-950 px-4 py-16 md:py-24 text-gray-200 ${className}`}
    >
      {/* Starfield background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Starfield count={starCount} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {badgeText && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 inline-block rounded-full bg-gray-600/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/10"
          >
            {badgeText}
          </motion.span>
        )}

        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl bg-linear-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </motion.h1>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="my-6 max-w-2xl text-center text-base leading-relaxed text-gray-400 md:text-lg md:leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {ctaText && (
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            style={{ border, boxShadow: glow }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={onCtaClick}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-5 py-2.5 text-gray-50 transition-colors hover:bg-gray-950/50 backdrop-blur-sm"
          >
            {ctaText}
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        )}
      </div>
    </motion.section>
  );
};

export default AuroraHero;
