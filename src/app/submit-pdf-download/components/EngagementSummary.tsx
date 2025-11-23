import Icon from '@/components/ui/AppIcon';

interface SummaryItem {
  label: string;
  value: string;
  icon: string;
}

interface EngagementSummaryProps {
  summaryItems: SummaryItem[];
}

export default function EngagementSummary({ summaryItems }: EngagementSummaryProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="ClipboardDocumentCheckIcon" size={24} className="text-primary" />
        <span>Engagement Summary</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryItems.map((item, index) => (
          <div key={index} className="bg-muted rounded-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={item.icon as any} size={20} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-base font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="bg-accent/10 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" variant="solid" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Preliminary Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Based on your responses, we recommend a comprehensive security assessment with focus on web application security and API testing. Our consultant will provide detailed scoping during the initial consultation call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
