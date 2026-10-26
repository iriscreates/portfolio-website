import type { ReactNode } from 'react';
import { AutoplayMutedVideo } from './autoplay-muted-video';
import { SolutionImageCarousel } from './solution-image-carousel';
import { ShingrixFlowVideo } from './shingrix-flow-video';

type CaseStudyVideo = {
  src: string;
  poster?: string;
  title: string;
  date?: string;
  description?: string;
  bullets?: string[];
  tools?: string[];
};

export type DesignCaseStudyData = {
  title: string;
  description: string;
  heroImage?: string;
  heroAlt?: string;
  heroBackground?: string;
  heroFit?: 'cover' | 'contain';
  prototypeUrl?: string;
  category: string;
  role: string;
  deliverables: string;
  footerLabel?: string;
  overview?: ReactNode;
  problem?: ReactNode;
  goals?: string[];
  videoGalleryLabel?: string;
  videoGalleryShowIndex?: boolean;
  videoGallery?: CaseStudyVideo[];
  solution?: {
    image?: string;
    imageAlt?: string;
    gallery?: { src: string; alt: string }[];
    comparison?: {
      layout?: 'walkthrough';
      hideTaskIndex?: boolean;
      intro: ReactNode;
      rows: {
        title: string;
        description: string;
        hideContext?: boolean;
        original: { src: string; alt: string; videoSrc?: string; bullets?: string[] };
        redesign: { src: string; alt: string; flowVideoSrc?: string; bullets?: string[] };
      }[];
      supportingImages?: { src: string; alt: string }[];
    };
    copy: ReactNode;
    insightsTitle?: string;
    insights?: string[];
  };
};

