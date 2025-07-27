'use client';
import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // When the 'text' prop changes, reset the display text.
    setDisplayText('');
    
    // Only proceed if there is text to animate.
    if (text) {
      let i = 0;
      // Set up the interval.
      const typingInterval = setInterval(() => {
        // Use the callback form of setState to ensure we have the latest displayText.
        setDisplayText(prev => {
          // If we've reached the end, stop the interval.
          if (i >= text.length -1) {
            clearInterval(typingInterval);
            // Return the full text to ensure completion.
            return text;
          }
          // Otherwise, append the next character.
          i++;
          return text.substring(0, i);
        });
      }, speed);

      // This is the cleanup function. It runs when the component unmounts
      // OR when the dependencies (text, speed) change before the next effect runs.
      // This is crucial for preventing the race condition.
      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [text, speed]);

  return displayText;
}
