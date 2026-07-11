import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const defaultImageIds = [
  '1517021897933-0e0319cfbc28', 
  '1533903345306-15d1c30952de', 
  '1545243424-0ce743321e11', 
  '1531306728370-e2ebd9d7bb99'
];

const defaultCards = [
  { 
    id: 1,
    title: 'Mountain View', 
    subtitle: 'ALPINE ESCAPE',
    copy: 'Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains.', 
    button: 'View Trips',
    image: `https://images.unsplash.com/photo-${defaultImageIds[0]}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max`
  },
  { 
    id: 2,
    title: 'To The Beach', 
    subtitle: 'COASTAL CALM',
    copy: 'Plan your next beach trip with these fabulous destinations and crystal clear waters.', 
    button: 'View Trips',
    image: `https://images.unsplash.com/photo-${defaultImageIds[1]}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max`
  },
  { 
    id: 3,
    title: 'Desert Destinations', 
    subtitle: 'ARID WONDER',
    copy: "Explore the vast dunes and silent nights of the world's most iconic deserts.", 
    button: 'Book Now',
    image: `https://images.unsplash.com/photo-${defaultImageIds[2]}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max`
  },
  { 
    id: 4,
    title: 'Explore Galaxy', 
    subtitle: 'ORBITAL VOYAGE',
    copy: 'Seriously, straight up, just blast off into outer space today for the ultimate adventure.', 
    button: 'Book Now',
    image: `https://images.unsplash.com/photo-${defaultImageIds[3]}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max`
  }
];

const CinematicCard = ({ card, isActive, onClick, hoverToActivate }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={hoverToActivate ? onClick : undefined}
      className={`relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isActive ? "flex-4 min-w-[300px] sm:min-w-[400px]" : "flex-1 min-w-[80px] sm:min-w-[100px]"
      }`}
    >
      {/* Background Image */}
      <motion.div
        layout="position"
        className="absolute inset-0 z-0"
      >
        <motion.img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover"
          animate={{
            scale: isActive ? 1.1 : 1.2,
            filter: isActive ? "grayscale(0%) brightness(100%)" : "grayscale(80%) brightness(40%)"
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${
          isActive ? "bg-black/20" : "bg-black/60"
        }`} 
      />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-2"
              >
                <span className="font-['Space_Grotesk'] text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
                  {card.id ? card.id.toString().padStart(2, '0') : ""}
                </span>
                <h3 className="font-section-heading text-xl font-bold text-white uppercase tracking-tighter [writing-mode:vertical-lr] rotate-180">
                  {card.title}
                </h3>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="flex flex-col gap-4 w-full max-w-[450px]"
              >
                <div className="flex flex-col">
                  {card.subtitle && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-['Space_Grotesk'] text-[12px] font-bold tracking-[0.4em] uppercase text-[#cf2d56] mb-2"
                    >
                      {card.subtitle}
                    </motion.span>
                  )}
                  <h3 className="font-section-heading text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                    {card.title}
                  </h3>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-editorial-standard text-white/70 text-base md:text-lg italic leading-relaxed block w-full whitespace-normal"
                >
                  {card.copy}
                </motion.p>

                {card.button && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="group relative mt-4 px-8 py-4 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase overflow-hidden transition-colors hover:bg-[#cf2d56] hover:text-white rounded-sm">
                      <span className="relative z-10">{card.button}</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side Number Accent */}
      {card.id && (
        <div className={`absolute top-10 right-10 z-20 pointer-events-none transition-opacity duration-700 ${isActive ? "opacity-20" : "opacity-0"}`}>
          <span className="text-[120px] font-bold font-section-heading text-white tracking-tighter leading-none">
            {card.id.toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export const CinematicCards = ({
  items = defaultCards,
  hoverToActivate = true,
  onCardChange,
  className = "",
  containerClassName = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardActivate = (index) => {
    setActiveIndex(index);
    if (onCardChange) {
      onCardChange(index, items[index]);
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center bg-[#fdf8f7] dark:bg-[#2a2a2a] p-4 md:p-12 overflow-hidden ${className}`}>
      <div className={`flex w-full max-w-7xl gap-2 md:gap-4 h-full items-stretch ${containerClassName}`}>
        {items.map((card, index) => (
          <CinematicCard
            key={card.id || index}
            card={card}
            isActive={activeIndex === index}
            hoverToActivate={hoverToActivate}
            onClick={() => handleCardActivate(index)}
          />
        ))}
      </div>
    </div>
  );
};