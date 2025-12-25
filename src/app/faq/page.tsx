import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions - LiveCodeShare',
    description: 'Find answers to common questions about LiveCodeShare, real-time code sharing, and collaborative features.',
};

export default function FAQPage() {
    return <FAQClient />;
}
