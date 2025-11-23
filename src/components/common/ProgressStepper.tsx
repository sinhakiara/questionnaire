'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Step {
  label: string;
  path: string;
  description?: string;
}

interface ProgressStepperProps {
  className?: string;
}

const ProgressStepper = ({ className = '' }: ProgressStepperProps) => {
  const pathname = usePathname();

  const steps: Step[] = [
    {
      label: 'Business Context',
      path: '/client-business-context',
      description: 'Organization details and objectives',
    },
    {
      label: 'Engagement Scope',
      path: '/engagement-preferences',
      description: 'Testing preferences and timeline',
    },
    {
      label: 'Technical Environment',
      path: '/environment-overview',
      description: 'Infrastructure and systems overview',
    },
    {
      label: 'Asset Details',
      path: '/asset-selection-scoping',
      description: 'Specific targets and scope',
    },
    {
      label: 'Review & Submit',
      path: '/review-edit-summary',
      description: 'Verify and finalize questionnaire',
    },
    {
      label: 'Complete',
      path: '/submit-pdf-download',
      description: 'Download and submit',
    },
  ];

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);
  const isStepCompleted = (index: number) => index < currentStepIndex;
  const isStepCurrent = (index: number) => index === currentStepIndex;
  const isStepAccessible = (index: number) => index <= currentStepIndex;

  return (
    <div className={`sticky top-16 z-40 bg-background border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop Horizontal Stepper */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const completed = isStepCompleted(index);
              const current = isStepCurrent(index);
              const accessible = isStepAccessible(index);

              return (
                <div key={step.path} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1 group">
                    {accessible ? (
                      <Link
                        href={step.path}
                        className="flex flex-col items-center w-full transition-micro"
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-micro ${
                            completed
                              ? 'bg-success border-success text-success-foreground'
                              : current
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'bg-background border-border text-muted-foreground'
                          } ${accessible ? 'group-hover:scale-110' : ''}`}
                        >
                          {completed ? (
                            <Icon name="CheckIcon" size={20} variant="solid" />
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="mt-2 text-center">
                          <p
                            className={`text-sm font-medium transition-micro ${
                              current
                                ? 'text-foreground'
                                : completed
                                ? 'text-success' :'text-muted-foreground'
                            } ${accessible ? 'group-hover:text-foreground' : ''}`}
                          >
                            {step.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 hidden lg:block">
                            {step.description}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center w-full">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background border-border text-muted-foreground opacity-50`}
                        >
                          <span className="text-sm font-semibold">{index + 1}</span>
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-sm font-medium text-muted-foreground opacity-50">
                            {step.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 hidden lg:block opacity-50">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 -mt-12">
                      <div
                        className={`h-full transition-smooth ${
                          isStepCompleted(index + 1) ? 'bg-success' : 'bg-border'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-3">
          {steps.map((step, index) => {
            const completed = isStepCompleted(index);
            const current = isStepCurrent(index);
            const accessible = isStepAccessible(index);

            return (
              <div key={step.path} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  {accessible ? (
                    <Link href={step.path}>
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-micro ${
                          completed
                            ? 'bg-success border-success text-success-foreground'
                            : current
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {completed ? (
                          <Icon name="CheckIcon" size={16} variant="solid" />
                        ) : (
                          <span className="text-xs font-semibold">{index + 1}</span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background border-border text-muted-foreground opacity-50`}
                    >
                      <span className="text-xs font-semibold">{index + 1}</span>
                    </div>
                  )}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-8 mt-1 transition-smooth ${
                        isStepCompleted(index + 1) ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  {accessible ? (
                    <Link href={step.path}>
                      <p
                        className={`text-sm font-medium transition-micro ${
                          current
                            ? 'text-foreground'
                            : completed
                            ? 'text-success' :'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                    </Link>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-muted-foreground opacity-50">
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 opacity-50">
                        {step.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-smooth"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStepIndex + 1}
              aria-valuemin={0}
              aria-valuemax={steps.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
