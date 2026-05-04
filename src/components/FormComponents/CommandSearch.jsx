import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Check } from 'lucide-react';

export default function CommandSearch() {
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
      
      // Simulate network request
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
    <div className="flex w-full items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-surface-container/30 oklab-border shadow-sm p-6 sm:p-10 md:p-14 transition-all duration-300">
        
        {/* Label */}
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-widest text-on-surface-variant/40 uppercase">
            Command Palette
          </span>
        </div>

        {/* Heading */}
        <h2 className="mb-8 text-2xl md:text-3xl font-normal tracking-tight text-primary">
          Command Search
        </h2>

        {/* Search Input Container */}
        <div 
          className={`relative flex items-center bg-surface rounded-sm oklab-border transition-all duration-200 ${
            isFocused ? 'border-on-surface-variant/40 ring-2 ring-on-surface/5 shadow-md' : 'shadow-sm'
          } ${searchStatus !== 'idle' ? 'opacity-70 pointer-events-none' : ''}`}
        >
          <div className="pl-4 pr-2">
            {searchStatus === 'searching' ? (
              <Loader2 className="h-5 w-5 text-on-surface-variant animate-spin" strokeWidth={2} />
            ) : searchStatus === 'done' ? (
              <Check className="h-5 w-5 text-emerald-500" strokeWidth={2.5} />
            ) : (
              <Search className={`h-5 w-5 ${isFocused ? 'text-primary' : 'text-on-surface-variant/40'} transition-colors`} strokeWidth={2} />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Find component..."
            className="w-full bg-transparent py-4 text-primary placeholder:text-on-surface-variant/30 focus:outline-none text-lg"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={searchStatus !== 'idle'}
          />

          <div className="flex items-center gap-1.5 pr-4 pl-2 opacity-80">
            <kbd className="hidden sm:inline-flex h-7 items-center justify-center rounded bg-on-surface/5 oklab-border px-2 text-[11px] font-medium text-on-surface-variant/60 shadow-sm font-sans">
              CMD
            </kbd>
            <kbd className="hidden sm:inline-flex h-7 items-center justify-center rounded bg-on-surface/5 oklab-border px-2 text-[11px] font-medium text-on-surface-variant/60 shadow-sm font-sans">
              K
            </kbd>
          </div>
        </div>

        {/* Status Message Dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchStatus !== 'idle' ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
          <div className={`flex items-center gap-2 rounded bg-surface px-4 py-3 oklab-border ${searchStatus === 'searching' ? 'text-primary/60' : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500'}`}>
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
          <p className="text-on-surface-variant/60 font-serif italic text-lg leading-relaxed">
            "Efficiency through spatial memory and rapid keyboard interaction."
          </p>
        </div>

      </div>
    </div>
  );
}
