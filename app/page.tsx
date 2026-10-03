'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AboutReveal } from './components/about-reveal';
import { CopyEmailLink } from './components/copy-email-link';

type Audience = 'designer' | 'strategist';

const audienceCopy = {
  designer: {
    role: 'Product designer',
    introDescription: 'Multi media experience designer and content strategist',
    workTitle: 'Selected work',
    workIntro: 'Digital products, systems, and experiences shaped with curiosity.',
  },
  strategist: {
    role: 'Marketing strategist',
    introDescription: 'I turn audience insights and social listening into thoughtful campaign ideas, content, and media plans.',
    workTitle: 'Campaigns & content',
    workIntro: 'Social listening, cultural research, and quick-turnaround content for Canadian audiences.',
  },
} satisfies Record<Audience, Record<string, string>>;

function AudienceSwitch({ audience, onChange }: { audience: Audience; onChange: (next: Audience) => void }) {
  const isStrategist = audience === 'strategist';

  return (
    <div className="audience-switcher" aria-label="Choose a portfolio view">
      <button
        className={`audience-switch${isStrategist ? ' audience-switch-on' : ''}`}
        type="button"
        role="switch"
        aria-checked={isStrategist}
        aria-label={`Switch to ${isStrategist ? 'designer' : 'marketing strategist'} view`}
        onClick={() => onChange(isStrategist ? 'designer' : 'strategist')}
      >
        <span className="audience-switch-track" aria-hidden="true">
          <span className="audience-option audience-option-designer">Designer</span>
          <span className="audience-option audience-option-strategist">Marketing strategist</span>
          <span className="audience-switch-thumb" />
        </span>
      </button>
    </div>
  );
}

const strategyHighlights = [
  {
    label: 'Audience reach',
    value: '+1M',
    detail: 'views across social platforms',
    supporting: 'Strategy informed by social listening and trend research.',
    className: 'highlight-reach',
  },
  {
    label: 'Canadian brands',
    marks: [
      { mark: 'D', name: 'Dove' },
      { mark: 'HS', name: 'HomeSense' },
      { mark: 'M', name: 'Marshalls' },
      { mark: 'W', name: 'Winners' },
      { mark: 'H', name: "Hellmann's" },
    ],
    className: 'highlight-brands',
  },
  {
    label: 'Social platforms',
    marks: [
      { icon: '/icons/marketing/tiktok.svg?v=2', name: 'TikTok' },
      { icon: '/icons/marketing/facebook.svg?v=2', name: 'Facebook' },
      { icon: '/icons/marketing/instagram.svg?v=2', name: 'Instagram' },
      { icon: '/icons/marketing/pinterest.svg?v=2', name: 'Pinterest' },
    ],
    className: 'highlight-platforms',
  },
  {
    label: 'Creative toolkit',
    marks: [
      { icon: '/icons/marketing/after-effects.svg?v=2', name: 'After Effects' },
      { icon: '/icons/marketing/premiere-pro.svg?v=2', name: 'Premiere Pro' },
      { icon: '/icons/marketing/illustrator.svg?v=2', name: 'Illustrator' },
      { icon: '/icons/marketing/photoshop.svg?v=2', name: 'Photoshop' },
      { icon: '/icons/marketing/capcut.svg?v=2', name: 'CapCut' },
      { icon: '/icons/marketing/figma.svg?v=2', name: 'Figma' },
    ],
    className: 'highlight-tools',
  },
] as const;

