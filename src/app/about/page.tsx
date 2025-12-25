import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us - LiveCodeShare',
  description: 'Learn about LiveCodeShare, our mission to make collaborative coding accessible, and the team behind the platform.',
};

export default function AboutPage() {
  return <AboutClient />;
}
