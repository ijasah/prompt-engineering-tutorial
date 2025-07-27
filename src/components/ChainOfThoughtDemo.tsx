// src/components/ChainOfThoughtDemo.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Brain, Link, Calculator, BrainCircuit, CheckCircle, Package, Search, Globe, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from './ui/badge';
import { useTypewriter } from '@/hooks/use-typewriter';

type StepType = 'thought' | 'action' | 'observation' | 'final';

interface Step {
  type: StepType;
  content: string;
  tool?: {
    name: string;
    input: string;
  };
  observation?: string;
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
      { type: 'thought', content: 'I need to solve this multi-step problem by breaking it down. First, I will calculate how many apples Sarah gives to her brother.' },
      { type: 'action', content: 'Use the calculator to find 1/3 of 15.', tool: { name: 'Calculator', input: '15 * (1/3)' }, observation: 'Result: 5' },
      { type: 'thought', content: 'Okay, Sarah gives away 5 apples, so she has 15 - 5 = 10 apples left. Next, she buys 8 more, which means she now has 10 + 8 = 18 apples.' },
      { type: 'action', content: 'Finally, she gives half of her 18 apples to her neighbor. I need to calculate half of 18.', tool: { name: 'Calculator', input: '18 / 2' }, observation: 'Result: 9' },
      { type: 'final', content: 'I now know the final answer.' },
    ],
    finalAnswer: "Sarah has 9 apples left.",
  },
  {
    title: "React Component Development",
    problem: "I need to create a React component that displays a list of users with search functionality. What is the best approach?",
    promptToLlm: `Answer the following questions as best you can. You have access to the following tools:

Web Search, Code Snippet Generator

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [Web Search, Code Snippet Generator]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!`,
    steps: [
        { type: 'thought', content: "To create a React user list with search functionality, I need to fetch user data, store it in state, and create another state for the search term. Then I'll filter the displayed users based on the search term." },
        { type: 'action', content: "I'll search for the best practices for fetching data in modern React applications.", tool: { name: 'Web Search', input: 'react data fetching best practices hooks' }, observation: "Using the `useEffect` hook to fetch data on component mount and the `useState` hook to store it is the standard approach." },
        { type: 'action', content: "Now I will generate a code skeleton for the component with state for users and a search term, and an effect for fetching data.", tool: { name: 'Code Snippet Generator', input: 'React functional component with useState and useEffect for fetching a user list' }, observation: "```javascript\nimport React, { useState, useEffect } from 'react';\n\nconst UserList = () => {\n  const [users, setUsers] = useState([]);\n  const [searchTerm, setSearchTerm] = useState('');\n\n  useEffect(() => {\n    fetch('https://api.example.com/users')\n      .then(res => res.json())\n      .then(data => setUsers(data));\n  }, []);\n\n  // ... rendering logic here\n}\n```" },
        { type: 'thought', content: "This code provides a solid foundation. The final component will need an input field to update the `searchTerm` state and logic within the return statement to map over a filtered user list." },
        { type: 'final', content: 'I have a clear plan for the best approach.' }
    ],
    finalAnswer: "The best approach involves using `useState` for managing the user list and search term, and `useEffect` for fetching the data when the component mounts. The UI should then render a filtered list based on the user's search input."
  },
   {
    title: "Complex Calculation",
    problem: "What is the sum of the populations of the top 3 most populous countries in the world?",
    promptToLlm: `Answer the following questions as best you can. You have access to the following tools:

Web Search, Calculator

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [Web Search, Calculator]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!`,
    steps: [
      { type: 'thought', content: 'First, I need to find the top 3 most populous countries and their current populations.' },
      { type: 'action', content: 'Search online for the most populous countries.', tool: { name: 'Web Search', input: 'top 3 most populous countries and their populations 2023' }, observation: '1. India (approx. 1.428 billion), 2. China (approx. 1.425 billion), 3. United States (approx. 339 million).' },
      { type: 'thought', content: 'Now I need to add these populations together. I will use the calculator tool for accuracy.' },
      { type: 'action', content: 'Use the calculator to sum the three populations.', tool: { name: 'Calculator', input: '1428000000 + 1425000000 + 339000000' }, observation: 'Result: 3,192,000,000' },
      { type: 'final', content: 'I now know the final answer.' },
    ],
    finalAnswer: "The total population of the top 3 most populous countries (India, China, and the United States) is approximately 3.192 billion.",
  }
];

