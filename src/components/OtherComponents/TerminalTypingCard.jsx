import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const TerminalTypingCard = ({
  lines = [
    { text: "npm install @componentlab/ui", delay: 800, type: "cmd" },
    { text: "Installing packages...", delay: 1000, type: "output" },
    { text: "Added 12 packages in 1.2s", delay: 600, type: "success" },
    { text: "componentlab init", delay: 800, type: "cmd" },
    {
      text: "Initializing workspace configuration...",
      delay: 400,
      type: "output",
    },
    {
      text: "✔  Configuration created successfully",
      delay: 600,
      type: "success",
    },
    { text: "npm run dev", delay: 500, type: "cmd" },
    {
      text: "Vite server started on http://localhost:5173",
      delay: 0,
      type: "info",
    },
  ],
}) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentLine.type === "cmd") {
      // Typewriter effect for commands
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(
          () => {
            setCurrentCharIndex((prev) => prev + 1);
          },
          Math.random() * 40 + 30,
        ); // Random typing speed between 30ms and 70ms
        return () => clearTimeout(timeout);
      } else {
        // Done typing command line, wait for delay then push to displayed
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, { ...currentLine }]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, currentLine.delay || 400);
        return () => clearTimeout(timeout);
      }
    } else {
      // Instant output for non-commands (logs, success, info)
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { ...currentLine }]);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLine.delay || 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  return (
    <div className="w-full max-w-2xl rounded-xl bg-[#0d0d0d] border oklab-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm md:text-base">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-neutral-800/80">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="ml-4 flex-1 text-center font-sans text-xs text-neutral-500 font-medium select-none tracking-wide">
          bash — admin@componentlab: ~
        </div>
        <div className="w-12"></div> {/* Spacer for center alignment */}
      </div>

      {/* Terminal Body */}
      <div className="p-6 text-neutral-300 min-h-75">
        {displayedLines.map((line, i) => (
          <div
            key={i}
            className={`mb-2 tracking-tight ${
              line.type === "cmd"
                ? "text-neutral-200"
                : line.type === "success"
                  ? "text-green-400"
                  : line.type === "info"
                    ? "text-blue-400"
                    : "text-neutral-500"
            }`}
          >
            {line.type === "cmd" && (
              <span className="text-secondary mr-3">❯</span>
            )}
            {line.text}
          </div>
        ))}

        {/* Currently typing line */}
        {currentLineIndex < lines.length &&
          lines[currentLineIndex].type === "cmd" && (
            <div className="text-neutral-200 mb-2 tracking-tight">
              <span className="text-secondary mr-3">❯</span>
              {lines[currentLineIndex].text.substring(0, currentCharIndex)}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[8px] h-4.5 bg-neutral-400 ml-1 align-text-bottom"
              />
            </div>
          )}

        {/* Final blinking cursor when done */}
        {!isTyping && (
          <div className="text-neutral-200 mt-2 tracking-tight">
            <span className="text-secondary mr-3">❯</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[8px] h-4.5 bg-neutral-400 align-text-bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
};
