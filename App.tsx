/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

interface CardData {
  id: string;
  number: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  pattern: string;
}

const PRINCIPLES_CONTENT = [
  {
    title: "Show the seams. Don’t hide how AI works",
    description: "Don't hide how AI works. Provide human-readable rationale for outputs so users can predict and evaluate system behavior.",
  },
  {
    title: "Design the failure state first",
    description: "Deepest impressions are formed when systems fail. Design for uncertainty and errors as primary flows, not afterthoughts.",
  },
  {
    title: "Give users a visible undo",
    description: "Control is the foundation of trust. A prominent, one-step undo signal reduces the perceived risk of engaging with AI.",
  },
  {
    title: "Calibrate confidence visibly",
    description: "Make uncertainty legible. Use design to communicate model certainty so users know when to filter or trust the output.",
  },
  {
    title: "Explain the why, not the how",
    description: "Users need situational context, not technical disclosures. Match explanations to the user's intuitive model of the task.",
  },
  {
    title: "Introduce AI gradually; earn the handover",
    description: "Trust is a sequence, not a switch. Introduce AI gradually with low-stakes suggestions before granting high autonomy.",
  },
  {
    title: "Design the handoff to a human",
    description: "Trusted AI knows its limits. Explicitly design when and how the system escalates complex tasks to human judgment.",
  },
];

const COLORS = [
  { bg: "bg-[#FF6B00]", text: "text-white", pattern: "circles" },
  { bg: "bg-[#2D7FFF]", text: "text-white", pattern: "waves" },
  { bg: "bg-[#4ADE80]", text: "text-[#1A4D2E]", pattern: "slanted" },
  { bg: "bg-[#8B5CF6]", text: "text-white", pattern: "dots" },
  { bg: "bg-[#FBBF24]", text: "text-[#451A03]", pattern: "cross" },
  { bg: "bg-[#14B8A6]", text: "text-white", pattern: "zigzag" },
  { bg: "bg-[#D946EF]", text: "text-white", pattern: "squares" },
];

