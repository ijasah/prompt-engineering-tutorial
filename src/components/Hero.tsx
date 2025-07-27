"use client";

import { Button } from "@/components/ui/button";
import { Bot, GraduationCap } from "lucide-react";

export const Hero = () => {
  return (
    <header className="relative bg-background py-20 text-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container relative mx-auto px-4">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
            <Bot className="w-16 h-16 text-primary animate-bounce" />
            <GraduationCap className="w-16 h-16 text-primary animate-bounce [animation-delay:0.2s]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 mb-4">
          PromptCraft Academy
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            An interactive guide to the art and science of prompt engineering.
            Presented by <a href="#" className="font-semibold text-primary hover:underline">IJAS A H</a>.
        </p>
        <div className="flex justify-center gap-4">
            <a href="#content">
                <Button size="lg">Start Learning</Button>
            </a>
        </div>
      </div>
    </header>
  );
};
