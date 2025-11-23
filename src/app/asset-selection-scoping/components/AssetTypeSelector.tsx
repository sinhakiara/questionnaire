'use client';


import Icon from '@/components/ui/AppIcon';

interface AssetType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AssetTypeSelectorProps {
  selectedAssets: string[];
  onAssetToggle: (assetId: string) => void;
}

const AssetTypeSelector = ({ selectedAssets, onAssetToggle }: AssetTypeSelectorProps) => {
  const assetTypes: AssetType[] = [
    {
      id: 'web-apps',
      name: 'Web Applications',
      description: 'Browser-based applications and web portals',
      icon: 'GlobeAltIcon',
    },
    {
      id: 'apis',
      name: 'APIs',
      description: 'RESTful, GraphQL, and SOAP endpoints',
      icon: 'CodeBracketIcon',
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure',
      description: 'AWS, Azure, GCP resources and services',
      icon: 'CloudIcon',
    },
    {
      id: 'mobile',
      name: 'Mobile Applications',
      description: 'iOS and Android applications',
      icon: 'DevicePhoneMobileIcon',
    },
    {
      id: 'networks',
      name: 'Networks',
      description: 'Internal and external network infrastructure',
      icon: 'ServerIcon',
    },
    {
      id: 'other',
      name: 'Other Assets',
      description: 'Custom or specialized systems',
      icon: 'CubeIcon',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Select Asset Types</h2>
        <p className="text-sm text-muted-foreground">
          Choose all asset types that will be included in the penetration testing scope
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assetTypes.map((asset) => {
          const isSelected = selectedAssets.includes(asset.id);
          return (
            <button
              key={asset.id}
              onClick={() => onAssetToggle(asset.id)}
              className={`p-4 rounded-lg border-2 transition-micro text-left hover:scale-105 ${
                isSelected
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-micro ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={asset.icon as any} size={20} variant={isSelected ? 'solid' : 'outline'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-foreground">{asset.name}</h3>
                    {isSelected && (
                      <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0" variant="solid" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{asset.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedAssets.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-md">
          <Icon name="CheckCircleIcon" size={20} className="text-success" variant="solid" />
          <p className="text-sm text-success">
            {selectedAssets.length} asset {selectedAssets.length === 1 ? 'type' : 'types'} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default AssetTypeSelector;
