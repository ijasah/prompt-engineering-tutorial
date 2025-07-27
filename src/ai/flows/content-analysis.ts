'use server';
/**
 * @fileOverview An AI flow for analyzing content for safety and generating a response.
 *
 * - analyzeContent - A function that analyzes text for harmful content.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeContentInputSchema = z.object({
  text: z.string().describe('The text content to analyze.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  isHarmful: z.boolean().describe('Whether the content is deemed harmful.'),
  reasons: z.array(z.string()).describe('A list of reasons why the content was flagged, if any.'),
  response: z.string().describe('The AI-generated response. If harmful, this will be a safe, canned response.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return contentAnalysisFlow(input);
}

const contentAnalysisFlow = ai.defineFlow(
  {
    name: 'contentAnalysisFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async (input) => {
    // This flow uses Gemini's built-in safety settings.
    // By default, Gemini will not respond to harmful prompts and will throw an error.
    // We can catch this error to determine if the content was blocked.
    try {
        const { text: response } = await ai.generate({
            prompt: `Respond helpfully to the following user input: ${input.text}`,
            config: {
                // Using default safety settings which block harmful content.
            }
        });
        return {
            isHarmful: false,
            reasons: [],
            response: response || "I am ready to help.",
        };
    } catch (e: any) {
        // A BlockedError indicates the safety filter was triggered.
        if (e.constructor.name === 'BlockedError') {
            const reasons = e.issues.map((issue: any) => issue.reason.replace(/HARM_CATEGORY_/, '').replace(/_/g, ' '));
            return {
                isHarmful: true,
                reasons: reasons.length > 0 ? reasons : ['UNSPECIFIED'],
                response:
                  'I cannot process this request because it violates safety policies. Please try again with a different prompt.',
              };
        }
        
        // Handle other potential errors
        console.error("An unexpected error occurred in contentAnalysisFlow:", e);
        return {
            isHarmful: true,
            reasons: ['ANALYSIS_ERROR'],
            response: 'An unexpected error occurred while analyzing the content.',
        };
    }
  }
);

    