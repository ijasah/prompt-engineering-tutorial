"use client";
import { ParameterDemo } from "./ParameterDemo";

const focusedSentences = [
    "The king ruled his kingdom with a just and fair hand.",
    "The queen wore a beautiful crown made of pure gold and jewels.",
    "The knight, in shining armor, rode a valiant steed into the heat of battle.",
];

const diverseSentences = [
    "The king, a connoisseur of cosmic cartography, charted distant nebulas from his castle observatory.",
    "The queen, a master of temporal mechanics, wove the threads of timelines into intricate tapestries.",
    "The knight, astride a bio-luminescent griffin, patrolled the shimmering borders of reality itself.",
];

export const TopKDemo = () => {
    const generateText = (value: number) => {
        if (value < 10) return focusedSentences[Math.floor(Math.random() * focusedSentences.length)];
        if (value > 40) return diverseSentences[Math.floor(Math.random() * diverseSentences.length)];
        return "The castle stood majestically on the hill overlooking the valley.";
    };
    
    return (
        <ParameterDemo
            parameter="Top-K"
            description="Restricts the model to the K most likely next tokens. Lower values lead to more focused text, higher values increase diversity."
            initialValue={20}
            min={1}
            max={50}
            step={1}
            prompt="Tell me about a fantasy kingdom."
            generateText={generateText}
        />
    )
}
