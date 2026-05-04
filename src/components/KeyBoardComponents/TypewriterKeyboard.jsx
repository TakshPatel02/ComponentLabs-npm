import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const KEY_DEFINES = {
  "16": [22245, 190], "17": [22790, 177], "18": [23317, 166], "19": [23817, 184], "20": [24297, 183], "21": [24811, 186],
  "30": [31542, 170], "31": [32031, 175], "32": [32492, 169], "33": [32973, 174], "34": [33453, 188],
  "57": [51541, 287] // Space
};

const SOUND_MAP = {
  KeyQ: "16", KeyW: "17", KeyE: "18", KeyR: "19", KeyT: "20", KeyY: "21",
  KeyA: "30", KeyS: "31", KeyD: "32", KeyF: "33", KeyG: "34",
  Space: "57"
};

const ROWS = [
  [
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
  ],
  [
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
  ],
  [
    { code: 'Space', label: 'SPACE', isSpace: true }
  ]
];

const KeyComponent = ({ keyData, isPressed, onMouseDown, onMouseUp }) => {
  const isSpace = keyData.isSpace;
  
  return (
    <motion.button
      onMouseDown={() => onMouseDown(keyData.code)}
      onMouseUp={() => onMouseUp(keyData.code)}
      onMouseLeave={() => onMouseUp(keyData.code)}
      className={`
        relative flex justify-center items-center font-serif transition-all duration-75 select-none
        ${isSpace ? 'w-[280px] h-[64px] rounded-[32px]' : 'w-[64px] h-[64px] rounded-full'}
        ${isPressed 
          ? 'translate-y-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.8)]' 
          : 'shadow-[0_8px_16px_rgba(0,0,0,0.8),0_4px_6px_rgba(0,0,0,0.6)]'
        }
      `}
      style={{
          // The chrome base rim
          background: 'linear-gradient(145deg, #e6e6e6 0%, #7a7a7a 50%, #222222 100%)',
          padding: '5px', // Rim thickness
          border: '1px solid #111',
          borderBottom: isPressed ? '1px solid #111' : '4px solid #111',
      }}
    >
      {/* The inner ivory keycap */}
      <div 
        className={`
          w-full h-full flex items-center justify-center relative overflow-hidden
          ${isSpace ? 'rounded-[28px]' : 'rounded-full'}
        `}
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fffff8 0%, #e8e3d5 60%, #c4bca3 100%)',
          boxShadow: isPressed 
            ? 'inset 0 4px 8px rgba(0,0,0,0.5), inset 0 1px 3px rgba(0,0,0,0.7)' 
            : 'inset 0 -2px 6px rgba(0,0,0,0.4), inset 0 3px 5px rgba(255,255,255,1), inset 0 0 12px rgba(0,0,0,0.15)',
        }}
      >
        {/* Glass Dome Effect */}
        <div className={`absolute inset-0 pointer-events-none ${isSpace ? 'rounded-[28px]' : 'rounded-full'}`} style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.2) 100%)',
        }} />
        
        {/* Subtle top glare for 3D effect */}
        {!isPressed && (
           <div className={`absolute top-[2px] left-[10%] right-[10%] h-[35%] bg-linear-to-b from-white/90 to-white/0 pointer-events-none ${isSpace ? 'rounded-[20px]' : 'rounded-[50%]'} opacity-80`} />
        )}

        <span 
          className={`z-10 text-[#1a1a1a] ${isSpace ? 'text-[12px] tracking-[0.3em] font-bold opacity-70 uppercase mt-1' : 'text-[28px] font-serif font-semibold mt-1'}`}
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
        >
          {keyData.label}
        </span>
      </div>
    </motion.button>
  );
}

const TypewriterKeyboard = () => {
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
        const keyboardWidth = 840; // Approximate width of the keyboard chassis + padding
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
    
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    const scancode = SOUND_MAP[code];
    if (!scancode) return; // Only play sounds for our specific mapped keys

    const define = KEY_DEFINES[scancode];
    
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

      if (['Space'].includes(e.code)) {
        e.preventDefault();
      }
      
      // Only process mapped keys
      if (!SOUND_MAP[e.code]) return;

      if (!e.repeat) {
         playSound(e.code);
      }
      
      setPressedKeys(prev => ({ ...prev, [e.code]: true }));
    };

    const handleKeyUp = (e) => {
      if (!isInViewRef.current) return;
      if (!SOUND_MAP[e.code]) return;
      setPressedKeys(prev => ({ ...prev, [e.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [audioBuffer]);

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
          width: `${840 * scale}px`, 
          height: `${360 * scale}px`,
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
          <div 
            className="px-16 py-12 rounded-[16px] relative overflow-hidden flex flex-col items-center gap-6 w-[800px]"
            style={{
              background: 'radial-gradient(circle at 50% 0%, #3a3a3a 0%, #1a1a1a 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Noise Texture */}
            <div 
              className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" 
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
              }} 
            />
            
            {/* Inner inset shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-[16px]" />

            <div className="flex flex-col gap-6 relative z-10 items-center">
              {ROWS.map((row, i) => (
                <div 
                  key={i} 
                  className="flex gap-4"
                  style={{
                    // Offset the middle row slightly to match typewriter layout
                    transform: i === 1 ? 'translateX(-12px)' : 'none'
                  }}
                >
                  {row.map((keyData) => (
                    <KeyComponent 
                      key={keyData.code} 
                      keyData={keyData} 
                      isPressed={pressedKeys[keyData.code]} 
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypewriterKeyboard;
