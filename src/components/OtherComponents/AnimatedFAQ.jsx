import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What makes this component library different?",
    answer:
      "It focuses on bridging the gap between high-end aesthetic interaction and developer experience. Every primitive acts as a canvas for creativity rather than a strict constraint.",
  },
  {
    question: "Do I need to install any external packages?",
    answer:
      "Most components are built with Framer Motion and Tailwind CSS. A few require React Icons for scalable vector graphics.",
  },
  {
    question: "Are the animations computationally heavy?",
    answer:
      "We use hardware-accelerated CSS properties via Framer Motion. This ensures silky smooth 60fps animations without draining the main thread or harming battery life.",
  },
  {
    question: "Can I use these components in production?",
    answer:
      "Absolutely. They are designed to be robust, performant, and easily adaptable to your own design systems and continuous delivery pipelines.",
  },
];

export const AnimatedFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-16 px-4 font-ui-body">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="font-section-heading text-[32px] md:text-[40px] leading-tight text-primary transition-colors tracking-tighter mb-4">
          Frequently Assumed{" "}
          <span className="text-secondary italic font-editorial-standard font-medium">
            Queries
          </span>
        </h2>
        <p className="font-editorial-standard text-editorial-standard text-on-surface-variant max-w-2xl">
          Everything you need to know about our principles and architecture.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={false}
      className={`border oklab-border rounded-xl overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-surface-300" : "bg-surface hover:bg-surface-container"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-primary font-['Space_Grotesk']">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="shrink-0 ml-4 h-8 w-8 rounded-full bg-surface border oklab-border flex items-center justify-center text-secondary"
        >
          <Plus size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-on-surface-variant text-[16px] leading-relaxed border-t oklab-border pt-4 mt-2 font-editorial-standard">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
