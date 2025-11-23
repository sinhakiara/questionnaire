'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Integration {
  id: string;
  name: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  dataFlow: string;
}

interface ThirdPartyIntegrationsSectionProps {
  integrations: Integration[];
  onChange: (integrations: Integration[]) => void;
  error?: string;
}

const ThirdPartyIntegrationsSection = ({
  integrations,
  onChange,
  error,
}: ThirdPartyIntegrationsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const addIntegration = () => {
    const newIntegration: Integration = {
      id: `integration-${Date.now()}`,
      name: '',
      criticality: 'medium',
      dataFlow: '',
    };
    onChange([...integrations, newIntegration]);
  };

  const removeIntegration = (id: string) => {
    onChange(integrations.filter((integration) => integration.id !== id));
  };

  const updateIntegration = (id: string, field: keyof Integration, value: string) => {
    onChange(
      integrations.map((integration) =>
        integration.id === id ? { ...integration, [field]: value } : integration
      )
    );
  };

  const criticalityColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-error/10 text-error border-error/20',
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Third-Party Integrations
          </label>
          <div className="h-32 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Third-Party Integrations
          <span className="text-muted-foreground font-normal ml-2">
            (External services and APIs)
          </span>
        </label>
        <button
          type="button"
          onClick={addIntegration}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary rounded-md transition-micro"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Integration</span>
        </button>
      </div>

      {integrations.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 border border-dashed border-border rounded-md">
          <Icon name="CubeIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No integrations added yet</p>
          <p className="text-xs text-muted-foreground mt-1">Click "Add Integration" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {integrations.map((integration, index) => (
            <div key={integration.id} className="bg-card border border-border rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Integration #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeIntegration(integration.id)}
                  className="text-muted-foreground hover:text-error transition-micro"
                  aria-label="Remove integration"
                >
                  <Icon name="TrashIcon" size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={integration.name}
                    onChange={(e) => updateIntegration(integration.id, 'name', e.target.value)}
                    placeholder="e.g., Stripe, SendGrid, AWS S3"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Criticality Level *
                  </label>
                  <select
                    value={integration.criticality}
                    onChange={(e) =>
                      updateIntegration(integration.id, 'criticality', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-micro ${
                      criticalityColors[integration.criticality]
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Data Flow Description
                </label>
                <textarea
                  value={integration.dataFlow}
                  onChange={(e) => updateIntegration(integration.id, 'dataFlow', e.target.value)}
                  rows={2}
                  placeholder="Describe what data is exchanged and how..."
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 mt-2 text-error text-sm">
          <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ThirdPartyIntegrationsSection;
