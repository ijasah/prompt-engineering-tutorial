// src/components/GuardrailsDiagram.tsx
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, ShieldCheck, FileCheck, BrainCircuit, Bot, Languages } from 'lucide-react';
import { ConnectingLine } from './ConnectingLine';
import React from 'react';

const guardrailCategories = [
    {
      name: "Security & Privacy",
      icon: <Lock className="w-6 h-6" />,
      color: "border-red-500/50 bg-red-500/10 text-red-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.red.500/50%)]",
      lineColor: "stroke-red-500/70",
      items: ["Inappropriate Content", "Offensive Language", "Prompt Injection", "Sensitive Content"],
    },
    {
      name: "Response & Relevance",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "border-blue-500/50 bg-blue-500/10 text-blue-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.blue.500/50%)]",
      lineColor: "stroke-blue-500/70",
      items: ["Relevance Validation", "Fact-Checking", "URL Validation", "Prompt Adherence"],
    },
    {
      name: "Language Quality",
      icon: <Languages className="w-6 h-6" />,
      color: "border-green-500/50 bg-green-500/10 text-green-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.green.500/50%)]",
      lineColor: "stroke-green-500/70",
      items: ["Quality Grading", "Translation Accuracy", "Redundancy Check", "Readability"],
    },
    {
        name: "Logic & Functionality",
        icon: <BrainCircuit className="w-6 h-6" />,
        color: "border-purple-500/50 bg-purple-500/10 text-purple-400",
        glow: "hover:shadow-[0_0_20px_theme(colors.purple.500/50%)]",
        lineColor: "stroke-purple-500/70",
        items: ["SQL Validation", "API Spec Check", "Logical Consistency", "JSON Formatting"],
    },
    {
      name: "Content Validation",
      icon: <FileCheck className="w-6 h-6" />,
      color: "border-orange-400/50 bg-orange-400/10 text-orange-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.orange.400/50%)]",
      lineColor: "stroke-orange-400/70",
      items: ["Competitor Blocking", "Price Validation", "Source Verification", "Gibberish Detection"],
    },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

const cardPositions = [
    // Left column
    { top: '0%', left: '0%', transform: 'translate(0, 0)' },
    { top: '50%', left: '5%', transform: 'translate(0, -50%)' },
    { top: '100%', left: '0%', transform: 'translate(0, -100%)' },
    // Right column
    { top: '0%', right: '0%', transform: 'translate(0, 0)' },
    { top: '50%', right: '5%', transform: 'translate(0, -50%)' },
    { top: '100%', right: '0%', transform: 'translate(0, -100%)' },
];

const mobileCardPositions = [
    { top: '0%', left: '50%', transform: 'translateX(-50%)' },
    { top: 'calc(20% + 20px)', left: '50%', transform: 'translateX(-50%)' },
    { top: 'calc(40% + 40px)', left: '50%', transform: 'translateX(-50%)' },
    { top: 'calc(60% + 60px)', left: '50%', transform: 'translateX(-50%)' },
    { top: 'calc(80% + 80px)', left: '50%', transform: 'translateX(-50%)' },
];


const GuardrailCard = ({ category, isHovered, onHoverStart, onHoverEnd, style }: { category: typeof guardrailCategories[0], isHovered: boolean, onHoverStart: () => void, onHoverEnd: () => void, style: React.CSSProperties }) => (
    <motion.div
        className="absolute w-[28%] min-w-[200px] md:min-w-[240px]"
        style={style}
        variants={itemVariants}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
    >
        <div
            className={cn(
                "group p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 w-full h-full",
                "backdrop-blur-sm",
                category.color,
                isHovered ? category.glow : '',
                isHovered ? 'scale-105' : 'scale-100',
            )}
        >
            <div className="flex items-center gap-3 font-bold mb-3">
                {category.icon}
                <span className="text-sm md:text-base">{category.name}</span>
            </div>
            <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-none pl-2">
                {category.items.map((item) => (
                    <li key={item} className="relative before:content-['–'] before:absolute before:-left-3 before:top-0">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

export const GuardrailsDiagram = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const leftCategories = guardrailCategories.slice(0, 3);
    const rightCategories = guardrailCategories.slice(3);

    const getCardPositions = (index: number) => {
        if (isMobile) return mobileCardPositions[index];
        const isRight = index >= 3;
        const localIndex = isRight ? index - 3 : index;
        return cardPositions[localIndex + (isRight ? 3 : 0)];
    }

    return (
        <div className="w-full my-12 flex items-center justify-center p-4">
            <motion.div 
                className="relative w-full max-w-7xl h-[600px] md:h-[400px]"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-full border-2 bg-muted/50 backdrop-blur-md shadow-2xl w-40 h-40 md:w-48 md:h-48"
                    variants={itemVariants}
                >
                    <Bot className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                    <h3 className="text-lg md:text-xl font-bold text-center">LLM Guardrails</h3>
                </motion.div>
                
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                    {guardrailCategories.map((category, index) => (
                        <ConnectingLine
                            key={index}
                            isHovered={hoveredIndex === index}
                            isMobile={isMobile}
                            cardPosition={getCardPositions(index)}
                            index={index}
                            colorClass={category.lineColor}
                        />
                    ))}
                </svg>

                {leftCategories.map((category, index) => (
                    <GuardrailCard
                        key={category.name}
                        category={category}
                        isHovered={hoveredIndex === index}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        style={isMobile ? mobileCardPositions[index] : cardPositions[index]}
                    />
                ))}
                
                {rightCategories.map((category, index) => {
                    const globalIndex = index + 3;
                    return (
                        <GuardrailCard
                            key={category.name}
                            category={category}
                            isHovered={hoveredIndex === globalIndex}
                            onHoverStart={() => setHoveredIndex(globalIndex)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            style={isMobile ? mobileCardPositions[globalIndex] : cardPositions[globalIndex]}
                        />
                    )
                })}
            </motion.div>
        </div>
    );
};
