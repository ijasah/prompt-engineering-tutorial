// src/components/ChainOfThoughtDemo.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronRight, Calculator, Brain, Link, Code, BrainCircuit, FileCode, CheckCircle, Package, Search } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type StepType = 'thought' | 'action' | 'observation' | 'final';

interface Step {
  type: StepType;
  content: string;
  tool?: {
    name: string;
    input: string;
  };
}

interface Scenario {
  title: string;
  problem: string;
  promptToLlm: string;
  steps: Step[];
  finalAnswer: string;
}

const scenarios: Scenario[] = [
  {
    title: "Mathematical Problem",
    problem: "Sarah has 15 apples. She gives 1/3 of them to her brother, then buys 8 more apples. Finally, she gives half of what she has to her neighbor. How many apples does Sarah have left?",
    promptToLlm: `Answer the following questions as best you can. You have access to the following tools:

Calculator

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [Calculator]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!`,
    steps: [
      { type: 'thought', content: 'I need to solve this multi-step problem by breaking it down. First, calculate how many apples Sarah gives to her brother.' },
      { type: 'action', content: 'Use the calculator to find 1/3 of 15.', tool: { name: 'Calculator', input: '15 * (1/3)' } },
      { type: 'observation', content: '5' },
      { type: 'thought', content: 'Okay, so 15 - 5 = 10 apples remaining. Now, she buys 8 more. 10 + 8 = 18 apples.'},
      { type: 'thought', content: 'Finally, she gives half away. I need to calculate half of 18.'},
      { type: 'action', content: 'Use the calculator to find 18 / 2.', tool: { name: 'Calculator', input: '18 / 2' } },
      { type: 'observation', content: '9' },
      { type: 'final', content: 'I now know the final answer.' },
    ],
    finalAnswer: "Sarah has 9 apples left.",
  },
  {
    title: "React Component Development",
    problem: "I need to create a React component that displays a list of users with search functionality. What's the best approach?",
    promptToLlm: `Answer the following questions as best you can. You have access to the following tools:

Web Search, Code Snippet

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [Web Search, Code Snippet]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!`,
    steps: [
        { type: 'thought', content: "To create a React user list with search, I need to fetch user data, store it in state, and have another state for the search term. Then I'll filter the users based on the search term." },
        { type: 'action', content: "I'll search for the best practice for data fetching in React.", tool: { name: 'Web Search', input: 'react data fetching best practices hooks' } },
        { type: 'observation', content: "Using `useEffect` to fetch data on component mount and `useState` to store it is the standard approach." },
        { type: 'action', content: "Now I need a code skeleton for the component.", tool: { name: 'Code Snippet', input: 'React component with useState and useEffect for data fetching' } },
        { type: 'observation', content: "```javascript\nconst [users, setUsers] = useState([]);\nconst [searchTerm, setSearchTerm] = useState('');\n\nuseEffect(() => {\n  fetch('https://api.example.com/users')\n    .then(res => res.json())\n    .then(data => setUsers(data));\n}, []);\n```" },
        { type: 'thought', content: "This is a good starting point. The final component will need an input field for search and a mapping function to render the filtered users. The filtering logic can be done in the render method." },
        { type: 'final', content: 'I now know the final answer.' }
    ],
    finalAnswer: "The best approach involves using `useState` for managing users and search input, `useEffect` for data fetching on component mount, and rendering the filtered list based on the search term."
  },
];

const stepConfig = {
    thought: { icon: <Brain />, color: 'text-blue-400', label: 'Thought' },
    action: { icon: <Package />, color: 'text-green-400', label: 'Action' },
    observation: { icon: <Search />, color: 'text-pink-400', label: 'Observation' },
    final: { icon: <CheckCircle />, color: 'text-purple-400', label: 'Thought' },
  };

