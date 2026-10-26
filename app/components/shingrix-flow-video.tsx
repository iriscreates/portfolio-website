'use client';

import { useEffect, useRef } from 'react';

export function ShingrixFlowVideo({ videoSrc, poster, alt }: { videoSrc: string; poster: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };

    syncPlayback();
    motionPreference.addEventListener?.('change', syncPlayback);
    return () => motionPreference.removeEventListener?.('change', syncPlayback);
  }, []);

  return (
    <div className="shingrix-flow-image" role="group" aria-label="SHINGRIX redesign flow video">
      <video ref={videoRef} aria-label={alt} loop muted playsInline preload="metadata" poster={poster}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
