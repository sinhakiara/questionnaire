import type { Metadata } from 'next';
import EngagementPreferencesInteractive from './components/EngagementPreferencesInteractive';

export const metadata: Metadata = {
  title: 'Engagement Preferences - PenTest Questionnaire',
  description: 'Define your penetration testing approach, timeline, budget, and deliverable requirements for optimal engagement scoping and alignment.',
};

export default function EngagementPreferencesPage() {
  return <EngagementPreferencesInteractive />;
}
