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
    const cardWidthPercentage = 28;
    const cardHeightRem = 6; // Approx height of card in rem (p-6 = 1.5rem * 2, h-6 icon = 1.5rem, etc.)
    const viewportWidth = 1280; // A reference viewport width for rem to % conversion.
    const cardHeightPercentage = (cardHeightRem * 16 / 500) * 100; // 500 is the container height


    if (position.left) { // Left side cards
      const left = parseFloat(position.left);
      endX = left + cardWidthPercentage / 2;
      endY = top + cardHeightPercentage / 2;
      midX = (startX + endX) / 2 + 10;
      midY = (startY + endY) / 2 - 10;
    } else { // Right side cards
      const right = parseFloat(position.right || '0');
      endX = 100 - right - cardWidthPercentage / 2;
      endY = top + cardHeightPercentage / 2;
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
