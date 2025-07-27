"use client";

import { AlertTriangle, ShieldCheck, ShieldOff, VenetianMask } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';

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
  const typedVulnerableResponse = useTypewriter(vulnerableResponse, 15);

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
        <div>
          <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Vulnerable AI Response:</h4>
          <div className="p-3 bg-background/50 rounded-md border border-destructive/50 min-h-[80px]">
            <p className="font-mono text-xs text-destructive">{typedVulnerableResponse}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

    