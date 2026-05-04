import { useState } from "react";
import { motion } from "motion/react";

const GhostInput = ({
  label,
  type = "text",
  id,
  placeholder,
  isTextarea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const InputElement = isTextarea ? motion.textarea : motion.input;

  return (
    <div className="relative flex flex-col w-full mb-8 group">
      <div className="relative">
        <motion.label
          htmlFor={id}
          initial={false}
          animate={{
            y: isFocused || value ? -24 : 0,
            opacity: isFocused || value ? 1 : 0,
            scale: isFocused || value ? 0.85 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-2 text-sm text-on-surface-variant origin-left pointer-events-none"
        >
          {label}
        </motion.label>

        <InputElement
          id={id}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : placeholder}
          rows={isTextarea ? 4 : undefined}
          className={`w-full bg-transparent border-none outline-none py-2 text-on-surface placeholder:text-on-surface-variant/40 placeholder:transition-opacity placeholder:duration-300 ${isTextarea ? "resize-none" : ""}`}
        />

        {/* Base underline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-800 transition-colors group-hover:bg-gray-300 dark:group-hover:bg-gray-700" />

        {/* Animated focus underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-on-surface origin-left"
        />
      </div>
    </div>
  );
};

export default function GhostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <GhostInput
          id="email-demo"
          type="email"
          label="Email address*"
          placeholder="Enter your email"
        />

        <GhostInput
          id="message-demo"
          label="Message*"
          placeholder="What's on your mind?"
          isTextarea={false}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 px-6 py-4 bg-primary text-on-primary text-sm font-medium tracking-wide rounded-md overflow-hidden relative group w-full max-w-75 mx-auto md:mx-0 border border-border-fallback-10 min-h-14 flex items-center justify-center"
        >
          <motion.span
            className="block"
            animate={{ y: isSubmitting ? "-100%" : "0%" }}
            transition={{ duration: 0.3 }}
          >
            Submit
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center bg-surface-container-highest text-on-surface"
            initial={{ y: "100%" }}
            animate={{ y: isSubmitting ? "0%" : "100%" }}
            transition={{ duration: 0.3 }}
          >
            Sending...
          </motion.span>
        </motion.button>
      </form>
    </div>
  );
}