const ChainOfThoughtStep = ({ step, isVisible }: { step: Step; isVisible: boolean }) => {
    const config = stepConfig[step.type];
    const typewriterContent = useTypewriter(isVisible ? step.content : '', 20);

    return (
        <div className={cn(
            "transition-all duration-500 transform",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}>
             <p className={`font-semibold ${config.color} mb-1`}>{config.label}:</p>
             <div className='pl-4 border-l-2 border-border'>
                <p className="text-muted-foreground whitespace-pre-wrap">{typewriterContent}</p>
                {step.tool && isVisible && (
                    <div className="mt-2 font-mono text-xs p-2 bg-black/30 rounded-md">
                        <p><span className="text-foreground/70">Tool:</span> {step.tool.name}</p>
                        <p><span className="text-foreground/70">Input:</span> {step.tool.input}</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export const ChainOfThoughtDemo = () => {
    const [selectedTab, setSelectedTab] = useState(scenarios[0].title);
    const [simulating, setSimulating] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [visibleStep, setVisibleStep] = useState(-1);

    const activeScenario = useMemo(() => scenarios.find(s => s.title === selectedTab)!, [selectedTab]);
    const typewriterAnswer = useTypewriter(completed ? activeScenario.finalAnswer : '', 30);

    useEffect(() => {
        handleReset();
    }, [selectedTab]);

    useEffect(() => {
        if (!simulating) return;

        const interval = setInterval(() => {
            setVisibleStep((prev) => {
                if (prev < activeScenario.steps.length - 1) {
                    return prev + 1;
                }
                clearInterval(interval);
                setSimulating(false);
                setCompleted(true);
                return prev;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, [simulating, activeScenario]);

    const handleStart = () => {
        setSimulating(true);
        setCompleted(false);
        setVisibleStep(0);
    };

    const handleReset = () => {
        setSimulating(false);
        setCompleted(false);
        setVisibleStep(-1);
    };

    return (
        <Card className="bg-muted/20 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Link className="text-primary" />
                    Chain-of-Thought with Tool Calling
                </CardTitle>
                <CardDescription>
                    Watch AI break down complex problems step-by-step using external tools.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto">
                        {scenarios.map(s => (
                            <TabsTrigger key={s.title} value={s.title}>{s.title}</TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <div className="mt-4 p-4 bg-background/50 rounded-lg space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Problem:</h4>
                            <p className="text-muted-foreground">{activeScenario.problem}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground mb-2">Prompt to LLM (ReAct Framework):</h4>
                            <p className="text-muted-foreground font-mono text-xs bg-muted p-3 rounded-md border whitespace-pre-wrap">{activeScenario.promptToLlm}</p>
                        </div>
                    </div>

                    <div className="flex justify-center my-6">
                        <Button
                            onClick={completed ? handleReset : handleStart}
                            disabled={simulating}
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            {completed ? 'Reset Simulation' : (simulating ? (
                                <>
                                    <BrainCircuit className="mr-2 animate-pulse" />
                                    Simulating...
                                </>
                            ) : (
                                <>
                                    <BrainCircuit className="mr-2" />
                                    Start Chain-of-Thought
                                </>
                            ))}
                        </Button>
                    </div>

                    {(simulating || completed) && (
                        <div>
                            <h4 className="font-semibold mb-4 text-accent flex items-center gap-2">
                                <Link /> Reasoning Chain:
                            </h4>
                             <div className="p-4 rounded-lg bg-background/50 border space-y-4">
                                <p className="font-semibold text-foreground">Question: <span className="text-muted-foreground font-normal">{activeScenario.problem}</span></p>
                                <div className='space-y-4'>
                                    {activeScenario.steps.map((step, index) => (
                                        <ChainOfThoughtStep 
                                            key={index}
                                            step={step}
                                            isVisible={visibleStep >= index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {completed && (
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                                <Check /> Final Answer:
                            </h4>
                            <div className="p-4 bg-background rounded-md border whitespace-pre-wrap font-mono text-sm">
                                {typewriterAnswer}
                            </div>
                        </div>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
};
