'use client';

import { useEffect, useRef } from 'react';

type AutoplayMutedVideoProps = {
  src: string;
  title: string;
  poster?: string;
};

export function AutoplayMutedVideo({ src, title, poster }: AutoplayMutedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isInView = !('IntersectionObserver' in window);

    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden || !isInView) {
        video.pause();
        return;
      }

      video.muted = true;
      void video.play().catch(() => {});
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          syncPlayback();
        }, { threshold: 0.15 })
      : null;

    observer?.observe(video);
    video.addEventListener('canplay', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener?.('change', syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener?.('change', syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label={`${title} video`}
      autoPlay
      defaultMuted
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      width="1280"
      height="720"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  );
}
