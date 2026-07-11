import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const CODE_EXAMPLES = {
  React: {
    language: "React",
    code: `import { AnimatedFAQ, HeroPage } from "@componentlabs/ui";

export default function App() {
  return (
    <main className="min-h-screen">
      <HeroPage theme="dark" />
      <AnimatedFAQ data={faqItems} />
    </main>
  );
}`,
  },
  HTML: {
    language: "HTML",
    code: `<!-- Include ComponentLabs Core -->
<script src="https://cdn.componentlabs.dev/core.js"></script>
<link href="https://cdn.componentlabs.dev/theme.css" rel="stylesheet">

<div id="hero-app"></div>

<script>
  ComponentLabs.mountHero('#hero-app', { 
    theme: 'dark' 
  });
</script>`,
  },
};

export function CodeShowcaseFeature({
  title = "Engineered for modern frameworks",
  description = "ComponentLabs provides first-class support for React, Next.js, and vanilla JavaScript. Seamlessly integrate our primitives into your existing stack.",
  codeExamples = CODE_EXAMPLES,
  className = ""
}) {
  const [activeTab, setActiveTab] = useState("React");

  return (
    <section className={`relative w-full py-24 overflow-hidden bg-[#05050A] font-ui-body ${className}`}>
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)'
        }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Header Icon */}
        <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-b from-[#1e1b4b] to-[#0f172a] border border-indigo-500/30 shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]">
          <Zap className="w-6 h-6 text-indigo-400" />
        </div>

        {/* Text Content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Code Window */}
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-800 bg-[#0A0D14] shadow-2xl">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0F131D]">
            <div className="flex space-x-2">
              {Object.keys(codeExamples).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCodeTab"
                        className="absolute inset-0 bg-indigo-600 rounded-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* GitHub Stars */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#161B22] border border-slate-800 text-slate-300 text-xs font-medium">
              <FiGithub className="w-3.5 h-3.5" />
              <span>☆ 1,234</span>
            </div>
          </div>

          {/* Code Area */}
          <div className="p-6 overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-sm leading-relaxed"
              >
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="flex flex-col text-slate-600 select-none pr-6 text-right w-8 shrink-0">
                    {codeExamples[activeTab].code.split('\n').map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  {/* Syntax Highlighted Code (Simulated) */}
                  <div className="text-slate-300 whitespace-pre">
                    {activeTab === "React" ? (
                      <>
                        <span className="text-pink-400">import</span> {"{ "}
                        <span className="text-blue-400">AnimatedFAQ</span>, <span className="text-blue-400">HeroPage</span>
                        {" } "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-green-300">"@componentlabs/ui"</span>;{"\n\n"}
                        <span className="text-pink-400">export default function</span>{" "}
                        <span className="text-blue-400">App</span>() {"{\n"}
                        {"  "}<span className="text-pink-400">return</span> ({"\n"}
                        {"    "}&lt;<span className="text-blue-400">main</span> <span className="text-indigo-300">className</span>=<span className="text-green-300">"min-h-screen"</span>&gt;{"\n"}
                        {"      "}&lt;<span className="text-blue-400">HeroPage</span> <span className="text-indigo-300">theme</span>=<span className="text-green-300">"dark"</span> /&gt;{"\n"}
                        {"      "}&lt;<span className="text-blue-400">AnimatedFAQ</span> <span className="text-indigo-300">data</span>={"{"}<span className="text-yellow-200">faqItems</span>{"}"} /&gt;{"\n"}
                        {"    "}&lt;/<span className="text-blue-400">main</span>&gt;{"\n"}
                        {"  "});{"\n"}
                        {"}"}
                      </>
                    ) : (
                      <>
                        <span className="text-slate-500">&lt;!-- Include ComponentLabs Core --&gt;</span>{"\n"}
                        &lt;<span className="text-blue-400">script</span> <span className="text-indigo-300">src</span>=<span className="text-green-300">"https://cdn.componentlabs.dev/core.js"</span>&gt;&lt;/<span className="text-blue-400">script</span>&gt;{"\n"}
                        &lt;<span className="text-blue-400">link</span> <span className="text-indigo-300">href</span>=<span className="text-green-300">"https://cdn.componentlabs.dev/theme.css"</span> <span className="text-indigo-300">rel</span>=<span className="text-green-300">"stylesheet"</span>&gt;{"\n\n"}
                        
                        &lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">id</span>=<span className="text-green-300">"hero-app"</span>&gt;&lt;/<span className="text-blue-400">div</span>&gt;{"\n\n"}
                        
                        &lt;<span className="text-blue-400">script</span>&gt;{"\n"}
                        {"  "}<span className="text-yellow-200">ComponentLabs</span>.<span className="text-blue-400">mountHero</span>(<span className="text-green-300">'#hero-app'</span>, {"{\n"}
                        {"    "}theme: <span className="text-green-300">'dark'</span>{"\n"}
                        {"  });\n"}
                        &lt;/<span className="text-blue-400">script</span>&gt;
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
