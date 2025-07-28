// src/components/ElementsOfPrompt.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

const elements = [
  { text: "Instructions", color: "text-blue-400" },
  { text: "Context", color: "text-gray-400", isHidden: true }, // Context is implicit here
  { text: "Input data", color: "text-yellow-400" },
  { text: "Output indicator", color: "text-pink-400" },
];

const promptParts = [
    { text: "Classify the text into neutral, negative or positive", color: "text-blue-400", element: "Instructions" },
    { text: "\n\nText: ", color: "text-muted-foreground", element: "Context" },
    { text: "I think the food was okay.", color: "text-yellow-400", element: "Input data" },
    { text: "\n\nSentiment:", color: "text-pink-400", element: "Output indicator" },
];

export const ElementsOfPrompt = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });
    
    const refs = useRef<Record<string, HTMLElement | null>>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // We need to trigger a re-render once the refs are set
        // so that the SVG lines can be calculated and drawn.
        setIsMounted(true);
    }, []);


    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.5, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.5, duration: 0.01 }
            }
        })
    };

    const getLinePath = (startId: string, endId: string) => {
        const startEl = refs.current[startId];
        const endEl = refs.current[endId];
        const containerEl = containerRef.current;

        if (!startEl || !endEl || !containerEl) return "";

        const containerRect = containerEl.getBoundingClientRect();
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();

        const startX = startRect.right - containerRect.left + 10;
        const startY = startRect.top - containerRect.top + startRect.height / 2;
        
        const endX = endRect.left - containerRect.left - 10;
        const endY = endRect.top - containerRect.top + endRect.height / 2;

        const controlX = startX + (endX - startX) / 2;

        return `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
    };

    return (
        <div ref={containerRef} className="relative my-8 p-6 bg-muted/30 rounded-lg border">
            <h3 className="text-xl font-semibold mb-6">Elements of a Prompt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <ul className="space-y-4">
                    {elements.map((el, i) => !el.isHidden && (
                        <motion.li 
                            key={el.text}
                            className={cn("flex items-center gap-3 font-semibold", el.color)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.2 }}
                            ref={node => { refs.current[`list-${el.text}`] = node; }}
                        >
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'currentColor'}} />
                            <span>{el.text}</span>
                        </motion.li>
                    ))}
                </ul>
                <div className="relative bg-background/50 p-6 rounded-lg border font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {promptParts.map((part, i) => (
                        <span key={i} ref={node => { refs.current[`prompt-${part.element}`] = node; }} className={part.color}>
                            {part.text}
                        </span>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {isInView && isMounted && (
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <defs>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                                <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
                            </linearGradient>
                        </defs>
                        {elements.map((el, i) => !el.isHidden && (
                             <motion.path
                                key={el.text}
                                d={getLinePath(`list-${el.text}`, `prompt-${el.text}`)}
                                fill="none"
                                stroke="hsl(var(--border))"
                                strokeWidth="1.5"
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                            />
                        ))}
                    </svg>
                )}
            </AnimatePresence>
        </div>
    );
};
