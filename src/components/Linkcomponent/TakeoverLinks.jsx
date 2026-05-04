import React, { useState } from "react";
import { useAnimate } from "motion/react";

const LINKS = [
  { label: "ART", href: "#", color: "#6b5b95" },
  { label: "DESIGN", href: "#", color: "#4f6d7a" },
  { label: "PHOTOS", href: "#", color: "#7a5c61" },
  { label: "CONTACT", href: "#", color: "#5f6f52" },
];

const SplitText = ({ text, className, letterClassName }) => {
  return (
    <span className={className} aria-hidden>
      {text.split("").map((char, index) => (
        <span key={`${text}-${index}`} className="relative inline-block overflow-hidden align-top">
          <span className={`${letterClassName} char-out block`}>
            {char === " " ? "\u00A0" : char}
          </span>
          <span
            className={`${letterClassName} char-in pointer-events-none absolute left-0 top-0 block`}
            style={{ transform: "translateY(110%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
};

const TakeoverLinkRow = ({ label, href, color, onHoverStart }) => {
  const [scope, animate] = useAnimate();

  const handleEnter = async () => {
    onHoverStart(color);

    animate(
      ".char-out",
      { y: ["0%", "-105%"] },
      { duration: 0.50, delay: (index) => index * 0.02, ease: "easeInOut" },
    );
    animate(
      ".char-in",
      { y: ["105%", "0%"] },
      { duration: 0.50, delay: (index) => index * 0.02, ease: "easeInOut" },
    );
  };

  const handleLeave = () => {
    animate(
      ".char-out",
      { y: ["-105%", "0%"] },
      { duration: 0.40, delay: (index) => index * 0.015, ease: "easeInOut" },
    );
    animate(
      ".char-in",
      { y: ["0%", "105%"] },
      { duration: 0.40, delay: (index) => index * 0.015, ease: "easeInOut" },
    );
  };

  return (
    <a
      ref={scope}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative block overflow-hidden border-b border-primary/20 py-2 md:py-3"
    >
      <span className="relative block overflow-hidden font-light uppercase tracking-wide text-primary">
        <SplitText
          text={label}
          className="text-5xl leading-none md:text-7xl lg:text-8xl"
          letterClassName="inline-block"
        />
      </span>
    </a>
  );
};

const TakeoverLinks = () => {
  const [containerScope, animateContainer] = useAnimate();
  const [activeColor, setActiveColor] = useState(LINKS[0].color);

  const handleHoverStart = async (color) => {
    setActiveColor(color);
    await animateContainer(
      ".takeover-bg",
      { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] },
      { duration: 0.52, ease: "easeInOut" },
    );
  };

  const handleContainerLeave = async () => {
    await animateContainer(
      ".takeover-bg",
      { clipPath: ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"] },
      { duration: 0.42, ease: "easeInOut" },
    );
  };

  return (
    <section
      ref={containerScope}
      onMouseLeave={handleContainerLeave}
      className="relative overflow-hidden rounded-xl border border-primary/25 bg-cursor-cream p-6 md:p-10"
    >
      <span
        className="takeover-bg pointer-events-none absolute inset-0"
        style={{ backgroundColor: activeColor, clipPath: "inset(100% 0% 0% 0%)" }}
      />

      <div className="relative mx-auto w-full max-w-3xl">
        {LINKS.map((item) => (
          <TakeoverLinkRow
            key={item.label}
            label={item.label}
            href={item.href}
            color={item.color}
            onHoverStart={handleHoverStart}
          />
        ))}
      </div>
    </section>
  );
};

export default TakeoverLinks;
