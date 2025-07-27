"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronRight, Calculator, Brain, Link, Code, BrainCircuit, FileCode, CheckCircle, Package, Search } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './ui/code-block';

type StepType = 'thinking' | 'calculation' | 'code' | 'conclusion' | 'planning' | 'search';
interface Step {
  type: StepType;
  content: string;
  tool?: {
    name: string;
    input: string;
    output: string;
  };
}

interface Scenario {
  title: string;
  problem: string;
  steps: Step[];
  finalAnswer: string;
}

const scenarios: Scenario[] = [
  {
    title: "Mathematical Problem",
    problem: "Sarah has 15 apples. She gives 1/3 of them to her brother, then buys 8 more apples. Finally, she gives half of what she has to her neighbor. How many apples does Sarah have left?",
    steps: [
      { type: 'planning', content: 'I need to solve this step-by-step, keeping track of the number of apples Sarah has at each stage.' },
      { type: 'calculation', content: 'First, calculate 1/3 of 15 apples.', tool: { name: 'Calculator', input: '15 * (1/3)', output: '5' } },
      { type: 'thinking', content: 'Sarah gives 5 apples away, so she has 15 - 5 = 10 apples left.' },
      { type: 'thinking', content: 'Next, she buys 8 more apples, so she has 10 + 8 = 18 apples.' },
      { type: 'calculation', content: 'Finally, she gives away half of her 18 apples.', tool: { name: 'Calculator', input: '18 / 2', output: '9' } },
      { type: 'conclusion', content: 'After giving 9 apples to her neighbor, Sarah has 9 apples left.' },
    ],
    finalAnswer: "Sarah has 9 apples left.",
  },
  {
    title: "React Component",
    problem: "I need to create a React component that displays a list of users with search functionality. What's the best approach?",
    steps: [
        { type: 'planning', content: "Okay, I'll outline the steps to create a functional React user list component with search. I'll need state for the user list, the search query, and the filtered list." },
        { type: 'search', content: "First, I'll search for the best way to fetch data in a React component.", tool: { name: "Web Search", input: "react fetch data useEffect hook", output: "Using the `useEffect` hook with an empty dependency array is the standard for fetching initial data."}},
        { type: 'code', content: "I'll start with the basic component structure and state management using `useState` for users, search term, and loading status.", tool: { name: 'Code Snippet', input: 'React Component Skeleton', output: `const [users, setUsers] = useState([]);\nconst [searchTerm, setSearchTerm] = useState('');\nconst [loading, setLoading] = useState(true);`}},
        { type: 'code', content: "Now, I'll implement the `useEffect` hook to fetch user data from a placeholder API when the component mounts.", tool: { name: 'Code Snippet', input: 'Data Fetching', output: `useEffect(() => {\n  fetch('https://jsonplaceholder.typicode.com/users')\n    .then(res => res.json())\n    .then(data => {\n      setUsers(data);\n      setLoading(false);\n    });\n}, []);`}},
        { type: 'thinking', content: "To handle the search, I need to filter the `users` array based on the `searchTerm`. A `useMemo` hook would be efficient here to avoid re-calculating on every render." },
        { type: 'code', content: "I'll create the derived `filteredUsers` state and the search input handler.", tool: { name: 'Code Snippet', input: 'Search Logic', output: `const filteredUsers = users.filter(user =>\n  user.name.toLowerCase().includes(searchTerm.toLowerCase())\n);\n\nconst handleSearch = (e) => setSearchTerm(e.target.value);` }},
        { type: 'conclusion', content: 'Finally, I will render the search input and the list of filtered users. This provides a complete, efficient, and clean component.' }
    ],
    finalAnswer: "The best approach involves using `useState` for managing users and search input, `useEffect` for data fetching on component mount, and rendering the filtered list based on the search term."
  },
  {
    title: "Compound Interest",
    problem: "Calculate the compound interest on $5000 invested for 3 years at 4.5% annual interest, compounded quarterly.",
    steps: [
      { type: 'planning', content: "I'll use the formula A = P(1 + r/n)^(nt). First, I need to identify all the variables: P, r, n, and t." },
      { type: 'thinking', content: 'Given: P=$5000, r=4.5% (which is 0.045), n=4 (quarterly), t=3 years. Now I can substitute these into the formula.' },
      { type: 'calculation', content: "Calculate the rate per period (r/n).", tool: { name: 'Calculator', input: '0.045 / 4', output: '0.01125' } },
      { type: 'calculation', content: "Calculate the total number of compounding periods (nt).", tool: { name: 'Calculator', input: '4 * 3', output: '12' } },
      { type: 'calculation', content: "Now, calculate the main term (1 + r/n)^(nt).", tool: { name: 'Calculator', input: '(1 + 0.01125)^12', output: '1.143208' } },
      { type: 'calculation', content: "Finally, calculate the total amount A = P * (result from previous step).", tool: { name: 'Calculator', input: '5000 * 1.143208', output: '5716.04' } },
      { type: 'conclusion', content: 'The total amount is $5716.04. The compound interest is the total amount minus the principal, which is $5716.04 - $5000 = $716.04.' },
    ],
    finalAnswer: "The compound interest is $716.04.",
  },
];

