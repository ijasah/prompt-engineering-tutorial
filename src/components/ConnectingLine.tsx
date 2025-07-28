// src/components/ConnectingLine.tsx
"use client";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ConnectingLineProps = {
  isHovered: boolean;
  isMobile: boolean;
  cardPosition: { top: string; left?: string; right?: string; transform: string };
  index: number;
  colorClass: string;
};

export const ConnectingLine = ({ isHovered, isMobile, cardPosition, index, colorClass }: ConnectingLineProps) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  // Simplified paths for mobile
  if (isMobile) {
    const startY = 50;
    const endY = (20 * index) + 10;
    const d = `M 50 ${startY} L 50 ${endY}`;
    return (
       <motion.path
          d={d}
          variants={lineVariants}
          className={cn("stroke-[3] transition-all duration-300", isHovered ? colorClass : "stroke-border")}
          style={{ filter: isHovered ? `drop-shadow(0 0 5px currentColor)` : 'none' }}
          vectorEffect="non-scaling-stroke"
        />
    )
  }

  const isRight = index >= 3;
  const localIndex = isRight ? index - 3 : index;
  
  const startX = 50;
  const startY = 50;
  
  const endX = isRight ? 72 : 28;
  const midX1 = isRight ? 60 : 40;
  
  let endY, midY;

  switch(localIndex) {
      case 0: // Top
          endY = 10;
          midY = 30;
          break;
      case 1: // Middle
          endY = 50;
          midY = 50;
          break;
      case 2: // Bottom
      default:
          endY = 90;
          midY = 70;
          break;
  }

  const d = `M ${startX} ${startY} C ${midX1} ${startY}, ${midX1} ${midY}, ${endX} ${endY}`;
  
  return (
    <motion.path
      d={d}
      fill="none"
      variants={lineVariants}
      className={cn("stroke-[3] transition-all duration-300", isHovered ? colorClass : "stroke-border")}
      style={{ filter: isHovered ? `drop-shadow(0 0 8px currentColor)` : 'none' }}
      vectorEffect="non-scaling-stroke"
    />
  );
};
