'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompanyDetailsSectionProps {
  formData: {
    companyName: string;
    industry: string;
    organizationSize: string;
    businessFunctions: string[];
  };
  onUpdate: (field: string, value: any) => void;
  errors: Record<string, string>;
}

const CompanyDetailsSection = ({ formData, onUpdate, errors }: CompanyDetailsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const industries = [
    'Financial Services',
    'Healthcare',
    'Technology',
    'Retail & E-commerce',
    'Manufacturing',
    'Government',
    'Education',
    'Energy & Utilities',
    'Telecommunications',
    'Other',
  ];

  const organizationSizes = [
    'Small (1-50 employees)',
    'Medium (51-250 employees)',
    'Large (251-1000 employees)',
    'Enterprise (1000+ employees)',
  ];

  const businessFunctionsList = [
    'Customer Data Management',
    'Financial Transactions',
    'Healthcare Records',
    'E-commerce Operations',
    'Supply Chain Management',
    'Human Resources',
    'Research & Development',
    'Marketing & Analytics',
    'Legal & Compliance',
    'IT Operations',
  ];

  const handleBusinessFunctionToggle = (func: string) => {
    const current = formData.businessFunctions || [];
    const updated = current.includes(func)
      ? current.filter((f) => f !== func)
      : [...current, func];
    onUpdate('businessFunctions', updated);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-form">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BuildingOfficeIcon" size={24} className="text-primary" variant="solid" />
        <h2 className="text-xl font-semibold text-foreground">Company Details</h2>
      </div>

      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
            Company Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) => onUpdate('companyName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md bg-background text-foreground transition-micro focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.companyName ? 'border-error' : 'border-input'
            }`}
            placeholder="Enter your company name"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.companyName}</span>
            </p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
            Industry <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => onUpdate('industry', e.target.value)}
              className={`w-full px-4 py-2 border rounded-md bg-background text-foreground appearance-none transition-micro focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.industry ? 'border-error' : 'border-input'
              }`}
            >
              <option value="">Select your industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {errors.industry && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.industry}</span>
            </p>
          )}
        </div>

        {/* Organization Size */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Organization Size <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {organizationSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onUpdate('organizationSize', size)}
                className={`px-4 py-3 border rounded-md text-sm font-medium transition-micro text-left ${
                  formData.organizationSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-input hover:border-primary hover:bg-muted'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.organizationSize && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.organizationSize}</span>
            </p>
          )}
        </div>

        {/* Business Functions */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Business Functions <span className="text-error">*</span>
            <span className="text-xs text-muted-foreground ml-2">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {businessFunctionsList.map((func) => (
              <label
                key={func}
                className="flex items-center space-x-3 px-4 py-3 border border-input rounded-md cursor-pointer hover:bg-muted transition-micro"
              >
                <input
                  type="checkbox"
                  checked={formData.businessFunctions?.includes(func) || false}
                  onChange={() => handleBusinessFunctionToggle(func)}
                  className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-foreground">{func}</span>
              </label>
            ))}
          </div>
          {errors.businessFunctions && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.businessFunctions}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsSection;
