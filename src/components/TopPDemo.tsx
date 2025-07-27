"use client";
import { ParameterDemo } from "./ParameterDemo";

const coherentSentences = [
    "The chef prepared a delicious meal for the guests.",
    "The programmer wrote clean and efficient code.",
    "The musician played a beautiful melody on the piano.",
];

const creativeSentences = [
    "The chef painted flavors onto the canvas of the plate, a culinary masterpiece.",
    "The programmer sculpted algorithms from raw logic, breathing life into the machine.",
    "The musician wove silence and sound into a tapestry of emotion.",
];

export const TopPDemo = () => {
    const generateText = (value: number) => {
        if (value < 0.3) return coherentSentences[Math.floor(Math.random() * coherentSentences.length)];
        if (value > 0.7) return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
        return "The artist painted a picture.";
    };
    
    return (
        <ParameterDemo
            parameter="Top-P (Nucleus Sampling)"
            description="Selects from the smallest set of tokens whose cumulative probability exceeds P. Balances coherence and creativity."
            initialValue={0.5}
            min={0.1}
            max={1}
            step={0.1}
            generateText={generateText}
        />
    )
}

    