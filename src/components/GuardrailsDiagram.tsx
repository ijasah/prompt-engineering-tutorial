// src/components/GuardrailsDiagram.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, ShieldCheck, FileCheck, BrainCircuit, Bot, Languages } from 'lucide-react';
import React, { useState } from 'react';

const guardrailCategories = [
    {
      name: "Security & Privacy",
      icon: <Lock className="w-5 h-5" />,
      color: "border-red-500/50 bg-red-500/10 text-red-400",
      items: ["Inappropriate Content", "Offensive Language", "Prompt Injection", "Sensitive Content"],
    },
    {
      name: "Response & Relevance",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "border-blue-500/50 bg-blue-500/10 text-blue-400",
      items: ["Relevance Validation", "Fact-Checking", "URL Validation", "Prompt Adherence"],
    },
    {
      name: "Language Quality",
      icon: <Languages className="w-5 h-5" />,
      color: "border-green-500/50 bg-green-500/10 text-green-400",
      items: ["Quality Grading", "Translation Accuracy", "Redundancy Check", "Readability"],
    },
    {
        name: "Logic & Functionality",
        icon: <BrainCircuit className="w-5 h-5" />,
        color: "border-purple-500/50 bg-purple-500/10 text-purple-400",
        items: ["SQL Validation", "API Spec Check", "Logical Consistency", "JSON Formatting"],
    },
    {
      name: "Content Validation",
      icon: <FileCheck className="w-5 h-5" />,
      color: "border-orange-400/50 bg-orange-400/10 text-orange-400",
      items: ["Competitor Blocking", "Price Validation", "Source Verification", "Gibberish Detection"],
    },
];

const leftCategories = [guardrailCategories[0], guardrailCategories[1]];
const rightCategories = [guardrailCategories[3], guardrailCategories[4]];
const centerCategory = guardrailCategories[2];

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

const GuardrailCard = ({ category, onHoverStart, onHoverEnd, isHovered, className }: { category: typeof guardrailCategories[0], onHoverStart: () => void, onHoverEnd: () => void, isHovered: boolean, className?: string }) => (
    <motion.div
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className={cn("relative", className)}
    >
        <motion.div
            layout
            className={cn(
                "group p-4 rounded-lg border-2 transition-all duration-300 w-full backdrop-blur-sm shadow-lg",
                category.color,
                isHovered ? 'shadow-2xl' : 'shadow-md',
            )}
        >
            <motion.div layout className="flex items-center gap-3 font-bold text-sm">
                {category.icon}
                <span>{category.name}</span>
            </motion.div>
            <AnimatePresence>
            {isHovered && (
                <motion.ul
                    variants={sublistVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-1.5 text-xs text-muted-foreground list-none pl-2 overflow-hidden"
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
    const [hoveredName, setHoveredName] = useState<string | null>(null);

    return (
        <div className="w-full my-12 flex items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center w-full max-w-6xl">
                
                {/* Left Column */}
                <div className="space-y-8 relative">
                    <div className="absolute top-1/2 left-full w-8 h-px bg-border -translate-y-1/2"></div>
                    {leftCategories.map((cat, index) => (
                         <div key={cat.name} className="relative">
                            <div className="absolute top-1/2 -right-4 w-4 h-px bg-border"></div>
                            <GuardrailCard 
                                category={cat}
                                onHoverStart={() => setHoveredName(cat.name)}
                                onHoverEnd={() => setHoveredName(null)}
                                isHovered={hoveredName === cat.name}
                            />
                        </div>
                    ))}
                </div>

                {/* Center Column */}
                <div className="relative flex flex-col items-center justify-center gap-8">
                     <div className="absolute left-1/2 -top-4 w-px h-4 bg-border"></div>
                    <motion.div
                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-full border-2 bg-muted/50 backdrop-blur-md shadow-2xl w-40 h-40"
                    >
                        <Bot className="w-12 h-12 text-primary" />
                        <h3 className="text-base font-bold text-center">LLM Guardrails</h3>
                    </motion.div>

                    <div className="relative w-full">
                        <div className="absolute left-1/2 -top-4 w-px h-4 bg-border"></div>
                         <div className="absolute left-1/2 -bottom-4 w-px h-4 bg-border"></div>
                        <GuardrailCard 
                            category={centerCategory}
                            onHoverStart={() => setHoveredName(centerCategory.name)}
                            onHoverEnd={() => setHoveredName(null)}
                            isHovered={hoveredName === centerCategory.name}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8 relative">
                    <div className="absolute top-1/2 right-full w-8 h-px bg-border -translate-y-1/2"></div>
                    {rightCategories.map((cat) => (
                         <div key={cat.name} className="relative">
                             <div className="absolute top-1/2 -left-4 w-4 h-px bg-border"></div>
                            <GuardrailCard 
                                category={cat}
                                onHoverStart={() => setHoveredName(cat.name)}
                                onHoverEnd={() => setHoveredName(null)}
                                isHovered={hoveredName === cat.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
