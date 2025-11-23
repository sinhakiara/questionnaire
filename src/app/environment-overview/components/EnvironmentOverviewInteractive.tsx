'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ProgressStepper from '@/components/common/ProgressStepper';
import WizardControls from '@/components/common/WizardControls';
import ValidationFeedback from '@/components/common/ValidationFeedback';
import TechnologyStackSection from './TechnologyStackSection';
import AuthenticationMethodsSection from './AuthenticationMethodsSection';
import ThirdPartyIntegrationsSection from './ThirdPartyIntegrationsSection';
import SDLCProcessesSection from './SDLCProcessesSection';
import MonitoringToolsSection from './MonitoringToolsSection';
import DataFlowComplexitySection from './DataFlowComplexitySection';
import FileUploadSection from './FileUploadSection';
import Icon from '@/components/ui/AppIcon';

interface Integration {
  id: string;
  name: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  dataFlow: string;
}

interface SDLCData {
  methodology: string;
  deploymentFrequency: string;
  changeManagement: string;
  codeReview: string;
  testingPractices: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface FormData {
  technologyStack: string;
  authMethods: string[];
  authDetails: Record<string, string>;
  integrations: Integration[];
  sdlc: SDLCData;
  monitoringTools: string[];
  customMonitoringTools: string;
  dataFlowComplexity: number;
  uploadedFiles: UploadedFile[];
}

const EnvironmentOverviewInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [draftSaveStatus, setDraftSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    technologyStack: '',
    authMethods: [],
    authDetails: {},
    integrations: [],
    sdlc: {
      methodology: '',
      deploymentFrequency: '',
      changeManagement: '',
      codeReview: '',
      testingPractices: '',
    },
    monitoringTools: [],
    customMonitoringTools: '',
    dataFlowComplexity: 0,
    uploadedFiles: [],
  });

  useEffect(() => {
    setIsHydrated(true);
    loadDraftData();
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        saveDraftData();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData, isHydrated]);

  const loadDraftData = () => {
    try {
      const saved = localStorage.getItem('environment-overview-draft');
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  };

  const saveDraftData = () => {
    try {
      setDraftSaveStatus('saving');
      localStorage.setItem('environment-overview-draft', JSON.stringify(formData));
      setDraftSaveStatus('saved');
      setTimeout(() => setDraftSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save draft:', error);
      setDraftSaveStatus('error');
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];

    if (!formData.technologyStack.trim()) {
      errors.push({
        field: 'Technology Stack',
        message: 'Please describe your technology stack',
      });
    }

    if (formData.authMethods.length === 0) {
      errors.push({
        field: 'Authentication Methods',
        message: 'Please select at least one authentication method',
      });
    }

    if (!formData.sdlc.methodology) {
      errors.push({
        field: 'Development Methodology',
        message: 'Please select your development methodology',
      });
    }

    if (!formData.sdlc.deploymentFrequency) {
      errors.push({
        field: 'Deployment Frequency',
        message: 'Please select your deployment frequency',
      });
    }

    if (!formData.sdlc.changeManagement) {
      errors.push({
        field: 'Change Management',
        message: 'Please select your change management process',
      });
    }

    if (formData.dataFlowComplexity === 0) {
      errors.push({
        field: 'Data Flow Complexity',
        message: 'Please rate your data flow complexity',
      });
    }

    setValidationErrors(errors);
    setShowValidation(errors.length > 0);
    return errors.length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/asset-selection-scoping');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    router.push('/engagement-preferences');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressStepper />
        <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
          <div className="space-y-8 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
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
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name="ServerStackIcon" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Environment Overview</h1>
              <p className="text-sm text-muted-foreground">Step 3 of 5</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Provide details about your technical infrastructure, development processes, and monitoring capabilities to help us understand your environment.
          </p>
        </div>

        {showValidation && validationErrors.length > 0 && (
          <div className="mb-6">
            <ValidationFeedback
              errors={validationErrors}
              type="summary"
              onDismiss={() => setShowValidation(false)}
            />
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <TechnologyStackSection
              value={formData.technologyStack}
              onChange={(value) => setFormData({ ...formData, technologyStack: value })}
              error={validationErrors.find((e) => e.field === 'Technology Stack')?.message}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <AuthenticationMethodsSection
              selectedMethods={formData.authMethods}
              customDetails={formData.authDetails}
              onChange={(methods, details) =>
                setFormData({ ...formData, authMethods: methods, authDetails: details })
              }
              error={validationErrors.find((e) => e.field === 'Authentication Methods')?.message}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <ThirdPartyIntegrationsSection
              integrations={formData.integrations}
              onChange={(integrations) => setFormData({ ...formData, integrations })}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <SDLCProcessesSection
              value={formData.sdlc}
              onChange={(sdlc) => setFormData({ ...formData, sdlc })}
              error={
                validationErrors.find(
                  (e) =>
                    e.field === 'Development Methodology' ||
                    e.field === 'Deployment Frequency' ||
                    e.field === 'Change Management'
                )?.message
              }
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <MonitoringToolsSection
              selectedTools={formData.monitoringTools}
              customTools={formData.customMonitoringTools}
              onChange={(tools, custom) =>
                setFormData({ ...formData, monitoringTools: tools, customMonitoringTools: custom })
              }
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <DataFlowComplexitySection
              value={formData.dataFlowComplexity}
              onChange={(value) => setFormData({ ...formData, dataFlowComplexity: value })}
              error={validationErrors.find((e) => e.field === 'Data Flow Complexity')?.message}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-form">
            <FileUploadSection
              files={formData.uploadedFiles}
              onChange={(files) => setFormData({ ...formData, uploadedFiles: files })}
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="ClockIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Estimated Time Remaining</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Approximately 20-25 minutes to complete the remaining sections
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WizardControls
        onBack={handleBack}
        onContinue={handleContinue}
        onSaveDraft={saveDraftData}
        draftSaveStatus={draftSaveStatus}
        continueLabel="Continue to Asset Selection"
      />
    </div>
  );
};

export default EnvironmentOverviewInteractive;
