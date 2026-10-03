import type { Metadata } from 'next';
import { DesignCaseStudyPage, type DesignCaseStudyData } from '../components/design-case-study-page';

export const metadata: Metadata = { title: 'OneDeck — Iris Yu' };
export const dynamic = 'force-static';

const oneDeck: DesignCaseStudyData = {
  title: 'OneDeck',
  description: 'Making board games approachable',
  heroImage: '/onedeck-dashboard.png',
  heroBackground: '/onedeck-background.png',
  heroAlt: 'OneDeck interactive Wingspan tutorial showing the game board, player cards, and guided instructions.',
  category: 'Thesis',
  role: 'Product designer',
  deliverables: 'Desktop website',
  overview: (
    <>
      <p>Learning new things can look different for many people. As board games become more difficult to learn, text instructions become daunting, boring, and hard to remember.</p>
      <p>To improve the board game learning experience, OneDeck allows users to learn and review whatever rules they need. By creating curated interactive tutorials, players can enjoy the game without embarrassment and long instruction periods.</p>
    </>
  ),
  problem: (
    <p>People are intimidated by the time and effort it takes to learn to play board games. Current methods of learning board games include pages of rules or video tutorials that are hard to remember and understand. This deters new players from trying new board games.</p>
  ),
  designGoalsIntro: (
    <p>Implement researched learning strategies and needs in a flexible and curated way.<br />I researched learning and teaching strategies using observational studies and peer-reviewed research papers. I also reviewed current teaching models for board games and online game tutorials.</p>
  ),
  goals: [
    'Ensure language and content are appropriate for users’ learning and skill needs.',
    'Create interactive experiences that are easy to revisit and digest.',
    'Set goals in each lesson or tutorial, with ways to check for success and failure.',
    'Help new players learn with confidence and less pressure.',
  ],
};

export default function Home() {
  return <DesignCaseStudyPage caseStudy={oneDeck} />;
}
