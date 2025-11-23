'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SecurityMaturitySectionProps {
  formData: {
    hasSecurityIncidents: boolean;
    incidentDetails: string;
    securityMaturityRating: number;
    primaryObjectives: string[];
  };
  onUpdate: (field: string, value: any) => void;
  errors: Record<string, string>;
}

const SecurityMaturitySection = ({ formData, onUpdate, errors }: SecurityMaturitySectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const objectivesList = [
    'Identify vulnerabilities before attackers do',
    'Meet compliance requirements',
    'Validate security controls effectiveness',
    'Improve security posture',
    'Prepare for security audit',
    'Test incident response capabilities',
    'Assess third-party integrations',
    'Evaluate cloud security',
  ];

  const maturityLevels = [
    { value: 1, label: 'Initial', description: 'Ad-hoc security practices' },
    { value: 2, label: 'Developing', description: 'Basic security controls in place' },
    { value: 3, label: 'Defined', description: 'Documented security processes' },
    { value: 4, label: 'Managed', description: 'Monitored and measured security' },
    { value: 5, label: 'Optimized', description: 'Continuous improvement culture' },
  ];

  const handleObjectiveToggle = (objective: string) => {
    const current = formData.primaryObjectives || [];
    const updated = current.includes(objective)
      ? current.filter((o) => o !== objective)
      : [...current, objective];
    onUpdate('primaryObjectives', updated);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-form">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="ChartBarIcon" size={24} className="text-primary" variant="solid" />
        <h2 className="text-xl font-semibold text-foreground">Security Maturity Assessment</h2>
      </div>

      <div className="space-y-6">
        {/* Security Incidents */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Previous Security Incidents <span className="text-error">*</span>
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => onUpdate('hasSecurityIncidents', true)}
              className={`flex-1 px-4 py-3 border rounded-md text-sm font-medium transition-micro ${
                formData.hasSecurityIncidents
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-input hover:border-primary hover:bg-muted'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdate('hasSecurityIncidents', false);
                onUpdate('incidentDetails', '');
              }}
              className={`flex-1 px-4 py-3 border rounded-md text-sm font-medium transition-micro ${
                formData.hasSecurityIncidents === false
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-input hover:border-primary hover:bg-muted'
              }`}
            >
              No
            </button>
          </div>
          {errors.hasSecurityIncidents && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.hasSecurityIncidents}</span>
            </p>
          )}
        </div>

        {/* Incident Details (Conditional) */}
        {formData.hasSecurityIncidents && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <label htmlFor="incidentDetails" className="block text-sm font-medium text-foreground mb-2">
              Incident Details
              <span className="text-xs text-muted-foreground ml-2">
                (Brief description of past incidents)
              </span>
            </label>
            <textarea
              id="incidentDetails"
              value={formData.incidentDetails}
              onChange={(e) => onUpdate('incidentDetails', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground transition-micro focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Describe any previous security incidents, breaches, or vulnerabilities discovered..."
            />
          </div>
        )}

        {/* Security Maturity Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Current Security Maturity Level <span className="text-error">*</span>
          </label>
          <div className="space-y-3">
            {maturityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => onUpdate('securityMaturityRating', level.value)}
                className={`w-full px-4 py-3 border rounded-md text-left transition-micro ${
                  formData.securityMaturityRating === level.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-input hover:border-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{level.label}</span>
                    <span className="text-xs ml-2 opacity-80">({level.description})</span>
                  </div>
                  <span className="text-sm font-mono">{level.value}/5</span>
                </div>
              </button>
            ))}
          </div>
          {errors.securityMaturityRating && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.securityMaturityRating}</span>
            </p>
          )}
        </div>

        {/* Primary Objectives */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Primary Testing Objectives <span className="text-error">*</span>
            <span className="text-xs text-muted-foreground ml-2">(Select all that apply)</span>
          </label>
          <div className="space-y-2">
            {objectivesList.map((objective) => (
              <label
                key={objective}
                className="flex items-start space-x-3 px-4 py-3 border border-input rounded-md cursor-pointer hover:bg-muted transition-micro"
              >
                <input
                  type="checkbox"
                  checked={formData.primaryObjectives?.includes(objective) || false}
                  onChange={() => handleObjectiveToggle(objective)}
                  className="w-4 h-4 mt-0.5 text-primary border-input rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-foreground">{objective}</span>
              </label>
            ))}
          </div>
          {errors.primaryObjectives && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.primaryObjectives}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityMaturitySection;
