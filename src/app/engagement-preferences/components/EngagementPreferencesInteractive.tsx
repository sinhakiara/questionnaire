'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import WizardControls from '@/components/common/WizardControls';
import ValidationFeedback from '@/components/common/ValidationFeedback';
import TestingApproachSection from './TestingApproachSection';
import TimelineSection from './TimelineSection';
import BudgetSection from './BudgetSection';
import DeliverablesSection from './DeliverablesSection';
import PostEngagementSection from './PostEngagementSection';
import Icon from '@/components/ui/AppIcon';

interface ValidationError {
  field: string;
  message: string;
}

interface FormData {
  testingApproach: string;
  startDate: string;
  endDate: string;
  budgetRange: string;
  customBudget: string;
  deliverables: string[];
  postEngagementSupport: string[];
  retestingTimeline: string;
  consultationHours: string;
}

const EngagementPreferencesInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [draftSaveStatus, setDraftSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const validationRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    testingApproach: '',
    startDate: '',
    endDate: '',
    budgetRange: '',
    customBudget: '',
    deliverables: [],
    postEngagementSupport: [],
    retestingTimeline: '',
    consultationHours: ''
  });

  useEffect(() => {
    setIsHydrated(true);
    
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('engagementPreferences');
      if (savedData) {
        try {
          setFormData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error loading saved data:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        handleSaveDraft();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData, isHydrated]);

  const handleSaveDraft = () => {
    if (typeof window === 'undefined') return;
    
    setDraftSaveStatus('saving');
    try {
      localStorage.setItem('engagementPreferences', JSON.stringify(formData));
      setDraftSaveStatus('saved');
      setTimeout(() => setDraftSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving draft:', error);
      setDraftSaveStatus('error');
      setTimeout(() => setDraftSaveStatus('idle'), 2000);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];

    if (!formData.testingApproach) {
      errors.push({ field: 'Testing Approach', message: 'Please select a testing methodology' });
    }

    if (!formData.startDate) {
      errors.push({ field: 'Start Date', message: 'Please select an engagement start date' });
    }

    if (!formData.endDate) {
      errors.push({ field: 'End Date', message: 'Please select an engagement end date' });
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        errors.push({ field: 'Timeline', message: 'End date must be after start date' });
      }
    }

    if (!formData.budgetRange) {
      errors.push({ field: 'Budget Range', message: 'Please select a budget range' });
    }

    if (formData.budgetRange === 'custom' && !formData.customBudget) {
      errors.push({ field: 'Custom Budget', message: 'Please enter a custom budget amount' });
    }

    if (formData.deliverables.length === 0) {
      errors.push({ field: 'Deliverables', message: 'Please select at least one deliverable' });
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleContinue = async () => {
    setIsValidating(true);
    setShowValidation(true);
    
    // Small delay to allow UI to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const isValid = validateForm();
    
    if (!isValid) {
      // Scroll to validation feedback
      setTimeout(() => {
        validationRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 150);
      setIsValidating(false);
      return;
    }
    
    // Navigate on success
    setIsValidating(false);
    router.push('/environment-overview');
  };

  // Auto-hide validation when user starts fixing issues
  useEffect(() => {
    if (showValidation && validationErrors.length > 0) {
      const hasStartedFix = 
        formData.testingApproach !== '' ||
        formData.startDate !== '' ||
        formData.endDate !== '' ||
        formData.budgetRange !== '' ||
        formData.deliverables.length > 0;
      
      if (hasStartedFix) {
        const timer = setTimeout(() => {
          setShowValidation(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [formData, showValidation, validationErrors.length]);

  const getSuggestedDuration = () => {
    switch (formData.testingApproach) {
      case 'black-box':
        return 14;
      case 'gray-box':
        return 21;
      case 'white-box':
        return 28;
      default:
        return 14;
    }
  };

  const handleDeliverableToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(id)
        ? prev.deliverables.filter(d => d !== id)
        : [...prev.deliverables, id]
    }));
  };

  const handleSupportOptionToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      postEngagementSupport: prev.postEngagementSupport.includes(id)
        ? prev.postEngagementSupport.filter(s => s !== id)
        : [...prev.postEngagementSupport, id]
    }));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressStepper />
        <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
          <div className="space-y-6">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressStepper />

      <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="AdjustmentsHorizontalIcon" size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Engagement Preferences</h1>
          </div>
          <p className="text-muted-foreground">
            Define your testing approach, timeline, and deliverable requirements to ensure optimal engagement alignment.
          </p>
          <div className="flex items-center space-x-2 mt-3 text-sm text-muted-foreground">
            <Icon name="ClockIcon" size={16} />
            <span>Estimated completion: 8-10 minutes</span>
          </div>
        </div>

        {showValidation && validationErrors.length > 0 && (
          <div ref={validationRef} className="mb-6 scroll-mt-4">
            <ValidationFeedback
              errors={validationErrors}
              type="summary"
              onDismiss={() => setShowValidation(false)}
            />
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <TestingApproachSection
              selectedApproach={formData.testingApproach}
              onApproachChange={(value) => setFormData(prev => ({ ...prev, testingApproach: value }))}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <TimelineSection
              startDate={formData.startDate}
              endDate={formData.endDate}
              onStartDateChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
              onEndDateChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
              suggestedDuration={getSuggestedDuration()}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <BudgetSection
              selectedRange={formData.budgetRange}
              customAmount={formData.customBudget}
              onRangeChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}
              onCustomAmountChange={(value) => setFormData(prev => ({ ...prev, customBudget: value }))}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <DeliverablesSection
              selectedDeliverables={formData.deliverables}
              onDeliverableToggle={handleDeliverableToggle}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <PostEngagementSection
              selectedOptions={formData.postEngagementSupport}
              retestingTimeline={formData.retestingTimeline}
              consultationHours={formData.consultationHours}
              onOptionToggle={handleSupportOptionToggle}
              onRetestingTimelineChange={(value) => setFormData(prev => ({ ...prev, retestingTimeline: value }))}
              onConsultationHoursChange={(value) => setFormData(prev => ({ ...prev, consultationHours: value }))}
            />
          </div>

          <div className="flex items-start space-x-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" variant="solid" />
            <div className="flex-1">
              <p className="text-sm font-medium text-accent">Progress Auto-Saved</p>
              <p className="text-sm text-accent/80 mt-1">
                Your preferences are automatically saved as you work. You can return anytime to complete this section.
              </p>
            </div>
          </div>
        </div>
      </main>

      <WizardControls
        onContinue={handleContinue}
        isContinueDisabled={isValidating}
        continueLabel={isValidating ? 'Validating...' : 'Continue to Environment Overview'}
        draftSaveStatus={draftSaveStatus}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
};

export default EngagementPreferencesInteractive;
