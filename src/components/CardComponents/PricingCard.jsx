import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck, Lock } from 'lucide-react';

const PLANS = [
  { name: "Starter", price: "$0", period: "/mo",
    features: [
      { text: "Basic components", active: true },
      { text: "5 projects", active: true },
      { text: "Priority support", active: false },
    ],
    cta: "Get Started" },
  { name: "Professional", price: "$10", period: "/mo", popular: true,
    features: [
      { text: "All premium components", active: true },
      { text: "Unlimited projects", active: true },
      { text: "Priority support", active: true },
      { text: "Advanced micro-spacing controls", active: true },
    ],
    cta: "Upgrade Now" },
  { name: "Enterprise", price: "Custom", period: "",
    features: [
      { text: "Custom components library", active: true },
      { text: "Granular team permissions", active: true },
      { text: "Enterprise-grade SLA", active: true },
      { text: "White-glove migration support", active: true },
    ],
    cta: "Contact Sales" },
];

const PricingCard = () => (
  <div className="w-full flex flex-col items-center py-8 px-4">
    {/* Header */}
    <h2 className="text-[40px] md:text-[52px] text-primary font-medium tracking-tight text-center mb-4 transition-colors">
      Engineered for <span className="italic font-serif text-error-warm">Craft.</span>
    </h2>
    <p className="text-on-surface-variant/60 text-center text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-12 transition-colors">
      Transparent pricing for developers who prioritize <span className="underline underline-offset-2">micro-alignment, warm aesthetics,</span>
      {" "}and rigorous architectural integrity.
    </p>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {PLANS.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: "easeOut" }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className={`relative bg-surface rounded-xl p-7 flex flex-col justify-between transition-all ${
            plan.popular 
              ? 'border-2 border-error-warm/40 shadow-[0_8px_30px_rgba(207,45,86,0.08)]' 
              : 'oklab-border'
          }`}
        >
          {/* Popular badge */}
          {plan.popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-error-warm text-white text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1 rounded-full">
              Most Popular
            </div>
          )}

          {/* Plan info */}
          <div>
            <h3 className="text-[18px] font-medium text-primary/80 mb-3">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-[42px] font-medium text-primary tracking-tight leading-none">{plan.price}</span>
              {plan.period && <span className="text-[16px] text-on-surface-variant/40">{plan.period}</span>}
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-8">
              {plan.features.map((f, j) => (
                <div key={j} className={`flex items-center gap-2.5 text-[15px] ${f.active ? 'text-primary/70' : 'text-on-surface-variant/40'}`}>
                  {f.active 
                    ? <CircleCheck size={16} className="text-error-warm/70 shrink-0" /> 
                    : <Lock size={14} className="text-on-surface-variant/20 shrink-0" />}
                  <span className={f.active ? 'font-medium' : ''}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg text-[15px] font-medium transition-colors cursor-pointer ${
              plan.popular
                ? 'bg-primary text-on-primary hover:bg-error-warm'
                : 'bg-transparent oklab-border text-primary/60 hover:bg-on-surface/5'
            }`}
          >
            {plan.cta}
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
);

export default PricingCard;
