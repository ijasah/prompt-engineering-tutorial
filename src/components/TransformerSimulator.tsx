// src/components/TransformerSimulator.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, ChevronsRight, FileInput, Plus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

const initialInput = "what is ai";
const tokens = ["what", "is", "ai"];
const embeddingDim = 6;
const numHeads = 2; // Simplified for visualization

type SimulationStep = "idle" | "tokenized" | "embedded" | "positional" | "qkv" | "attention" | "ffn" | "output";

const STEPS: SimulationStep[] = ["idle", "tokenized", "embedded", "positional", "qkv", "attention", "ffn", "output"];

const stepDescriptions: Record<SimulationStep, { title: string; description: string }> = {
    idle: { title: "Start", description: "Enter some text and click 'Start Simulation' to see how a Transformer model processes it." },
    tokenized: { title: "Step 1: Tokenization", description: "The input text is broken down into smaller units called tokens. These can be words, subwords, or characters." },
    embedded: { title: "Step 2: Embedding", description: "Each token is converted into a numerical vector (an 'embedding'). This vector represents the token's meaning in a high-dimensional space." },
    positional: { title: "Step 3: Positional Encoding", description: "A positional vector is added to each embedding. This gives the model crucial information about the order of the tokens in the sequence, since the core architecture doesn't inherently process sequence order." },
    qkv: { title: "Step 4: Query, Key, Value", description: "For each token's vector, the model creates three new vectors: a Query (Q), a Key (K), and a Value (V). These are used to calculate attention scores in the next step." },
    attention: { title: "Step 5: Multi-Head Attention", description: "The model calculates attention scores by comparing the Query of one token to the Key of every other token. This determines how much 'focus' to place on other tokens. The scores create a weighted sum of the Value vectors, producing a new vector that is rich in contextual information." },
    ffn: { title: "Step 6: Feed-Forward Network", description: "The output from the attention layer is passed through a simple neural network for further processing. This step helps in transforming the contextual vectors into a more refined representation." },
    output: { title: "Step 7: Prediction", description: "Finally, the output of the transformer block is converted into a probability distribution over the entire vocabulary to predict the most likely next token." },
};

const EmbeddingVector = ({ vector, small }: { vector: number[], small?: boolean }) => (
    <div className={cn("flex space-x-1 p-1 bg-muted rounded-md border", small && "p-0.5")}>
        {vector.map((val, i) => (
            <div key={i}
                className={cn("w-4 h-4 rounded-sm", small && "w-2 h-2")}
                style={{ backgroundColor: `hsl(262, 83%, ${Math.abs(val) * 50 + 40}%)` }}
                 title={val.toString()}
            />
        ))}
    </div>
);

