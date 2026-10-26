'use client';

import { useState } from 'react';

type GalleryImage = { src: string; alt: string };

export function FluxPhotoGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  };

  return (
    <div className="flux-photo-gallery" role="region" aria-roledescription="carousel" aria-label="FLUX exhibition photo gallery">
      <figure className="flux-photo-gallery-figure" aria-live="polite">
        <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} width="1200" height="1600" />
      </figure>
      <div className="flux-photo-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous exhibition photo">←</button>
        <span aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next exhibition photo">→</button>
      </div>
    </div>
  );
}
