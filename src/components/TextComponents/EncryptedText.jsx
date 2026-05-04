import { useState, useEffect } from "react";
import { motion } from "motion/react";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/~";

export default function EncryptedText({
  text,
  interval = 50,
  duration = 3000,
  className = "",
}) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let currentIteration = 0;
    // Total steps needed to reveal the entire string
    // Let's divide the duration by the interval to get total steps.
    const maxIterations = text.length;
    // But we want it to scramble for a bit before revealing each letter.
    // So let's make it reveal one letter per `X` ticks.
    const stepsPerLetter = duration / interval / text.length;

    const scrambleInterval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            // If the current iteration has passed this character's reveal threshold, show the actual character
            if (currentIteration >= index * stepsPerLetter) {
              return text[index];
            }

            // Otherwise, show a random character
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("");
      });

      if (currentIteration >= text.length * stepsPerLetter) {
        clearInterval(scrambleInterval);
        setIsAnimating(false);
      }

      currentIteration += 1;
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, [text, interval, duration]);

  return (
    <motion.span
      className={`font-mono-code inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
}
