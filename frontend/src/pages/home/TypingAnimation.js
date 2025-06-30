import React, { useState, useEffect } from "react";
import { AnimatedText, TypingPipe } from "./WelcomePage.styles";
const words = ["BE..", "CONNECT WITH YOUR FAMILY..", "CREATE YOUR OWN FAMILY TREE..", "DISCOVER YOUR ANCESTORS.."]; 

const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showPipe, setShowPipe] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (isTyping) {
      // Typing logic: add one letter at a time
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);  // Delay between typing each letter (100ms)
      } else {
        // Show the typing pipe and switch to erasing after typing is complete
        setShowPipe(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
          setShowPipe(false);  // Hide the pipe before erasing
        }, 5000);  // Delay after typing is complete (5 seconds)
      }
    } else {
      // Erasing logic: remove one letter at a time
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, 100);  // Delay between erasing each letter (100ms)
      } else {
        // Switch to typing the next word after erasing is complete
        timeout = setTimeout(() => {
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setIsTyping(true);
        }, 1000);  // Delay after erasing is complete (1 second)
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentWordIndex]);

  return (
    <AnimatedText>
      {displayText}
      {showPipe && <TypingPipe>|</TypingPipe>}
    </AnimatedText>
  );
};

export default TypingAnimation;