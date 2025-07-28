// src/components/GuardrailsDiagram.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, ShieldCheck, FileCheck, BrainCircuit, Bot, Languages } from 'lucide-react';
import React, { useState } from 'react';
import { ConnectingLine } from './ConnectingLine';

const guardrailCategories = [
    {
      name: "Security & Privacy",
      icon: <Lock className="w-6 h-6" />,
      color: "border-red-500/50 bg-red-500/10 text-red-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.red.500/50%)]",
      lineColor: "stroke-red-500/70",
      items: ["Inappropriate Content", "Offensive Language", "Prompt Injection", "Sensitive Content"],
      position: { top: '0%', left: '10%' },
    },
    {
      name: "Response & Relevance",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "border-blue-500/50 bg-blue-500/10 text-blue-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.blue.500/50%)]",
      lineColor: "stroke-blue-500/70",
      items: ["Relevance Validation", "Fact-Checking", "URL Validation", "Prompt Adherence"],
      position: { top: '55%', left: '0%' },
    },
    {
      name: "Language Quality",
      icon: <Languages className="w-6 h-6" />,
      color: "border-green-500/50 bg-green-500/10 text-green-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.green.500/50%)]",
      lineColor: "stroke-green-500/70",
      items: ["Quality Grading", "Translation Accuracy", "Redundancy Check", "Readability"],
      position: { top: '100%', left: '15%', transform: 'translateY(-100%)' },
    },
    {
        name: "Logic & Functionality",
        icon: <BrainCircuit className="w-6 h-6" />,
        color: "border-purple-500/50 bg-purple-500/10 text-purple-400",
        glow: "hover:shadow-[0_0_20px_theme(colors.purple.500/50%)]",
        lineColor: "stroke-purple-500/70",
        items: ["SQL Validation", "API Spec Check", "Logical Consistency", "JSON Formatting"],
        position: { top: '10%', right: '5%' },
    },
    {
      name: "Content Validation",
      icon: <FileCheck className="w-6 h-6" />,
      color: "border-orange-400/50 bg-orange-400/10 text-orange-400",
      glow: "hover:shadow-[0_0_20px_theme(colors.orange.400/50%)]",
      lineColor: "stroke-orange-400/70",
      items: ["Competitor Blocking", "Price Validation", "Source Verification", "Gibberish Detection"],
      position: { top: '80%', right: '0%', transform: 'translateY(-100%)' },
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

const sublistVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { 
        opacity: 1, 
        height: 'auto', 
        marginTop: '0.75rem',
        transition: {
            staggerChildren: 0.05,
            when: "beforeChildren",
        } 
    }
};

const subItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
};

const GuardrailCard = ({ category, isHovered, onHoverStart, onHoverEnd }: { category: typeof guardrailCategories[0], isHovered: boolean, onHoverStart: () => void, onHoverEnd: () => void }) => (
    <motion.div
        className="absolute w-[28%] min-w-[240px] md:min-w-[280px]"
        style={{ ...category.position }}
        variants={itemVariants}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        layout
    >
        <motion.div
            layout
            className={cn(
                "group p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 w-full",
                "backdrop-blur-sm",
                category.color,
                isHovered ? category.glow : '',
                isHovered ? 'shadow-2xl' : 'shadow-md',
            )}
        >
            <motion.div layout className="flex items-center gap-3 font-bold">
                {category.icon}
                <span className="text-sm md:text-base">{category.name}</span>
            </motion.div>
            <AnimatePresence>
            {isHovered && (
                <motion.ul
                    variants={sublistVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-none pl-2 overflow-hidden"
                >
                    {category.items.map((item) => (
                        <motion.li key={item} variants={subItemVariants} className="relative before:content-['–'] before:absolute before:-left-3 before:top-0">
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
            </AnimatePresence>
        </motion.div>
    </motion.div>
);

export const GuardrailsDiagram = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full my-12 flex items-center justify-center p-4">
            <motion.div 
                className="relative w-full max-w-5xl h-[500px]"
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
                
                 <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {guardrailCategories.map((category, index) => (
                        <ConnectingLine
                            key={index}
                            isHovered={hoveredIndex === index}
                            category={category}
                        />
                    ))}
                </svg>

                {guardrailCategories.map((category, index) => (
                    <GuardrailCard
                        key={category.name}
                        category={category}
                        isHovered={hoveredIndex === index}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                    />
                ))}
            </motion.div>
        </div>
    );
};