// Held for a future, cleared case study. This information is intentionally not rendered in the portfolio view for now.
const archivedMarketingCaseStudies = {
  largeTechCompany: {
    name: 'Large tech company',
    kindLabel: 'Campaign case study',
    details: [
      'Role: collaborated with Edelman Canada\'s US and Canadian Design teams.',
      'Proposal: explored ways to activate mobile devices through Korean culture.',
      'Research: tracked social trends in Korean media and what was popular overseas, including Canada.',
      'Consumer insight: explored how people were using the client\'s phones and why they chose them over competitors such as iPhone.',
      'Deliverable: contributed to a slide deck on Korean Gen Z trends, including K-beauty, K-pop, K-fashion, concert culture, and more.',
      'Scope: contributed to one of three proposals.',
      'Proposal outcome details: coming soon.',
    ],
  },
  beautyBrandArtistCulture: {
    name: 'Beauty brand — artist culture',
    kindLabel: 'Brand campaign pop-up experience',
    details: [
      'Campaign: validated a pop-up proposal for a Toronto concert centered on the artist’s fashion and audience culture.',
      'Brand angle: explored how a beauty brand’s products could be featured alongside the artist’s playful concert outfits.',
      'Collaboration: worked with the design team to assess the proposal and its cultural relevance.',
      'Research: tracked social buzz, trends, and conversation around the artist’s signature looks to see whether they were still generating attention.',
      'Insight: fans wore similar costumes to concerts, news outlets continued covering the artist’s clothing, and audiences remained excited around the world.',
      'Deliverables: created slide decks showing the research around the artist and their concert outfits.',
      'Presentation: presented the findings to the design team, where they were then discussed with the client.',
      'Outcome: the project was not formalized because of legal considerations.',
    ],
  },
} as const;

