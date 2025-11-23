'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SensitiveDataType {
  name: string;
  criticality: number;
}

interface SensitiveDataSectionProps {
  formData: {
    sensitiveDataTypes: SensitiveDataType[];
    complianceStandards: string[];
  };
  onUpdate: (field: string, value: any) => void;
  errors: Record<string, string>;
}

const SensitiveDataSection = ({ formData, onUpdate, errors }: SensitiveDataSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const dataTypes = [
    'Personal Identifiable Information (PII)',
    'Payment Card Information (PCI)',
    'Protected Health Information (PHI)',
    'Financial Records',
    'Intellectual Property',
    'Customer Data',
    'Employee Records',
    'Trade Secrets',
  ];

  const complianceOptions = [
    { value: 'SOX', label: 'SOX (Sarbanes-Oxley)', icon: 'DocumentTextIcon' },
    { value: 'HIPAA', label: 'HIPAA', icon: 'HeartIcon' },
    { value: 'PCI-DSS', label: 'PCI-DSS', icon: 'CreditCardIcon' },
    { value: 'GDPR', label: 'GDPR', icon: 'GlobeAltIcon' },
  ];

  const handleDataTypeToggle = (dataType: string) => {
    const current = formData.sensitiveDataTypes || [];
    const exists = current.find((d) => d.name === dataType);

    if (exists) {
      onUpdate(
        'sensitiveDataTypes',
        current.filter((d) => d.name !== dataType)
      );
    } else {
      onUpdate('sensitiveDataTypes', [...current, { name: dataType, criticality: 3 }]);
    }
  };

  const handleCriticalityChange = (dataType: string, criticality: number) => {
    const current = formData.sensitiveDataTypes || [];
    const updated = current.map((d) => (d.name === dataType ? { ...d, criticality } : d));
    onUpdate('sensitiveDataTypes', updated);
  };

  const handleComplianceToggle = (standard: string) => {
    const current = formData.complianceStandards || [];
    const updated = current.includes(standard)
      ? current.filter((s) => s !== standard)
      : [...current, standard];
    onUpdate('complianceStandards', updated);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-form">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="ShieldCheckIcon" size={24} className="text-primary" variant="solid" />
        <h2 className="text-xl font-semibold text-foreground">Sensitive Data & Compliance</h2>
      </div>

      <div className="space-y-6">
        {/* Sensitive Data Types */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Sensitive Data Types <span className="text-error">*</span>
            <span className="text-xs text-muted-foreground ml-2">(Select and rate criticality)</span>
          </label>
          <div className="space-y-4">
            {dataTypes.map((dataType) => {
              const selected = formData.sensitiveDataTypes?.find((d) => d.name === dataType);
              return (
                <div key={dataType} className="border border-input rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => handleDataTypeToggle(dataType)}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-foreground flex-1">{dataType}</span>
                  </label>

                  {selected && (
                    <div className="mt-4 pl-7">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Criticality Level
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          {selected.criticality}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={selected.criticality}
                        onChange={(e) =>
                          handleCriticalityChange(dataType, parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Low</span>
                        <span>Critical</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {errors.sensitiveDataTypes && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.sensitiveDataTypes}</span>
            </p>
          )}
        </div>

        {/* Compliance Standards */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Compliance Standards <span className="text-error">*</span>
            <span className="text-xs text-muted-foreground ml-2">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {complianceOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 px-4 py-3 border rounded-md cursor-pointer transition-micro ${
                  formData.complianceStandards?.includes(option.value)
                    ? 'bg-primary/10 border-primary' :'border-input hover:bg-muted'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.complianceStandards?.includes(option.value) || false}
                  onChange={() => handleComplianceToggle(option.value)}
                  className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary"
                />
                <Icon
                  name={option.icon as any}
                  size={20}
                  className={
                    formData.complianceStandards?.includes(option.value)
                      ? 'text-primary' :'text-muted-foreground'
                  }
                />
                <span className="text-sm font-medium text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.complianceStandards && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.complianceStandards}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensitiveDataSection;
