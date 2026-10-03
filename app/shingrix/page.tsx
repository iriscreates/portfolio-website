import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';

export const metadata: Metadata = { title: 'SHINGRIX — Iris Yu' };
export const dynamic = 'force-static';

const shingrix: DesignCaseStudyData = {
  title: 'SHINGRIX',
  description: 'User testing for a clearer SHINGRIX website',
  heroImage: '/shingrix/shingrix-hero.jpg',
  heroAlt: 'SHINGRIX campaign visual featuring a woman in a red beret and the headline 1 in 3.',
  category: 'Professional project',
  role: 'User testing designer',
  deliverables: 'User testing guidelines',
  overview: (
    <><p>SHINGRIX is a shingles vaccine for an audience that included older adults.</p><p>GSK worked with Edelman Canada to remake the website so it would be more informative and easier to use.</p></>
  ),
  problem: (
    <p>The initial website contained excessive information formatted in a way that was confusing, overwhelming, and hard to use. Users were bombarded with text and did not know how to make an appointment to get the vaccine.</p>
  ),
  designGoalsIntro: (
    <p>During my internship, I created the user-testing guidelines and questionnaire for a new design that was already in the high-fidelity stage. I focused on whether the experience worked for the older audience and challenged the design team to consider real user needs beyond a generic landing page.</p>
  ),
  goals: [
    'Review the new design concepts and clarify what each experience should help users do.',
    'Create consent, task, success, and failure parameters for the user-testing sessions.',
    'Write interview and questionnaire prompts that test navigation, comprehension, and recall.',
    'Keep the older target audience central throughout the design review and testing process.',
  ],
  solution: {
    copy: (
      <>
        <p>The design team used my documentation to write the questionnaire and testing plan. Users then tested the Figma high-fidelity mockup by finding actions such as Get SHINGRIX and the FAQ, recalling information from the landing page, and giving overall feedback.</p>
        <p>The updated website introduced clearer user flows, more visuals, shorter-form information, and clearer ways to find the vaccine in medical clinics.</p>
      </>
    ),
    comparison: {
      intro: <p>Each comparison follows a user task from the testing process: find the information, understand it, and know what to do next.</p>,
      rows: [
        {
          title: 'Understand shingles and its symptoms',
          description: 'The original facts page relied on a long, text-heavy scroll. The redesign turns key facts and misconceptions into shorter, more visual moments.',
          original: { src: '/shingrix/shingles-1.jpg', alt: 'Original SHINGRIX facts page with long-form shingles information.' },
          redesign: { src: '/shingrix/shingrix-3.jpg', alt: 'Redesigned SHINGRIX educational screen explaining common shingles misconceptions.' },
        },
        {
          title: 'Find vaccine information and next steps',
          description: 'The original FAQ grid made users scan many questions to find a path forward. The redesign brings navigation, vaccine information, and Get SHINGRIX actions into the main experience.',
          original: { src: '/shingrix/shingles-2.jpg', alt: 'Original SHINGRIX FAQ page with a grid of questions.' },
          redesign: { src: '/shingrix/shingrix-2.jpg', alt: 'Redesigned SHINGRIX landing page with campaign navigation and a 1 in 3 shingles message.' },
        },
      ],
      supportingImages: [
        { src: '/shingrix/shingrix-4.jpg', alt: 'Redesigned SHINGRIX educational screen with three shingles information cards.' },
        { src: '/shingrix/shingrix-5.jpg', alt: 'Redesigned SHINGRIX landing page variant featuring a skier and a 1 in 3 shingles message.' },
      ],
    },
    insights: [
      'Larger cards with less text made information easier to recall.',
      'Larger static buttons and multiple vaccine entry points improved findability.',
      'The testing guidelines sped up the feedback process for a team new to user testing.',
    ],
  },
};

export default function ShingrixCaseStudy() {
  return <DesignCaseStudyPage caseStudy={shingrix} />;
}
