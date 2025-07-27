"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Textarea } from './ui/textarea';
import { Bot } from 'lucide-react';
import { Label } from './ui/label';

interface ParameterDemoProps {
  parameter: string;
  description: string;
  initialValue: number;
  min: number;
  max: number;
  step: number;
  prompt: string;
  generateText: (value: number) => string;
}

export const ParameterDemo = ({
  parameter,
  description,
  initialValue,
  min,
  max,
  step,
  prompt,
  generateText,
}: ParameterDemoProps) => {
  const [value, setValue] = useState(initialValue);
  const [output, setOutput] = useState('');
  const typewriterOutput = useTypewriter(output, 20);

  const handleSimulate = () => {
    setOutput('');
    const generated = generateText(value);
    setOutput(generated);
  };

  return (
    <Card className="bg-muted/30 border-dashed">
      <CardContent className="p-6">
        <h4 className="font-semibold text-lg text-primary">{parameter}</h4>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-4">
          <Label htmlFor={`${parameter}-prompt`} className="text-sm font-medium text-muted-foreground">Prompt</Label>
          <Textarea id={`${parameter}-prompt`} value={prompt} readOnly className="font-mono mt-1 bg-background/50" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Slider
            value={[value]}
            onValueChange={(val) => setValue(val[0])}
            min={min}
            max={max}
            step={step}
          />
          <span className="font-mono text-sm w-16 text-center py-1 px-2 rounded-md bg-background border">{value.toFixed(1)}</span>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSimulate}>Generate Text</Button>
        </div>

        {output && (
          <div className="mt-4">
            <h4 className="flex items-center font-semibold text-primary mb-2"><Bot className="mr-2"/> AI Output</h4>
            <div className="p-4 bg-background rounded-md border min-h-[60px]">
              <p className="text-foreground whitespace-pre-wrap font-mono">{typewriterOutput}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
