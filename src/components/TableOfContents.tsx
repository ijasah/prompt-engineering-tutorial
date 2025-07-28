
// src/components/TableOfContents.tsx
"use client";

import { cn } from '@/lib/utils';
import { BookOpen, Brain, Target, Settings, AlertTriangle, Shield, Lightbulb, Cpu, RefreshCw } from 'lucide-react';

const sections = [
  { id: 'how-transformers-work', title: 'Transformers - Recap', icon: <Cpu className="w-4 h-4" /> },
  { id: 'introduction', title: 'Introduction', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'core-concepts', title: 'Core Concepts', icon: <Brain className="w-4 h-4" /> },
  { id: 'designing-prompts', title: 'Designing Prompts', icon: <Target className="w-4 h-4" /> },
  { id: 'advanced-techniques', title: 'Advanced Techniques', icon: <Settings className="w-4 h-4" /> },
  { id: 'risks', title: 'Risks', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'guardrails', title: 'LLM Guardrails', icon: <Shield className="w-4 h-4" /> },
];

interface TableOfContentsProps {
    activeSectionId: string;
    onLinkClick: (id: string) => void;
}

export const TableOfContents = ({ activeSectionId, onLinkClick }: TableOfContentsProps) => {
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-primary">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(section.id);
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
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