const AttentionHead = ({ scores, active }: { scores: number[], active: boolean }) => (
    <div className={cn("p-2 border rounded-lg transition-all", active ? 'bg-primary/10 border-primary' : 'bg-muted/50')}>
        <div className="flex justify-around">
            {scores.map((s, i) => (
                 <div key={i} className="flex flex-col items-center gap-1">
                    <div className="text-xs font-mono">{tokens[i]}</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `hsl(210, 100%, ${100 - s * 100}%)`, color: s > 0.5 ? 'white' : 'black' }}>
                        {s.toFixed(1)}
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export const TransformerSimulator = () => {
    const [step, setStep] = useState<SimulationStep>('idle');
    const [inputText, setInputText] = useState(initialInput);

    const currentStepIndex = STEPS.indexOf(step);

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setStep(STEPS[currentStepIndex + 1]);
        }
    };
    
    const handleReset = () => {
        setStep('idle');
    }

    const embeddings = tokens.map(() => Array.from({ length: embeddingDim }, () => parseFloat(Math.random().toFixed(2))));
    const positionalEncodings = tokens.map(() => Array.from({ length: embeddingDim }, () => parseFloat(Math.random().toFixed(2))));
    const finalEmbeddings = embeddings.map((emb, i) => emb.map((val, j) => parseFloat((val + positionalEncodings[i][j]).toFixed(2))));
    
    const attentionScores = Array.from({length: numHeads}, () => tokens.map(() => Math.random()));
    const finalOutput = "An artificial intelligence is a system...";

    return (
        <Card className="bg-muted/30 border-dashed w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Transformer Simulation</CardTitle>
                <CardDescription>{stepDescriptions[step].title}: {stepDescriptions[step].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                
                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-2">
                     <Input 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} 
                        placeholder="Enter text to simulate"
                        disabled={step !== 'idle'}
                        className="max-w-xs"
                    />
                    {step === 'idle' ? (
                        <Button onClick={() => setStep('tokenized')}>Start Simulation</Button>
                    ) : (
                         <div className='flex gap-2'>
                             <Button onClick={handleNext} disabled={currentStepIndex === STEPS.length - 1}>Next Step <ArrowRight className="ml-2" /></Button>
                             <Button onClick={handleReset} variant="outline">Reset</Button>
                         </div>
                    )}
                </div>

                {/* Main visualization area */}
                <div className="space-y-4 min-h-[400px]">
                    
                    {/* Tokenization */}
                    <div className={cn("transition-opacity duration-500", currentStepIndex >= 1 ? 'opacity-100' : 'opacity-0')}>
                        <h4 className="font-semibold text-sm mb-2 flex items-center"><FileInput className="mr-2 h-4 w-4 text-primary" />Input & Tokenization</h4>
                        <div className="flex gap-2 flex-wrap bg-background/50 p-4 rounded-lg border">
                            {tokens.map((token, i) => (
                                <div key={i} className={cn("px-3 py-1 rounded-md bg-primary/10 text-primary font-mono transition-all duration-300", currentStepIndex >=1 ? "scale-100 opacity-100" : "scale-90 opacity-0")} style={{transitionDelay: `${i * 100}ms`}}>{token}</div>
                            ))}
                        </div>
                    </div>

                    {/* Embeddings & Positional */}
                    {(currentStepIndex >= 2) && (
                         <div className={cn("transition-opacity duration-500", currentStepIndex >= 2 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><Zap className="mr-2 h-4 w-4 text-primary" />Embeddings & Positional Encoding</h4>
                            <div className="flex flex-col gap-2 bg-background/50 p-4 rounded-lg border">
                               {tokens.map((token, i) => (
                                   <div key={i} className={cn("flex items-center gap-2 md:gap-4 transition-all duration-500 flex-wrap", currentStepIndex >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4')} style={{transitionDelay: `${i * 100}ms`}}>
                                       <div className="w-16 text-right font-mono text-sm text-primary">{token}</div>
                                       <ArrowRight size={16} className="text-muted-foreground" />
                                       <EmbeddingVector vector={embeddings[i]} />
                                       <div className={cn("flex items-center gap-2 md:gap-4 transition-opacity duration-300", currentStepIndex >= 3 ? 'opacity-100' : 'opacity-0')}>
                                            <Plus size={16} className="text-muted-foreground" />
                                            <EmbeddingVector vector={positionalEncodings[i]} />
                                            <ChevronsRight size={16} className="text-muted-foreground" />
                                            <EmbeddingVector vector={finalEmbeddings[i]} />
                                       </div>
                                   </div>
                               ))}
                                {currentStepIndex === 3 && (
                                     <p className="text-xs text-muted-foreground mt-2 text-center">Token Embedding (meaning) + Positional Encoding (order) = Final Input Vector</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Transformer Block */}
                    {(currentStepIndex >= 4) && (
                         <div className={cn("transition-opacity duration-500", currentStepIndex >= 4 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><Bot className="mr-2 h-4 w-4 text-primary" />Transformer Block</h4>
                            <div className="flex flex-col gap-4 bg-background/50 p-4 rounded-lg border">
                                <div className={cn("transition-opacity duration-300", currentStepIndex >= 5 ? 'opacity-100' : 'opacity-50')}>
                                    <h5 className={cn("font-semibold text-xs text-center mb-2 transition-colors", currentStepIndex >= 5 ? 'text-primary' : 'text-muted-foreground')}>Multi-Head Attention</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {attentionScores.map((scores, i) => (
                                             <div key={i} className="flex flex-col items-center gap-1">
                                                <p className="text-xs font-mono">Head {i+1}</p>
                                                <AttentionHead key={i} scores={scores} active={currentStepIndex >= 5} />
                                             </div>
                                        ))}
                                    </div>
                                    {currentStepIndex === 5 && <p className="text-xs text-muted-foreground mt-2 text-center">For the token 'ai', Head 1 is paying high attention to 'what'. Head 2 is focusing on 'is'.</p>}
                                </div>
                                <div className={cn("transition-opacity duration-300", currentStepIndex >= 6 ? 'opacity-100' : 'opacity-50')}>
                                    <h5 className={cn("font-semibold text-xs text-center mb-2 transition-colors", currentStepIndex >= 6 ? 'text-primary' : 'text-muted-foreground')}>Feed-Forward Network</h5>
                                     <div className="flex justify-center">
                                          <div className="p-4 bg-muted rounded-lg w-full md:w-1/2 flex justify-center items-center">
                                            <p className="text-sm text-muted-foreground">Further processing on contextual vectors</p>
                                          </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Output */}
                     {(currentStepIndex >= 7) && (
                         <div className={cn("transition-opacity duration-500", currentStepIndex >= 7 ? 'opacity-100' : 'opacity-0')}>
                            <h4 className="font-semibold text-sm mb-2 flex items-center"><Zap className="mr-2 h-4 w-4 text-primary" />Prediction</h4>
                            <div className="flex flex-col gap-2 bg-background/50 p-4 rounded-lg border items-center">
                               <p className="text-sm text-muted-foreground">The model predicts the next token with the highest probability.</p>
                               <p className="font-mono text-lg text-primary animate-pulse p-4 bg-primary/10 rounded-md">is</p>
                               <p className="text-sm text-muted-foreground mt-2">So the generated sequence starts with: <span className="font-mono text-primary">what is ai is...</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
