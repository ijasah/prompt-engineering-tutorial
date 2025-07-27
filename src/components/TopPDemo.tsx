"use client";
import { ParameterDemo } from "./ParameterDemo";

const coherentSentences = [
    "The chef meticulously prepared a delicious three-course meal for the distinguished guests.",
    "The programmer wrote clean, efficient, and well-documented code for the new software module.",
    "The musician played a beautiful and moving melody on the grand piano.",
];

const creativeSentences = [
    "The chef painted flavors onto the canvas of the plate, conducting a culinary symphony for the senses.",
    "The programmer sculpted elegant algorithms from raw logic, breathing digital life into the machine.",
    "The musician wove silence and sound into an intricate tapestry of pure emotion.",
];

export const TopPDemo = () => {
    const generateText = (value: number) => {
        if (value < 0.3) return coherentSentences[Math.floor(Math.random() * coherentSentences.length)];
        if (value > 0.7) return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
        return "The artist painted a picture of a serene landscape.";
    };
    
    return (
        <ParameterDemo
            parameter="Top-P (Nucleus Sampling)"
            description="Selects from the smallest set of tokens whose cumulative probability exceeds P. Balances coherence and creativity."
            initialValue={0.5}
            min={0.1}
            max={1}
            step={0.1}
            prompt="Describe a professional at work."
            generateText={generateText}
        />
    )
}
