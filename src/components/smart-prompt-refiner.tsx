'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { refinePromptAction, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2, BrainCircuit, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTypewriter } from '@/hooks/use-typewriter';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <span className="animate-spin mr-2">
            <Wand2 />
          </span>
          Refining...
        </>
      ) : (
        <>
          <Wand2 className="mr-2" />
          Refine Prompt
        </>
      )}
    </Button>
  );
}

export function SmartPromptRefiner() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useFormState(refinePromptAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Prompt refined successfully.') {
        if(state.issues && state.issues.length > 0) {
            toast({
                variant: 'destructive',
                title: 'Validation Error',
                description: state.issues.join('\n'),
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'An Error Occurred',
                description: state.message,
            });
        }
    }
    if (state.message === 'Prompt refined successfully.') {
        formRef.current?.reset();
    }
  }, [state, toast]);

  const refinedPromptText = useTypewriter(state.data?.refinedPrompt ?? '', 20);
  const explanationText = useTypewriter(state.data?.explanation ?? '', 20);

  return (
    <section id="smart-refiner" className="w-full">
      <Card className="bg-gradient-to-br from-card to-indigo-950/20 border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-primary" />
            Smart Prompt Refiner
          </CardTitle>
          <CardDescription>
            Input a draft prompt and our AI will suggest improvements based on best practices.
          </CardDescription>
        </CardHeader>
        <form action={formAction} ref={formRef}>
          <CardContent>
            <div className="grid w-full gap-2">
              <Label htmlFor="initialPrompt" className="sr-only">
                Your Prompt
              </Label>
              <Textarea
                id="initialPrompt"
                name="initialPrompt"
                placeholder="e.g., tell me about dogs"
                className="min-h-[100px] text-base"
                required
              />
               <p className="text-sm text-muted-foreground">
                Enter a prompt (10-500 characters) to see how it can be improved.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-destructive">
                {state.issues?.map((issue, i) => <p key={i}>{issue}</p>)}
            </div>
            <SubmitButton />
          </CardFooter>
        </form>
        {state.data && (
          <div className="p-6 pt-0 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-3 text-primary">
                <BrainCircuit className="w-6 h-6" />
                Refined Prompt
              </h3>
              <p className="p-4 bg-muted rounded-md border font-mono text-sm whitespace-pre-wrap">{refinedPromptText}</p>
            </div>
             <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-3 text-primary">
                <Lightbulb className="w-6 h-6" />
                Explanation
              </h3>
              <p className="p-4 bg-muted rounded-md border text-sm whitespace-pre-wrap">{explanationText}</p>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
