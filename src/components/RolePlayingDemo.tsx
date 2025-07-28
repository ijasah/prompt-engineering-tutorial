// src/components/RolePlayingDemo.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Sparkles, User, UserCheck } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Separator } from './ui/separator';

const noRolePrompt = `Human: What is AI?
AI:`;
const withRolePrompt = `Role: AI Research Assistant
Human: What is AI?
AI:`;

const noRoleOutput = `AI, or Artificial Intelligence, is when computers do things that normally require human intelligence. This can be anything from understanding language to recognizing images.`;
const withRoleOutput = `Artificial Intelligence (AI) is a multidisciplinary field of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence. These tasks include problem-solving, learning, speech recognition, and visual perception. Key subfields include machine learning, natural language processing, and computer vision.`;


export const RolePlayingDemo = () => {
  const [simulating, setSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const typedNoRoleOutput = useTypewriter(completed ? noRoleOutput : '', 20);
  const typedWithRoleOutput = useTypewriter(completed ? withRoleOutput : '', 20);

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
    <Card className="bg-muted/30 border-dashed w-full">
      <CardHeader>
        <CardTitle className="text-lg">Role-Playing Simulation</CardTitle>
        <CardDescription>
          See how assigning a role to the AI changes its response style and detail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Without Role */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center"><User className="mr-2 h-5 w-5" /> Without a Role</h4>
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground">Prompt</label>
              <Textarea value={noRolePrompt} readOnly className="font-mono mt-1 bg-background/50 h-24" />
            </div>
            {completed && (
              <div className="space-y-2">
                <h4 className="flex items-center font-semibold text-primary"><Bot className="mr-2"/> AI Output</h4>
                <div className="p-4 bg-background rounded-md border min-h-[140px]">
                  <p className="text-foreground whitespace-pre-wrap font-mono text-sm">{typedNoRoleOutput}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Column 2: With Role */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center"><UserCheck className="mr-2 h-5 w-5 text-primary" /> With Role: AI Research Assistant</h4>
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground">Prompt</label>
              <Textarea value={withRolePrompt} readOnly className="font-mono mt-1 bg-background/50 h-24" />
            </div>
             {completed && (
              <div className="space-y-2">
                <h4 className="flex items-center font-semibold text-primary"><Bot className="mr-2"/> AI Output</h4>
                <div className="p-4 bg-background rounded-md border min-h-[140px]">
                  <p className="text-foreground whitespace-pre-wrap font-mono text-sm">{typedWithRoleOutput}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-center">
          <Button onClick={completed ? handleReset : handleSimulate} disabled={simulating} size="lg">
            {simulating ? 'Running...' : (completed ? 'Reset Simulation' : 'Run Simulation')}
            {simulating && <Sparkles className="ml-2 animate-spin" />}
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
};
