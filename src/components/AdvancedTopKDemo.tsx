// src/components/AdvancedTopKDemo.tsx
"use client";

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { ListOrdered, BookCopy } from 'lucide-react';
import { TokenChart, type TokenData } from './TokenChart';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialTokenData: TokenData[] = [
  { name: 'dragons', probability: 0.30 },
  { name: 'magic', probability: 0.25 },
  { name: 'swords', probability: 0.15 },
  { name: 'castles', probability: 0.12 },
  { name: 'adventure', probability: 0.08 },
  { name: 'mystery', probability: 0.05 },
  { name: 'ancient', probability: 0.03 },
  { name: 'forgotten', probability: 0.02 },
];

export const AdvancedTopKDemo = () => {
    const [kValue, setKValue] = useState(3);
    const [simulating, setSimulating] = useState(false);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);

    const { topKTokens, selectedTokensText } = useMemo(() => {
        const sortedTokens = [...initialTokenData].sort((a, b) => b.probability - a.probability);
        const topK = sortedTokens.slice(0, kValue);
        return { 
            topKTokens: topK.map(t => t.name),
            selectedTokensText: topK.map(t => `'${t.name}'`).join(', ')
        };
    }, [kValue]);

    const chartData = useMemo(() => {
        return initialTokenData.map(token => ({
            ...token,
            fill: topKTokens.includes(token.name) ? "hsl(var(--primary))" : "hsl(var(--muted))",
        }));
    }, [topKTokens]);
    
    const handleSimulate = () => {
        setSimulating(true);
        setSelectedToken(null);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * topKTokens.length);
            setSelectedToken(topKTokens[randomIndex]);
            setSimulating(false);
        }, 800);
    };

    return (
        <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <ListOrdered className="w-6 h-6 text-primary" />
                    Top-k Sampling
                </CardTitle>
                <CardDescription>Restricts the model to select the next token from the K most likely candidates.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Alert>
                            <BookCopy className="h-4 w-4" />
                            <AlertTitle>Theoretical Point</AlertTitle>
                            <AlertDescription>
                                Top-k sampling is a simple and effective way to control the randomness of the output. A small K (e.g., 1-5) makes the output more predictable and less prone to errors, while a large K allows for more diversity but can introduce irrelevant tokens. It's a hard cutoff that doesn't consider the actual probability distribution.
                            </AlertDescription>
                        </Alert>

                        <div className='space-y-4 p-4 border rounded-lg'>
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-sm flex items-center gap-2">
                                    Top-k Value: <span className="font-mono text-primary">{kValue}</span>
                                </label>
                            </div>
                            <Slider
                                value={[kValue]}
                                onValueChange={(val) => setKValue(val[0])}
                                min={1}
                                max={initialTokenData.length}
                                step={1}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>More Focused</span>
                                <span>More Diverse</span>
                            </div>
                        </div>

                        <div className="p-4 border rounded-lg space-y-2">
                             <p className="font-medium text-sm">Prompt:</p>
                             <p className="font-mono text-sm text-muted-foreground p-2 bg-muted rounded-md">The story is about a world of </p>
                             <div className="flex justify-end">
                                <Button onClick={handleSimulate} disabled={simulating}>
                                    {simulating ? 'Selecting Token...' : 'Simulate Next Token'}
                                </Button>
                             </div>
                        </div>

                         {selectedToken && (
                            <div className="p-4 border rounded-lg bg-primary/5">
                                <p className="font-medium text-sm mb-2">Simulation Result:</p>
                                <p className="text-sm text-muted-foreground">The model randomly selected a token from the top {kValue} candidates ({selectedTokensText}).</p>
                                <p className="font-mono text-lg text-center p-4 text-primary font-bold animate-pulse">{selectedToken}</p>
                            </div>
                         )}

                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-center text-sm">Next Token Probabilities</p>
                        <p className="text-xs text-center text-muted-foreground">The top {kValue} tokens are highlighted for sampling.</p>
                        <TokenChart data={chartData} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
