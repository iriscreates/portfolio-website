'use client';

import { useState } from 'react';

type CarouselImage = { src: string; alt: string };

export function SolutionImageCarousel({ images, label }: { images: CarouselImage[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <div className="solution-screen-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="solution-screen-carousel-stage" aria-live="polite">
        <figure className="solution-screen-carousel-slide" key={activeImage.src}>
          <img src={activeImage.src} alt={activeImage.alt} width="1200" height="800" />
          <figcaption className="solution-screen-carousel-sr-only">Screen {activeIndex + 1} of {images.length}</figcaption>
        </figure>
      </div>
      <div className="solution-screen-carousel-controls">
        <button type="button" onClick={showPrevious} aria-label="Previous redesigned screen">‹</button>
        <span aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button type="button" onClick={showNext} aria-label="Next redesigned screen">›</button>
      </div>
    </div>
  );
}
