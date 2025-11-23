'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineSectionProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  suggestedDuration: number;
}

const TimelineSection = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  suggestedDuration
}: TimelineSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    setIsHydrated(true);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = calculateDuration();

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-foreground">
          Engagement Timeline <span className="text-error">*</span>
        </label>
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-foreground">
          Engagement Timeline <span className="text-error">*</span>
        </label>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="ClockIcon" size={16} />
          <span>Suggested: {suggestedDuration} days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-foreground mb-2">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              min={minDate}
              className="w-full px-4 py-2.5 pr-10 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
            />
            <Icon name="CalendarIcon" size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-foreground mb-2">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              min={startDate || minDate}
              className="w-full px-4 py-2.5 pr-10 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
            />
            <Icon name="CalendarIcon" size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {duration > 0 && (
        <div className={`flex items-center space-x-2 p-3 rounded-md ${
          duration < suggestedDuration
            ? 'bg-warning/10 border border-warning/20' :'bg-success/10 border border-success/20'
        }`}>
          <Icon
            name={duration < suggestedDuration ? 'ExclamationTriangleIcon' : 'CheckCircleIcon'}
            size={20}
            className={duration < suggestedDuration ? 'text-warning' : 'text-success'}
            variant="solid"
          />
          <p className={`text-sm ${duration < suggestedDuration ? 'text-warning' : 'text-success'}`}>
            {duration < suggestedDuration
              ? `Timeline is ${suggestedDuration - duration} days shorter than recommended. Consider extending for comprehensive testing.`
              : `Timeline of ${duration} days allows for thorough security assessment.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimelineSection;
