// src/app/actions.ts
'use server';

import { refinePrompt, type RefinePromptInput, type RefinePromptOutput } from '@/ai/flows/smart-prompt-refiner';
import { z } from 'zod';

const RefinePromptActionSchema = z.object({
  initialPrompt: z.string().min(10, { message: "Prompt must be at least 10 characters."}).max(500, { message: "Prompt cannot exceed 500 characters."}),
});

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: RefinePromptOutput;
};

export async function refinePromptAction(
    prevState: FormState,
    data: FormData,
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = RefinePromptActionSchema.safeParse(formData);

    if (!parsed.success) {
        const issues = parsed.error.issues.map((issue) => issue.message);
        return {
            message: "Invalid form data.",
            issues,
        };
    }
    
    try {
        const result = await refinePrompt({ initialPrompt: parsed.data.initialPrompt });
        return { message: "Prompt refined successfully.", data: result };
    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred while refining the prompt." };
    }
}
