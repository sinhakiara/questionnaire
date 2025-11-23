'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TestingApproach {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface TestingApproachSectionProps {
  selectedApproach: string;
  onApproachChange: (value: string) => void;
}

const TestingApproachSection = ({ selectedApproach, onApproachChange }: TestingApproachSectionProps) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const approaches: TestingApproach[] = [
    {
      value: 'black-box',
      label: 'Black-Box Testing',
      description: 'No prior knowledge of internal systems. Simulates external attacker perspective with zero access to source code or architecture.',
      icon: 'EyeSlashIcon'
    },
    {
      value: 'gray-box',
      label: 'Gray-Box Testing',
      description: 'Partial knowledge provided. Combines external and internal perspectives with limited access to documentation and credentials.',
      icon: 'AdjustmentsHorizontalIcon'
    },
    {
      value: 'white-box',
      label: 'White-Box Testing',
      description: 'Full system knowledge including source code, architecture diagrams, and credentials. Comprehensive internal security assessment.',
      icon: 'EyeIcon'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Testing Approach <span className="text-error">*</span>
        </label>
        <button
          type="button"
          onMouseEnter={() => setShowTooltip('approach-info')}
          onMouseLeave={() => setShowTooltip(null)}
          className="relative text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name="InformationCircleIcon" size={20} />
          {showTooltip === 'approach-info' && (
            <div className="absolute right-0 top-6 w-64 p-3 bg-popover border border-border rounded-md shadow-interactive z-10 text-xs text-popover-foreground">
              Select the testing methodology that best aligns with your security objectives and available resources.
            </div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {approaches.map((approach) => (
          <button
            key={approach.value}
            type="button"
            onClick={() => onApproachChange(approach.value)}
            className={`relative p-4 border-2 rounded-lg text-left transition-micro hover:scale-105 ${
              selectedApproach === approach.value
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedApproach === approach.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={approach.icon as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold mb-1 ${
                  selectedApproach === approach.value ? 'text-primary' : 'text-foreground'
                }`}>
                  {approach.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {approach.description}
                </p>
              </div>
            </div>
            {selectedApproach === approach.value && (
              <div className="absolute top-2 right-2">
                <Icon name="CheckCircleIcon" size={20} className="text-primary" variant="solid" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestingApproachSection;
