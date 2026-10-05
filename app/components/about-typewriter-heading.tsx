'use client';

import { useEffect, useState } from 'react';

const TYPE_SPEED = 48;

export function AboutTypewriterHeading({ text, id }: { text: string; id: string }) {
  const [visibleText, setVisibleText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) {
      setVisibleText(text);
      setIsComplete(true);
      return;
    }

    let characterIndex = 0;
    const timer = window.setInterval(() => {
      characterIndex += 1;
      setVisibleText(text.slice(0, characterIndex));
      if (characterIndex >= text.length) {
        window.clearInterval(timer);
        setIsComplete(true);
      }
    }, TYPE_SPEED);

    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <h2 id={id} className={`about-typewriter-heading${isComplete ? ' about-typewriter-heading--complete' : ''}`} aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
    </h2>
  );
}
