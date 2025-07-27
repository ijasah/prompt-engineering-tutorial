// src/components/GuardrailExample.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface GuardrailExampleProps {
  title: string;
  description: string;
  prompt: string;
  safeResponse: string;
  isHarmful: boolean;
}

export const GuardrailExample = ({ title, description, prompt, safeResponse, isHarmful }: GuardrailExampleProps) => {
  return (
    <Card className="bg-muted/30 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Example Input/Output:</h4>
          <div className="p-3 bg-background/50 rounded-md border border-dashed border-destructive/30">
            <p className="font-mono text-xs text-foreground whitespace-pre-wrap">{prompt}</p>
          </div>
        </div>
        <div>
            <Alert variant={isHarmful ? 'destructive' : 'default'} className={isHarmful ? 'bg-destructive/10' : 'bg-primary/10'}>
              {isHarmful ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <AlertTitle className="font-semibold">{isHarmful ? "Guardrail Action: Blocked / Modified" : "Guardrail Action: Verified"}</AlertTitle>
              <AlertDescription>
                {safeResponse}
              </AlertDescription>
            </Alert>
        </div>
      </CardContent>
    </Card>
  );
};
