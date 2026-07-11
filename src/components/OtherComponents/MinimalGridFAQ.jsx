import React from "react";
import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";

const faqData = [
  {
    question: "What is a credit?",
    answer: "A credit is an action GMHQ completes for you for research purposes. AI can find you emails, company descriptions, phone numbers and any publicly available information."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. You will be able to access GMHQ with 100 credits for free on signup with all the features included."
  },
  {
    question: "Can GodmodeHQ run autonomously for manual research?",
    answer: "All things you can run at GMHQ, can be run by \"The Sales Associate\". It is an agent customised for your product's data."
  },
  {
    question: "What does the Enterprise package entail for outreach?",
    answer: "It entails custom development with your enterprise data, data security compliance for SOC-2 type compliance and team level access permissions."
  },
  {
    question: "Do you have an API for integration?",
    answer: "We do custom integrations on a per request basis. Please reach out to team@troylabs.io discuss."
  },
  {
    question: "What integrations with multiple sources do you have?",
    answer: "Hubspot, Salesforce, Slack, Notion, Outlook, Gmail, Linkedin and Twitter. More integrations are underway."
  }
];

export const MinimalGridFAQ = ({
  faqs = faqData,
  title = "Frequently Asked Questions",
  className = ""
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`w-full relative overflow-hidden bg-[#f1edeb] dark:bg-[#1a1a1a] text-[#11100a] dark:text-[#fdf8f7] py-20 sm:py-28 flex justify-center items-center transition-colors duration-300 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative z-10 w-full max-w-6xl px-6 sm:px-10 flex flex-col gap-12 sm:gap-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-left select-none">
          <h2 className="font-section-heading text-[32px] md:text-[40px] font-bold leading-tight tracking-tight text-[#11100a] dark:text-[#fdf8f7]">
            {title}
          </h2>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex flex-col gap-3 group"
            >
              {/* Question Header Row */}
              <div className="flex items-start gap-2.5">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="shrink-0 mt-0.5 text-[#48473f]/40 dark:text-[#fdf8f7]/40 group-hover:text-[#11100a] dark:group-hover:text-[#fdf8f7] transition-colors duration-250"
                >
                  <CircleHelp className="w-4.5 h-4.5" strokeWidth={2} />
                </motion.div>
                <h3 className="font-section-heading text-base font-bold leading-snug tracking-tight text-[#11100a] dark:text-[#fdf8f7] select-none">
                  {faq.question}
                </h3>
              </div>

              {/* Answer Content */}
              <p className="font-ui-body text-[14px] leading-relaxed text-[#48473f]/80 dark:text-[#fdf8f7]/80 pl-7">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};