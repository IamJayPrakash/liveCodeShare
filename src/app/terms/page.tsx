import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
    title: 'Terms of Service - LiveCodeShare',
    description: 'Read the Terms of Service for using LiveCodeShare. Understand your rights and responsibilities.',
};

export default function TermsPage() {
    return <TermsClient />;
}
