import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import ReviewEditSummaryInteractive from './components/ReviewEditSummaryInteractive';

export const metadata: Metadata = {
  title: 'Review & Edit Summary - PenTest Questionnaire',
  description: 'Review and validate your complete penetration testing questionnaire responses before final submission. Edit any section, verify asset inventory, and accept legal agreements.',
};

export default function ReviewEditSummaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressStepper />
      <ReviewEditSummaryInteractive />
    </div>
  );
}
