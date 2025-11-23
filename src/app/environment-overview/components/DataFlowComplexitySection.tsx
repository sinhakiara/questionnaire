'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DataFlowComplexitySectionProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const DataFlowComplexitySection = ({ value, onChange, error }: DataFlowComplexitySectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const complexityLevels = [
    {
      value: 1,
      label: 'Simple',
      description: 'Linear data flow, minimal integrations',
      icon: 'ArrowRightIcon',
      color: 'text-success',
    },
    {
      value: 2,
      label: 'Moderate',
      description: 'Some branching, few external services',
      icon: 'ArrowsRightLeftIcon',
      color: 'text-primary',
    },
    {
      value: 3,
      label: 'Complex',
      description: 'Multiple paths, several integrations',
      icon: 'ArrowPathIcon',
      color: 'text-warning',
    },
    {
      value: 4,
      label: 'Very Complex',
      description: 'Highly interconnected, many services',
      icon: 'CircleStackIcon',
      color: 'text-error',
    },
    {
      value: 5,
      label: 'Highly Complex',
      description: 'Distributed architecture, extensive integrations',
      icon: 'ServerStackIcon',
      color: 'text-destructive',
    },
  ];

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Data Flow Complexity
          </label>
          <div className="h-32 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Data Flow Complexity Rating *
          <span className="text-muted-foreground font-normal ml-2">
            (Rate your architecture complexity)
          </span>
        </label>

        <div className="space-y-3">
          {complexityLevels.map((level) => (
            <label
              key={level.value}
              className={`flex items-start space-x-3 p-4 bg-card border-2 rounded-md cursor-pointer transition-micro hover:border-primary/50 ${
                value === level.value ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <input
                type="radio"
                name="complexity"
                value={level.value}
                checked={value === level.value}
                onChange={() => onChange(level.value)}
                className="mt-1 w-4 h-4 text-primary bg-background border-border focus:ring-2 focus:ring-primary transition-micro cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name={level.icon as any} size={20} className={level.color} />
                  <span className="text-sm font-semibold text-foreground">{level.label}</span>
                  <span className="text-xs text-muted-foreground">({level.value}/5)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
              </div>
            </label>
          ))}
        </div>

        {value > 0 && (
          <div className="mt-4 p-4 bg-muted/50 border border-border rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Selected Complexity Level:</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {complexityLevels.find((l) => l.value === value)?.label} - This will help us scope the appropriate testing depth and duration.
                </p>
              </div>
            </div>
          </div>
        )}

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

export default DataFlowComplexitySection;
