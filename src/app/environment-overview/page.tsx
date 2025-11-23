import type { Metadata } from 'next';
import EnvironmentOverviewInteractive from './components/EnvironmentOverviewInteractive';

export const metadata: Metadata = {
  title: 'Environment Overview - PenTest Questionnaire',
  description: 'Provide comprehensive details about your technical infrastructure, development processes, authentication methods, and monitoring capabilities for accurate penetration testing scope definition.',
};

export default function EnvironmentOverviewPage() {
  return <EnvironmentOverviewInteractive />;
}
