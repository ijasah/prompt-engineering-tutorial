// src/components/TransformerSimulator.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, ChevronsRight, FileInput, Plus, Zap, RefreshCw, Cpu, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const initialInput = "what is ai?";
const embeddingDim = 8;
const numHeads = 2;

type SimulationStep = "idle" | "tokenizing" | "embedding" | "positional_encoding" | "transformer_block" | "attention" | "feed_forward" | "predicting" | "appending" | "finished";

const STEPS: SimulationStep[] = ["idle", "tokenizing", "embedding", "positional_encoding", "transformer_block", "attention", "feed_forward", "predicting", "appending"];

const stepConfig: Record<SimulationStep, { title: string; description: string; intuition: string }> = {
    idle: { title: "Start", description: "Enter text to see how a Transformer model processes it to generate a response, one token at a time.", intuition: "Ready" },
    tokenizing: { title: "Step 1: Tokenization", description: "The model breaks the input text into smaller units called tokens. This is the model's vocabulary.", intuition: "Splitting Words" },
    embedding: { title: "Step 2: Embedding", description: "Each token is converted into a numerical vector (an 'embedding'). This vector captures the token's semantic meaning.", intuition: "Capturing Meaning" },
    positional_encoding: { title: "Step 3: Positional Encoding", description: "A vector is added to each embedding to give the model information about the order of tokens, which is crucial for understanding context.", intuition: "Adding Order" },
    transformer_block: { title: "Step 4: Transformer Block", description: "The core of the model. The input vectors now pass through the attention and processing layers.", intuition: "Processing Context" },
    attention: { title: "Step 5: Multi-Head Attention", description: "The model weighs the importance of each token in relation to every other token. This allows it to 'focus' on the most relevant parts of the input to understand context.", intuition: "Weighing Importance" },
    feed_forward: { title: "Step 6: Feed-Forward Network", description: "The context-rich vectors from the attention layer are passed through a neural network for further processing and refinement.", intuition: "Deeper Thinking" },
    predicting: { title: "Step 7: Prediction", description: "The model uses the final processed vector to predict the most likely *next* token from its entire vocabulary.", intuition: "Generating Next Word" },
    appending: { title: "Step 8: Appending (Autoregression)", description: "The newly generated token is appended to the input sequence. The entire process then repeats to generate the next token, creating a coherent response.", intuition: "Continuing the Sentence" },
    finished: { title: "Finished", description: "The simulation has completed the generation cycles.", intuition: "Done" },
};

const EmbeddingVector = ({ vector, small }: { vector: number[], small?: boolean }) => (
    <div className={cn("flex space-x-1 p-1 bg-muted rounded-md border", small && "p-0.5")}>
        {vector.map((val, i) => (
            <div key={i}
                className={cn("w-4 h-4 rounded-sm", small && "w-2 h-2")}
                style={{ backgroundColor: `hsl(262, 83%, ${Math.abs(val) * 50 + 40}%)` }}
                title={val.toFixed(2)}
            />
        ))}
    </div>
);

