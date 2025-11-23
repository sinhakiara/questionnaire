'use client';

import Icon from '@/components/ui/AppIcon';

interface Deliverable {
  id: string;
  label: string;
  description: string;
  icon: string;
  recommended: boolean;
}

interface DeliverablesSectionProps {
  selectedDeliverables: string[];
  onDeliverableToggle: (id: string) => void;
}

const DeliverablesSection = ({ selectedDeliverables, onDeliverableToggle }: DeliverablesSectionProps) => {
  const deliverables: Deliverable[] = [
    {
      id: 'executive-summary',
      label: 'Executive Summary',
      description: 'High-level overview for stakeholders with risk ratings and business impact analysis',
      icon: 'DocumentTextIcon',
      recommended: true
    },
    {
      id: 'technical-report',
      label: 'Technical Report',
      description: 'Detailed findings with vulnerability descriptions, evidence, and exploitation steps',
      icon: 'CodeBracketIcon',
      recommended: true
    },
    {
      id: 'remediation-guidance',
      label: 'Remediation Guidance',
      description: 'Step-by-step fix recommendations with code examples and best practices',
      icon: 'WrenchScrewdriverIcon',
      recommended: true
    },
    {
      id: 'presentation',
      label: 'Executive Presentation',
      description: 'Live presentation of findings to leadership team with Q&A session',
      icon: 'PresentationChartLineIcon',
      recommended: false
    },
    {
      id: 'retest-report',
      label: 'Retest Report',
      description: 'Verification testing after remediation with updated risk assessment',
      icon: 'ArrowPathIcon',
      recommended: false
    },
    {
      id: 'compliance-mapping',
      label: 'Compliance Mapping',
      description: 'Findings mapped to relevant compliance frameworks (PCI DSS, HIPAA, etc.)',
      icon: 'ShieldCheckIcon',
      recommended: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Deliverables <span className="text-error">*</span>
        </label>
        <span className="text-xs text-muted-foreground">
          {selectedDeliverables.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {deliverables.map((deliverable) => {
          const isSelected = selectedDeliverables.includes(deliverable.id);
          
          return (
            <button
              key={deliverable.id}
              type="button"
              onClick={() => onDeliverableToggle(deliverable.id)}
              className={`relative p-4 border-2 rounded-lg text-left transition-micro hover:scale-[1.02] ${
                isSelected
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                  isSelected
                    ? 'border-primary bg-primary' :'border-border bg-background'
                }`}>
                  {isSelected && (
                    <Icon name="CheckIcon" size={14} className="text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={deliverable.icon as any} size={18} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                    <h4 className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {deliverable.label}
                    </h4>
                    {deliverable.recommended && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {deliverable.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedDeliverables.length === 0 && (
        <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0" variant="solid" />
          <p className="text-sm text-warning">
            Please select at least one deliverable to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliverablesSection;
