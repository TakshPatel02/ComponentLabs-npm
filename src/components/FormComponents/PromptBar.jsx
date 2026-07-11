import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, RotateCcw, User } from 'lucide-react';

export function PromptBar({
  onSubmit,
  title = "The Prompt Bar",
  subtitle = "Intelligent Input",
  placeholder = "Explain the architecture of these forms...",
  className = ""
}) {
  const [inputValue, setInputValue] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSubmittedMessage(inputValue);
      if (onSubmit) {
        onSubmit(inputValue);
      }
      setInputValue('');
    }
  };

  const handleReset = () => {
    setSubmittedMessage('');
    setInputValue('');
  };

  return (
    <div className={`flex w-full items-center justify-center p-4 ${className}`}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#f1edeb]/30 dark:bg-[#1a1a1a]/30 shadow-sm transition-all duration-300">
        
        <div className="absolute inset-y-0 right-0 w-[40%] bg-[#1c1b1b]/5 dark:bg-[#fdf8f7]/5 opacity-80 pointer-events-none border-l border-[#11100a]/10 dark:border-[#fdf8f7]/10" />
        
        <div className="relative z-10 p-10 md:p-14 flex flex-col min-h-[300px] justify-center">
          
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#cf2d56]" fill="currentColor" strokeWidth={0.5} />
            <span className="text-xs font-semibold tracking-[0.15em] text-[#48473f]/40 dark:text-[#fdf8f7]/40 uppercase">
              {subtitle}
            </span>
          </div>
          <h2 className="mb-8 text-4xl font-normal tracking-tight text-[#11100a] dark:text-[#fdf8f7]">
            {title}
          </h2>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${submittedMessage ? 'max-h-60 mb-8 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
            <div className="flex flex-col items-end gap-2 w-full">
              <div className="flex items-end gap-3 max-w-[85%]">
                <div className="rounded-2xl rounded-br-sm bg-[#1c1b1b] dark:bg-[#fdf8f7] px-5 py-4 text-[#fdf8f7] dark:text-[#11100a] shadow-md">
                  <p className="text-[17px] font-medium leading-relaxed tracking-wide opacity-90">
                    {submittedMessage}
                  </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1c1b1b]/10 dark:bg-[#fdf8f7]/10 shadow-sm border border-[#11100a]/10 dark:border-[#fdf8f7]/10">
                  <User className="h-4 w-4 text-[#48473f]/60 dark:text-[#fdf8f7]/60" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSubmit} className="relative flex-1 flex items-center rounded-xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#fdf8f7]/50 dark:bg-[#11100a]/50 p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus-within:border-[#48473f]/40 dark:focus-within:border-[#fdf8f7]/40 focus-within:bg-[#fdf8f7] dark:focus-within:bg-[#11100a]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent px-5 py-3 text-lg text-[#11100a] dark:text-[#fdf8f7] placeholder:font-serif placeholder:text-[#48473f]/30 dark:placeholder:text-[#fdf8f7]/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!submittedMessage}
              />
              <button
                type="submit"
                disabled={!!submittedMessage || !inputValue.trim()}
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#1c1b1b] dark:bg-[#fdf8f7] text-[#fdf8f7] dark:text-[#11100a] transition-all hover:bg-[#cf2d56] dark:hover:bg-[#cf2d56] hover:text-[#ffffff] dark:hover:text-[#ffffff] disabled:opacity-40 disabled:hover:bg-[#1c1b1b] dark:disabled:hover:bg-[#fdf8f7]"
              >
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className={`transition-all duration-500 ease-in-out ${submittedMessage ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-4 overflow-hidden'}`}>
              <button
                type="button"
                onClick={handleReset}
                className="flex h-[68px] items-center justify-center gap-2 rounded-xl border border-[#11100a]/10 dark:border-[#fdf8f7]/10 bg-[#fdf8f7] dark:bg-[#11100a] px-6 text-sm font-semibold text-[#11100a]/60 dark:text-[#fdf8f7]/60 shadow-sm transition-all hover:bg-[#1c1b1b]/5 dark:hover:bg-[#fdf8f7]/5 hover:text-[#11100a] dark:hover:text-[#fdf8f7] hover:shadow whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={2.5} />
                Reset
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