const AttentionHead = ({ scores, activeTokens, headNum }: { scores: number[][], activeTokens: string[], headNum: number }) => (
    <div className="border rounded-lg bg-background/50 p-3">
        <p className="text-sm font-semibold text-center mb-3 text-primary">Head {headNum + 1}</p>
        <div className="flex gap-2">
            <div className="flex flex-col gap-1 mt-6 pt-1">
                {activeTokens.map((token, i) => (
                    <div key={i} className="text-sm font-mono text-right text-muted-foreground h-8 flex items-center pr-2">{token}</div>
                ))}
            </div>
            <div className="flex-1">
                <div className="flex gap-1">
                    {activeTokens.map((token, i) => (
                        <div key={i} className="text-sm font-mono text-center text-muted-foreground w-8 h-6 flex-shrink-0 flex items-end justify-center">{token}</div>
                    ))}
                </div>
                {scores.map((row, i) => (
                    <div key={i} className="flex gap-1 mt-1">
                        {row.map((score, j) => (
                            <TooltipProvider key={j} delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-primary-foreground/90 text-xs font-mono"
                                            style={{
                                                backgroundColor: `hsl(var(--primary) / ${score})`
                                            }}>
                                            {score.toFixed(2)}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">'{activeTokens[i]}' attends to '{activeTokens[j]}' with score {score.toFixed(2)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
);


export const TransformerSimulator = () => {
    const [step, setStep] = useState<SimulationStep>('idle');
    const [inputText, setInputText] = useState(initialInput);
    const [tokens, setTokens] = useState<string[]>([]);
    const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
    const [predictedToken, setPredictedToken] = useState<string | null>(null);
    const [cycle, setCycle] = useState(0);

    const currentStepIndex = STEPS.indexOf(step);
    const maxCycles = 4;

    const handleStart = () => {
        setTokens(inputText.split(' ').filter(Boolean));
        setGeneratedTokens([]);
        setPredictedToken(null);
        setCycle(0);
        setStep('tokenizing');
    };

    const handleNext = () => {
        if (step === 'appending') {
            if (cycle >= maxCycles) {
                setStep('finished');
                return;
            }
            if (predictedToken) {
                setGeneratedTokens(prev => [...prev, predictedToken]);
                setPredictedToken(null);
                setStep('embedding'); // Loop back
                setCycle(prev => prev + 1);
            }
        } else if (currentStepIndex < STEPS.length - 1) {
            setStep(STEPS[currentStepIndex + 1]);
        }
    };

    const handleReset = () => {
        setStep('idle');
        setInputText(initialInput);
        setTokens([]);
        setGeneratedTokens([]);
        setPredictedToken(null);
        setCycle(0);
    };

    const allTokens = useMemo(() => [...tokens, ...generatedTokens], [tokens, generatedTokens]);

    const embeddings = useMemo(() => allTokens.map(() => Array.from({ length: embeddingDim }, () => Math.random() * 2 - 1)), [allTokens]);
    const positionalEncodings = useMemo(() => allTokens.map(() => Array.from({ length: embeddingDim }, () => Math.random() * 2 - 1)), [allTokens]);
    const finalEmbeddings = useMemo(() => embeddings.map((emb, i) => emb.map((val, j) => val + positionalEncodings[i][j])), [embeddings, positionalEncodings]);

    const attentionScores = useMemo(() => {
        return Array.from({ length: numHeads }, () =>
            allTokens.map(() =>
                allTokens.map(() => Math.random())
            )
        );
    }, [allTokens]);

    useEffect(() => {
        if (step === 'predicting') {
            const possibleOutputs = ['a', 'field', 'of', 'computer', 'science'];
            const nextToken = possibleOutputs[cycle % possibleOutputs.length];
            setPredictedToken(nextToken);
        }
    }, [step, cycle]);

    const typedDescription = useTypewriter(stepConfig[step]?.description || '', 20);

    return (
        <Card className="bg-muted/20 border-dashed w-full overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Cpu />Transformer Simulation</CardTitle>
                        <CardDescription>An interactive look at how models like GPT generate responses.</CardDescription>
                    </div>
                    <Badge variant={step !== 'idle' ? 'default' : 'outline'} className="text-sm">
                        {stepConfig[step]?.intuition || "Ready"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text..."
                        disabled={step !== 'idle'}
                        className="max-w-xs bg-background"
                    />
                    {step === 'idle' ? (
                        <Button onClick={handleStart}>Start Simulation</Button>
                    ) : (
                        <div className='flex gap-2'>
                            <Button onClick={handleNext} disabled={step === 'finished'}>
                                Next <ArrowRight className="ml-2" />
                            </Button>
                            <Button onClick={handleReset} variant="outline">
                                <RefreshCw className="mr-2" /> Reset
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-background/50 rounded-lg border min-h-[5rem]">
                    <p className="text-sm text-muted-foreground">{typedDescription}</p>
                </div>

                <div className="space-y-6 min-h-[300px]">
                    {currentStepIndex >= 1 && (
                        <div className={cn("transition-opacity duration-500", currentStepIndex >= 1 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><FileInput className="mr-2 h-4 w-4 text-primary" />Input Sequence</h4>
                            <div className="flex gap-2 flex-wrap bg-background/50 p-4 rounded-lg border">
                                {tokens.map((token, i) => (
                                    <div key={`initial-${i}`} className={cn("px-3 py-1 rounded-md bg-primary/10 text-primary font-mono")}>{token}</div>
                                ))}
                                {generatedTokens.map((token, i) => (
                                    <div key={`generated-${i}`} className={cn("px-3 py-1 rounded-md bg-accent/20 text-accent-foreground font-mono animate-in fade-in")}>{token}</div>
                                ))}
                                {(step === 'predicting' || step === 'appending' || step === 'finished') && predictedToken && (
                                     <div className={cn("px-3 py-1 rounded-md bg-green-500/20 text-green-400 font-mono animate-pulse")}>{predictedToken}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {(step === 'embedding' || step === 'positional_encoding') && (
                        <div className={cn("transition-opacity duration-500", currentStepIndex >= 2 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><Zap className="mr-2 h-4 w-4 text-primary" />Vector Representation</h4>
                            <div className="flex flex-col gap-2 bg-background/50 p-4 rounded-lg border">
                                {allTokens.map((token, i) => (
                                    <div key={i} className="flex items-center gap-2 md:gap-4 flex-wrap">
                                        <div className="w-20 text-right font-mono text-sm text-primary">{token}</div>
                                        <ArrowRight size={16} className="text-muted-foreground" />
                                        <EmbeddingVector vector={embeddings[i]} />
                                        <div className={cn("flex items-center gap-2 md:gap-4 transition-opacity duration-300", step === 'positional_encoding' ? 'opacity-100' : 'opacity-0')}>
                                            <Plus size={16} className="text-muted-foreground" />
                                            <EmbeddingVector vector={positionalEncodings[i]} />
                                            <ChevronsRight size={16} className="text-muted-foreground" />
                                            <EmbeddingVector vector={finalEmbeddings[i]} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStepIndex >= 4 && step !== 'appending' && (
                        <div className={cn("transition-opacity duration-500", currentStepIndex >= 4 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><BrainCircuit className="mr-2 h-4 w-4 text-primary" />Generation Cycle {cycle + 1}</h4>
                            <div className="flex flex-col gap-4 bg-background/50 p-4 rounded-lg border">
                                {step === 'attention' && (
                                     <div className={cn("transition-opacity duration-300", step === 'attention' ? 'opacity-100' : 'opacity-50')}>
                                        <h5 className="font-semibold text-sm text-center mb-4 text-primary">Multi-Head Attention</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {attentionScores.map((headScores, i) => (
                                                <AttentionHead key={i} scores={headScores} activeTokens={allTokens} headNum={i} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                 {step === 'feed_forward' && (
                                    <div className={cn("transition-opacity duration-300", step === 'feed_forward' ? 'opacity-100' : 'opacity-50')}>
                                        <h5 className="font-semibold text-xs text-center mb-2 text-primary">Feed-Forward Network</h5>
                                        <div className="flex justify-center">
                                            <div className="p-4 bg-muted rounded-lg w-full md:w-1/2 flex justify-center items-center">
                                                <p className="text-sm text-muted-foreground">Contextual vectors are processed further</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                 {(step === 'predicting') && predictedToken && (
                                    <div className={cn("transition-opacity duration-500", step === 'predicting' ? 'opacity-100' : 'opacity-0')}>
                                        <h5 className="font-semibold text-xs text-center mb-2 text-primary">Prediction</h5>
                                        <div className="flex flex-col gap-2 items-center">
                                            <p className="text-sm text-muted-foreground">The model predicts the most likely next token.</p>
                                            <p className="font-mono text-lg text-primary animate-pulse p-4 bg-primary/10 rounded-md">{predictedToken}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
