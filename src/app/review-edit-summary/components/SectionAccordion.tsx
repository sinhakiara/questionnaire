'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SectionAccordionProps {
  title: string;
  completionStatus: 'complete' | 'incomplete' | 'warning';
  children: React.ReactNode;
  onEdit: () => void;
  defaultOpen?: boolean;
}

const SectionAccordion = ({
  title,
  completionStatus,
  children,
  onEdit,
  defaultOpen = false,
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getStatusIcon = () => {
    switch (completionStatus) {
      case 'complete':
        return <Icon name="CheckCircleIcon" size={20} className="text-success" variant="solid" />;
      case 'warning':
        return <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" variant="solid" />;
      case 'incomplete':
        return <Icon name="ExclamationCircleIcon" size={20} className="text-error" variant="solid" />;
    }
  };

  const getStatusText = () => {
    switch (completionStatus) {
      case 'complete':
        return 'Complete';
      case 'warning':
        return 'Review Required';
      case 'incomplete':
        return 'Incomplete';
    }
  };

  const getStatusColor = () => {
    switch (completionStatus) {
      case 'complete':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'incomplete':
        return 'text-error';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden transition-micro">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-micro"
      >
        <div className="flex items-center space-x-4">
          {getStatusIcon()}
          <div className="text-left">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className={`text-sm ${getStatusColor()} mt-0.5`}>{getStatusText()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-md transition-micro"
          >
            Edit Section
          </button>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className={`text-muted-foreground transition-smooth ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 py-4 border-t border-border bg-background/50">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
