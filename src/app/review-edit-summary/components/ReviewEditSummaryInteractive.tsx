'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SectionAccordion from './SectionAccordion';
import InfoRow from './InfoRow';
import AssetTable from './AssetTable';
import ValidationPanel from './ValidationPanel';
import LegalAgreement from './LegalAgreement';
import EngagementSummary from './EngagementSummary';
import WizardControls from '@/components/common/WizardControls';
import Icon from '@/components/ui/AppIcon';

interface Asset {
  id: string;
  type: string;
  name: string;
  details: string;
  scope: 'in-scope' | 'out-of-scope';
  priority: 'high' | 'medium' | 'low';
}

interface ValidationIssue {
  id: string;
  section: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  navigationPath: string;
}

const ReviewEditSummaryInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [auditConsent, setAuditConsent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [draftSaveStatus, setDraftSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock questionnaire data
  const clientContextData = {
    companyName: "TechCorp Solutions Inc.",
    industry: "Financial Services",
    companySize: "500-1000 employees",
    businessFunctions: ["Payment Processing", "Customer Data Management", "Financial Reporting"],
    sensitiveDataTypes: [
      { type: "Payment Card Information", criticality: "Critical" },
      { type: "Personal Identifiable Information", criticality: "High" },
      { type: "Financial Records", criticality: "Critical" }
    ],
    complianceStandards: ["PCI DSS", "SOC 2", "GDPR"],
    securityIncidents: "No major incidents in the past 12 months",
    securityMaturity: "Level 3 - Defined and Documented",
    objectives: "Identify vulnerabilities in payment processing systems and ensure PCI DSS compliance before Q4 audit"
  };

  const engagementData = {
    testingApproach: "Black Box Testing",
    timeline: "March 15, 2025 - April 30, 2025",
    budgetRange: "$50,000 - $75,000",
    deliverables: [
      "Executive Summary Report",
      "Detailed Technical Findings",
      "Remediation Recommendations",
      "Compliance Gap Analysis"
    ],
    postEngagementSupport: ["Remediation Verification", "Security Training"]
  };

  const environmentData = {
    techStack: "React, Node.js, PostgreSQL, AWS Cloud Infrastructure, Docker containers",
    authenticationMethods: ["Multi-Factor Authentication", "OAuth 2.0", "SAML SSO"],
    thirdPartyIntegrations: ["Stripe Payment Gateway", "SendGrid Email Service", "Auth0 Identity Platform"],
    sdlcProcesses: "Agile development with bi-weekly sprints, automated CI/CD pipeline, code review requirements",
    monitoringTools: ["Datadog", "Splunk", "AWS CloudWatch"],
    dataFlowComplexity: "High - Multiple microservices with complex data flows"
  };

  const mockAssets: Asset[] = [
    {
      id: "1",
      type: "Web Application",
      name: "Customer Portal",
      details: "https://portal.techcorp.com - React SPA with payment processing",
      scope: "in-scope",
      priority: "high"
    },
    {
      id: "2",
      type: "API",
      name: "Payment API",
      details: "https://api.techcorp.com/payments - RESTful API for payment processing",
      scope: "in-scope",
      priority: "high"
    },
    {
      id: "3",
      type: "Cloud Infrastructure",
      name: "AWS Production Environment",
      details: "EC2, RDS, S3, Lambda - Production workloads",
      scope: "in-scope",
      priority: "high"
    },
    {
      id: "4",
      type: "Mobile App",
      name: "TechCorp Mobile",
      details: "iOS and Android native apps for customer access",
      scope: "in-scope",
      priority: "medium"
    },
    {
      id: "5",
      type: "Network",
      name: "Corporate Network",
      details: "10.0.0.0/16 - Internal corporate network",
      scope: "out-of-scope",
      priority: "low"
    }
  ];

  const mockValidationIssues: ValidationIssue[] = [
    {
      id: "1",
      section: "Asset Selection",
      field: "Web Application - Sitemap",
      message: "Sitemap document not uploaded. This will help identify all application endpoints.",
      severity: "warning",
      navigationPath: "/asset-selection-scoping"
    }
  ];

  const handleLegalAcceptance = (accepted: boolean, audit: boolean) => {
    setNdaAccepted(accepted);
    setAuditConsent(audit);
  };

  const handleSaveDraft = () => {
    setDraftSaveStatus('saving');
    setTimeout(() => {
      setDraftSaveStatus('saved');
      setTimeout(() => setDraftSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleGeneratePreview = () => {
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 3000);
  };

  const handleSubmit = () => {
    if (ndaAccepted) {
      router.push('/submit-pdf-download');
    }
  };

  const handleNavigateToIssue = (path: string) => {
    router.push(path);
  };

  const handleEditSection = (path: string) => {
    router.push(path);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review & Edit Summary</h1>
          <p className="text-muted-foreground">
            Review all your responses before final submission. You can edit any section by clicking the "Edit Section" button.
          </p>
        </div>

        {/* Validation Panel */}
        <div className="mb-6">
          <ValidationPanel issues={mockValidationIssues} onNavigate={handleNavigateToIssue} />
        </div>

        {/* Engagement Summary */}
        <div className="mb-6">
          <EngagementSummary
            estimatedTimeline={engagementData.timeline}
            budgetRange={engagementData.budgetRange}
            testingApproach={engagementData.testingApproach}
            deliverables={engagementData.deliverables}
          />
        </div>

        {/* Questionnaire Sections */}
        <div className="space-y-4 mb-6">
          {/* Client & Business Context */}
          <SectionAccordion
            title="Client & Business Context"
            completionStatus="complete"
            onEdit={() => handleEditSection('/client-business-context')}
            defaultOpen={true}
          >
            <div className="space-y-4">
              <InfoRow label="Company Name" value={clientContextData.companyName} />
              <InfoRow label="Industry" value={clientContextData.industry} />
              <InfoRow label="Company Size" value={clientContextData.companySize} />
              <InfoRow label="Business Functions" value={clientContextData.businessFunctions} />
              <div className="py-3 border-b border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Sensitive Data Types</p>
                <div className="space-y-2">
                  {clientContextData.sensitiveDataTypes.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm text-foreground">{data.type}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        data.criticality === 'Critical' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                      }`}>
                        {data.criticality}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <InfoRow label="Compliance Standards" value={clientContextData.complianceStandards} />
              <InfoRow label="Security Maturity" value={clientContextData.securityMaturity} />
              <InfoRow label="Testing Objectives" value={clientContextData.objectives} />
            </div>
          </SectionAccordion>

          {/* Engagement Preferences */}
          <SectionAccordion
            title="Engagement Preferences"
            completionStatus="complete"
            onEdit={() => handleEditSection('/engagement-preferences')}
          >
            <div className="space-y-4">
              <InfoRow label="Testing Approach" value={engagementData.testingApproach} />
              <InfoRow label="Preferred Timeline" value={engagementData.timeline} />
              <InfoRow label="Budget Range" value={engagementData.budgetRange} />
              <InfoRow label="Deliverables" value={engagementData.deliverables} />
              <InfoRow label="Post-Engagement Support" value={engagementData.postEngagementSupport} />
            </div>
          </SectionAccordion>

          {/* Environment Overview */}
          <SectionAccordion
            title="Technical Environment"
            completionStatus="complete"
            onEdit={() => handleEditSection('/environment-overview')}
          >
            <div className="space-y-4">
              <InfoRow label="Technology Stack" value={environmentData.techStack} />
              <InfoRow label="Authentication Methods" value={environmentData.authenticationMethods} />
              <InfoRow label="Third-Party Integrations" value={environmentData.thirdPartyIntegrations} />
              <InfoRow label="SDLC Processes" value={environmentData.sdlcProcesses} />
              <InfoRow label="Monitoring Tools" value={environmentData.monitoringTools} />
              <InfoRow label="Data Flow Complexity" value={environmentData.dataFlowComplexity} />
            </div>
          </SectionAccordion>

          {/* Asset Selection & Scoping */}
          <SectionAccordion
            title="Asset Selection & Scoping"
            completionStatus="warning"
            onEdit={() => handleEditSection('/asset-selection-scoping')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Asset Inventory</h4>
                <AssetTable assets={mockAssets} />
              </div>
              <div className="pt-4 border-t border-border">
                <InfoRow 
                  label="Geographic Restrictions" 
                  value="Testing must be conducted from US-based IP addresses only. No testing during business hours (9 AM - 5 PM EST)." 
                />
              </div>
            </div>
          </SectionAccordion>
        </div>

        {/* Legal Agreement */}
        <div className="mb-6">
          <LegalAgreement onAcceptanceChange={handleLegalAcceptance} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleGeneratePreview}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-micro hover:scale-105"
          >
            <Icon name="DocumentTextIcon" size={20} />
            <span>Generate Preview</span>
          </button>
        </div>

        {/* Preview Toast */}
        {showPreview && (
          <div className="fixed top-20 right-6 z-50 max-w-md bg-card border border-border rounded-lg shadow-interactive p-4 animate-slide-in">
            <div className="flex items-start space-x-3">
              <Icon name="DocumentTextIcon" size={24} className="text-primary flex-shrink-0" variant="solid" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Preview Generated</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your questionnaire preview is ready. You can download the final PDF after submission.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Wizard Controls */}
      <WizardControls
        onContinue={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isContinueDisabled={!ndaAccepted}
        continueLabel="Submit Questionnaire"
        draftSaveStatus={draftSaveStatus}
      />
    </div>
  );
};

export default ReviewEditSummaryInteractive;
