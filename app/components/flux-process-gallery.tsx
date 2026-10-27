'use client';

import { useEffect, useRef, useState } from 'react';

type ProcessImage = { src: string; alt: string; title: string; width: number; height: number };

export function FluxProcessGallery({ images }: { images: ProcessImage[] }) {
  const [activeImage, setActiveImage] = useState<ProcessImage | null>(null);
  const [canEnlarge, setCanEnlarge] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 701px)');
    const updateViewport = () => setCanEnlarge(desktopQuery.matches);
    updateViewport();
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', updateViewport);
    else desktopQuery.addListener(updateViewport);

    return () => {
      if (desktopQuery.removeEventListener) desktopQuery.removeEventListener('change', updateViewport);
      else desktopQuery.removeListener(updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeImage]);

  return (
    <>
      <div className="flux-process-gallery">
        {images.map((image, index) => (
          <figure className={index === 2 ? 'flux-process-gallery-wide' : index === 1 ? 'flux-process-gallery-crop-bottom' : undefined} key={image.src}>
            {canEnlarge ? (
              <button
                className="flux-process-image-trigger"
                type="button"
                style={{ aspectRatio: index === 1 ? `${images[0].width} / ${images[0].height}` : `${image.width} / ${image.height}` }}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActiveImage(image);
                }}
                aria-label={`Enlarge ${image.title}`}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                <span aria-hidden="true">Enlarge</span>
              </button>
            ) : (
              <div
                className="flux-process-image-trigger flux-process-image-static"
                style={{ aspectRatio: index === 1 ? `${images[0].width} / ${images[0].height}` : `${image.width} / ${image.height}` }}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
              </div>
            )}
          </figure>
        ))}
      </div>

      {activeImage && (
        <div
          className="flux-process-viewer-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <section className="flux-process-viewer" role="dialog" aria-modal="true" aria-labelledby="flux-process-viewer-title">
            <header className="flux-process-viewer-header">
              <h3 id="flux-process-viewer-title">{activeImage.title}</h3>
              <button ref={closeButtonRef} type="button" onClick={() => setActiveImage(null)} aria-label="Close enlarged image">
                Close <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="flux-process-viewer-content" tabIndex={0}>
              <img src={activeImage.src} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