const stepConfig = {
    thought: { icon: <Brain />, color: 'border-blue-500/50', label: 'Thought' },
    action: { icon: <Package />, color: 'border-green-500/50', label: 'Action' },
    final: { icon: <CheckCircle />, color: 'border-purple-500/50', label: 'Final Thought' },
    observation: { icon: <Search />, color: 'border-pink-500/50', label: 'Observation'},
};

const getToolIcon = (toolName: string) => {
    switch(toolName) {
        case 'Calculator': return <Calculator className="w-4 h-4 inline-block mr-2" />;
        case 'Web Search': return <Globe className="w-4 h-4 inline-block mr-2" />;
        case 'Code Snippet Generator': return <FileCode className="w-4 h-4 inline-block mr-2" />;
        default: return <Package className="w-4 h-4 inline-block mr-2" />;
    }
}

const StepCard = ({ step, isVisible, index }: { step: Step; isVisible: boolean; index: number }) => {
    const config = stepConfig[step.type];
    const typedContent = useTypewriter(isVisible ? step.content : '', 20);
    const typedObservation = useTypewriter(isVisible ? (step.observation ?? '') : '', 20);

    return (
        <div className={cn(
            "transition-all duration-500 transform",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}>
            <Card className={cn("bg-background/40 border-l-4", config.color)}>
                <CardHeader className='pb-4'>
                    <CardTitle className="text-base flex justify-between items-center">
                        <span className='flex items-center gap-2'>{config.icon} Step {index + 1}</span>
                        <Badge variant="outline" className={cn(config.color, 'bg-muted')}>{config.label}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{typedContent}</p>
                    {step.tool && (
                        <div className="mt-4 font-mono text-xs p-3 bg-black/50 rounded-lg">
                            <div className="flex items-center text-green-400 font-semibold">
                                {getToolIcon(step.tool.name)}
                                Tool Used: {step.tool.name}
                            </div>
                            <div className="mt-2">
                                <p><span className="text-foreground/70">Input:</span> {step.tool.input}</p>
                            </div>
                        </div>
                    )}
                    {step.observation && (
                        <div className="mt-4 border-t pt-4">
                            <div className="flex items-center text-pink-400 font-semibold mb-2">
                                <Search className="w-4 h-4 mr-2" /> Observation
                            </div>
                            <div className='text-muted-foreground whitespace-pre-wrap font-mono text-sm bg-muted/50 p-3 rounded-md border min-h-[2.5rem]'>
                               {typedObservation}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export const ChainOfThoughtDemo = () => {
    const [selectedTab, setSelectedTab] = useState(scenarios[0].title);
    const [simulating, setSimulating] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [visibleStep, setVisibleStep] = useState(-1);

    const activeScenario = useMemo(() => scenarios.find(s => s.title === selectedTab)!, [selectedTab]);
    const finalAnswerText = useTypewriter(completed ? activeScenario.finalAnswer : '', 20);

    useEffect(() => {
        handleReset();
    }, [selectedTab]);

    useEffect(() => {
        if (!simulating) return;

        const interval = setInterval(() => {
            setVisibleStep((prev) => {
                const nextStep = prev + 1;
                if (nextStep < activeScenario.steps.length) {
                    return nextStep;
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
                    Watch AI break down complex problems step-by-step using external tools. This demonstrates the ReAct (Reason + Act) framework.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
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
                             <div className="space-y-4">
                                {activeScenario.steps.map((step, index) => (
                                    <StepCard 
                                        key={index}
                                        step={step}
                                        index={index}
                                        isVisible={visibleStep >= index}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {completed && (
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                                <Check /> Final Answer:
                            </h4>
                            <div className="p-4 bg-background rounded-md border whitespace-pre-wrap font-mono text-sm">
                                {finalAnswerText}
                            </div>
                        </div>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
};
