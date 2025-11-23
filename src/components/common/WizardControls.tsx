'use client';

import { useRouter, usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface WizardControlsProps {
  onBack?: () => void;
  onContinue?: () => void;
  onSaveDraft?: () => void;
  isBackDisabled?: boolean;
  isContinueDisabled?: boolean;
  continueLabel?: string;
  showSaveDraft?: boolean;
  draftSaveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  className?: string;
}

const WizardControls = ({
  onBack,
  onContinue,
  onSaveDraft,
  isBackDisabled = false,
  isContinueDisabled = false,
  continueLabel = 'Continue',
  showSaveDraft = true,
  draftSaveStatus = 'idle',
  className = '',
}: WizardControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const steps = [
    '/client-business-context',
    '/engagement-preferences',
    '/environment-overview',
    '/asset-selection-scoping',
    '/review-edit-summary',
    '/submit-pdf-download',
  ];

  const currentStepIndex = steps.findIndex((step) => step === pathname);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (!isFirstStep) {
      router.push(steps[currentStepIndex - 1]);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (!isLastStep) {
      router.push(steps[currentStepIndex + 1]);
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
    }
  };

  const getDraftStatusIcon = () => {
    switch (draftSaveStatus) {
      case 'saving':
        return <Icon name="ArrowPathIcon" size={16} className="animate-spin" />;
      case 'saved':
        return <Icon name="CheckCircleIcon" size={16} className="text-success" />;
      case 'error':
        return <Icon name="ExclamationCircleIcon" size={16} className="text-error" />;
      default:
        return <Icon name="CloudArrowUpIcon" size={16} />;
    }
  };

  const getDraftStatusText = () => {
    switch (draftSaveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Draft Saved';
      case 'error':
        return 'Save Failed';
      default:
        return 'Save Draft';
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-interactive ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={isBackDisabled || isFirstStep}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-micro ${
              isBackDisabled || isFirstStep
                ? 'text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                : 'text-foreground bg-muted hover:bg-muted/80 hover:scale-105'
            }`}
          >
            <Icon name="ChevronLeftIcon" size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Save Draft Button */}
          {showSaveDraft && (
            <button
              onClick={handleSaveDraft}
              disabled={draftSaveStatus === 'saving'}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-background hover:bg-muted rounded-md transition-micro hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getDraftStatusIcon()}
              <span className="hidden md:inline">{getDraftStatusText()}</span>
            </button>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className={`flex items-center space-x-2 px-6 py-2 text-sm font-medium rounded-md transition-micro ${
              isContinueDisabled
                ? 'text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                : 'text-primary-foreground bg-primary hover:bg-primary/90 hover:scale-105 shadow-interactive'
            }`}
          >
            <span>{continueLabel}</span>
            <Icon name="ChevronRightIcon" size={20} />
          </button>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardControls;
