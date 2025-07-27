// src/components/AdvancedTopPDemo.tsx
"use client";

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { PieChart, BookCopy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TokenChart, type TokenData } from './TokenChart';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialTokenData: TokenData[] = [
  { name: 'The', probability: 0.25 },
  { name: 'A', probability: 0.18 },
  { name: 'In', probability: 0.12 },
  { name: 'Once', probability: 0.10 },
  { name: 'Cosmic', probability: 0.08 },
  { name: 'Under', probability: 0.07 },
  { name: 'Beyond', probability: 0.06 },
  { name: 'Quantum', probability: 0.05 },
  { name: 'Ephemeral', probability: 0.04 },
  { name: 'Time', probability: 0.03 },
  { name: 'Echoes', probability: 0.02 },
];

export const AdvancedTopPDemo = () => {
    const [pValue, setPValue] = useState(0.5);
    const [simulating, setSimulating] = useState(false);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);

    const { nucleusTokens, cumulativeProb, selectedTokensText } = useMemo(() => {
        const sortedTokens = [...initialTokenData].sort((a, b) => b.probability - a.probability);
        let cumulative = 0;
        const nucleus: TokenData[] = [];
        for (const token of sortedTokens) {
            if (cumulative < pValue) {
                cumulative += token.probability;
                nucleus.push(token);
            } else {
                break;
            }
        }
        return { 
            nucleusTokens: nucleus.map(t => t.name), 
            cumulativeProb: cumulative,
            selectedTokensText: nucleus.map(t => `'${t.name}'`).join(', ')
        };
    }, [pValue]);

    const chartData = useMemo(() => {
        return initialTokenData.map(token => ({
            ...token,
            fill: nucleusTokens.includes(token.name) ? "hsl(var(--primary))" : "hsl(var(--muted))",
        }));
    }, [nucleusTokens]);
    
    const handleSimulate = () => {
        setSimulating(true);
        setSelectedToken(null);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * nucleusTokens.length);
            setSelectedToken(nucleusTokens[randomIndex]);
            setSimulating(false);
        }, 800);
    };
    
    return (
        <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <PieChart className="w-6 h-6 text-primary" />
                    Top-p (Nucleus) Sampling
                </CardTitle>
                <CardDescription>Dynamically selects the smallest set of tokens whose cumulative probability exceeds P.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Alert>
                            <BookCopy className="h-4 w-4" />
                            <AlertTitle>Theoretical Point</AlertTitle>
                            <AlertDescription>
                                Top-p is adaptive; the number of tokens in the sampling pool (the nucleus) can change. A low top-p (e.g., 0.1) leads to very safe, coherent text, while a high top-p (e.g., 0.9) allows for more diversity and creativity. It's often preferred over Top-k for maintaining a balance between coherence and variety.
                            </AlertDescription>
                        </Alert>

                         <div className='space-y-4 p-4 border rounded-lg'>
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-sm flex items-center gap-2">
                                    Top-p Value: <span className="font-mono text-primary">{pValue.toFixed(2)}</span>
                                </label>
                                <Badge variant="outline" className="border-primary/50 text-primary">Cumulative Prob: {cumulativeProb.toFixed(2)}</Badge>
                            </div>
                            <Slider
                                value={[pValue]}
                                onValueChange={(val) => setPValue(val[0])}
                                min={0.01}
                                max={1}
                                step={0.01}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>More Coherent</span>
                                <span>Balanced</span>
                                <span>More Creative</span>
                            </div>
                        </div>

                         <div className="p-4 border rounded-lg space-y-2">
                             <p className="font-medium text-sm">Prompt:</p>
                             <p className="font-mono text-sm text-muted-foreground p-2 bg-muted rounded-md">Once upon a time, in a land of </p>
                             <div className="flex justify-end">
                                <Button onClick={handleSimulate} disabled={simulating}>
                                    {simulating ? 'Selecting Token...' : 'Simulate Next Token'}
                                </Button>
                             </div>
                        </div>

                         {selectedToken && (
                            <div className="p-4 border rounded-lg bg-primary/5">
                                <p className="font-medium text-sm mb-2">Simulation Result:</p>
                                <p className="text-sm text-muted-foreground">The model randomly selected a token from the nucleus ({selectedTokensText}).</p>
                                <p className="font-mono text-lg text-center p-4 text-primary font-bold animate-pulse">{selectedToken}</p>
                            </div>
                         )}

                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-center text-sm">Next Token Probabilities</p>
                        <p className="text-xs text-center text-muted-foreground">The highlighted "nucleus" of tokens will be sampled.</p>
                        <TokenChart data={chartData} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
