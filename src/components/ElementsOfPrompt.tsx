// src/components/ElementsOfPrompt.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileText, Lightbulb, CheckCircle } from 'lucide-react';

const elements = [
  { 
    name: "Instructions", 
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
    icon: <FileText />,
    description: "The task the model should perform. It's the 'what to do'."
  },
  { 
    name: "Input data", 
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", 
    icon: <Lightbulb />,
    description: "The content the model works with. This provides context."
  },
  { 
    name: "Output indicator", 
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    icon: <CheckCircle />,
    description: "Guides the model's output format, starting its response."
  },
];

const promptParts = [
    { text: "Classify the text into neutral, negative or positive", element: "Instructions" },
    { text: "\n\nText: ", element: "Context" },
    { text: "I think the food was okay.", element: "Input data" },
    { text: "\n\nSentiment:", element: "Output indicator" },
];


export const ElementsOfPrompt = () => {
    const [activeElement, setActiveElement] = useState(elements[0].name);

    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Elements of a Prompt</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left side: Clickable Elements */}
                <div className="lg:col-span-1 space-y-3">
                    {elements.map((el) => (
                        <motion.div
                            key={el.name}
                            onClick={() => setActiveElement(el.name)}
                            className={cn(
                                "p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
                                activeElement === el.name ? `${el.color} shadow-lg` : 'border-transparent bg-muted/50 hover:bg-muted'
                            )}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex items-center gap-3 font-semibold">
                                {el.icon}
                                {el.name}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{el.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Right side: Prompt Example */}
                <div className="lg:col-span-2 bg-background/50 p-6 rounded-lg border font-mono text-sm leading-relaxed whitespace-pre-wrap min-h-[10rem] flex items-center">
                    <p>
                        {promptParts.map((part, i) => {
                             const isActive = part.element === activeElement;
                             const colorClass = elements.find(e => e.name === part.element)?.color || 'text-muted-foreground';
                             
                             return (
                                <span key={i} className={cn(
                                    "transition-all duration-300",
                                    isActive ? `${colorClass.split(' ')[1]} font-bold` : 'text-muted-foreground'
                                )}>
                                    <motion.span
                                        className={cn(
                                            "rounded-md",
                                            isActive && `${colorClass.split(' ')[0]}`
                                        )}
                                        style={{
                                          boxDecorationBreak: 'clone',
                                          WebkitBoxDecorationBreak: 'clone',
                                        }}
                                        initial={{ backgroundSize: '0% 100%' }}
                                        animate={{ backgroundSize: isActive ? '100% 100%' : '0% 100%' }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        {part.text}
                                    </motion.span>
                                </span>
                            )
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
