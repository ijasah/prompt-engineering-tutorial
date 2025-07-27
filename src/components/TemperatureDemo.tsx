"use client";
import { ParameterDemo } from "./ParameterDemo";

const creativeSentences = [
    "The cosmos whispered secrets in hues of forgotten dreams.",
    "A symphony of silence echoed through the petrified forest.",
    "Velvet moonlight danced upon the obsidian lake.",
    "Time itself unraveled, a tapestry of shimmering paradoxes.",
    "Quantum foam bubbled with nascent universes.",
];

const predictableSentences = [
    "The sky is blue.",
    "Water is wet.",
    "Fire is hot.",
    "The sun is bright.",
    "Grass is green.",
];

export const TemperatureDemo = () => {
    const generateText = (value: number) => {
        if (value < 0.3) return predictableSentences[Math.floor(Math.random() * predictableSentences.length)];
        if (value > 0.7) return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
        return "The cat sat on the mat.";
    };
    
    return (
        <ParameterDemo
            parameter="Temperature"
            description="Controls creativity. Lower values are more predictable, higher values are more random and creative."
            initialValue={0.5}
            min={0}
            max={1}
            step={0.1}
            generateText={generateText}
        />
    )
}

    