import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const KEY_DEFINES = {
  "1": [2894, 226], "2": [12946, 191], "3": [13470, 190], "4": [13963, 199], "5": [14481, 204],
  "6": [14994, 187], "7": [15505, 217], "8": [15990, 193], "9": [16529, 184], "10": [17012, 205],
  "11": [17550, 174], "12": [18052, 186], "13": [18553, 177], "14": [19065, 220], "15": [21734, 238],
  "16": [22245, 190], "17": [22790, 177], "18": [23317, 166], "19": [23817, 184], "20": [24297, 183],
  "21": [24811, 186], "22": [25313, 189], "23": [25795, 182], "24": [26309, 167], "25": [26804, 166],
  "26": [27330, 169], "27": [27883, 197], "28": [36902, 234], "29": [45327, 165], "30": [31542, 170],
  "31": [32031, 175], "32": [32492, 169], "33": [32973, 174], "34": [33453, 188], "35": [33986, 185],
  "36": [34425, 176], "37": [34932, 180], "38": [35410, 190], "39": [35914, 189], "40": [36428, 173],
  "41": [12476, 200], "42": [38136, 265], "43": [28393, 200], "44": [38694, 160], "45": [39148, 151],
  "46": [39632, 190], "47": [40136, 188], "48": [40621, 214], "49": [41103, 180], "50": [41610, 186],
  "51": [42110, 183], "52": [42594, 180], "53": [43105, 190], "54": [43565, 273], "55": [11270, 200],
  "56": [45750, 164], "57": [51541, 287], "58": [31011, 251], "59": [3610, 195], "60": [4210, 180],
  "61": [4758, 180], "62": [5250, 199], "63": [5831, 209], "64": [6396, 210], "65": [6900, 210],
  "66": [7443, 221], "67": [7955, 181], "68": [8504, 209], "69": [10132, 208], "70": [10763, 160],
  "71": [19634, 171], "72": [20143, 202], "73": [20647, 193], "74": [18052, 186], "75": [28914, 212],
  "76": [29427, 177], "77": [29928, 190], "78": [19065, 220], "79": [49837, 176], "80": [50333, 179],
  "81": [50783, 221], "82": [43565, 273], "83": [44251, 220], "87": [9046, 187], "88": [9582, 191],
  "3612": [36902, 234], "3613": [49329, 164], "3637": [10763, 160], "3639": [10132, 208],
  "3640": [48381, 168], "3653": [11270, 200], "3655": [20143, 202], "3657": [20647, 193],
  "3663": [29427, 177], "3665": [29928, 190], "3666": [19634, 171], "3667": [28914, 212],
  "3675": [46199, 199], "3676": [47929, 149], "3677": [49329, 164], "57416": [44251, 220],
  "57419": [49837, 176], "57421": [50783, 221], "57424": [50333, 179], "60999": [20143, 202],
  "61000": [44251, 220], "61001": [20647, 193], "61003": [49837, 176], "61005": [50783, 221],
  "61007": [29427, 177], "61008": [50333, 179], "61009": [29928, 190], "61010": [19634, 171],
  "61011": [28914, 212]
};

const SOUND_MAP = {
  Escape: "1", Digit1: "2", Digit2: "3", Digit3: "4", Digit4: "5", Digit5: "6", Digit6: "7", Digit7: "8", Digit8: "9", Digit9: "10", Digit0: "11", Minus: "12", Equal: "13", Backspace: "14",
  Tab: "15", KeyQ: "16", KeyW: "17", KeyE: "18", KeyR: "19", KeyT: "20", KeyY: "21", KeyU: "22", KeyI: "23", KeyO: "24", KeyP: "25", BracketLeft: "26", BracketRight: "27", Enter: "28",
  ControlLeft: "29", KeyA: "30", KeyS: "31", KeyD: "32", KeyF: "33", KeyG: "34", KeyH: "35", KeyJ: "36", KeyK: "37", KeyL: "38", Semicolon: "39", Quote: "40", Backquote: "41", ShiftLeft: "42", Backslash: "43",
  KeyZ: "44", KeyX: "45", KeyC: "46", KeyV: "47", KeyB: "48", KeyN: "49", KeyM: "50", Comma: "51", Period: "52", Slash: "53", ShiftRight: "54",
  AltLeft: "56", Space: "57", CapsLock: "58",
  F1: "59", F2: "60", F3: "61", F4: "62", F5: "63", F6: "64", F7: "65", F8: "66", F9: "67", F10: "68", F11: "87", F12: "88", Power: "14",
  ArrowUp: "57416", ArrowLeft: "57419", ArrowRight: "57421", ArrowDown: "57424",
  MetaLeft: "3675", MetaRight: "3676", AltRight: "3640", Fn: "29" 
};

