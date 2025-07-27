'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Bot, Forward } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { CodeBlock } from './ui/code-block';
import { Separator } from './ui/separator';

type PromptElement = {
  label: string;
  value: string;
  isCode?: boolean;
};

type PromptSimulatorProps = {
  title: string;
  elements: PromptElement[];
  output: string;
  explanation?: string;
};

export function PromptSimulator({ title, elements, output, explanation }: PromptSimulatorProps) {
  const [simulating, setSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const typewriterOutput = useTypewriter(completed ? output : '', 20);

  const handleSimulate = () => {
    setSimulating(true);
    setCompleted(false);
    // Simulate network latency + processing time
    setTimeout(() => {
      setSimulating(false);
      setCompleted(true);
    }, 1000 + Math.random() * 800);
  };
  
  const handleReset = () => {
    setSimulating(false);
    setCompleted(false);
  };

  return (
    <Card className="bg-muted/50 border-dashed">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">{title}</h4>
        <div className="space-y-4 mb-4">
          {elements.map((el, index) => (
            <div key={index} className="flex flex-col text-sm">
              <span className="font-semibold text-primary">{el.label}:</span>
              {el.isCode ? (
                <CodeBlock code={el.value} />
              ) : (
                <p className="text-muted-foreground whitespace-pre-wrap font-mono">{el.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mb-4">
          <Button onClick={completed ? handleReset : handleSimulate} disabled={simulating}>
            {completed ? 'Reset' : (simulating ? 'Simulating...' : 'Simulate')}
            {simulating ? <Sparkles className="ml-2 h-4 w-4 animate-spin" /> : <Forward className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {(simulating || completed) && <Separator className="my-4" />}

        {simulating && (
          <div className="flex items-center space-x-2 text-muted-foreground animate-pulse">
            <Bot className="h-5 w-5" />
            <p>AI is thinking...</p>
          </div>
        )}
        
        {completed && (
          <div className="space-y-2">
            <h5 className="font-semibold flex items-center text-primary">
              <Bot className="mr-2 h-5 w-5" /> AI Output
            </h5>
            <div className="p-4 bg-background rounded-md border min-h-[50px]">
              <p className="text-foreground whitespace-pre-wrap font-mono">{typewriterOutput}</p>
            </div>
            {explanation && (
                <div className="pt-2">
                     <p className="text-sm text-muted-foreground italic">{explanation}</p>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
