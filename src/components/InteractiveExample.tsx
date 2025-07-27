"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Sparkles } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';

interface InteractiveExampleProps {
  title: string;
  prompt: string;
  expectedOutput: string;
  description: string;
}

export const InteractiveExample = ({ title, prompt, expectedOutput, description }: InteractiveExampleProps) => {
  const [simulating, setSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const typewriterOutput = useTypewriter(completed ? expectedOutput : '', 20);

  const handleSimulate = () => {
    setSimulating(true);
    setCompleted(false);
    setTimeout(() => {
      setSimulating(false);
      setCompleted(true);
    }, 1000 + Math.random() * 500);
  };

  const handleReset = () => {
    setCompleted(false);
  }

  return (
    <Card className="bg-muted/30 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground">Prompt</label>
          <Textarea value={prompt} readOnly className="font-mono mt-1 bg-background/50" />
        </div>
        <div className="flex justify-end mb-4">
          <Button onClick={completed ? handleReset : handleSimulate} disabled={simulating}>
            {simulating ? 'Running...' : (completed ? 'Reset' : 'Run Prompt')}
            {simulating && <Sparkles className="ml-2 animate-spin" />}
          </Button>
        </div>
        {completed && (
          <div className="space-y-2">
            <h4 className="flex items-center font-semibold text-primary"><Bot className="mr-2"/> AI Output</h4>
            <div className="p-4 bg-background rounded-md border min-h-[60px]">
              <p className="text-foreground whitespace-pre-wrap font-mono">{typewriterOutput}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

    