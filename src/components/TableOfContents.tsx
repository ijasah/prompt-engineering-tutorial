"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Brain, Target, Settings, AlertTriangle, Shield } from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'core-concepts', title: 'Core Concepts', icon: <Brain className="w-4 h-4" /> },
  { id: 'designing-prompts', title: 'Designing Prompts', icon: <Target className="w-4 h-4" /> },
  { id: 'advanced-techniques', title: 'Advanced Techniques', icon: <Settings className="w-4 h-4" /> },
  { id: 'risks', title: 'Risks', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'guardrails', title: 'Guardrails', icon: <Shield className="w-4 h-4" /> },
];

export const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-primary">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeSection === section.id
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

    