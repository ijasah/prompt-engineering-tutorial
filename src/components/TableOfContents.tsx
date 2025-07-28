// src/components/TableOfContents.tsx
"use client";

import { cn } from '@/lib/utils';
import { BookOpen, Brain, Target, Settings, AlertTriangle, Shield, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
    { 
        id: 'how-transformers-work', 
        title: 'Transformers - Recap', 
        icon: <Cpu className="w-4 h-4" />,
        subsections: [
            { id: 'transformer-recap-summary', title: 'Key Stages' },
            { id: 'transformer-recap-simulation', title: 'Live Simulation' },
        ]
    },
    { 
        id: 'introduction', 
        title: 'Introduction', 
        icon: <BookOpen className="w-4 h-4" />,
        subsections: [
            { id: 'introduction-what-are-prompts', title: 'What are Prompts?' },
            { id: 'introduction-elements', title: 'Elements of a Prompt' },
            { id: 'introduction-applications', title: 'Common Applications' },
        ]
    },
    { 
        id: 'core-concepts', 
        title: 'Core Concepts', 
        icon: <Brain className="w-4 h-4" />,
        subsections: [
            { id: 'core-concepts-temperature', title: 'Temperature' },
            { id: 'core-concepts-top-p', title: 'Top-P Sampling' },
            { id: 'core-concepts-top-k', title: 'Top-K Sampling' },
        ]
    },
    { 
        id: 'designing-prompts', 
        title: 'Designing Prompts', 
        icon: <Target className="w-4 h-4" />,
        subsections: [
            { id: 'designing-prompts-summarization', title: 'Summarization' },
            { id: 'designing-prompts-qa', title: 'Question Answering' },
            { id: 'designing-prompts-role-playing', title: 'Role Playing' },
        ]
    },
    { 
        id: 'advanced-techniques', 
        title: 'Advanced Techniques', 
        icon: <Settings className="w-4 h-4" />,
        subsections: [
            { id: 'advanced-techniques-few-shot', title: 'Few/Zero-shot' },
            { id: 'advanced-techniques-cot', title: 'Chain-of-Thought' },
        ]
    },
    { 
        id: 'risks', 
        title: 'Risks', 
        icon: <AlertTriangle className="w-4 h-4" />,
        subsections: [
            { id: 'risks-injection', title: 'Injection' },
            { id: 'risks-leaking', title: 'Leaking' },
            { id: 'risks-jailbreaking', title: 'Jailbreaking' },
        ]
    },
    { 
        id: 'guardrails', 
        title: 'LLM Guardrails', 
        icon: <Shield className="w-4 h-4" />,
        subsections: [
            { id: 'guardrails-importance', title: 'Importance' },
            { id: 'guardrails-implementation', title: 'Implementation' },
            { id: 'guardrails-demo', title: 'Demo' },
        ]
    },
];

interface TableOfContentsProps {
    activeSectionId: string;
    activeSubsectionId: string;
    onLinkClick: (id: string) => void;
}

export const TableOfContents = ({ activeSectionId, activeSubsectionId, onLinkClick }: TableOfContentsProps) => {
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-primary">Table of Contents</h3>
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(section.subsections[0]?.id || section.id);
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeSectionId === section.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                {section.icon}
                {section.title}
              </a>
              <AnimatePresence>
                {activeSectionId === section.id && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-7 mt-1 space-y-1 overflow-hidden"
                  >
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <a
                          href={`#${subsection.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onLinkClick(subsection.id);
                          }}
                          className={cn(
                            'block w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors relative',
                            'before:absolute before:left-[-1rem] before:top-0 before:h-full before:w-px before:bg-border',
                            'after:absolute after:left-[-1rem] after:top-1/2 after:h-px after:w-2 after:bg-border',
                            activeSubsectionId === subsection.id
                              ? 'text-primary font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {subsection.title}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
