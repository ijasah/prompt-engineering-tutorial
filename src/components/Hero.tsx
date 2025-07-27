"use client";

import { Button } from "@/components/ui/button";
import { Bot, GraduationCap } from "lucide-react";
import { SmartPromptRefiner } from "./smart-prompt-refiner";

export const Hero = () => {
  return (
    <header className="relative bg-gradient-to-b from-background to-indigo-950/20 py-20 text-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container relative mx-auto px-4">
        <div className="inline-flex items-center justify-center gap-4 mb-6">
            <Bot className="w-16 h-16 text-primary animate-bounce" />
            <GraduationCap className="w-16 h-16 text-primary animate-bounce [animation-delay:0.2s]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
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
            <a href="#smart-refiner">
                <Button size="lg" variant="outline">Try the Refiner</Button>
            </a>
        </div>
        <div className="max-w-4xl mx-auto mt-16">
            <SmartPromptRefiner />
        </div>
      </div>
    </header>
  );
};

const GridPattern = () => (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full fill-gray-500/10 stroke-gray-500/10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="-1"
          patternTransform="translate(-50% -50%)"
        >
          <path d="M0 72V0H72" fill="none"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)"></rect>
    </svg>
)

    