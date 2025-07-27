"use client";
import { ParameterDemo } from "./ParameterDemo";

const focusedSentences = [
    "The king ruled his kingdom with a just hand.",
    "The queen wore a crown of pure gold.",
    "The knight rode a valiant steed into battle.",
];

const diverseSentences = [
    "The king, a connoisseur of cosmic cartography, charted nebulas from his castle observatory.",
    "The queen, a master of temporal mechanics, wove timelines into intricate tapestries.",
    "The knight, astride a bio-luminescent griffin, patrolled the borders of reality.",
];

export const TopKDemo = () => {
    const generateText = (value: number) => {
        if (value < 10) return focusedSentences[Math.floor(Math.random() * focusedSentences.length)];
        if (value > 40) return diverseSentences[Math.floor(Math.random() * diverseSentences.length)];
        return "The castle stood on the hill.";
    };
    
    return (
        <ParameterDemo
            parameter="Top-K"
            description="Restricts the model to the K most likely next tokens. Lower values lead to more focused text, higher values increase diversity."
            initialValue={20}
            min={1}
            max={50}
            step={1}
            generateText={generateText}
        />
    )
}

    