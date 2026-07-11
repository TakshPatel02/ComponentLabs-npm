import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export const VelocityText = ({ text, heightClass = "h-[400px]" }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const content =
    text ||
    "Nothing in this world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. Persistence and determination alone are omnipotent. The slogan 'Press On!' has solved and always will solve the problems of the human race.";

  const [scrollRange, setScrollRange] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (containerRef.current && textRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        // Calculate the distance to move left so the end of text is visible
        const range = Math.max(0, textWidth - containerWidth + 100);
        setScrollRange(range);
        setViewportHeight(containerRef.current.clientHeight);
      }
    };

    updateMeasurements();
    // Re-measure after fonts load or window resizes
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [content]);

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

  // Map scroll progress to horizontal translation
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  // Calculate the total height of the scrollable area
  const scrollHeight = scrollRange > 0 ? scrollRange + viewportHeight : "100%";

  return (
    <section
      ref={containerRef}
      className={`w-full relative overflow-y-auto overflow-x-hidden ${heightClass}`}
    >
      <div style={{ height: scrollHeight }} className="w-full relative">
        <div
          className={`sticky top-0 flex w-full items-center overflow-hidden ${heightClass}`}
        >
          <motion.p
            ref={textRef}
            style={{ skewX, x }}
            className="origin-bottom-left whitespace-nowrap text-6xl font-display-hero uppercase leading-[0.85] tracking-tighter text-[#11100a] md:text-8xl md:leading-[0.85] px-4"
          >
            {content}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

