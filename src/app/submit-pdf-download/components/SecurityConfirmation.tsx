import Icon from '@/components/ui/AppIcon';

interface SecurityDetail {
  label: string;
  value: string;
  icon: string;
}

interface SecurityConfirmationProps {
  securityDetails: SecurityDetail[];
}

export default function SecurityConfirmation({ securityDetails }: SecurityConfirmationProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="ShieldCheckIcon" size={24} className="text-success" variant="solid" />
        <span>Security & Compliance</span>
      </h3>
      
      <div className="space-y-4">
        {securityDetails.map((detail, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={detail.icon as any} size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{detail.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="InformationCircleIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Your data is protected under GDPR and CCPA regulations. We maintain strict data retention policies and will securely delete your information after engagement completion unless otherwise specified.
          </p>
        </div>
      </div>
    </div>
  );
}
