import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - LiveCodeShare',
  description: 'Get in touch with the LiveCodeShare team. We welcome your feedback, questions, and suggestions.',
};

export default function ContactPage() {
  return <ContactClient />;
}
