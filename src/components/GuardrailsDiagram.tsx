// src/components/GuardrailsDiagram.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, ShieldCheck, FileCheck, BrainCircuit, Bot, Languages, Wand2 } from 'lucide-react';

const guardrailCategories = [
  {
    name: "Security & Privacy",
    icon: <Lock className="w-5 h-5" />,
    color: "border-red-500/50 bg-red-500/10 text-red-400",
    hoverColor: "hover:border-red-500/80 hover:bg-red-500/20",
    items: ["Inappropriate Content Filter", "Offensive Language Filter", "Prompt Injection Shield", "Sensitive Content Scanner"],
    position: { top: '0%', left: '0%' }
  },
  {
    name: "Response & Relevance",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    hoverColor: "hover:border-blue-500/80 hover:bg-blue-500/20",
    items: ["Relevance Validator", "Prompt Address Confirmation", "URL Availability Validator", "Fact-Check Validator"],
    position: { top: '0%', right: '0%' }
  },
  {
    name: "Content Validation",
    icon: <FileCheck className="w-5 h-5" />,
    color: "border-orange-500/50 bg-orange-500/10 text-orange-400",
    hoverColor: "hover:border-orange-500/80 hover:bg-orange-500/20",
    items: ["Competitor Mention Blocker", "Price Quote Validator", "Source Context Verifier", "Gibberish Content Filter"],
    position: { bottom: '0%', left: '0%' }
  },
  {
    name: "Language Quality",
    icon: <Languages className="w-5 h-5" />,
    color: "border-green-500/50 bg-green-500/10 text-green-400",
    hoverColor: "hover:border-green-500/80 hover:bg-green-500/20",
    items: ["Response Quality Grader", "Translation Accuracy Checker", "Duplicate Sentence Eliminator", "Readability Level Evaluator"],
    position: { top: '50%', right: '0%', transform: 'translateY(-50%)' }
  },
  {
    name: "Logic & Functionality",
    icon: <BrainCircuit className="w-5 h-5" />,
    color: "border-purple-500/50 bg-purple-500/10 text-purple-400",
    hoverColor: "hover:border-purple-500/80 hover:bg-purple-500/20",
    items: ["SQL Query Validator", "OpenAPI Response Validator", "Logical Flow Checker", "JSON Format Validator"],
    position: { bottom: '0%', right: '0%' }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

export const GuardrailsDiagram = () => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    return (
        <div className="relative w-full min-h-[500px] my-12 flex items-center justify-center">
            <motion.div 
                className="relative w-[80%] h-[80%] max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Center Hub */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 p-6 rounded-2xl border bg-muted/50 shadow-lg"
                    variants={itemVariants}
                >
                    <Bot className="w-12 h-12 text-primary" />
                    <h3 className="text-lg font-bold">LLM Guardrails</h3>
                </motion.div>

                {/* Category Nodes */}
                {guardrailCategories.map((category) => (
                    <motion.div
                        key={category.name}
                        className="absolute"
                        style={category.position}
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        variants={itemVariants}
                    >
                        <div className={cn(
                            "group p-4 rounded-xl border-2 transition-all duration-300 w-60",
                            category.color,
                            hoveredCategory === category.name ? category.hoverColor.replace('hover:','') : ''
                        )}>
                            <div className="flex items-center gap-2 font-bold mb-2">
                                {category.icon}
                                {category.name}
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground list-none pl-2">
                                {category.items.map((item) => (
                                    <li key={item} className="relative before:content-['–'] before:absolute before:-left-2 before:top-0">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}

                {/* Connecting Lines */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 800 500">
                    <defs>
                        <motion.path 
                            id="line-path-1" 
                            d="M 200,100 Q 300,250 400,250" 
                            stroke="none"
                        />
                        <motion.path 
                            id="line-path-2" 
                            d="M 600,100 Q 500,250 400,250" 
                            stroke="none"
                        />
                        <motion.path 
                            id="line-path-3" 
                            d="M 200,400 Q 300,250 400,250" 
                            stroke="none"
                        />
                        <motion.path 
                            id="line-path-4" 
                            d="M 600,250 Q 500,250 400,250" 
                            stroke="none"
                        />
                         <motion.path 
                            id="line-path-5" 
                            d="M 600,400 Q 500,250 400,250" 
                            stroke="none"
                        />
                    </defs>
                    
                    <AnimatePresence>
                    {hoveredCategory && (
                        <motion.path
                            d={
                                hoveredCategory === guardrailCategories[0].name ? "M 200,100 Q 300,250 400,250" :
                                hoveredCategory === guardrailCategories[1].name ? "M 600,100 Q 500,250 400,250" :
                                hoveredCategory === guardrailCategories[2].name ? "M 200,400 Q 300,250 400,250" :
                                hoveredCategory === guardrailCategories[3].name ? "M 600,250 Q 500,250 400,250" :
                                "M 600,400 Q 500,250 400,250"
                            }
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            exit={{ pathLength: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    )}
                    </AnimatePresence>
                </svg>
            </motion.div>
        </div>
    );
};
