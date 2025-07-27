// src/components/GuardrailDemo.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldOff, Sparkles, ThumbsDown, AlertCircle } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { analyzeContent, type AnalyzeContentOutput } from '@/ai/flows/content-analysis';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const examples = [
    "I think your new proposal is not good and I dislike it.",
    "This is a dangerous chemical reaction that can cause an explosion.",
    "The new policy will have a negative impact on the community.",
    "Building a functional app is a rewarding experience.",
];

export const GuardrailDemo = () => {
    const [inputText, setInputText] = useState(examples[0]);
    const [simulating, setSimulating] = useState(false);
    const [result, setResult] = useState<AnalyzeContentOutput | null>(null);
    const typewriterResponse = useTypewriter(result?.response ?? '', 20);

    const handleAnalyze = async () => {
        setSimulating(true);
        setResult(null);
        try {
            const analysisResult = await analyzeContent({ text: inputText });
            setResult(analysisResult);
        } catch (error) {
            console.error("Error analyzing content:", error);
            setResult({
                isHarmful: true,
                reasons: ["An error occurred during analysis."],
                response: "Could not process the request. Please try again."
            });
        }
        setSimulating(false);
    };

    const handleExampleClick = (example: string) => {
        setInputText(example);
        setResult(null);
    };
    
    return (
        <Card className="bg-muted/20 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <ShieldCheck className="text-primary" />
                    Interactive Guardrail Demo
                </CardTitle>
                <CardDescription>
                    Test how an AI guardrail evaluates input for harmful content. The model below is configured to block harmful content and respond safely.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <label className="text-sm font-medium text-muted-foreground">Sample Prompts</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {examples.map((ex, i) => (
                            <Button key={i} variant="outline" size="sm" onClick={() => handleExampleClick(ex)}>
                                Try sample {i+1}
                            </Button>
                        ))}
                    </div>
                </div>

                <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter some text to analyze..."
                    className="min-h-[100px] bg-background"
                />
                <div className="flex justify-end my-4">
                    <Button onClick={handleAnalyze} disabled={simulating}>
                        {simulating ? (
                            <>
                                <Sparkles className="mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Content'
                        )}
                    </Button>
                </div>

                {result && (
                    <div className="space-y-4">
                        <Alert variant={result.isHarmful ? 'destructive' : 'default'} className={result.isHarmful ? 'bg-destructive/10' : 'bg-primary/10'}>
                             {result.isHarmful ? <ThumbsDown className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                            <AlertTitle className="font-semibold">{result.isHarmful ? "Harmful Content Detected & Blocked" : "Content Deemed Safe"}</AlertTitle>
                            <AlertDescription>
                                {result.isHarmful ? 'The AI blocked the request. Detected categories:' : 'The AI determined the content is safe and generated a response.'}
                                {result.isHarmful && (
                                     <div className="flex flex-wrap gap-2 mt-2">
                                        {result.reasons.map((reason, i) => (
                                            <Badge key={i} variant="destructive">{reason}</Badge>
                                        ))}
                                    </div>
                                )}
                            </AlertDescription>
                        </Alert>

                        <div>
                            <h4 className="font-semibold text-sm mb-2">AI Response:</h4>
                            <div className="p-4 bg-background rounded-md border min-h-[60px]">
                                <p className="text-foreground whitespace-pre-wrap font-mono text-sm">{typewriterResponse}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

    