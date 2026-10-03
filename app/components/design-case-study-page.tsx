import type { ReactNode } from 'react';

export type DesignCaseStudyData = {
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroBackground?: string;
  category: string;
  role: string;
  deliverables: string;
  footerLabel?: string;
  overview: ReactNode;
  problem: ReactNode;
  designGoalsIntro: ReactNode;
  goals: [string, string, string, string];
  solution?: {
    image?: string;
    imageAlt?: string;
    gallery?: { src: string; alt: string }[];
    videoGallery?: { src: string; title: string; date?: string; description?: string; bullets?: string[]; tools?: string[] }[];
    comparison?: {
      intro: ReactNode;
      rows: {
        title: string;
        description: string;
        original: { src: string; alt: string };
        redesign: { src: string; alt: string };
      }[];
      supportingImages?: { src: string; alt: string }[];
    };
    copy: ReactNode;
    insights: string[];
  };
};

export function DesignCaseStudyPage({ caseStudy }: { caseStudy: DesignCaseStudyData }) {
  const slug = caseStudy.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const overviewId = `${slug}-overview`;
  const problemId = `${slug}-problem`;
  const goalsId = `${slug}-goals`;
  const solutionId = `${slug}-solution`;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Iris Yu home">Iris Yu</a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about/">About</a>
        </nav>
      </header>

      <main id="main" className="case-study">
        <header id="top" className="project-heading">
          <a className="back-home" href="/">← All work</a>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.description}</p>
        </header>

        <figure className="project-image">
          {caseStudy.heroBackground && (
            <img className="image-background" src={caseStudy.heroBackground} alt="" aria-hidden="true" />
          )}
          <img className={caseStudy.heroBackground ? 'dashboard' : 'case-study-hero'} src={caseStudy.heroImage} alt={caseStudy.heroAlt} width="1200" height="620" fetchPriority="high" />
        </figure>

        <dl className="project-details">
          <div><dt>Category</dt><dd>{caseStudy.category}</dd></div>
          <div><dt>Role</dt><dd>{caseStudy.role}</dd></div>
          <div><dt>Deliverables</dt><dd>{caseStudy.deliverables}</dd></div>
        </dl>

        <section aria-labelledby={overviewId}>
          <h2 id={overviewId}>Overview</h2>
          {caseStudy.overview}
        </section>

        <section className="problem" aria-labelledby={problemId}>
          <h2 id={problemId}>Problem</h2>
          {caseStudy.problem}
        </section>

        <section className="design-goals" aria-labelledby={goalsId}>
          <h2 id={goalsId}>Design goals</h2>
          {caseStudy.designGoalsIntro}
          <ul className="goal-grid">
            {caseStudy.goals.map((goal) => <li key={goal}><span>{goal}</span></li>)}
          </ul>
        </section>

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
              <div className="solution-comparison">
                <h3>Before and after</h3>
                <div className="solution-comparison-intro">{caseStudy.solution.comparison.intro}</div>
                <div className="solution-comparison-rows">
                  {caseStudy.solution.comparison.rows.map((row, index) => (
                    <article className="solution-comparison-row" key={row.title}>
                      <div className="solution-comparison-context">
                        <span className="solution-comparison-index">Task {String(index + 1).padStart(2, '0')}</span>
                        <h4>{row.title}</h4>
                        <p>{row.description}</p>
                      </div>
                      <figure className="solution-comparison-image">
                        <figcaption>Before redesign</figcaption>
                        <img src={row.original.src} alt={row.original.alt} width="1200" height="800" loading="lazy" />
                      </figure>
                      <figure className="solution-comparison-image">
                        <figcaption>After redesign</figcaption>
                        <img src={row.redesign.src} alt={row.redesign.alt} width="1200" height="800" loading="lazy" />
                      </figure>
                    </article>
                  ))}
                </div>
                {caseStudy.solution.comparison.supportingImages && (
                  <div className="solution-comparison-supporting">
                    <h4>Additional redesigned screens</h4>
                    <div className="solution-gallery" aria-label="Additional redesigned screens">
                      {caseStudy.solution.comparison.supportingImages.map((image) => (
                        <figure key={image.src}>
                          <img src={image.src} alt={image.alt} width="1200" height="800" loading="lazy" />
                        </figure>
                      ))}
                    </div>
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
            {caseStudy.solution.videoGallery && (
              <div className="solution-video-gallery" aria-label="Motion project videos">
                {caseStudy.solution.videoGallery.map((video, index) => (
                  <article className="solution-video-card" key={video.src}>
                    <div className="solution-video-frame">
                      <video controls playsInline preload="metadata" width="1280" height="720" aria-label={`${video.title} video`}>
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support embedded video.
                      </video>
                    </div>
                    <div className="solution-video-details">
                      <span className="solution-video-index">Project {String(index + 1).padStart(2, '0')}</span>
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
            )}
            <ul className="solution-insights" aria-label="Key product insights">
              {caseStudy.solution.insights.map((insight) => <li key={insight}>{insight}</li>)}
            </ul>
          </section>
        )}
      </main>

      <footer>
        <span>{caseStudy.title} · {caseStudy.footerLabel ?? 'Product design'}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
