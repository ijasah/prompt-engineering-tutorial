// src/components/AdvancedTemperatureDemo.tsx
"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Badge } from './ui/badge';
import { Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

const predictableSentences = [
    "The sky is blue during a clear day.",
    "Water is a liquid at room temperature.",
    "The sun provides light and warmth to the Earth.",
    "Grass is a common type of plant.",
];
const balancedSentences = [
    "The cat sat comfortably on the mat near the fireplace.",
    "She enjoyed reading a book on a rainy afternoon.",
    "The city skyline was impressive at sunset.",
];
const creativeSentences = [
    "The cosmos whispered secrets in hues of forgotten dreams.",
    "A symphony of silence echoed through the petrified forest.",
    "Velvet moonlight danced upon the obsidian lake.",
    "Time itself unraveled, a tapestry of shimmering paradoxes.",
];

export const AdvancedTemperatureDemo = () => {
    const [value, setValue] = useState(0.5);
    const [output, setOutput] = useState('');
    const typewriterOutput = useTypewriter(output, 20);

    const generateText = (temp: number) => {
        if (temp < 0.3) return predictableSentences[Math.floor(Math.random() * predictableSentences.length)];
        if (temp < 0.7) return balancedSentences[Math.floor(Math.random() * balancedSentences.length)];
        return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
    };

    const handleSimulate = () => {
        setOutput('');
        const generated = generateText(value);
        setOutput(generated);
    };

    const getBadgeInfo = () => {
        if (value < 0.3) return { label: "PREDICTABLE", className: "bg-blue-500/20 text-blue-400" };
        if (value < 0.7) return { label: "BALANCED", className: "bg-green-500/20 text-green-400" };
        return { label: "CREATIVE", className: "bg-purple-500/20 text-purple-400" };
    }

    const badgeInfo = getBadgeInfo();

    return (
        <Card className="bg-card border-border shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Thermometer className="w-6 h-6 text-primary" />
                    Temperature Sampling Demo
                </CardTitle>
                <CardDescription>Controls randomness. Lower values are more predictable, higher values are more creative.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className='space-y-4'>
                        <div className="flex justify-between items-center">
                            <label className="font-medium text-sm flex items-center gap-2">
                                Temperature: <span className="font-mono text-primary">{value.toFixed(1)}</span>
                            </label>
                            <Badge variant="outline" className={cn("border-0 font-semibold", badgeInfo.className)}>{badgeInfo.label}</Badge>
                        </div>
                        <Slider
                            value={[value]}
                            onValueChange={(val) => setValue(val[0])}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Predictable</span>
                            <span>Balanced</span>
                            <span>Creative</span>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-medium text-sm mb-2">Prompt:</p>
                        <div className="p-3 bg-muted rounded-md border">
                            <p className="font-mono text-sm text-muted-foreground">Write a simple sentence about the world.</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button onClick={handleSimulate}>Generate with Temp {value.toFixed(1)}</Button>
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

    