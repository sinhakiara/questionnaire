'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BudgetRange {
  value: string;
  label: string;
  description: string;
}

interface BudgetSectionProps {
  selectedRange: string;
  customAmount: string;
  onRangeChange: (value: string) => void;
  onCustomAmountChange: (value: string) => void;
}

const BudgetSection = ({
  selectedRange,
  customAmount,
  onRangeChange,
  onCustomAmountChange
}: BudgetSectionProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const budgetRanges: BudgetRange[] = [
    { value: '5000-10000', label: '$5,000 - $10,000', description: 'Small scope, single application' },
    { value: '10000-25000', label: '$10,000 - $25,000', description: 'Medium scope, multiple assets' },
    { value: '25000-50000', label: '$25,000 - $50,000', description: 'Large scope, comprehensive testing' },
    { value: '50000-100000', label: '$50,000 - $100,000', description: 'Enterprise-level engagement' },
    { value: 'custom', label: 'Custom Amount', description: 'Specify your budget' }
  ];

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseInt(number));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    onCustomAmountChange(formatted);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Budget Range <span className="text-error">*</span>
        </label>
        <button
          type="button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name="InformationCircleIcon" size={20} />
          {showTooltip && (
            <div className="absolute right-0 top-6 w-64 p-3 bg-popover border border-border rounded-md shadow-interactive z-10 text-xs text-popover-foreground">
              Budget helps us tailor the engagement scope and deliverables to your needs. All amounts in USD.
            </div>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {budgetRanges.map((range) => (
          <div key={range.value}>
            <button
              type="button"
              onClick={() => onRangeChange(range.value)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-micro hover:scale-[1.02] ${
                selectedRange === range.value
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRange === range.value
                        ? 'border-primary bg-primary' :'border-border bg-background'
                    }`}>
                      {selectedRange === range.value && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${
                        selectedRange === range.value ? 'text-primary' : 'text-foreground'
                      }`}>
                        {range.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{range.description}</p>
                    </div>
                  </div>
                </div>
                {selectedRange === range.value && (
                  <Icon name="CheckCircleIcon" size={20} className="text-primary" variant="solid" />
                )}
              </div>
            </button>

            {range.value === 'custom' && selectedRange === 'custom' && (
              <div className="mt-3 ml-8">
                <label htmlFor="custom-amount" className="block text-sm font-medium text-foreground mb-2">
                  Enter Custom Amount
                </label>
                <div className="relative">
                  <Icon name="CurrencyDollarIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    id="custom-amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="$0"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSection;
