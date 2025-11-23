import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import WizardControls from '@/components/common/WizardControls';
import AssetScopingInteractive from './components/AssetScopingInteractive';

export const metadata: Metadata = {
  title: 'Asset Selection & Scoping - PenTest Questionnaire',
  description: 'Define and configure the specific assets and systems to be included in your penetration testing engagement scope.',
};

export default function AssetSelectionScopingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressStepper />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Asset Selection & Scoping</h1>
          <p className="text-muted-foreground">
            Select the asset types and provide detailed configuration for each system that will be included in the
            penetration testing scope. Be as specific as possible to ensure comprehensive coverage.
          </p>
        </div>

        <AssetScopingInteractive />
      </main>

      <WizardControls
        continueLabel="Continue to Review"
        showSaveDraft={true}
      />
    </div>
  );
}
