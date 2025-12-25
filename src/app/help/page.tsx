import { Metadata } from 'next';
import HelpClient from './HelpClient';

export const metadata: Metadata = {
  title: 'Help & Guide - LiveCodeShare',
  description: 'Step-by-step guide on how to use LiveCodeShare for real-time collaborative coding.',
};

export default function HelpPage() {
  return <HelpClient />;
}
