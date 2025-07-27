// src/components/AdvancedTopKDemo.tsx
"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Badge } from './ui/badge';
import { ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';

const focusedSentences = [
    "The king ruled his kingdom with a just and fair hand.",
    "The queen wore a beautiful crown made of pure gold and jewels.",
    "The knight, in shining armor, rode a valiant steed into the heat of battle.",
];
const moderateSentences = [
    "The castle stood majestically on the hill overlooking the valley.",
    "A secret passage was hidden behind the grand tapestry in the hall.",
    "The royal banquet featured a feast of roasted meats and fine wines."
];
const diverseSentences = [
    "The king, a connoisseur of cosmic cartography, charted distant nebulas from his castle observatory.",
    "The queen, a master of temporal mechanics, wove the threads of timelines into intricate tapestries.",
    "The knight, astride a bio-luminescent griffin, patrolled the shimmering borders of reality itself.",
];


export const AdvancedTopKDemo = () => {
    const [value, setValue] = useState(25);
    const [output, setOutput] = useState('');
    const typewriterOutput = useTypewriter(output, 20);

    const generateText = (k: number) => {
        if (k < 10) return focusedSentences[Math.floor(Math.random() * focusedSentences.length)];
        if (k < 40) return moderateSentences[Math.floor(Math.random() * moderateSentences.length)];
        return diverseSentences[Math.floor(Math.random() * diverseSentences.length)];
    };

    const handleSimulate = () => {
        setOutput('');
        const generated = generateText(value);
        setOutput(generated);
    };

    const getBadgeInfo = () => {
        if (value < 10) return { label: "FOCUSED", className: "bg-blue-500/20 text-blue-400" };
        if (value < 40) return { label: "MODERATE", className: "bg-green-500/20 text-green-400" };
        return { label: "DIVERSE", className: "bg-purple-500/20 text-purple-400" };
    }
    
    const badgeInfo = getBadgeInfo();

    return (
        <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <ListOrdered className="w-6 h-6 text-primary" />
                    Top-k Sampling Demo
                </CardTitle>
                <CardDescription>Restricts selection to the K most likely tokens. Lower values are more focused.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className='space-y-4'>
                        <div className="flex justify-between items-center">
                            <label className="font-medium text-sm flex items-center gap-2">
                                Top-k: <span className="font-mono text-primary">{value}</span>
                            </label>
                            <Badge variant="outline" className={cn("border-0 font-semibold", badgeInfo.className)}>{badgeInfo.label}</Badge>
                        </div>
                        <Slider
                            value={[value]}
                            onValueChange={(val) => setValue(val[0])}
                            min={1}
                            max={50}
                            step={1}
                        />
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Focused</span>
                            <span>Moderate</span>
                            <span>Diverse</span>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-medium text-sm mb-2">Prompt:</p>
                        <div className="p-3 bg-muted rounded-md border">
                            <p className="font-mono text-sm text-muted-foreground">Tell me about a fantasy kingdom.</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button onClick={handleSimulate}>Generate with Top-k {value}</Button>
                    </div>

                    {output && (
                        <div>
                            <p className="font-medium text-sm mb-2">AI Output:</p>
                            <div className="p-3 bg-muted rounded-md border min-h-[60px]">
                                <p className="text-foreground whitespace-pre-wrap font-mono text-sm">{typewriterOutput}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

    