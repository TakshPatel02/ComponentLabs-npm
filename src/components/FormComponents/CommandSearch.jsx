import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Check } from 'lucide-react';

export function CommandSearch({ 
  onSearch, 
  title = "Command Search", 
  subtitle = "Command Palette", 
  footerQuote = "Efficiency through spatial memory and rapid keyboard interaction.",
  className = ""
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchStatus, setSearchStatus] = useState('idle'); // 'idle' | 'searching' | 'done'
  const inputRef = useRef(null);

  // Handle CMD+K / CTRL+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (inputRef.current) {
          if (document.activeElement === inputRef.current) {
            inputRef.current.blur();
            setIsFocused(false);
          } else {
            inputRef.current.focus();
            setIsFocused(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && searchStatus !== 'searching') {
      e.preventDefault();
      setSearchStatus('searching');
      inputRef.current?.blur();
      
      // Simulate network request or call prop
      if (onSearch) {
        onSearch(inputValue);
      }
      setTimeout(() => {
        setSearchStatus('done');
        
        // Reset after showing the result message for a bit
        setTimeout(() => {
          setSearchStatus('idle');
          setInputValue('');
        }, 3000);
      }, 2000);
    }
  };

  return (
    <div className={`flex w-full items-center justify-center p-4 ${className}`}>
      <div className="relative w-full max-w-2xl bg-[#f1edeb]/30 dark:bg-[#1a1a1a]/30 oklab-border shadow-sm p-6 sm:p-10 md:p-14 transition-all duration-300">
        
        {/* Label */}
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-widest text-[#48473f]/40 dark:text-[#fdf8f7]/40 uppercase">
            {subtitle}
          </span>
        </div>

        {/* Heading */}
        <h2 className="mb-8 text-2xl md:text-3xl font-normal tracking-tight text-[#11100a] dark:text-[#fdf8f7]">
          {title}
        </h2>

        {/* Search Input Container */}
        <div 
          className={`relative flex items-center bg-[#fdf8f7] dark:bg-[#11100a] rounded-sm border transition-all duration-200 ${
            isFocused ? 'border-[#48473f]/40 dark:border-[#fdf8f7]/40 ring-2 ring-[#1c1b1b]/5 dark:ring-[#fdf8f7]/5 shadow-md' : 'border-transparent dark:border-[#fdf8f7]/10 shadow-sm'
          } ${searchStatus !== 'idle' ? 'opacity-70 pointer-events-none' : ''}`}
        >
          <div className="pl-4 pr-2">
            {searchStatus === 'searching' ? (
              <Loader2 className="h-5 w-5 text-[#48473f] dark:text-[#fdf8f7]" strokeWidth={2} />
            ) : searchStatus === 'done' ? (
              <Check className="h-5 w-5 text-emerald-500" strokeWidth={2.5} />
            ) : (
              <Search className={`h-5 w-5 ${isFocused ? 'text-[#11100a] dark:text-[#fdf8f7]' : 'text-[#48473f]/40 dark:text-[#fdf8f7]/40'} transition-colors`} strokeWidth={2} />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Find component..."
            className="w-full bg-transparent py-4 text-[#11100a] dark:text-[#fdf8f7] placeholder:text-[#48473f]/30 dark:placeholder:text-[#fdf8f7]/30 focus:outline-none text-lg"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={searchStatus !== 'idle'}
          />

          <div className="flex items-center gap-1.5 pr-4 pl-2 opacity-80">
            <kbd className="hidden sm:inline-flex h-7 items-center justify-center rounded bg-[#1c1b1b]/5 dark:bg-[#fdf8f7]/5 border border-[#11100a]/10 dark:border-[#fdf8f7]/10 px-2 text-[11px] font-medium text-[#48473f]/60 dark:text-[#fdf8f7]/60 shadow-sm font-sans">
              CMD
            </kbd>
            <kbd className="hidden sm:inline-flex h-7 items-center justify-center rounded bg-[#1c1b1b]/5 dark:bg-[#fdf8f7]/5 border border-[#11100a]/10 dark:border-[#fdf8f7]/10 px-2 text-[11px] font-medium text-[#48473f]/60 dark:text-[#fdf8f7]/60 shadow-sm font-sans">
              K
            </kbd>
          </div>
        </div>

        {/* Status Message Dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchStatus !== 'idle' ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
          <div className={`flex items-center gap-2 rounded bg-[#fdf8f7] dark:bg-[#11100a] px-4 py-3 border border-[#11100a]/10 dark:border-[#fdf8f7]/10 ${searchStatus === 'searching' ? 'text-[#11100a]/60 dark:text-[#fdf8f7]/60' : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500'}`}>
             {searchStatus === 'searching' && (
               <span className="text-sm font-medium animate-pulse tracking-wide">Searching component library for "{inputValue}"...</span>
             )}
             {searchStatus === 'done' && (
               <span className="text-sm font-medium tracking-wide">Found 3 results for "{inputValue}".</span>
             )}
          </div>
        </div>

        {/* Footer Quote */}
        <div className={`transition-all duration-300 ${searchStatus !== 'idle' ? 'mt-8 md:mt-16' : 'mt-16 md:mt-24'}`}>
          <p className="text-[#48473f]/60 dark:text-[#fdf8f7]/60 font-serif italic text-lg leading-relaxed">
            "{footerQuote}"
          </p>
        </div>

      </div>
    </div>
  );
}
