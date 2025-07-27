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
    "The sky is blue during a clear day.",
    "Water is a liquid at room temperature.",
    "The sun provides light and warmth to the Earth.",
    "Grass is a common type of plant.",
];

export const TemperatureDemo = () => {
    const generateText = (value: number) => {
        if (value < 0.3) return predictableSentences[Math.floor(Math.random() * predictableSentences.length)];
        if (value > 0.7) return creativeSentences[Math.floor(Math.random() * creativeSentences.length)];
        return "The cat sat comfortably on the mat near the fireplace.";
    };
    
    return (
        <ParameterDemo
            parameter="Temperature"
            description="Controls creativity. Lower values are more predictable, higher values are more random and creative."
            initialValue={0.5}
            min={0}
            max={1}
            step={0.1}
            prompt="Write a simple sentence about the world."
            generateText={generateText}
        />
    )
}