const ROWS = [
  [
    { code: 'Escape', label: 'esc', width: '40px', align: 'left' },
    { code: 'F1', label: 'F1', width: '40px' },
    { code: 'F2', label: 'F2', width: '40px' },
    { code: 'F3', label: 'F3', width: '40px' },
    { code: 'F4', label: 'F4', width: '40px' },
    { code: 'F5', label: 'F5', width: '40px' },
    { code: 'F6', label: 'F6', width: '40px' },
    { code: 'F7', label: 'F7', width: '40px' },
    { code: 'F8', label: 'F8', width: '40px' },
    { code: 'F9', label: 'F9', width: '40px' },
    { code: 'F10', label: 'F10', width: '40px' },
    { code: 'F11', label: 'F11', width: '40px' },
    { code: 'F12', label: 'F12', width: '40px' },
    { code: 'Power', symbol: '⏻', width: '60px' },
  ],
  [
    { code: 'Backquote', top: '~', bottom: '`', width: '40px' },
    { code: 'Digit1', top: '!', bottom: '1', width: '40px' },
    { code: 'Digit2', top: '@', bottom: '2', width: '40px' },
    { code: 'Digit3', top: '#', bottom: '3', width: '40px' },
    { code: 'Digit4', top: '$', bottom: '4', width: '40px' },
    { code: 'Digit5', top: '%', bottom: '5', width: '40px' },
    { code: 'Digit6', top: '^', bottom: '6', width: '40px' },
    { code: 'Digit7', top: '&', bottom: '7', width: '40px' },
    { code: 'Digit8', top: '*', bottom: '8', width: '40px' },
    { code: 'Digit9', top: '(', bottom: '9', width: '40px' },
    { code: 'Digit0', top: ')', bottom: '0', width: '40px' },
    { code: 'Minus', top: '_', bottom: '-', width: '40px' },
    { code: 'Equal', top: '+', bottom: '=', width: '40px' },
    { code: 'Backspace', label: 'delete', width: '60px', align: 'right' }
  ],
  [
    { code: 'Tab', label: 'tab', width: '60px', align: 'left' },
    { code: 'KeyQ', label: 'Q', width: '40px' },
    { code: 'KeyW', label: 'W', width: '40px' },
    { code: 'KeyE', label: 'E', width: '40px' },
    { code: 'KeyR', label: 'R', width: '40px' },
    { code: 'KeyT', label: 'T', width: '40px' },
    { code: 'KeyY', label: 'Y', width: '40px' },
    { code: 'KeyU', label: 'U', width: '40px' },
    { code: 'KeyI', label: 'I', width: '40px' },
    { code: 'KeyO', label: 'O', width: '40px' },
    { code: 'KeyP', label: 'P', width: '40px' },
    { code: 'BracketLeft', top: '{', bottom: '[', width: '40px' },
    { code: 'BracketRight', top: '}', bottom: ']', width: '40px' },
    { code: 'Backslash', top: '|', bottom: '\\', width: '40px' }
  ],
  [
    { code: 'CapsLock', label: 'caps lock', width: '74px', align: 'left' },
    { code: 'KeyA', label: 'A', width: '40px' },
    { code: 'KeyS', label: 'S', width: '40px' },
    { code: 'KeyD', label: 'D', width: '40px' },
    { code: 'KeyF', label: 'F', width: '40px' },
    { code: 'KeyG', label: 'G', width: '40px' },
    { code: 'KeyH', label: 'H', width: '40px' },
    { code: 'KeyJ', label: 'J', width: '40px' },
    { code: 'KeyK', label: 'K', width: '40px' },
    { code: 'KeyL', label: 'L', width: '40px' },
    { code: 'Semicolon', top: ':', bottom: ';', width: '40px' },
    { code: 'Quote', top: '"', bottom: "'", width: '40px' },
    { code: 'Enter', label: 'return', width: '74px', align: 'right' }
  ],
  [
    { code: 'ShiftLeft', label: 'shift', width: '98px', align: 'left' },
    { code: 'KeyZ', label: 'Z', width: '40px' },
    { code: 'KeyX', label: 'X', width: '40px' },
    { code: 'KeyC', label: 'C', width: '40px' },
    { code: 'KeyV', label: 'V', width: '40px' },
    { code: 'KeyB', label: 'B', width: '40px' },
    { code: 'KeyN', label: 'N', width: '40px' },
    { code: 'KeyM', label: 'M', width: '40px' },
    { code: 'Comma', top: '<', bottom: ',', width: '40px' },
    { code: 'Period', top: '>', bottom: '.', width: '40px' },
    { code: 'Slash', top: '?', bottom: '/', width: '40px' },
    { code: 'ShiftRight', label: 'shift', width: '98px', align: 'right' }
  ],
  [
    { code: 'Fn', label: 'fn', width: '40px', align: 'left' },
    { code: 'ControlLeft', symbol: '^', label: 'control', width: '40px', align: 'left' },
    { code: 'AltLeft', symbol: '⌥', label: 'option', width: '40px', align: 'left' },
    { code: 'MetaLeft', symbol: '⌘', label: 'command', width: '52px', align: 'left' },
    { code: 'Space', label: '', width: '228px' },
    { code: 'MetaRight', symbol: '⌘', label: 'command', width: '52px', align: 'right' },
    { code: 'AltRight', symbol: '⌥', label: 'option', width: '40px', align: 'right' },
    { code: 'ArrowLeft', symbol: '◀', label: '', width: '40px' },
    { type: 'stacked', topCode: 'ArrowUp', topSymbol: '▲', bottomCode: 'ArrowDown', bottomSymbol: '▼', width: '40px' },
    { code: 'ArrowRight', symbol: '▶', label: '', width: '40px' }
  ]
];

