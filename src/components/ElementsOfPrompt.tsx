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
    { text: "\n\nText: ", element: "Context" }, // Context isn't a clickable element, so it won't be highlighted.
    { text: "I think the food was okay.", element: "Input data" },
    { text: "\n\nSentiment:", element: "Output indicator" },
];


export const ElementsOfPrompt = () => {
    const [activeElement, setActiveElement] = useState(elements[0].name);

    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Elements of a Prompt</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side: Clickable Elements */}
                <div className="space-y-4">
                    {elements.map((el) => (
                        <motion.div
                            key={el.name}
                            onClick={() => setActiveElement(el.name)}
                            className={cn(
                                "p-4 rounded-lg border cursor-pointer transition-all duration-300",
                                activeElement === el.name ? `${el.color} shadow-lg` : 'border-transparent bg-muted/50 hover:bg-muted'
                            )}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex items-center gap-3 font-semibold">
                                {el.icon}
                                {el.name}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{el.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Right side: Prompt Example */}
                <div className="bg-background/50 p-6 rounded-lg border font-mono text-sm leading-relaxed whitespace-pre-wrap min-h-[16rem] flex items-center justify-center">
                    <p>
                        {promptParts.map((part, i) => {
                             const isActive = part.element === activeElement;
                             const activeColor = elements.find(e => e.name === activeElement)?.color.split(' ')[0] ?? '';
                             
                             return (
                                <span key={i} className="transition-all duration-300">
                                    <motion.span
                                        className={cn(
                                            "rounded-md p-1",
                                            isActive ? `text-foreground` : 'text-muted-foreground'
                                        )}
                                        style={{
                                          boxDecorationBreak: 'clone',
                                          WebkitBoxDecorationBreak: 'clone',
                                        }}
                                        animate={{ 
                                            backgroundColor: isActive ? activeColor.replace('bg-','hsl(var(--')).replace('-500/20',')') : 'rgba(0,0,0,0)'
                                        }}
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
