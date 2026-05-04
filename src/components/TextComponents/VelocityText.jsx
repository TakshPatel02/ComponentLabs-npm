import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "motion/react";
import React, { useRef } from "react";

export default function VelocityText({ text, heightClass = "h-[400px]" }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["15deg", "-15deg"],
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  // Increased the translation end point to fully reveal very long text
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -15000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  const content =
    text ||
    "Nothing in this world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. Persistence and determination alone are omnipotent. The slogan 'Press On!' has solved and always will solve the problems of the human race.";

  return (
    <section
      ref={containerRef}
      className={`w-full relative overflow-y-auto overflow-x-hidden ${heightClass}`}
    >
      <div className="h-[800vh] w-full relative">
        <div
          className={`sticky top-0 flex w-full items-center overflow-hidden ${heightClass}`}
        >
          <motion.p
            style={{ skewX, x }}
            className="origin-bottom-left whitespace-nowrap text-6xl font-display-hero uppercase leading-[0.85] tracking-tighter text-primary md:text-8xl md:leading-[0.85] px-4"
          >
            {content}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
