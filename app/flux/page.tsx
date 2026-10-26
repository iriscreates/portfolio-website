import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';
import { FluxPhotoGallery } from '../components/flux-photo-gallery';
import { FluxProcessGallery } from '../components/flux-process-gallery';

export const metadata: Metadata = { title: 'FLUX — Iris Yu' };
export const dynamic = 'force-static';

const flux: DesignCaseStudyData = {
  title: 'FLUX',
  description: 'A shared identity and visitor journey for the 2026 Digital Experience Design Year End Show.',
  heroImage: '/flux/flux-banner.gif',
  heroAlt: 'Animated chrome FLUX lettering on a black background.',
  heroFit: 'contain',
  category: 'School project',
  role: 'Exhibition designer',
  deliverables: 'Video and exhibition program',
  footerLabel: 'Year End Show',
  overview: (
    <>
      <p>FLUX was the graduating Digital Experience Design class’s Year End Show: a shared exhibition where students, families, and industry visitors could explore a range of interaction and experience design projects.</p>
      <p>Our committee developed the show’s identity and planned how the projects could work together in the hallway space we were given.</p>
    </>
  ),
  problem: (
    <p>One hallway had to support projects with very different needs. VR and music experiences needed open space for people to participate, while business concepts needed room for tables and conversation. Visitors also needed a clear way to discover the projects and understand the program, whether they entered from either end.</p>
  ),
  goals: [
    'Plan each project’s footprint around its interaction and space needs.',
    'Give the exhibition a shared visual identity across screens, print, and the space.',
    'Guide visitors through a gradual range of interactive experiences.',
    'Make either entrance feel like a natural place to begin exploring.',
  ],
  solution: {
    copy: (
      <div className="flux-case-study">
        <p>Our committee named the exhibition FLUX and developed a chrome-and-silver visual direction around the idea of fluidity. We then turned the shared ideas into a visitor journey that introduced the graduating class’s range of experience design work.</p>

        <section className="flux-story-section" aria-labelledby="flux-process-heading">
          <div className="flux-story-heading">
            <span>Committee process</span>
            <h3 id="flux-process-heading">From shared ideation to a spatial plan</h3>
            <p>I was part of the committee’s work across these stages. We mapped possible touchpoints, then translated those ideas into a floor plan: VR and music projects needed open space, while table-based projects needed room for conversation. The layout and mirrored-vinyl wayfinding helped visitors move through the show from either entrance.</p>
          </div>
          <FluxProcessGallery images={[
            { src: '/flux/process-ideation.webp', alt: 'Committee ideation board mapping exhibition wayfinding, posters, floor vinyl, video, and team tasks.', title: '01 · Ideation — wayfinding and exhibition touchpoints', width: 1600, height: 914 },
            { src: '/flux/process-moodboard.webp', alt: 'FLUX moodboard with chrome typography, reflective surfaces, silver balloons, and liquid-metal references.', title: '02 · Moodboard — chrome, silver, and fluid forms', width: 1600, height: 960 },
            { src: '/flux/process-floor-plan.webp', alt: 'FLUX floor plan arranging student projects by interaction type and space needed, with mirrored vinyl markers along the route.', title: '03 · Floor plan — project placement shaped by interaction and space', width: 2400, height: 1026 },
          ]} />
        </section>

        <section className="flux-story-section flux-video-section" aria-labelledby="flux-video-heading">
          <div className="flux-story-heading">
            <span>Exhibition TV</span>
            <h3 id="flux-video-heading">A motion-graphics introduction to FLUX</h3>
            <p>I created this video for the exhibition TV to introduce the graduating class and the Digital Experience Design program.</p>
          </div>
          <figure className="flux-video-feature">
            <div className="flux-video-frame">
              <video controls playsInline preload="metadata" poster="/video-posters/personal-04.jpg" width="1280" height="720" aria-label="FLUX Year End Show introduction video">
                <source src="/videos/personal/04-yes-main-final.mp4" type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
            <figcaption>Created for the Year End Show · Adobe After Effects</figcaption>
          </figure>
        </section>

        <section className="flux-story-section" aria-labelledby="flux-exhibition-heading">
          <div className="flux-story-heading">
            <span>On the day</span>
            <h3 id="flux-exhibition-heading">The planned experience, brought to life</h3>
            <p>See how the floor plan, mirrored-vinyl wayfinding, entrance posters, and project demonstrations came together in the hallway.</p>
          </div>
          <FluxPhotoGallery images={[
            { src: '/flux/exhibition-poster.webp', alt: 'FLUX exhibition poster beside silver balloons at one entrance.' },
            { src: '/flux/exhibition-hall.webp', alt: 'Visitors moving through the FLUX exhibition in the school hallway.' },
            { src: '/flux/exhibition-video-display.webp', alt: 'The FLUX exhibition TV framed by silver balloons spelling DXD.' },
            { src: '/flux/project-conversation-1.webp', alt: 'A student sharing their thesis project with a visitor at FLUX.' },
            { src: '/flux/project-conversation-2.webp', alt: 'A student demonstrating a thesis project to a visitor at the exhibition.' },
          ]} />
        </section>
      </div>
    ),
  },
};

export default function FluxCaseStudy() {
  return <DesignCaseStudyPage caseStudy={flux} />;
}