const KeyComponent = ({ keyData, isPressed, onMouseDown, onMouseUp }) => {
  const height = keyData.height || '40px';
  const isHalfHeight = height !== '40px';
  
  return (
    <motion.button
      onMouseDown={() => onMouseDown(keyData.code)}
      onMouseUp={() => onMouseUp(keyData.code)}
      onMouseLeave={() => onMouseUp(keyData.code)}
      className={`
        relative flex flex-col justify-center items-center rounded-[6px] 
        font-system-micro transition-all duration-75 select-none
        border border-[#111]
        ${isPressed 
          ? 'bg-[#1a1a1a] shadow-[inset_0_1px_4px_rgba(0,0,0,0.8),0_0px_0_rgba(0,0,0,0.2)] translate-y-[2px]' 
          : 'bg-[#2A2A2A] shadow-[0_1px_1px_rgba(0,0,0,0.3),0_2px_0_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]'
        }
        hover:bg-[#333] text-[#A09D98] hover:text-[#EAE8E2]
      `}
      style={{
         width: keyData.width,
         height: height,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-[6px] pointer-events-none" />
      
      {/* 1. Dual character keys (!/1) */}
      {(keyData.top || keyData.bottom) && !keyData.symbol && (
        <div className="flex flex-col items-center justify-center relative z-10">
          {keyData.top && (
            <span className="text-[11px] leading-none mb-[2px] text-[#EAE8E2]">
              {keyData.top}
            </span>
          )}
          {keyData.bottom && (
            <span className="text-[10px] leading-none text-[#888]">
              {keyData.bottom}
            </span>
          )}
        </div>
      )}

      {/* 2. Symbol + Label keys (Command, Option, Arrows) */}
      {keyData.symbol && (
        <div className={`flex flex-col z-10 ${
          keyData.align === 'left' ? 'absolute bottom-1.5 left-2 items-start' : 
          keyData.align === 'right' ? 'absolute bottom-1.5 right-2 items-end' : 
          'items-center justify-center'
        }`}>
          <span className={`${isHalfHeight ? 'text-[9px]' : 'text-[12px]'} leading-none text-[#EAE8E2] ${keyData.label ? 'mb-[2px]' : ''}`}>
            {keyData.symbol}
          </span>
          {keyData.label && (
            <span className="text-[9px] leading-none text-[#888]">{keyData.label}</span>
          )}
        </div>
      )}

      {/* 3. Normal label keys (Letters, Tab, Caps, Esc) */}
      {keyData.label !== undefined && !keyData.symbol && !keyData.top && (
         <span className={`text-[11px] z-10 font-medium ${
            keyData.align === 'left' ? 'absolute bottom-1.5 left-2 text-[9px]' : 
            keyData.align === 'right' ? 'absolute bottom-1.5 right-2 text-[9px]' : 
            ''
         }`}>
           {keyData.label}
         </span>
      )}
    </motion.button>
  );
}

const MacKeyboardDark = () => {
  const [pressedKeys, setPressedKeys] = useState({});
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioContextRef = useRef(null);

  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const keyboardWidth = 780; // Approximate width of the keyboard chassis + padding
        if (containerWidth < keyboardWidth) {
          setScale(containerWidth / keyboardWidth);
        } else {
          setScale(1);
        }
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize AudioContext
    const initAudio = async () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      try {
        const response = await fetch('/sound.ogg');
        if (!response.ok) return;
        const arrayBuffer = await response.arrayBuffer();
        const decodedAudio = await audioContextRef.current.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedAudio);
      } catch (e) {
        console.error("Error loading keyboard sound sprite", e);
      }
    };
    initAudio();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (code) => {
    if (!audioContextRef.current || !audioBuffer) return;
    
    // Web Audio requires context to be resumed if suspended
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    // Lookup scancode for key, fallback to 'A' key if unmapped
    const scancode = SOUND_MAP[code] || "30"; 
    const define = KEY_DEFINES[scancode] || KEY_DEFINES["30"];
    
    if (define) {
      const [startMs, durationMs] = define;
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      const startTime = startMs / 1000;
      const durationTime = durationMs / 1000;
      
      source.start(0, startTime, durationTime);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInViewRef.current) return;

      // Prevent default browser actions for some keys to avoid scrolling/exiting
      if (['Space', 'Tab', 'Escape'].includes(e.code) || e.code.startsWith('F') || e.code.startsWith('Arrow')) {
        e.preventDefault();
      }
      
      if (!e.repeat) {
         playSound(e.code);
      }
      
      setPressedKeys(prev => ({ ...prev, [e.code]: true }));
    };

    const handleKeyUp = (e) => {
      if (!isInViewRef.current) return;
      setPressedKeys(prev => ({ ...prev, [e.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [audioBuffer]); // Re-bind listener to have access to audioBuffer

  const handleMouseDown = (code) => {
    playSound(code);
    setPressedKeys(prev => ({ ...prev, [code]: true }));
  };

  const handleMouseUp = (code) => {
    setPressedKeys(prev => ({ ...prev, [code]: false }));
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center items-center py-8 md:py-12 overflow-hidden">
      <div 
        style={{ 
          width: `${780 * scale}px`, 
          height: `${340 * scale}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start'
        }}
      >
        <div 
          ref={innerRef}
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.1s ease-out'
          }}
          className="flex justify-center"
        >
          {/* Keyboard Chassis */}
          <div className="p-3 md:p-4 rounded-[20px] bg-[#1a1a1a] border border-[#333] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden w-[750px]">
            {/* Subtle gloss sheen overlay on chassis */}
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none rounded-[20px]" />
            
            {/* Inner inset shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] pointer-events-none rounded-[20px]" />

            <div className="flex flex-col gap-2 relative z-10 bg-[#0A0A0A] p-2 rounded-[12px] border border-[#222] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
              {ROWS.map((row, i) => (
                <div key={i} className="flex gap-2 w-full justify-center">
                  {row.map((keyData, idx) => {
                    if (keyData.type === 'stacked') {
                      return (
                        <div key={`stacked-${idx}`} className="flex flex-col justify-between h-[40px]">
                          <KeyComponent 
                            keyData={{ code: keyData.topCode, symbol: keyData.topSymbol, width: keyData.width, height: '19px' }} 
                            isPressed={pressedKeys[keyData.topCode]} 
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                          />
                          <KeyComponent 
                            keyData={{ code: keyData.bottomCode, symbol: keyData.bottomSymbol, width: keyData.width, height: '19px' }} 
                            isPressed={pressedKeys[keyData.bottomCode]} 
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                          />
                        </div>
                      );
                    }
                    
                    return (
                      <KeyComponent 
                        key={keyData.code} 
                        keyData={keyData} 
                        isPressed={pressedKeys[keyData.code]} 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacKeyboardDark;
