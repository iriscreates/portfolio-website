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
    <><p>SHINGRIX is a vaccine that helps prevent shingles in older adults. The website needed to serve them as well as family members and caregivers helping them find reliable information and next steps.</p><p>GSK partnered with Edelman Canada to redesign the experience with easier-to-digest copy and clearer visuals, helping visitors understand and recall key facts, explore supporting details, and find a nearby vaccination location.</p></>
  ),
  problem: (
    <p>The initial website contained excessive information formatted in a way that was confusing, overwhelming, and hard to use. Users were bombarded with text and did not know how to make an appointment to get the vaccine.</p>
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
      layout: 'walkthrough',
      hideTaskIndex: true,
      intro: <p>Each comparison follows a user task from the testing process: find the information, understand it, and know what to do next.</p>,
      rows: [
        {
          title: 'Understand shingles symptoms',
          description: 'Compare how each version helps people find and understand key information.',
          original: {
            src: '/shingrix/shingles-1.jpg',
            videoSrc: '/shingrix/shringrixvideo1.mp4',
            alt: 'Animated recording of the original SHINGRIX facts page with long-form shingles information.',
            bullets: [
              'Long scrolling hid key details.',
              'Dense copy buried the main facts.',
              'Few visuals broke up the text.',
              'Next steps were easy to miss.',
            ],
          },
          redesign: {
            src: '/shingrix/shingrix-flow-1.png',
            alt: 'Redesigned SHINGRIX educational screen explaining common shingles misconceptions.',
            flowVideoSrc: '/shingrix/shingrix-redesign-flow.mp4',
            bullets: [
              'Short facts surface key information.',
              'Expandable details add depth on demand.',
              'Visuals clarify the content.',
              'Clear indicators guide next steps.',
            ],
          },
        },
        {
          title: 'Find vaccine info and next steps',
          description: 'The original FAQ grid made users scan many questions to find a path forward. The redesign brings navigation, vaccine information, and Get SHINGRIX actions into the main experience.',
          hideContext: true,
          original: {
            src: '/shingrix/shingles-2.jpg',
            videoSrc: '/shingrix/faq-shingrix-before.mp4',
            alt: 'Recording of the original SHINGRIX FAQ page with a grid of questions.',
            bullets: [
              'A question grid made FAQs hard to scan.',
              'Answers sat apart from the main experience.',
              'Vaccine actions were easy to miss.',
            ],
          },
          redesign: {
            src: '/shingrix/shingrix-2.jpg',
            flowVideoSrc: '/shingrix/faq-shringrix-after.mp4',
            alt: 'Recording of the redesigned SHINGRIX FAQ and next-step flow.',
            bullets: [
              'Grouped FAQs make answers easier to scan and understand at a glance.',
              'Expandable answers keep details easy to scan.',
              'Get SHINGRIX actions highlight next steps.',
            ],
          },
        },
      ],
    },
  },
};

export default function ShingrixCaseStudy() {
  return <DesignCaseStudyPage caseStudy={shingrix} />;
}
