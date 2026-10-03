'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function AboutReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const revealRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = revealRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={revealRef} className={`${className} about-reveal${isVisible ? ' about-reveal--visible' : ''}`}>{children}</div>;
}