export function DesignCaseStudyPage({ caseStudy }: { caseStudy: DesignCaseStudyData }) {
  const slug = caseStudy.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const overviewId = `${slug}-overview`;
  const problemId = `${slug}-problem`;
  const goalsId = `${slug}-goals`;
  const solutionId = `${slug}-solution`;

  return (
    <div className="design-theme">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Iris Yu home">Iris Yu</a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about/">About</a>
        </nav>
      </header>

      <nav className="case-study-side-dismiss" aria-label="Close case study">
        <a href="/" aria-label={`Close ${caseStudy.title} case study and return to all work`} />
        <span aria-hidden="true" />
        <a href="/" aria-label={`Close ${caseStudy.title} case study and return to all work`} />
      </nav>

      <main id="main" className="case-study">
        <header id="top" className="project-heading">
          <a className="back-home" href="/">← All work</a>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.description}</p>
          {caseStudy.prototypeUrl && (
            <a className="case-study-prototype-link" href={caseStudy.prototypeUrl} target="_blank" rel="noreferrer">
              Open interactive prototype ↗
            </a>
          )}
        </header>

        {caseStudy.heroImage && (
          <figure className={`project-image${caseStudy.heroFit === 'contain' ? ' project-image--contain' : ''}`}>
            {caseStudy.heroBackground && (
              <img className="image-background" src={caseStudy.heroBackground} alt="" aria-hidden="true" />
            )}
            <img className={caseStudy.heroBackground ? 'dashboard' : `case-study-hero${caseStudy.heroFit === 'contain' ? ' case-study-hero--contain' : ''}`} src={caseStudy.heroImage} alt={caseStudy.heroAlt ?? ''} width="1200" height="620" fetchPriority="high" />
          </figure>
        )}

        <dl className={`project-details${caseStudy.heroImage ? '' : ' project-details--no-hero'}`}>
          <div><dt>Category</dt><dd>{caseStudy.category}</dd></div>
          <div><dt>Role</dt><dd>{caseStudy.role}</dd></div>
          <div><dt>Deliverables</dt><dd>{caseStudy.deliverables}</dd></div>
        </dl>

        {caseStudy.overview && (
          <section aria-labelledby={overviewId}>
            <h2 id={overviewId}>Overview</h2>
            {caseStudy.overview}
          </section>
        )}

        {caseStudy.problem && (
          <section className="problem" aria-labelledby={problemId}>
            <h2 id={problemId}>Problem</h2>
            {caseStudy.problem}
          </section>
        )}

        {caseStudy.goals?.length ? (
          <section className="design-goals" aria-labelledby={goalsId}>
            <h2 id={goalsId}>Design goals</h2>
            <ul className="goal-grid">
              {caseStudy.goals.map((goal) => <li key={goal}><span>{goal}</span></li>)}
            </ul>
          </section>
        ) : null}

        {caseStudy.solution && (
          <section className="solution" aria-labelledby={solutionId}>
            <h2 id={solutionId}>Solution</h2>
            {caseStudy.solution.image && (
              <figure className="solution-image">
                <img src={caseStudy.solution.image} alt={caseStudy.solution.imageAlt ?? ''} width="1200" height="620" loading="lazy" />
              </figure>
            )}
            <div className="solution-copy">{caseStudy.solution.copy}</div>
            {caseStudy.solution.comparison && (
              <div className={`solution-comparison${caseStudy.solution.comparison.layout === 'walkthrough' ? ' solution-comparison--walkthrough' : ''}`}>
                <h3>Before and after</h3>
                <div className="solution-comparison-intro">{caseStudy.solution.comparison.intro}</div>
                <div className="solution-comparison-rows">
                  {caseStudy.solution.comparison.rows.map((row, index) => {
                    const hasNotes = Boolean(row.original.bullets?.length || row.redesign.bullets?.length);

                    return (
                    <article className={`solution-comparison-row${caseStudy.solution.comparison.layout === 'walkthrough' ? ` solution-comparison-row--walkthrough${index % 2 === 1 ? ' solution-comparison-row--reverse' : ''}${hasNotes ? ' solution-comparison-row--annotated' : ''}${row.hideContext ? ' solution-comparison-row--no-context' : ''}` : ''}`} key={row.title}>
                      {!row.hideContext && !hasNotes && (
                        <div className="solution-comparison-context">
                          <span className="solution-comparison-index">Task {String(index + 1).padStart(2, '0')}</span>
                          <h4>{row.title}</h4>
                          <p>{row.description}</p>
                        </div>
                      )}
                      {caseStudy.solution.comparison.layout === 'walkthrough' ? (
                        <div className="solution-comparison-visuals">
                          <figure className={`solution-comparison-image${row.original.bullets?.length ? ' solution-comparison-image--annotated' : ''}`}>
                            <figcaption>Before redesign</figcaption>
                            <div className="solution-comparison-screen solution-comparison-screen--before">
                              {row.original.videoSrc ? (
                                <video aria-label={row.original.alt} autoPlay loop muted playsInline preload="metadata" poster={row.original.src}>
                                  <source src={row.original.videoSrc} type="video/mp4" />
                                </video>
                              ) : (
                                <img src={row.original.src} alt={row.original.alt} width="1200" height="800" loading="lazy" />
                              )}
                            </div>
                            {row.original.bullets?.length ? (
                              <div className="solution-comparison-notes-panel">
                                {!caseStudy.solution.comparison.hideTaskIndex && (
                                  <span className="solution-comparison-task-index">Task {String(index + 1).padStart(2, '0')}</span>
                                )}
                                <h5>{row.title}</h5>
                                <ul className="solution-comparison-notes" aria-label="Issues in the original design">
                                  {row.original.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                </ul>
                              </div>
                            ) : null}
                          </figure>
                          <span className="solution-comparison-change-arrow" aria-hidden="true">↓</span>
                          <figure className={`solution-comparison-image solution-comparison-image--after${row.redesign.bullets?.length ? ' solution-comparison-image--annotated' : ''}`}>
                            <figcaption>After redesign</figcaption>
                            <div className="solution-comparison-screen solution-comparison-screen--after">
                              {row.redesign.flowVideoSrc ? (
                                <ShingrixFlowVideo videoSrc={row.redesign.flowVideoSrc} poster={row.redesign.src} alt={row.redesign.alt} />
                              ) : (
                                <img src={row.redesign.src} alt={row.redesign.alt} width="1200" height="800" loading="lazy" />
                              )}
                            </div>
                            {row.redesign.bullets?.length ? (
                              <div className="solution-comparison-notes-panel">
                                {!caseStudy.solution.comparison.hideTaskIndex && (
                                  <span className="solution-comparison-task-index">Task {String(index + 1).padStart(2, '0')}</span>
                                )}
                                <h5>{row.title}</h5>
                                <ul className="solution-comparison-notes" aria-label="Improvements in the redesign">
                                  {row.redesign.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                </ul>
                              </div>
                            ) : null}
                          </figure>
                        </div>
                      ) : (
                        <>
                          <figure className="solution-comparison-image">
                            <figcaption>Before redesign</figcaption>
                            <img src={row.original.src} alt={row.original.alt} width="1200" height="800" loading="lazy" />
                          </figure>
                          <figure className="solution-comparison-image">
                            <figcaption>After redesign</figcaption>
                            <img src={row.redesign.src} alt={row.redesign.alt} width="1200" height="800" loading="lazy" />
                          </figure>
                        </>
                      )}
                    </article>
                    );
                  })}
                </div>
                {caseStudy.solution.comparison.supportingImages && (
                  <div className="solution-comparison-supporting">
                    <h4>Additional redesigned screens</h4>
                    <SolutionImageCarousel images={caseStudy.solution.comparison.supportingImages} label="Additional redesigned screens" />
                  </div>
                )}
              </div>
            )}
            {caseStudy.solution.gallery && (
              <div className="solution-gallery" aria-label="Supporting project visuals">
                {caseStudy.solution.gallery.map((image) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={image.alt} width="1200" height="800" loading="lazy" />
                  </figure>
                ))}
              </div>
            )}
            {caseStudy.solution.insights?.length ? (
              <>
                {caseStudy.solution.insightsTitle && <h3 className="solution-insights-heading">{caseStudy.solution.insightsTitle}</h3>}
                <ul className="solution-insights" aria-label={caseStudy.solution.insightsTitle ?? 'Key product insights'}>
                  {caseStudy.solution.insights.map((insight) => <li key={insight}>{insight}</li>)}
                </ul>
              </>
            ) : null}
          </section>
        )}

        {caseStudy.videoGallery && (
          <section className="solution solution--video-only" aria-label={caseStudy.videoGalleryLabel ?? 'Motion project videos'}>
            <div className="solution-video-gallery">
              {caseStudy.videoGallery.map((video, index) => (
                <article className="solution-video-card" key={video.src}>
                  <div className="solution-video-frame">
                    <AutoplayMutedVideo src={video.src} title={video.title} poster={video.poster} />
                  </div>
                  <div className="solution-video-details">
                    {caseStudy.videoGalleryShowIndex !== false && <span className="solution-video-index">Project {String(index + 1).padStart(2, '0')}</span>}
                    <h3>{video.title}</h3>
                    {video.description && <p>{video.description}</p>}
                    {video.bullets && (
                      <ul className="solution-video-bullets">
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
          </section>
        )}
      </main>

      <footer>
        <span>{caseStudy.title} · {caseStudy.footerLabel ?? 'Product design'}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
