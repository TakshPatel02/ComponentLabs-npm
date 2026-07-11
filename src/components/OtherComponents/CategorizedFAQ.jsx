import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const CATEGORIES = ["Web dev", "Mobile dev", "UI/UX", "Copywriting"];

const FAQ_DATA = {
  "Web dev": [
    {
      question: "What is web development?",
      answer: "Web development refers to the creating, building, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management.",
    },
    {
      question: "How do I know if I need it?",
      answer: "If you want to establish an online presence, sell products to a wider audience, or build a web-based application, you need web development services.",
    },
    {
      question: "What does it cost?",
      answer: "The cost varies widely depending on the complexity of the project, features required, and the timeline. We offer tailored quotes after understanding your specific needs.",
    },
    {
      question: "What about SEO?",
      answer: "Search Engine Optimization (SEO) is integrated into our web development process from the ground up, ensuring your site is built to rank well on search engines.",
    },
  ],
  "Mobile dev": [
    {
      question: "Do you build for both iOS and Android?",
      answer: "Yes, we use modern cross-platform frameworks like React Native and Flutter, as well as native development, to ensure your app works flawlessly on both platforms.",
    },
    {
      question: "How long does a typical app take?",
      answer: "A standard mobile application typically takes between 3 to 6 months from initial concept to launch, depending on the feature set.",
    },
    {
      question: "Will you help upload the app to the stores?",
      answer: "Absolutely. We handle the entire submission process for both the Apple App Store and Google Play Store, ensuring compliance with all guidelines.",
    },
    {
      question: "Can the app work offline?",
      answer: "Yes, we can implement local databases and caching strategies so users can access core features even without an internet connection.",
    },
  ],
  "UI/UX": [
    {
      question: "What's the difference between UI and UX?",
      answer: "UI (User Interface) focuses on the visual elements—how things look. UX (User Experience) focuses on the overall feel and functionality—how things work and how the user interacts with them.",
    },
    {
      question: "Do you offer user testing?",
      answer: "Yes, comprehensive user testing is a core part of our design process to ensure the final product meets your users' needs and expectations.",
    },
    {
      question: "Do you provide design systems?",
      answer: "We deliver complete design systems including component libraries, typography scales, and color palettes so your future development stays consistent.",
    },
    {
      question: "Can you redesign our existing app?",
      answer: "Certainly. We start with a UX audit to identify pain points, then iteratively redesign the interface to improve both aesthetics and conversion rates.",
    },
  ],
  "Copywriting": [
    {
      question: "Can you help define our brand voice?",
      answer: "Absolutely. We work closely with you to understand your brand values and target audience to craft a unique and compelling brand voice.",
    },
    {
      question: "Do you write blog posts?",
      answer: "Yes, we offer ongoing content creation services, including SEO-optimized blog posts, articles, and whitepapers.",
    },
    {
      question: "Do you handle email marketing copy?",
      answer: "We craft high-converting email sequences, newsletters, and promotional campaigns tailored to engage your specific subscriber base.",
    },
    {
      question: "What is your revision process?",
      answer: "We typically include two rounds of revisions for all copy to ensure the final tone and messaging perfectly align with your vision.",
    },
  ],
};

export function CategorizedFAQ({
  categories = CATEGORIES,
  faqData = FAQ_DATA,
  title = "FAQs",
  subtitle = "Let's answer some questions",
  className = ""
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(null);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(null); // Reset open question when category changes
  };

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const currentFaqs = faqData[activeCategory] || [];

  return (
    <div className={`w-full flex items-center justify-center p-4 py-16 overflow-hidden font-ui-body ${className}`}>
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#48473f] dark:text-[#fdf8f7]/80 font-medium text-sm md:text-base tracking-wide block mb-3">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#11100a] dark:text-[#fdf8f7] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-5 py-2 rounded-lg text-sm md:text-base font-medium transition-colors duration-300 border border-[#11100a]/10 dark:border-[#fdf8f7]/10 ${
                  isActive ? "border-transparent dark:border-transparent text-[#fdf8f7] dark:text-[#11100a]" : "text-[#48473f]/80 dark:text-[#fdf8f7]/80 hover:text-[#11100a] dark:hover:text-[#fdf8f7] bg-[#fdf8f7] dark:bg-[#1a1a1a]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-[#11100a] dark:bg-[#fdf8f7] rounded-lg z-0 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {category}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="w-full space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 w-full"
            >
              {currentFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={false}
                    className={`border border-[#11100a]/10 dark:border-[#fdf8f7]/10 rounded-xl overflow-hidden transition-colors duration-300 ${
                      isOpen ? "bg-[#fdf8f7] dark:bg-[#1a1a1a] shadow-sm" : "bg-[#f1edeb]/50 dark:bg-[#2a2a2a]/50 hover:bg-[#fdf8f7] dark:hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-base md:text-lg font-medium text-[#11100a] dark:text-[#fdf8f7]">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                        className="shrink-0 ml-4 text-[#48473f] dark:text-[#fdf8f7]/80 h-8 w-8 rounded-full bg-[#f1edeb] dark:bg-[#2a2a2a] flex items-center justify-center"
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
                          <div className="px-6 pb-6 text-[#48473f]/80 dark:text-[#fdf8f7]/80 text-[15px] leading-relaxed pt-2 border-t border-[#11100a]/10 dark:border-[#fdf8f7]/10">
                            <motion.p
                              initial={{ y: -5, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -5, opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.05 }}
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
