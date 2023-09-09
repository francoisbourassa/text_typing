import React, { useState, useEffect } from 'react';
import './TypingEffect.css';

function TypingEffect() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const sentences = [
    "Bienvenue sur mon site web.",
    "J'espère que vous apprécierez votre visite.",
    "Amusez-vous bien !"
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const currentSentence = sentences[textIndex];
    
    if (!isDeleting && charIndex === currentSentence.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }

    const timeout = setTimeout(() => {
      setCharIndex((prevCharIndex) =>
        isDeleting ? prevCharIndex - 1 : prevCharIndex + 1
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);

  }, [textIndex, charIndex, isDeleting, sentences]);

  return (
    <div className="typing-effect">
      <h1>{sentences[textIndex].substring(0, charIndex)}&nbsp;<span>|</span></h1>
    </div>
  );
}

export default TypingEffect;
