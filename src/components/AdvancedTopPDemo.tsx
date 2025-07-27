// src/components/AdvancedTopPDemo.tsx
"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Badge } from './ui/badge';
import { PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const coherentSentences = [
    "The chef meticulously prepared a delicious three-course meal for the distinguished guests.",
    "The programmer wrote clean, efficient, and well-documented code for the new software module.",
    "The musician played a beautiful and moving melody on the grand piano.",
];
const balancedSentences = [
    "The artist painted a picture of a serene landscape.",
    "The engineer designed a bridge to be both functional and elegant.",
    "The writer crafted a story that was both entertaining and thought-provoking."
];
const creativeSentences = [
    "The chef painted flavors onto the canvas of the plate, conducting a culinary symphony for the senses.",
    "The programmer sculpted elegant algorithms from raw logic, breathing digital life into the machine.",
    "The musician wove silence and sound into an intricate tapestry of pure emotion.",
];

export const AdvancedTopPDemo = () => {
    const [value, setValue] = useState(0.5);
    const [output, setOutput] = useState('');
    const typewriterOutput = useTypewriter(output, 20);

    const generateText = (p: number) => {
        if (p < 0.3) return coherentSentences[Math.floor(Math.random() * coherentSentences.length)];
        if (p < 0.7) return balancedSentences[Math.floor(Math.random() * balancedSentences.length)];
        return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
    };

    const handleSimulate = () => {
        setOutput('');
        const generated = generateText(value);
        setOutput(generated);
    };

    const getBadgeInfo = () => {
        if (value < 0.3) return { label: "COHERENT", className: "bg-blue-500/20 text-blue-400" };
        if (value < 0.7) return { label: "BALANCED", className: "bg-green-500/20 text-green-400" };
        return { label: "CREATIVE", className: "bg-purple-500/20 text-purple-400" };
    }
    
    const badgeInfo = getBadgeInfo();

    return (
        <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <PieChart className="w-6 h-6 text-primary" />
                    Top-p (Nucleus) Sampling Demo
                </CardTitle>
                <CardDescription>Selects from tokens with cumulative probability > P. Balances coherence and creativity.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className='space-y-4'>
                        <div className="flex justify-between items-center">
                            <label className="font-medium text-sm flex items-center gap-2">
                                Top-p: <span className="font-mono text-primary">{value.toFixed(1)}</span>
                            </label>
                            <Badge variant="outline" className={cn("border-0 font-semibold", badgeInfo.className)}>{badgeInfo.label}</Badge>
                        </div>
                        <Slider
                            value={[value]}
                            onValueChange={(val) => setValue(val[0])}
                            min={0.1}
                            max={1}
                            step={0.1}
                        />
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Coherent</span>
                            <span>Balanced</span>
                            <span>Creative</span>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-medium text-sm mb-2">Prompt:</p>
                        <div className="p-3 bg-muted rounded-md border">
                            <p className="font-mono text-sm text-muted-foreground">Describe a professional at work.</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button onClick={handleSimulate}>Generate with Top-p {value.toFixed(1)}</Button>
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

    