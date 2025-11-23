'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TechnologyStackSectionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TechnologyStackSection = ({ value, onChange, error }: TechnologyStackSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const suggestedCategories = [
    'Frontend: React, Angular, Vue.js, etc.',
    'Backend: Node.js, Python, Java, .NET, etc.',
    'Database: PostgreSQL, MySQL, MongoDB, etc.',
    'Infrastructure: AWS, Azure, GCP, Docker, Kubernetes',
    'Security: WAF, IDS/IPS, SIEM, etc.',
  ];

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Technology Stack Description *
          </label>
          <div className="h-48 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="tech-stack" className="block text-sm font-medium text-foreground mb-2">
          Technology Stack Description *
          <span className="text-muted-foreground font-normal ml-2">
            (Describe your technical infrastructure)
          </span>
        </label>
        <textarea
          id="tech-stack"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder="Describe your technology stack including frontend, backend, databases, infrastructure, and security tools..."
          className={`w-full px-4 py-3 bg-background border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro resize-y ${
            error ? 'border-error focus:ring-error' : 'border-input'
          }`}
        />
        {error && (
          <div className="flex items-center space-x-2 mt-2 text-error text-sm">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="bg-muted/50 border border-border rounded-md p-4">
        <div className="flex items-start space-x-2">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Suggested Categories:</p>
            <ul className="space-y-1">
              {suggestedCategories.map((category, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStackSection;
