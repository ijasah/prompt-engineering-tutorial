'use server';

/**
 * @fileOverview An AI-powered tool that refines user prompts to follow prompt engineering best practices.
 *
 * - refinePrompt - A function that refines the prompt.
 * - RefinePromptInput - The input type for the refinePrompt function.
 * - RefinePromptOutput - The return type for the refinePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefinePromptInputSchema = z.object({
  initialPrompt: z.string().describe('The initial prompt to be refined.'),
});
export type RefinePromptInput = z.infer<typeof RefinePromptInputSchema>;

const RefinePromptOutputSchema = z.object({
  refinedPrompt: z.string().describe('The refined prompt following prompt engineering best practices.'),
  explanation: z.string().describe('An explanation of the refinements made to the initial prompt.'),
});
export type RefinePromptOutput = z.infer<typeof RefinePromptOutputSchema>;

export async function refinePrompt(input: RefinePromptInput): Promise<RefinePromptOutput> {
  return refinePromptFlow(input);
}

const refinePromptPrompt = ai.definePrompt({
  name: 'refinePromptPrompt',
  input: {schema: RefinePromptInputSchema},
  output: {schema: RefinePromptOutputSchema},
  prompt: `You are an AI prompt engineer tasked with refining user-provided prompts to adhere to prompt engineering best practices.

  Your goal is to improve the clarity, specificity, and effectiveness of the prompt so that it yields higher-quality outputs from language models.

  Here are some prompt engineering best practices to consider:
  * Be clear and specific about the desired outcome.
  * Provide context to help the model understand the task.
  * Use a clear output indicator to guide the model's response format.
  * Consider using few-shot prompting to provide examples.
  * Break down complex tasks into smaller, more manageable steps (chain-of-thought prompting).

  Analyze the following initial prompt and provide a refined prompt along with a detailed explanation of the changes you made.

  Initial Prompt: {{{initialPrompt}}}
  `,
});

const refinePromptFlow = ai.defineFlow(
  {
    name: 'refinePromptFlow',
    inputSchema: RefinePromptInputSchema,
    outputSchema: RefinePromptOutputSchema,
  },
  async input => {
    const {output} = await refinePromptPrompt(input);
    return output!;
  }
);
