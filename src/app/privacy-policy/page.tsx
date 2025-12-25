import { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy - LiveCodeShare',
  description: 'Understand how LiveCodeShare collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
