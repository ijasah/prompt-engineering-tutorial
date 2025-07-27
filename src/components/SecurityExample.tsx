"use client";
import { useState } from 'react';
import { AlertTriangle, ShieldCheck, ShieldOff, VenetianMask, Forward, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Button } from './ui/button';

interface SecurityExampleProps {
  title: string;
  type: 'injection' | 'leaking' | 'jailbreaking';
  severity: 'low' | 'medium' | 'high';
  description: string;
  prompt: string;
  vulnerableResponse: string;
}

const typeConfig = {
  injection: {
    icon: <VenetianMask className="h-5 w-5" />,
    label: 'Prompt Injection',
  },
  leaking: {
    icon: <ShieldOff className="h-5 w-5" />,
    label: 'Prompt Leaking',
  },
  jailbreaking: {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: 'Jailbreaking',
  },
};

const severityConfig = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
};

export const SecurityExample = ({
  title,
  type,
  severity,
  description,
  prompt,
  vulnerableResponse,
}: SecurityExampleProps) => {
  const [simulating, setSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const typedVulnerableResponse = useTypewriter(completed ? vulnerableResponse : '', 15);

  const handleSimulate = () => {
    setSimulating(true);
    setCompleted(false);
    setTimeout(() => {
      setSimulating(false);
      setCompleted(true);
    }, 800 + Math.random() * 500);
  };
  
  const handleReset = () => {
    setCompleted(false);
  };

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <div className="flex gap-2">
                <Badge className={severityConfig[severity]}>{severity.toUpperCase()}</Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                    {typeConfig[type].icon}
                    {typeConfig[type].label}
                </Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Malicious Prompt:</h4>
          <div className="p-3 bg-background/50 rounded-md border border-dashed border-destructive/50">
            <p className="font-mono text-xs text-foreground">{prompt}</p>
          </div>
        </div>
        <div className="flex justify-end">
            <Button 
                variant="destructive" 
                size="sm"
                onClick={completed ? handleReset : handleSimulate} 
                disabled={simulating}
            >
                {completed ? 'Reset' : (simulating ? 'Simulating Attack...' : 'Run Attack Simulation')}
                {simulating ? <Sparkles className="ml-2 h-4 w-4 animate-spin" /> : <Forward className="ml-2 h-4 w-4" />}
            </Button>
        </div>
        {completed && (
            <div>
            <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Vulnerable AI Response:</h4>
            <div className="p-3 bg-background/50 rounded-md border border-destructive/50 min-h-[80px]">
                <p className="font-mono text-xs text-destructive">{typedVulnerableResponse}</p>
            </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
};
