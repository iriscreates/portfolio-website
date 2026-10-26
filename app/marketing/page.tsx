import type { Metadata } from 'next';
import { PortfolioLanding } from '../components/portfolio-landing';

export const metadata: Metadata = {
  title: 'Social & Content — Iris Yu',
  description: 'Iris Yu’s social strategy, content, and campaign work.',
};

export default function MarketingPage() {
  return <PortfolioLanding initialAudience="strategist" />;
}
