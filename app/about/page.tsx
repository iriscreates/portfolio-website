import type { Metadata } from 'next';
import { AboutReveal } from '../components/about-reveal';
import { AboutHobbies } from '../components/about-hobbies';
import { AboutTypewriterHeading } from '../components/about-typewriter-heading';
import { CopyEmailLink } from '../components/copy-email-link';

export const metadata: Metadata = {
  title: 'About — Iris Yu',
  description: 'About Iris Yu, a multimedia experience designer and content strategist.',
};

export const dynamic = 'force-static';

const practiceAreas = [
  {
    title: 'Social strategy',
    copy: 'Social listening, cultural research, and audience insights that help shape thoughtful media plans and campaigns.',
  },
  {
    title: 'Media planning',
    copy: 'Audience research and cultural signals that help teams think through who a campaign should reach, where it should show up, and how the message should travel.',
  },
  {
    title: 'Motion & content',
    copy: 'Short-form social video, motion graphics, and long-form narrative work that make information easier to follow.',
  },
  {
    title: 'Experience design',
    copy: 'User testing, clear information structures, and thoughtful digital experiences built around real needs.',
  },
];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Iris Yu home">Iris Yu</a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about/" aria-current="page">About</a>
        </nav>
      </header>

      <main id="main" className="about-page">
        <section className="about-section about-story" aria-labelledby="about-story-title">
          <div className="about-story-aside">
            <p className="about-section-label">About me</p>
            <div className="about-visual">
              <img
                className="about-portrait"
                src="/about-portrait-framed.png"
                alt="Portrait of Iris Yu in black and white."
                width={152}
                height={181}
              />
              <img className="about-stickers" src="/about-stickers.svg" alt="" aria-hidden="true" />
            </div>
          </div>
          <div className="about-story-copy">
            <h1 id="about-title" className="about-hero-title-hidden">About Iris Yu</h1>
            <AboutTypewriterHeading id="about-story-title" text={'I really need to know why.\nLike,\u00a0a\u00a0lot.'} />
            <p>I&apos;m a UX designer and content strategist who loves learning about how people think and behave. I create visual content and UI designs that are grounded in the research behind each project. I&apos;m interested in the intersection of design and marketing strategy, where strong creative ideas meet a real understanding of my target audience.</p>
            <p>Over the past four years, I studied Digital and Experience Design at George Brown Polytechnic, where I completed my second bachelor&apos;s degree with a focus on human-centred needs.</p>
            <p>While I was in school, I worked on client projects and learned how to use research to guide my design decisions. I also gained agency experience working with Dove, Hellmann&apos;s, Marshalls and HomeSense. My professional experience has grown around <strong>motion graphics</strong>, <strong>social content</strong>, and <strong>media design strategy</strong> for campaigns.</p>
          </div>
        </section>

        <section className="about-section about-hobbies" aria-labelledby="about-hobbies-title">
          <p className="about-section-label">For fun</p>
          <div className="about-hobbies-content">
            <AboutHobbies />
          </div>
        </section>

        <section className="about-section about-experience" aria-labelledby="about-experience-title">
          <p className="about-section-label">Experience</p>
          <AboutReveal>
            <article className="about-experience-card">
              <p className="about-card-eyebrow">AGENCY EXPERIENCE</p>
              <h2 id="about-experience-title">Edelman Canada</h2>
              <p>During my internship at Edelman Canada, I supported social strategy and design teams with campaign research, cultural listening, and audience insights.</p>
              <ul>
                <li>Validated campaign and activation proposals through social listening and secondary research.</li>
                <li>Translated audience and cultural signals into clear slide-deck recommendations.</li>
                <li>Worked across strategy, design, account, and content teams to shape ideas for Canadian audiences.</li>
              </ul>
            </article>
          </AboutReveal>
        </section>

        <section className="about-section about-practice" aria-labelledby="about-practice-title">
          <p className="about-section-label">What I bring</p>
          <div>
            <h2 id="about-practice-title">A strategy-led creative practice.</h2>
            <div className="about-practice-grid">
              {practiceAreas.map((area) => (
                <article className="about-practice-card" key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer about-footer">
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
