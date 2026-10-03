'use client';

import { useEffect, useState } from 'react';

type HobbyImage = {
  src: string;
  alt: string;
  caption?: string;
};

type HobbyCategory = {
  id: string;
  title: string;
  images: HobbyImage[];
};

const hobbyCategories: HobbyCategory[] = [
  {
    id: 'creative-hobbies',
    title: 'Creative hobbies',
    images: [
      {
        src: '/hobbies/creative-hobbies-fan-expo.jpg',
        alt: 'Iris Yu behind a colorful handmade goods table at Fan Expo.',
        caption: 'Yearly Fan Expo artist alley tabling',
      },
      {
        src: '/hobbies/creative-hobbies-fan-expo-2.jpg',
        alt: 'Handmade plush toys and frog mystery boxes displayed at Fan Expo.',
        caption: 'Crochet mystery frog boxes',
      },
      {
        src: '/hobbies/creative-hobbies-pottery.jpg',
        alt: 'A clay pottery project in progress on a worktable.',
        caption: 'Pottery picture frame',
      },
    ],
  },
  {
    id: 'gaming',
    title: 'Gaming',
    images: [
      {
        src: '/hobbies/gaming-enters-tapped-production.jpg',
        alt: 'A small video production setup with cameras, lights, and people at a table.',
        caption: 'Magic: The Gathering video production',
      },
      {
        src: '/hobbies/gaming-flux.jpg',
        alt: 'Visitors exploring an interactive OneDeck exhibition installation.',
        caption: 'Year-end show at George Brown Polytechnic thesis board game project',
      },
      {
        src: '/hobbies/gaming-stardew-concert.jpg',
        alt: 'A live orchestra performing beneath a Stardew Valley concert screen.',
        caption: 'Stardew Valley orchestra concert',
      },
      {
        src: '/hobbies/gaming-undertale-concert.jpg',
        alt: 'An Undertale concert stage lit with colorful heart-shaped lights.',
        caption: 'Undertale orchestra concert',
      },
    ],
  },
  {
    id: 'travel-film',
    title: 'Travel and film',
    images: [
      {
        src: '/hobbies/travel-film-palm-trees.jpg',
        alt: 'Film photograph of palm trees and a bright resort sky.',
        caption: 'Dominican Republic, shot with a Kodak M35 film camera',
      },
      {
        src: '/hobbies/travel-film-city.jpg',
        alt: 'Film photograph of a colorful city block with street murals and signs.',
        caption: 'NYC Manhattan Chinatown, shot with a Kodak M35 film camera',
      },
      {
        src: '/hobbies/travel-film-library.jpg',
        alt: 'Film photograph of people walking toward a public library.',
        caption: 'NYC Brooklyn Public Library, shot with a Kodak M35 film camera',
      },
      {
        src: '/hobbies/travel-film-vancouver.jpg',
        alt: 'A forest bridge and rocky mountainside in Vancouver.',
        caption: 'Vancouver, BC',
      },
    ],
  },
];

export function AboutHobbies() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = hobbyCategories.find((category) => category.id === activeCategoryId) ?? null;

  useEffect(() => {
    if (!activeCategory) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCategoryId(null);
      if (event.key === 'ArrowLeft' && activeCategory.images.length > 1) {
        setActiveIndex((index) => (index - 1 + activeCategory.images.length) % activeCategory.images.length);
      }
      if (event.key === 'ArrowRight' && activeCategory.images.length > 1) {
        setActiveIndex((index) => (index + 1) % activeCategory.images.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategory]);

  const openCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveIndex(0);
  };

  const moveCarousel = (direction: 1 | -1) => {
    if (!activeCategory || activeCategory.images.length < 2) return;
    setActiveIndex((index) => (index + direction + activeCategory.images.length) % activeCategory.images.length);
  };

  return (
    <>
      <div className="about-hobbies-copy">
        <h2 id="about-hobbies-title">Things I make outside of work.</h2>
      </div>

      <div className="about-hobbies-grid">
        {hobbyCategories.map((category) => (
          <button
            className="about-hobby-card"
            key={category.id}
            type="button"
            onClick={() => openCategory(category.id)}
            aria-label={`Open ${category.title}`}
          >
            <span className="about-hobby-card-visual" aria-hidden="true">
                {category.images.length > 0 ? (
                  <span className="about-hobby-card-fan">
                    {category.images.slice(0, 3).map((image) => (
                      <img key={image.src} src={image.src} alt="" loading="eager" decoding="async" />
                    ))}
                  </span>
                ) : (
                  <span>Images coming soon</span>
                )}
            </span>
            <span className="about-hobby-card-copy">
              <strong>{category.title}</strong>
            </span>
          </button>
        ))}
      </div>

      {activeCategory && (
        <div
          className="about-hobby-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-hobby-dialog-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveCategoryId(null);
          }}
        >
          <div className="about-hobby-dialog-panel">
            <div className="about-hobby-dialog-header">
              <div>
                <p className="about-card-eyebrow">Personal interests</p>
                <h3 id="about-hobby-dialog-title">{activeCategory.title}</h3>
              </div>
              <button className="about-hobby-dialog-close" type="button" onClick={() => setActiveCategoryId(null)}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            {activeCategory.images.length > 0 ? (
              <div className="about-hobby-carousel">
                <div className="about-hobby-carousel-frame">
                  <img src={activeCategory.images[activeIndex].src} alt={activeCategory.images[activeIndex].alt} />
                  <button className="about-hobby-carousel-arrow about-hobby-carousel-arrow-prev" type="button" onClick={() => moveCarousel(-1)} aria-label="Previous image"><span aria-hidden="true">←</span></button>
                  <button className="about-hobby-carousel-arrow about-hobby-carousel-arrow-next" type="button" onClick={() => moveCarousel(1)} aria-label="Next image"><span aria-hidden="true">→</span></button>
                </div>
                {activeCategory.images[activeIndex].caption && (
                  <p className="about-hobby-carousel-caption">{activeCategory.images[activeIndex].caption}</p>
                )}
                <span className="about-hobby-carousel-index">{activeIndex + 1} / {activeCategory.images.length}</span>
              </div>
            ) : (
              <div className="about-hobby-dialog-placeholder">
                <span>Photos coming soon</span>
                <p>This gallery is ready for images and one-line captions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
