"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';

interface ParameterDemoProps {
  parameter: string;
  description: string;
  initialValue: number;
  min: number;
  max: number;
  step: number;
  generateText: (value: number) => string;
}

export const ParameterDemo = ({
  parameter,
  description,
  initialValue,
  min,
  max,
  step,
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
    <Card className="bg-muted/10 border-accent/10">
      <CardContent className="p-6">
        <h4 className="font-semibold text-lg text-primary">{parameter}</h4>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
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
        <Button onClick={handleSimulate}>Generate Text</Button>
        {output && (
          <div className="mt-4 p-4 bg-background rounded-md border min-h-[60px]">
            <p className="text-foreground whitespace-pre-wrap font-mono">{typewriterOutput}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

    