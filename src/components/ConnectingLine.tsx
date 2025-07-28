// src/components/ConnectingLine.tsx
"use client";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

type GuardrailCategory = {
  name: string;
  position: { top: string; left?: string; right?: string; transform?: string };
  lineColor: string;
};

type ConnectingLineProps = {
  isHovered: boolean;
  category: GuardrailCategory;
};

export const ConnectingLine = ({ isHovered, category }: ConnectingLineProps) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 0.5 }
    }
  };

  const pathD = useMemo(() => {
    const { position } = category;
    const startX = 50;
    const startY = 50;

    let endX, endY, midX, midY;

    const top = parseFloat(position.top);

    if (position.left) { // Left side cards
      const left = parseFloat(position.left);
      endX = left + 14; 
      endY = top + (top > 80 ? 5 : 10);
      midX = (startX + endX) / 2 + 10;
      midY = (startY + endY) / 2 - 10;
    } else { // Right side cards
      const right = parseFloat(position.right || '0');
      endX = 100 - right - 14;
      endY = top + (top > 60 ? 5 : 10);
      midX = (startX + endX) / 2 - 10;
      midY = (startY + endY) / 2 + 10;
    }
    
    return `M ${startX},${startY} C ${midX},${startY} ${midX},${midY} ${endX},${endY}`;
  }, [category]);
  
  return (
    <motion.path
      d={pathD}
      variants={lineVariants}
      className={cn("transition-all duration-300", isHovered ? category.lineColor : "stroke-border")}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        filter: isHovered ? 'url(#glow)' : 'none',
      }}
      vectorEffect="non-scaling-stroke"
    />
  );
};
