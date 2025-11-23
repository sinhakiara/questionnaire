'use client';

import Icon from '@/components/ui/AppIcon';

interface OtherAssetsData {
  description: string;
}

interface OtherAssetsSectionProps {
  data: OtherAssetsData;
  onChange: (data: OtherAssetsData) => void;
}

const OtherAssetsSection = ({ data, onChange }: OtherAssetsSectionProps) => {
  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CubeIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Other Assets</h3>
          <p className="text-sm text-muted-foreground">Describe any additional or specialized systems</p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Asset Description</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe any other assets, systems, or infrastructure components that should be included in the penetration test scope. Include details about technology stack, purpose, and any special considerations."
          rows={6}
          className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">
            <strong>Examples:</strong> IoT devices, SCADA systems, legacy mainframes, custom hardware, embedded
            systems, blockchain infrastructure, or any specialized technology not covered in other categories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherAssetsSection;
