import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';

export const metadata: Metadata = { title: 'Personal projects — Iris Yu' };
export const dynamic = 'force-static';

const personalProjects: DesignCaseStudyData = {
  title: 'Personal projects',
  description: 'Long-form narrative motion work from school and side projects',
  category: 'Personal practice',
  role: 'Motion designer',
  deliverables: 'Long-form video and narrative experiments',
  footerLabel: 'Motion practice',
  videoGallery: [
      {
        src: '/videos/personal/05-logo-experiment.mp4',
        poster: '/video-posters/personal-05.jpg',
        title: 'ENTERS TAPPED',
        date: 'September 16, 2026',
        bullets: ['Role: developed the first logo and motion-graphic intro for a Magic: The Gathering YouTube project created with friends.', 'Process: helped ideate the logo from the chosen name and shaped the initial brand identity.', 'Context: drafted a version-one identity before the project evolved into a new brand.'],
      },
      {
        src: '/videos/personal/04-yes-main-final.mp4',
        poster: '/video-posters/personal-04.jpg',
        title: 'YES — FLUX',
        date: 'April 29, 2026',
        bullets: ['Purpose: informed participants and built interest before they walked through the university thesis pop-up at the Year End Show (YES).', 'Content: introduced the DXD program, explained the FLUX thesis experience and its design-thinking and UX focus, and shared the people behind the exhibition.', 'Role: created a motion-graphics video for a real project to communicate the exhibition clearly.'],
      },
      {
        src: '/videos/personal/03-narrative-tutorial.mp4',
        poster: '/video-posters/personal-03.jpg',
        title: 'How Not to Make a Birthday Gift',
        date: 'March 29, 2024',
        bullets: ['Brief: created for a school motion-graphics design class with a roughly 10-minute runtime.', 'Format: narrative-driven tutorial explaining a process through motion graphics and story-led writing.', 'Craft: merged Adobe Premiere Pro editing with Adobe After Effects animation and Procreate artwork.'],
      },
      {
        src: '/videos/personal/02-s-map.mp4',
        poster: '/video-posters/personal-02.jpg',
        title: 'A Stardew Valley Playthrough',
        date: 'March 10, 2024',
        bullets: ['Brief: completed a school assignment built around a narrative-driven mapping project with a roughly 10-minute runtime and voice-over.', 'Technique: demonstrated motion-graphics tools including mapping and null objects.', 'Focus: explored indie games and long-form narrative through a Stardew Valley playthrough.'],
      },
      {
        src: '/videos/personal/01-design-tools-infographic.mp4',
        poster: '/video-posters/personal-01.jpg',
        title: 'Toronto GHG Emissions',
        date: 'February 15, 2024',
        bullets: ['Milestone: created my first motion-graphics video for school work.', 'Brief: produced a roughly two-minute infographic using trim paths and other common motion-graphics techniques.', 'Research: shaped researched information and statistics about Toronto’s GHG emissions into an engaging narrative.'],
      },
  ],
};

export default function PersonalProjectsCaseStudy() {
  return <DesignCaseStudyPage caseStudy={personalProjects} />;
}
