import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import SubmitInteractive from './components/SubmitInteractive';

export const metadata: Metadata = {
  title: 'Submit & Download - PenTest Questionnaire',
  description: 'Confirmation of successful questionnaire submission with PDF download and next steps for your penetration testing engagement.',
};

export default function SubmitPDFDownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressStepper />
      <SubmitInteractive />
    </div>
  );
}