function StrategyHighlights() {
  return (
    <section className="strategy-highlights" aria-label="Marketing strategist highlights">
      {strategyHighlights.map((highlight) => (
        <article className={`strategy-highlight ${highlight.className}`} key={highlight.label}>
          <h2>{highlight.label}</h2>
          {'value' in highlight ? (
            <div className="highlight-reach-value">
              <strong>{highlight.value}</strong>
              <span>{highlight.detail}</span>
              {'supporting' in highlight && <small>{highlight.supporting}</small>}
            </div>
          ) : (
            <div className="highlight-marks">
              {highlight.marks.map((item) => (
                <span className="highlight-mark" key={item.name}>
                  <span
                    className={`highlight-mark-icon${'icon' in item ? ' highlight-mark-icon-image' : ''}`}
                    aria-hidden="true"
                  >
                    {'icon' in item ? <img src={item.icon} alt="" width="22" height="22" /> : item.mark}
                  </span>
                  <span>{item.name}</span>
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

function CaseStudyTags({ tags }: { tags: string[] }) {
  return (
    <ul className="case-study-tags" aria-label="Case study tags">
      {tags.map((tag) => <li className="case-study-tag" key={tag}>{tag}</li>)}
    </ul>
  );
}

function CampaignImageCarousel({ images, label }: { images: { src: string; alt: string }[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <div className="campaign-image-carousel" aria-label={label}>
      <div className="campaign-image-carousel-frame">
        <img src={activeImage.src} alt={activeImage.alt} width="640" height="640" />
      </div>
      <div className="campaign-image-carousel-controls">
        <button type="button" onClick={showPrevious} aria-label="Previous still">←</button>
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button type="button" onClick={showNext} aria-label="Next still">→</button>
      </div>
    </div>
  );
}

function CampaignVideoCard({
  name,
  src,
  details,
  description = 'Details placeholder — add the story, role, and results for this campaign here.',
  kindLabel = 'Social video',
  staticVisual,
  informationVisual,
  informationVideos,
  informationAspect = 'vertical',
  informationVideoAspect = 'horizontal',
  initialTime = 0,
  staticVisualClassName,
  staticVisualClickable = false,
  informationVisualClassName,
}: {
  name: string;
  src?: string;
  details: string[];
  description?: string;
  kindLabel?: string;
  staticVisual?: ReactNode;
  informationVisual?: ReactNode;
  informationVideos?: { src: string; title: string; date?: string; bullets?: string[]; tools?: string[] }[];
  informationAspect?: 'vertical' | 'horizontal';
  informationVideoAspect?: 'vertical' | 'horizontal';
  initialTime?: number;
  staticVisualClassName?: string;
  staticVisualClickable?: boolean;
  informationVisualClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detailVideoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailsId = `campaign-details-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const titleId = `${detailsId}-title`;

  useEffect(() => {
    setIsPortalReady(true);
  }, []);

  useEffect(() => {
    [videoRef.current, detailVideoRef.current].forEach((video) => {
      if (video) video.volume = 0.5;
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || typeof document === 'undefined') return;

    document.querySelectorAll<HTMLVideoElement>(`#${detailsId} video`).forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }, [detailsId, isOpen]);

  const toggleInformation = () => {
    if (!isOpen) videoRef.current?.pause();
    setIsOpen((open) => !open);
  };

  const informationLayer = (
    <div
      id={detailsId}
      className={`campaign-information${isOpen ? ' campaign-information-open' : ''}`}
      role="dialog"
      aria-modal={isOpen}
      aria-labelledby={titleId}
      aria-hidden={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div
        className="campaign-information-module"
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className="campaign-information-header">
          <span className="campaign-information-eyebrow">Campaign information</span>
          <button ref={closeButtonRef} className="campaign-information-close" type="button" onClick={() => setIsOpen(false)}>
            ← Back to campaigns
          </button>
        </div>
        <div className={`campaign-information-content${informationAspect === 'horizontal' ? ' campaign-information-content--horizontal' : ''}`}>
          <div className={`campaign-information-video-wrap${informationAspect === 'horizontal' ? ' campaign-information-video-wrap--horizontal' : ''}${informationVideos?.length ? ' campaign-information-video-wrap--gallery' : ''}${informationVisualClassName ? ` ${informationVisualClassName}` : ''}`}>
            {src ? (
              <video
                ref={detailVideoRef}
                controls
                autoPlay={false}
                playsInline
                preload="auto"
                onLoadedData={(event) => {
                  event.currentTarget.currentTime = initialTime;
                  event.currentTarget.pause();
                }}
                width="720"
                height="1280"
                aria-label={`${name} expanded social video`}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            ) : informationVideos?.length ? (
              <div className="campaign-information-video-gallery">
                {informationVideos.map((video, index) => (
                  <article className={`campaign-information-video-card${informationVideoAspect === 'vertical' ? ' campaign-information-video-card--vertical' : ''}`} key={video.src}>
                    <video controls autoPlay={false} playsInline preload="metadata" width="1280" height="720" aria-label={`${video.title} video`}>
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support embedded video.
                    </video>
                    <div>
                      <span>Project {String(index + 1).padStart(2, '0')}</span>
                      <strong>{video.title}</strong>
                      {video.bullets && (
                        <ul>
                          {video.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}
                        </ul>
                      )}
                      {video.tools && (
                        <ul className="video-tool-tags" aria-label="Programs used">
                          {video.tools.map((tool) => <li key={tool}>{tool}</li>)}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="campaign-information-static-visual" aria-hidden={informationVisual ? undefined : true}>{informationVisual ?? staticVisual}</div>
            )}
          </div>
          <div className={`campaign-information-body${description ? '' : ' campaign-information-body--bullets-only'}`}>
            <h2 id={titleId}>{name}</h2>
            {description && <p className="campaign-information-placeholder">{description}</p>}
            <ul>
              {details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <figure className="campaign-video-card">
        {src ? (
          <video
            ref={videoRef}
            controls
            autoPlay={false}
            playsInline
            preload="auto"
            onLoadedData={(event) => {
              event.currentTarget.currentTime = initialTime;
              event.currentTarget.pause();
            }}
            width="720"
            height="1280"
            aria-label={`${name} social video`}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        ) : (
          <div
            className={`campaign-static-card-visual${staticVisualClassName ? ` ${staticVisualClassName}` : ''}`}
            aria-hidden={staticVisualClickable ? undefined : true}
          >
            {staticVisualClickable ? (
              <button
                className="campaign-static-visual-button"
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Open ${name} case study`}
              >
                {staticVisual}
              </button>
            ) : staticVisual}
          </div>
        )}
        <figcaption className="campaign-caption">
          <span>{name}</span>
          <span className="pending">{kindLabel}</span>
          <button
            className="campaign-info-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={toggleInformation}
          >
            {isOpen ? 'Hide information' : 'More information'} <span aria-hidden="true">{isOpen ? '↑' : '↗'}</span>
          </button>
        </figcaption>
      </figure>
      {isPortalReady && createPortal(informationLayer, document.body)}
    </>
  );
}

function CollaboratorTestimonial() {
  return (
    <section className="landing-testimonial" aria-labelledby="landing-testimonial-title">
      <p className="about-section-label">What collaborators say</p>
      <AboutReveal>
        <figure className="about-testimonial-card">
          <blockquote id="landing-testimonial-title">“Working with Iris was an absolute pleasure. She brought so much energy, curiosity, and enthusiasm to our team. No matter what we needed, whether it was help with journey mapping, improving our team processes, or video editing, she was always eager to learn.”</blockquote>
          <figcaption>Manager feedback</figcaption>
        </figure>
      </AboutReveal>
    </section>
  );
}

export default function Home() {
  const audience: Audience = 'strategist';
  const copy = audienceCopy[audience];

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Iris Yu home">Iris Yu</a>
        <nav aria-label="Main navigation">
          <a href="/" aria-current="page">Home</a>
          <a href="/about/">About</a>
        </nav>
      </header>

      <main id="main" className={`landing landing--${audience}`} key={audience}>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-content">
            <span className="intro-kicker">IRIS YU</span>
            <h1 id="intro-title">{copy.role}</h1>
            <p className="intro-description">{copy.introDescription}</p>
          </div>
        </section>

        {audience === 'strategist' && <StrategyHighlights />}

        <section className={`work-section${audience === 'strategist' ? ' work-section--strategist' : ''}`} aria-labelledby="work-title">
          <div className="work-section-heading">
            <h2 id="work-title">{copy.workTitle}</h2>
            <p>{copy.workIntro}</p>
          </div>
          <div className={`work-grid${audience === 'strategist' ? ' work-grid--strategist' : ''}`} aria-label={copy.workTitle}>
            {audience === 'strategist' && (
              <>
                <CampaignVideoCard
                  name="Hellmann's"
                  src="/videos/hellmanns.mp4"
                  initialTime={1}
                  description=""
                  details={[
                    'Role: created the TikTok video for Hellmann\'s x Canada Day.',
                    'Collaboration: worked with a junior strategist at Edelman Canada who provided the loose narrative, script, historical beats, and imagery direction.',
                    'Narrative: finalized the story about Hellmann\'s history and its ties to Canada so the information stayed clear and concise.',
                    'Creative ownership: created all motion graphics in Adobe After Effects and directed the visual and audio execution.',
                    'Gen Z audience: used humorous storytelling and playful visuals inspired by short-form editing styles to keep the history interesting.',
                    'Success: reached 1.8M views on TikTok.',
                  ]}
                />
                <CampaignVideoCard
                  name="Marshalls"
                  src="/videos/marshalls-ad.mp4"
                  description=""
                  details={[
                    'Focus: short-form paid-ad video editing for Marshalls Canada.',
                    'Source material: shaped creator-filmed footage and narration into the final ad.',
                    'Role: developed the video copy and created the visual motion graphics.',
                    'Brand standards: followed the Marshalls Canada brand kit and visual requirements.',
                    'Collaboration: worked with the account manager to finalize the copy through client revisions.',
                  ]}
                />
                <CampaignVideoCard
                  name="Dove — The Game Is Ours"
                  kindLabel="Campaign case study"
                  description=""
                  details={[
                    'Campaign: Dove\'s The Game Is Ours, a FIFA campaign championing body confidence and the joy of girls in sport.',
                    'Role: supported social strategy research at Edelman Canada to validate the campaign proposal.',
                    'Research: social listening and secondary research across girls, parents, and adult women in sport.',
                    'Canadian work: surfaced sports voices, including Olivia Smith\'s interview about her experience as a soccer player.',
                    'Deliverables: contributed to two to three content meetings and presented the final research slide deck to Edelman\'s Design team.',
                    'Result: made body-confidence conversations more relatable through athlete voices.',
                  ]}
                  staticVisual={(
                    <img
                      className="campaign-dove-thumbnail"
                      src="/the-game-is-ours.png"
                      alt="The Game Is Ours campaign logo painted on a soccer field"
                      width="574"
                      height="372"
                    />
                  )}
                  staticVisualClickable
                  informationVisual={(
                    <img
                      className="campaign-dove-information-image"
                      src="/olivia-smith-thumbnail.png"
                      alt="Olivia Smith sharing a message about girls belonging in sport"
                      width="1080"
                      height="1920"
                    />
                  )}
                />
              </>
            )}
            {audience === 'designer' && (
              <a className="project-card" href="/onedeck/">
                <figure>
                  <img src="/onedeck-dashboard.png" alt="OneDeck interactive board game tutorial" width="820" height="426" fetchPriority="high" />
                  <figcaption><span>OneDeck</span><span className="pending">View case study ↗</span></figcaption>
                  <CaseStudyTags tags={['Product design', 'UX/UI', 'Systems']} />
                </figure>
              </a>
            )}
            {audience === 'designer' ? (
              <a className="project-card" href="/shingrix/">
                <figure>
                  <img src="/shingrix/shingrix-hero.jpg" alt="SHINGRIX website redesign visual with a woman in a red beret and the headline 1 in 3" width="1462" height="847" />
                  <figcaption><span>SHINGRIX</span><span className="pending">View case study ↗</span></figcaption>
                  <CaseStudyTags tags={['User testing', 'UX research']} />
                </figure>
              </a>
            ) : (
              <CampaignVideoCard
                name="Marshalls — Stills"
                kindLabel="Copy adaptation"
                description=""
                details={[
                  'Focus: developed copy for Marshalls Canada stills.',
                  'Language: prepared English and French versions for the Canadian market.',
                  'Collaboration: worked with the Marshalls account manager to create the copy formatting and visual treatment for each still.',
                ]}
                staticVisualClassName="campaign-static-card-visual--stills"
                staticVisualClickable
                staticVisual={(
                  <img className="campaign-stills-thumbnail" src="/marshalls/stills/still-1.jpg" alt="Marshalls back-to-school still showing colourful school supplies" width="640" height="640" />
                )}
                informationVisual={(
                  <CampaignImageCarousel
                    label="Marshalls back-to-school stills"
                    images={[
                      { src: '/marshalls/stills/still-1.jpg', alt: 'Colourful back-to-school supplies arranged with a backpack and lunch bag' },
                      { src: '/marshalls/stills/still-2.jpg', alt: 'Dorm decor and accessories arranged on a shelf' },
                      { src: '/marshalls/stills/still-3.jpg', alt: 'Colourful lunch supplies, stationery, and backpacks' },
                      { src: '/marshalls/stills/still-4.jpg', alt: 'Softly styled bedroom accessories and beauty products' },
                    ]}
                  />
                )}
              />
            )}
            {audience === 'designer' ? (
              <figure>
                <img
                  src="/project-2.png"
                  alt="FLUX — metallic typography on a dark background"
                  width="608"
                  height="340"
                />
                <figcaption>
                  <span>FLUX</span>
                  <span className="pending">Case study coming soon</span>
                </figcaption>
                <CaseStudyTags tags={['Visual identity', 'Motion design']} />
              </figure>
            ) : (
              <CampaignVideoCard
                name="HomeSense"
                src="/videos/homesense.mp4"
                kindLabel="Quick-turnaround social video"
                description=""
                details={[
                  'Focus: edited paid-social video ads for HomeSense as part of a recurring monthly content schedule.',
                  'Turnaround: sometimes completed three to five videos in one to two days to prepare a full month of scheduled ads.',
                  'Brand standards: followed the HomeSense brand kit, visual requirements, and approved presentation style.',
                  'Localization: applied approved English and French captions for Meta, TikTok, Pinterest, and Instagram while preserving the required wording and brand voice.',
                ]}
              />
            )}
            {audience === 'strategist' && (
              <CampaignVideoCard
                name="Personal projects"
                kindLabel="Long-form motion & narrative"
                description=""
                details={[
                  'Collection: long-form narrative motion projects created during school and through independent practice.',
                  'Format: a space for finished videos, process stills, and reflections on the story behind each piece.',
                  'Role: motion designer, editor, and visual storyteller across personal projects.',
                ]}
                informationAspect="horizontal"
                informationVideoAspect="horizontal"
                informationVideos={[
                  {
                    src: '/videos/personal/05-logo-experiment.mp4',
                    title: 'ENTERS TAPPED',
                    date: 'September 16, 2026',
                    bullets: ['Role: developed the first logo and motion-graphic intro for a Magic: The Gathering YouTube project created with friends.', 'Process: helped ideate the logo from the chosen name and shaped the initial brand identity.', 'Context: drafted a version-one identity before the project evolved into a new brand.'],
                    tools: ['Adobe After Effects'],
                  },
                  {
                    src: '/videos/personal/04-yes-main-final.mp4',
                    title: 'YES — FLUX',
                    date: 'April 29, 2026',
                    bullets: ['Purpose: informed participants and built interest before they walked through the university thesis pop-up at the Year End Show (YES).', 'Content: introduced the DXD program, explained the FLUX thesis experience and its design-thinking and UX focus, and shared the people behind the exhibition.', 'Role: created a motion-graphics video for a real project to communicate the exhibition clearly.'],
                    tools: ['Adobe After Effects'],
                  },
                  {
                    src: '/videos/personal/03-narrative-tutorial.mp4',
                    title: 'How Not to Make a Birthday Gift',
                    date: 'March 29, 2024',
                    bullets: ['Brief: created for a school motion-graphics design class with a roughly 10-minute runtime.', 'Format: narrative-driven tutorial explaining a process through motion graphics and story-led writing.', 'Craft: merged Adobe Premiere Pro editing with Adobe After Effects animation and Procreate artwork.'],
                    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Procreate'],
                  },
                  {
                    src: '/videos/personal/02-s-map.mp4',
                    title: 'A Stardew Valley Playthrough',
                    date: 'March 10, 2024',
                    bullets: ['Brief: completed a school assignment built around a narrative-driven mapping project with a roughly 10-minute runtime and voice-over.', 'Technique: demonstrated motion-graphics tools including mapping and null objects.', 'Focus: explored indie games and long-form narrative through a Stardew Valley playthrough.'],
                    tools: ['Adobe After Effects', 'Adobe Premiere Pro'],
                  },
                  {
                    src: '/videos/personal/01-design-tools-infographic.mp4',
                    title: 'Toronto GHG Emissions',
                    date: 'February 15, 2024',
                    bullets: ['Milestone: created my first motion-graphics video for school work.', 'Brief: produced a roughly two-minute infographic using trim paths and other common motion-graphics techniques.', 'Research: shaped researched information and statistics about Toronto’s GHG emissions into an engaging narrative.'],
                    tools: ['Adobe After Effects'],
                  },
                ]}
                staticVisualClassName="campaign-static-card-visual--personal"
                staticVisualClickable
                staticVisual={(
                  <div className="campaign-personal-placeholder">
                    <img
                      className="personal-project-sticker personal-project-sticker--mtg"
                      src="/mtg-card-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--pencil"
                      src="/pencil-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--camera"
                      src="/camera-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--merlin"
                      src="/merlin-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <span>Personal projects</span>
                    <small>Long-form motion &amp; narrative</small>
                  </div>
                )}
              />
            )}
            {audience === 'designer' && (
              <a className="project-card" href="/personal-projects/">
                <figure>
                  <div className="project-placeholder personal-project-placeholder">
                    <img
                      className="personal-project-sticker personal-project-sticker--mtg"
                      src="/mtg-card-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--pencil"
                      src="/pencil-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--camera"
                      src="/camera-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <img
                      className="personal-project-sticker personal-project-sticker--merlin"
                      src="/merlin-sticker.png"
                      alt=""
                      aria-hidden="true"
                      width="64"
                      height="64"
                    />
                    <span>Personal projects</span>
                    <small>Long-form motion &amp; narrative</small>
                  </div>
                  <figcaption><span>Personal projects</span><span className="pending">View case study ↗</span></figcaption>
                  <CaseStudyTags tags={['Motion design', 'Narrative']} />
                </figure>
              </a>
            )}
          </div>
        </section>

        {audience === 'strategist' && <CollaboratorTestimonial />}
      </main>

      <footer className="landing-footer">
        <a className="wordmark" href="/">Iris Yu</a>
        <nav className="landing-footer-nav" aria-label="Footer navigation">
          <a href="/about/">About</a>
          <a href="https://www.linkedin.com/in/iris-s-yu" target="_blank" rel="noreferrer">
            <img src="/icons/contact/linkedin.svg" alt="" aria-hidden="true" width="20" height="20" />
            <span>LinkedIn</span>
          </a>
          <CopyEmailLink />
        </nav>
      </footer>
    </>
  );
}


