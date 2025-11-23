import Icon from '@/components/ui/AppIcon';

interface EngagementSummaryProps {
  estimatedTimeline: string;
  budgetRange: string;
  testingApproach: string;
  deliverables: string[];
}

const EngagementSummary = ({
  estimatedTimeline,
  budgetRange,
  testingApproach,
  deliverables,
}: EngagementSummaryProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-primary/5 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="ClipboardDocumentCheckIcon" size={24} className="text-primary" variant="solid" />
          <div>
            <h3 className="text-base font-semibold text-foreground">Engagement Summary</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Estimated timeline and deliverables based on your responses
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Timeline */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="CalendarIcon" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Estimated Timeline</p>
            <p className="text-base font-semibold text-foreground mt-1">{estimatedTimeline}</p>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
            <Icon name="CurrencyDollarIcon" size={20} className="text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
            <p className="text-base font-semibold text-foreground mt-1">{budgetRange}</p>
          </div>
        </div>

        {/* Testing Approach */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ShieldCheckIcon" size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Testing Approach</p>
            <p className="text-base font-semibold text-foreground mt-1">{testingApproach}</p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-muted-foreground mb-3">Expected Deliverables</p>
          <div className="space-y-2">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" variant="solid" />
                <p className="text-sm text-foreground">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementSummary;
