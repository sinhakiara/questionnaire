'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SDLCData {
  methodology: string;
  deploymentFrequency: string;
  changeManagement: string;
  codeReview: string;
  testingPractices: string;
}

interface SDLCProcessesSectionProps {
  value: SDLCData;
  onChange: (value: SDLCData) => void;
  error?: string;
}

const SDLCProcessesSection = ({ value, onChange, error }: SDLCProcessesSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const methodologies = [
    'Agile/Scrum',
    'Waterfall',
    'DevOps',
    'Kanban',
    'Hybrid',
    'Ad-hoc',
    'Other',
  ];

  const deploymentFrequencies = [
    'Multiple times per day',
    'Daily',
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'Quarterly',
    'Ad-hoc',
  ];

  const changeManagementProcesses = [
    'Formal change control board',
    'Peer review process',
    'Automated approval workflow',
    'Manager approval required',
    'Self-service deployment',
    'No formal process',
  ];

  const handleChange = (field: keyof SDLCData, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            SDLC Processes
          </label>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Software Development Lifecycle (SDLC) Processes
          <span className="text-muted-foreground font-normal ml-2">
            (Development and deployment practices)
          </span>
        </label>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Development Methodology *
            </label>
            <select
              value={value.methodology}
              onChange={(e) => handleChange('methodology', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
            >
              <option value="">Select methodology...</option>
              {methodologies.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Deployment Frequency *
            </label>
            <select
              value={value.deploymentFrequency}
              onChange={(e) => handleChange('deploymentFrequency', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
            >
              <option value="">Select frequency...</option>
              {deploymentFrequencies.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Change Management Process *
            </label>
            <select
              value={value.changeManagement}
              onChange={(e) => handleChange('changeManagement', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
            >
              <option value="">Select process...</option>
              {changeManagementProcesses.map((process) => (
                <option key={process} value={process}>
                  {process}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Code Review Practices
            </label>
            <input
              type="text"
              value={value.codeReview}
              onChange={(e) => handleChange('codeReview', e.target.value)}
              placeholder="e.g., Pull requests, pair programming, automated reviews"
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Testing Practices
            </label>
            <textarea
              value={value.testingPractices}
              onChange={(e) => handleChange('testingPractices', e.target.value)}
              rows={3}
              placeholder="Describe your testing approach (unit tests, integration tests, security testing, etc.)"
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro resize-y"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 mt-2 text-error text-sm">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SDLCProcessesSection;
