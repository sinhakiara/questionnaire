import Icon from '@/components/ui/AppIcon';

interface TimelineStep {
  title: string;
  description: string;
  timeframe: string;
  icon: string;
  completed: boolean;
}

interface NextStepsTimelineProps {
  steps: TimelineStep[];
}

export default function NextStepsTimeline({ steps }: NextStepsTimelineProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="ClockIcon" size={24} className="text-primary" />
        <span>Next Steps Timeline</span>
      </h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon name={step.icon as any} size={20} variant={step.completed ? 'solid' : 'outline'} />
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {step.timeframe}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