const stepConfig = {
    thinking: { icon: <Brain />, color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
    planning: { icon: <FileCode />, color: 'text-cyan-400', bgColor: 'bg-cyan-900/20' },
    calculation: { icon: <Calculator />, color: 'text-green-400', bgColor: 'bg-green-900/20' },
    code: { icon: <Code />, color: 'text-orange-400', bgColor: 'bg-orange-900/20' },
    search: { icon: <Search />, color: 'text-pink-400', bgColor: 'bg-pink-900/20' },
    conclusion: { icon: <CheckCircle />, color: 'text-purple-400', bgColor: 'bg-purple-900/20' },
  };

const ChainOfThoughtStep = ({ step, index, isVisible }: { step: Step; index: number; isVisible: boolean }) => {
    const config = stepConfig[step.type];
    const typewriterContent = useTypewriter(isVisible ? step.content : '', 20);

    return (
        <div className={cn(
            "p-4 rounded-lg border-l-4 transition-all duration-500 transform",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            config.bgColor,
            `border-${config.color.replace('text-', '')}`
        )}>
            <div className={`flex items-center gap-3 font-semibold ${config.color}`}>
                <div className="flex items-center gap-2">
                    {config.icon}
                    <span>Step {index + 1}</span>
                </div>
                <span className="text-xs px-2 py-0.5 bg-foreground/10 rounded-full capitalize">{step.type}</span>
            </div>
            <p className="mt-2 text-muted-foreground whitespace-pre-wrap">{typewriterContent}</p>
            {step.tool && isVisible && (
                <div className="mt-3 pt-3 border-t border-foreground/10">
                    <div className="font-mono text-xs p-3 bg-black/30 rounded-md">
                        <div className="flex items-center gap-2 text-accent/80 font-semibold">
                            <ChevronRight size={14}/> Tool: {step.tool.name}
                        </div>
                        <div className="mt-2 pl-4 border-l-2 border-accent/20">
                            <p><span className="text-foreground/70">Input:</span> {step.tool.input}</p>
                            <p><span className="text-foreground/70">Output:</span> {step.tool.output}</p>
                        </div>
                    </div>
                </div>
            )}
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
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
                        {scenarios.map(s => (
                            <TabsTrigger key={s.title} value={s.title}>{s.title}</TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <div className="mt-4 p-4 bg-background/50 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Problem:</h4>
                        <p className="text-muted-foreground">{activeScenario.problem}</p>
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
                                    <ChainOfThoughtStep 
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
                                {typewriterAnswer}
                            </div>
                        </div>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
};
