'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SupportOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface PostEngagementSectionProps {
  selectedOptions: string[];
  retestingTimeline: string;
  consultationHours: string;
  onOptionToggle: (id: string) => void;
  onRetestingTimelineChange: (value: string) => void;
  onConsultationHoursChange: (value: string) => void;
}

const PostEngagementSection = ({
  selectedOptions,
  retestingTimeline,
  consultationHours,
  onOptionToggle,
  onRetestingTimelineChange,
  onConsultationHoursChange
}: PostEngagementSectionProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const supportOptions: SupportOption[] = [
    {
      id: 'retesting',
      label: 'Remediation Retesting',
      description: 'Verify fixes after remediation with follow-up testing',
      icon: 'ArrowPathIcon'
    },
    {
      id: 'consultation',
      label: 'Security Consultation',
      description: 'Post-engagement advisory hours for questions and guidance',
      icon: 'ChatBubbleLeftRightIcon'
    },
    {
      id: 'ongoing-advisory',
      label: 'Ongoing Security Advisory',
      description: 'Quarterly security reviews and continuous improvement support',
      icon: 'ShieldCheckIcon'
    },
    {
      id: 'training',
      label: 'Security Training',
      description: 'Developer training on secure coding and vulnerability prevention',
      icon: 'AcademicCapIcon'
    }
  ];

  const retestingOptions = [
    { value: '2-weeks', label: '2 Weeks After Remediation' },
    { value: '1-month', label: '1 Month After Remediation' },
    { value: '3-months', label: '3 Months After Remediation' },
    { value: 'custom', label: 'Custom Timeline' }
  ];

  const consultationHoursOptions = [
    { value: '5', label: '5 Hours' },
    { value: '10', label: '10 Hours' },
    { value: '20', label: '20 Hours' },
    { value: 'custom', label: 'Custom Hours' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Post-Engagement Support
        </label>
        <span className="text-xs text-muted-foreground">Optional</span>
      </div>

      <div className="space-y-3">
        {supportOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isExpanded = expandedSection === option.id;
          
          return (
            <div key={option.id} className="border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => onOptionToggle(option.id)}
                className={`w-full p-4 text-left transition-micro hover:bg-muted ${
                  isSelected ? 'bg-primary/5' : 'bg-card'
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
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={option.icon as any} size={18} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                      <h4 className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {option.label}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  {isSelected && (option.id === 'retesting' || option.id === 'consultation') && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSection(isExpanded ? null : option.id);
                      }}
                      className="text-muted-foreground hover:text-foreground transition-micro"
                    >
                      <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={20} />
                    </button>
                  )}
                </div>
              </button>

              {isSelected && isExpanded && option.id === 'retesting' && (
                <div className="px-4 pb-4 bg-muted/50">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Retesting Timeline
                  </label>
                  <select
                    value={retestingTimeline}
                    onChange={(e) => onRetestingTimelineChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
                  >
                    <option value="">Select timeline</option>
                    {retestingOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {isSelected && isExpanded && option.id === 'consultation' && (
                <div className="px-4 pb-4 bg-muted/50">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Consultation Hours
                  </label>
                  <select
                    value={consultationHours}
                    onChange={(e) => onConsultationHoursChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
                  >
                    <option value="">Select hours</option>
                    {consultationHoursOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostEngagementSection;
