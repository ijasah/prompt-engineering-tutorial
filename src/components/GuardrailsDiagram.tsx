// src/components/GuardrailsDiagram.tsx
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, ShieldCheck, FileCheck, BrainCircuit, Bot, Languages } from 'lucide-react';

const guardrailColumns = {
  left: [
    {
      name: "Content Validation",
      icon: <FileCheck className="w-5 h-5" />,
      color: "border-orange-400/50 bg-orange-400/10 text-orange-400",
      items: ["Competitor Mention Blocker", "Price Quote Validator", "Source Context Verifier", "Gibberish Content Filter"],
    },
    {
      name: "Security & Privacy",
      icon: <Lock className="w-5 h-5" />,
      color: "border-red-500/50 bg-red-500/10 text-red-400",
      items: ["Inappropriate Content Filter", "Offensive Language Filter", "Prompt Injection Shield", "Sensitive Content Scanner"],
    },
  ],
  right: [
     {
      name: "Logic & Functionality",
      icon: <BrainCircuit className="w-5 h-5" />,
      color: "border-purple-500/50 bg-purple-500/10 text-purple-400",
      items: ["SQL Query Validator", "OpenAPI Response Validator", "Logical Flow Checker", "JSON Format Validator"],
    },
    {
      name: "Response & Relevance",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "border-blue-500/50 bg-blue-500/10 text-blue-400",
      items: ["Relevance Validator", "Prompt Address Confirmation", "URL Availability Validator", "Fact-Check Validator"],
    },
    {
      name: "Language Quality",
      icon: <Languages className="w-5 h-5" />,
      color: "border-green-500/50 bg-green-500/10 text-green-400",
      items: ["Response Quality Grader", "Translation Accuracy Checker", "Duplicate Sentence Eliminator", "Readability Level Evaluator"],
    },
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const GuardrailCard = ({ category }: { category: typeof guardrailColumns.left[0] }) => (
    <motion.div
        className={cn(
            "group p-6 rounded-2xl border-2 transition-all duration-300 w-full hover:shadow-lg hover:-translate-y-1",
            category.color
        )}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
    >
        <div className="flex items-center gap-3 font-bold mb-3">
            {category.icon}
            {category.name}
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-none pl-2">
            {category.items.map((item) => (
                <li key={item} className="relative before:content-['–'] before:absolute before:-left-3 before:top-0">
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);


export const GuardrailsDiagram = () => {
    return (
        <div className="w-full my-12 flex items-center justify-center p-4">
            <motion.div 
                className="relative grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {/* Left Column */}
                <div className="space-y-8">
                    {guardrailColumns.left.map((category) => (
                        <GuardrailCard key={category.name} category={category} />
                    ))}
                </div>

                {/* Center Hub */}
                <motion.div
                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border bg-muted/50 shadow-md order-first md:order-none"
                    variants={itemVariants}
                >
                    <Bot className="w-16 h-16 text-primary" />
                    <h3 className="text-xl font-bold text-center">LLM Guardrails</h3>
                </motion.div>

                {/* Right Column */}
                <div className="space-y-8">
                     {guardrailColumns.right.map((category) => (
                        <GuardrailCard key={category.name} category={category} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
