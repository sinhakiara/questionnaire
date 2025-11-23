'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationFeedbackProps {
  errors?: ValidationError[];
  type?: 'inline' | 'toast' | 'summary';
  onDismiss?: () => void;
  autoHideDuration?: number;
  className?: string;
}

const ValidationFeedback = ({
  errors = [],
  type = 'inline',
  onDismiss,
  autoHideDuration = 5000,
  className = '',
}: ValidationFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === 'toast' && autoHideDuration > 0 && errors.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [errors, type, autoHideDuration, onDismiss]);

  if (!isVisible || errors.length === 0) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (type === 'inline') {
    return (
      <div className={`space-y-2 ${className}`}>
        {errors.map((error, index) => (
          <div
            key={index}
            className="flex items-start space-x-2 p-3 bg-error/10 border border-error/20 rounded-md transition-micro"
          >
            <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" variant="solid" />
            <div className="flex-1">
              <p className="text-sm font-medium text-error">{error.field}</p>
              <p className="text-sm text-error/80 mt-0.5">{error.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'toast') {
    return (
      <div
        className={`fixed top-20 right-6 z-50 max-w-md w-full bg-card border border-border rounded-lg shadow-interactive transition-smooth ${className}`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Icon name="ExclamationCircleIcon" size={24} className="text-error flex-shrink-0" variant="solid" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Validation Error</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {errors.length === 1
                    ? 'Please correct the following error:'
                    : `Please correct ${errors.length} errors:`}
                </p>
                <ul className="mt-2 space-y-1">
                  {errors.slice(0, 3).map((error, index) => (
                    <li key={index} className="text-sm text-foreground">
                      • {error.field}: {error.message}
                    </li>
                  ))}
                  {errors.length > 3 && (
                    <li className="text-sm text-muted-foreground">
                      • And {errors.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground transition-micro ml-2"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
        </div>
        <div className="h-1 bg-muted rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-error transition-smooth"
            style={{
              animation: `shrink ${autoHideDuration}ms linear`,
            }}
          />
        </div>
      </div>
    );
  }

  if (type === 'summary') {
    return (
      <div className={`bg-error/10 border border-error/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-start space-x-3">
          <Icon name="ExclamationTriangleIcon" size={24} className="text-error flex-shrink-0" variant="solid" />
          <div className="flex-1">
            <h3 className="text-base font-semibold text-error">
              {errors.length === 1 ? '1 Error Found' : `${errors.length} Errors Found`}
            </h3>
            <p className="text-sm text-error/80 mt-1">
              Please review and correct the following issues before continuing:
            </p>
            <ul className="mt-3 space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-error font-mono text-xs mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium text-error">{error.field}</p>
                    <p className="text-sm text-error/80">{error.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ValidationFeedback;
