'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import WizardControls from '@/components/common/WizardControls';
import ValidationFeedback from '@/components/common/ValidationFeedback';
import CompanyDetailsSection from './CompanyDetailsSection';
import SensitiveDataSection from './SensitiveDataSection';
import SecurityMaturitySection from './SecurityMaturitySection';
import Icon from '@/components/ui/AppIcon';

interface SensitiveDataType {
  name: string;
  criticality: number;
}

interface FormData {
  companyName: string;
  industry: string;
  organizationSize: string;
  businessFunctions: string[];
  sensitiveDataTypes: SensitiveDataType[];
  complianceStandards: string[];
  hasSecurityIncidents: boolean;
  incidentDetails: string;
  securityMaturityRating: number;
  primaryObjectives: string[];
}

interface ValidationError {
  field: string;
  message: string;
}

const ClientBusinessContextInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    organizationSize: '',
    businessFunctions: [],
    sensitiveDataTypes: [],
    complianceStandards: [],
    hasSecurityIncidents: false,
    incidentDetails: '',
    securityMaturityRating: 0,
    primaryObjectives: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [draftSaveStatus, setDraftSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    setIsHydrated(true);
    loadDraft();
  }, []);

  const loadDraft = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('pentest-business-context');
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSaveDraft = () => {
    if (typeof window === 'undefined') return;
    
    setDraftSaveStatus('saving');
    try {
      localStorage.setItem('pentest-business-context', JSON.stringify(formData));
      setTimeout(() => {
        setDraftSaveStatus('saved');
        setTimeout(() => setDraftSaveStatus('idle'), 2000);
      }, 500);
    } catch (error) {
      setDraftSaveStatus('error');
      setTimeout(() => setDraftSaveStatus('idle'), 2000);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newValidationErrors: ValidationError[] = [];

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      newValidationErrors.push({ field: 'Company Name', message: 'This field is required' });
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry selection is required';
      newValidationErrors.push({ field: 'Industry', message: 'Please select your industry' });
    }

    if (!formData.organizationSize) {
      newErrors.organizationSize = 'Organization size is required';
      newValidationErrors.push({ field: 'Organization Size', message: 'Please select your organization size' });
    }

    if (formData.businessFunctions.length === 0) {
      newErrors.businessFunctions = 'At least one business function is required';
      newValidationErrors.push({ field: 'Business Functions', message: 'Select at least one business function' });
    }

    if (formData.sensitiveDataTypes.length === 0) {
      newErrors.sensitiveDataTypes = 'At least one sensitive data type is required';
      newValidationErrors.push({ field: 'Sensitive Data Types', message: 'Select at least one data type' });
    }

    if (formData.complianceStandards.length === 0) {
      newErrors.complianceStandards = 'At least one compliance standard is required';
      newValidationErrors.push({ field: 'Compliance Standards', message: 'Select at least one standard' });
    }

    if (formData.securityMaturityRating === 0) {
      newErrors.securityMaturityRating = 'Security maturity rating is required';
      newValidationErrors.push({ field: 'Security Maturity', message: 'Please rate your security maturity level' });
    }

    if (formData.primaryObjectives.length === 0) {
      newErrors.primaryObjectives = 'At least one primary objective is required';
      newValidationErrors.push({ field: 'Primary Objectives', message: 'Select at least one testing objective' });
    }

    setErrors(newErrors);
    setValidationErrors(newValidationErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      handleSaveDraft();
      // Navigate to engagement preferences after successful validation and save
      router.push('/engagement-preferences');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-card border-b border-border animate-pulse"></div>
        <div className="h-24 bg-background border-b border-border animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <div className="h-64 bg-card rounded-lg animate-pulse"></div>
          <div className="h-64 bg-card rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <ProgressStepper />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Client & Business Context</h1>
          <p className="text-muted-foreground">
            Help us understand your organization and security requirements to tailor the penetration testing engagement.
          </p>
          <div className="flex items-center space-x-2 mt-4 text-sm text-muted-foreground">
            <Icon name="ClockIcon" size={16} />
            <span>Estimated time: 10-15 minutes</span>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mb-6">
            <ValidationFeedback
              errors={validationErrors}
              type="summary"
              onDismiss={() => setValidationErrors([])}
            />
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-6">
          <CompanyDetailsSection
            formData={formData}
            onUpdate={handleUpdate}
            errors={errors}
          />

          <SensitiveDataSection
            formData={formData}
            onUpdate={handleUpdate}
            errors={errors}
          />

          <SecurityMaturitySection
            formData={formData}
            onUpdate={handleUpdate}
            errors={errors}
          />
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" variant="solid" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Your responses help us scope the engagement accurately. All information is encrypted and stored securely. Contact our team if you need assistance completing this section.
              </p>
            </div>
          </div>
        </div>
      </main>

      <WizardControls
        onContinue={handleContinue}
        onSaveDraft={handleSaveDraft}
        draftSaveStatus={draftSaveStatus}
        continueLabel="Continue to Engagement Preferences"
      />
    </div>
  );
};

export default ClientBusinessContextInteractive;
