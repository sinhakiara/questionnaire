import type { Metadata } from 'next';
import ClientBusinessContextInteractive from './components/ClientBusinessContextInteractive';

export const metadata: Metadata = {
  title: 'Client Business Context - PenTest Questionnaire',
  description: 'Provide your organization details, compliance requirements, and security objectives to help us tailor your penetration testing engagement.',
};

export default function ClientBusinessContextPage() {
  return <ClientBusinessContextInteractive />;
}
