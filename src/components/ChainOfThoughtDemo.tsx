"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, CheckCircle, Search, Terminal } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';

const steps = [
  { text: 'User asks a multi-step question.', icon: <Terminal /> },
  { text: 'Model identifies need for external information.', icon: <Search /> },
  { text: 'Model simulates a tool call (e.g., search).', icon: <Terminal /> },
  { text: 'Model receives simulated tool output.', icon: <BrainCircuit /> },
  { text: 'Model synthesizes information to answer.', icon: <CheckCircle /> },
];

export const ChainOfThoughtDemo = () => {
  const [simulating, setSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const initialQuestion = "If I was 6 years old, my sister was half my age. Now I am 40. How old is my sister?";
  const finalAnswer = `1. **Initial State:** You were 6, sister was 6 / 2 = 3.
2. **Age Difference:** The age difference is 3 years.
3. **Current Age:** You are 40.
4. **Conclusion:** Your sister is 40 - 3 = 37 years old.`;

  const typewriterOutput = useTypewriter(completed ? finalAnswer : '', 30);

  const handleSimulate = () => {
    setSimulating(true);
    setCompleted(false);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setSimulating(false);
          setCompleted(true);
          return prev;
        }
      });
    }, 1000);
  };

  const handleReset = () => {
    setSimulating(false);
    setCompleted(false);
    setCurrentStep(0);
  };

  return (
    <Card className="bg-muted/20 border-primary/20">
      <CardHeader>
        <CardTitle>Chain-of-Thought Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground">Question:</label>
          <Textarea value={initialQuestion} readOnly className="font-mono mt-1 bg-background" />
        </div>
        <div className="flex justify-end mb-6">
          <Button onClick={completed ? handleReset : handleSimulate} disabled={simulating}>
            {completed ? 'Reset' : 'Simulate CoT'}
            <ArrowRight className="ml-2" />
          </Button>
        </div>

        {(simulating || completed) && (
          <div>
            <h4 className="font-semibold mb-4 text-accent">AI's Thought Process:</h4>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                    currentStep >= index ? 'bg-primary/10 opacity-100' : 'bg-muted/50 opacity-50'
                  }`}
                >
                  <div className={`mr-4 text-primary ${currentStep >= index ? 'animate-pulse' : ''}`}>
                    {step.icon}
                  </div>
                  <p className="text-sm text-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {completed && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-primary">Final Answer:</h4>
            <div className="p-4 bg-background rounded-md border whitespace-pre-wrap font-mono text-sm">
              {typewriterOutput}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

    