const CARDS: CardData[] = PRINCIPLES_CONTENT.map((p, i) => ({
  id: `principle-${i + 1}`,
  number: (i + 1).toString().padStart(2, '0'),
  title: p.title,
  description: p.description,
  color: COLORS[i % COLORS.length].bg,
  textColor: COLORS[i % COLORS.length].text,
  pattern: COLORS[i % COLORS.length].pattern,
}));const Pattern = ({ type }: { type: string }) => {
  switch (type) {
    case "circles":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          <motion.circle 
            cx="20" cy="20" r="10" fill="currentColor" 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="50" cy="30" r="15" fill="currentColor" 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="80" cy="20" r="8" fill="currentColor" 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="30" cy="60" r="12" fill="currentColor" 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="70" cy="70" r="18" fill="currentColor" 
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      );
    case "grid":
      return (
        <div className="absolute top-4 right-4 w-24 h-24 opacity-20 grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="bg-current w-full h-full rounded-sm" 
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          ))}
        </div>
      );
    case "waves":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          {[20, 40, 60, 80].map((y, i) => (
            <motion.path 
              key={i}
              d={`M0 ${y} Q25 ${y-10} 50 ${y} T100 ${y}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              animate={{ d: [`M0 ${y} Q25 ${y-10} 50 ${y} T100 ${y}`, `M0 ${y} Q25 ${y+10} 50 ${y} T100 ${y}`, `M0 ${y} Q25 ${y-10} 50 ${y} T100 ${y}`] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      );
    case "slanted":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          {[10, 30, 50, -10].map((x, i) => (
            <motion.line 
              key={i}
              x1={x} y1="90" x2={x + 80} y2="10" 
              stroke="currentColor" 
              strokeWidth="2" 
              animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      );
    case "lines":
      return (
        <div className="absolute top-4 right-4 w-24 h-24 opacity-30 flex flex-col justify-between py-2">
          {[1, 0.75, 1, 0.5].map((w, i) => (
            <motion.div 
              key={i}
              className="h-1 bg-current rounded-full" 
              animate={{ width: [`${w * 100}%`, "20%", `${w * 100}%`] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    case "dots":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.circle 
              key={i} 
              cx={(i % 5) * 20 + 10} 
              cy={Math.floor(i / 5) * 20 + 10} 
              r="3" 
              fill="currentColor" 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: (i % 5) * 0.2 + Math.floor(i / 5) * 0.2 
              }}
            />
          ))}
        </svg>
      );
    case "cross":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          <motion.path 
            d="M10 10 L90 90 M90 10 L10 90" 
            stroke="currentColor" 
            strokeWidth="4" 
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          />
          <motion.path 
            d="M30 10 L70 90 M70 10 L30 90" 
            stroke="currentColor" 
            strokeWidth="2" 
            opacity="0.5" 
            animate={{ rotate: [0, -90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          />
        </svg>
      );
    case "zigzag":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          {[20, 50, 80].map((y, i) => (
            <motion.path 
              key={i}
              d={`M0 ${y} L20 ${y-20} L40 ${y} L60 ${y-20} L80 ${y} L100 ${y-20}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      );
    case "squares":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          <motion.rect 
            x="10" y="10" width="30" height="30" fill="currentColor" 
            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.rect 
            x="60" y="10" width="20" height="20" fill="currentColor" 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.rect 
            x="10" y="60" width="25" height="25" fill="currentColor" 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.rect 
            x="50" y="50" width="40" height="40" fill="currentColor" opacity="0.5" 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </svg>
      );
    case "rings":
      return (
        <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
          <motion.circle 
            cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.circle 
            cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3" 
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle 
            cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      <div className={`relative w-full max-w-7xl ${isMobile ? 'h-[500px]' : 'h-[600px]'} flex flex-col items-center justify-center`}>
        {/* Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-0 w-full px-4">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-2">
            7 Principles for Designing Trusted AI
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-xs md:text-sm">
            Based on the article by Nurkhon. Click a card to expand.
          </p>
        </div>

        {/* The Deck */}
        <div className={`relative flex items-center justify-center w-full ${isMobile ? 'mt-10' : 'mt-20'} h-full`}>
          <div className="relative flex items-center justify-center w-full">
            {CARDS.map((card, index) => {
              const isSelected = selectedId === card.id;
              const totalCards = CARDS.length;
              const centerIndex = (totalCards - 1) / 2;
              
              const distFromCenter = Math.abs(index - centerIndex);
              
              // Horizontal spread adjusted for screen size
              const spread = isMobile ? 35 : isTablet ? 90 : 140;
              const xOffset = (index - centerIndex) * spread; 
              
              // Alternating rotation strictly between -6 and 6 degrees
              const rotation = index % 2 === 0 ? 4 : -4;
              
              // Gentle arc (center is anchor) + organic vertical jitter (±10-30px)
              const arcFactor = isMobile ? 1 : 2;
              const arc = distFromCenter * distFromCenter * arcFactor;
              const jitter = (index % 2 === 0 ? 12 : -12);
              const yOffset = arc + jitter;

              // Z-index: Center cards sit on top of outer cards (natural layering)
              const zIndex = isSelected ? 100 : Math.floor(20 - distFromCenter);

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  onClick={() => setSelectedId(card.id)}
                  className={`absolute ${isMobile ? 'w-32 h-44' : 'w-44 h-60'} ${isSelected ? 'p-3' : (isMobile ? 'p-3' : 'p-5')} rounded-2xl cursor-pointer shadow-xl ${card.color} ${card.textColor} flex flex-col justify-end overflow-hidden group`}
                  initial={false}
                  animate={{
                    rotate: isSelected ? 0 : rotation,
                    x: isSelected ? 0 : xOffset,
                    y: isSelected ? (isMobile ? -40 : -80) : yOffset,
                    scale: isSelected ? (isMobile ? 2.4 : 2) : 1,
                    zIndex: zIndex,
                    opacity: selectedId && !isSelected ? 0.2 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                  }}
                  whileHover={!selectedId && !isMobile ? { 
                    y: yOffset - 40, 
                    scale: 1.05,
                    zIndex: 50,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <motion.div 
                    animate={{ opacity: isSelected ? 0.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pattern type={card.pattern} />
                  </motion.div>
                  
                  <div className={`absolute ${isMobile ? 'top-3 left-3' : 'top-5 left-5'} text-[10px] md:text-xs font-mono font-bold opacity-50`}>
                    {card.number}
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(null);
                        }}
                        className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors z-50 shadow-sm border border-white/10"
                      >
                        <X size={10} />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className={`relative z-10 ${isSelected ? 'flex flex-col justify-end text-left pl-1 pr-4 pb-2' : ''}`}>
                    <motion.h2 
                      className={`font-bold leading-tight ${
                        isSelected 
                          ? (isMobile ? 'text-[9px] mb-2' : 'text-[11px] mb-4') 
                          : (isMobile ? 'text-[10px] mb-1' : 'text-sm mb-2')
                      }`}
                      layout
                    >
                      {card.title}
                    </motion.h2>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ delay: 0.15 }}
                        >
                          <p className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} opacity-90 leading-relaxed max-w-full`}>
                            {card.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Overlay when a card is selected */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px] cursor-pointer"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
