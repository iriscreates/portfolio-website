import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';

export const metadata: Metadata = { title: 'Personal projects — Iris Yu' };
export const dynamic = 'force-static';

const personalProjects: DesignCaseStudyData = {
  title: 'Personal projects',
  description: 'Long-form narrative motion work from school and side projects',
  heroImage: '/personal-projects-placeholder.svg',
  heroAlt: 'Text-based placeholder for Iris Yu’s personal motion projects collection.',
  category: 'Personal practice',
  role: 'Motion designer',
  deliverables: 'Long-form video and narrative experiments',
  footerLabel: 'Motion practice',
  overview: (
    <>
      <p>This collection will bring together longer-form narrative motion projects created during school and through independent practice.</p>
      <p>Each project will show the story, visual direction, and editing decisions behind the final piece.</p>
    </>
  ),
  problem: (
    <p>Long-form motion work needs more context than a thumbnail can provide. The case studies will make room for the project brief, narrative structure, process, and finished video.</p>
  ),
  designGoalsIntro: (
    <p>As projects are added, this page will use the same clear structure for each piece so the work is easy to watch, understand, and compare.</p>
  ),
  goals: [
    'Introduce the story, brief, and intended audience for each project.',
    'Show how research and references shaped the narrative direction.',
    'Document editing, motion, sound, and visual decisions across the process.',
    'Pair each finished video with the insight or outcome it was built to create.',
  ],
  solution: {
    copy: (
      <>
        <p>The collection below is ordered with the most recent work first.</p>
        <p>Project-specific context and process notes will be added as the collection develops.</p>
      </>
    ),
    videoGallery: [
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
    ],
    insights: [
      'Videos are ordered with the most recent work first.',
      'Project context and narrative breakdowns will be added over time.',
      'Each piece can be expanded with process stills, references, and reflections.',
    ],
  },
};

export default function PersonalProjectsCaseStudy() {
  return <DesignCaseStudyPage caseStudy={personalProjects} />;
}
