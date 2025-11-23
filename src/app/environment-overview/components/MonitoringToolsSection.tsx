'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MonitoringToolsSectionProps {
  selectedTools: string[];
  customTools: string;
  onChange: (tools: string[], custom: string) => void;
  error?: string;
}

const MonitoringToolsSection = ({
  selectedTools,
  customTools,
  onChange,
  error,
}: MonitoringToolsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const popularTools = [
    { id: 'splunk', name: 'Splunk', category: 'SIEM' },
    { id: 'datadog', name: 'Datadog', category: 'APM' },
    { id: 'newrelic', name: 'New Relic', category: 'APM' },
    { id: 'prometheus', name: 'Prometheus', category: 'Metrics' },
    { id: 'grafana', name: 'Grafana', category: 'Visualization' },
    { id: 'elk', name: 'ELK Stack', category: 'Logging' },
    { id: 'cloudwatch', name: 'AWS CloudWatch', category: 'Cloud' },
    { id: 'azure-monitor', name: 'Azure Monitor', category: 'Cloud' },
    { id: 'gcp-monitoring', name: 'GCP Monitoring', category: 'Cloud' },
    { id: 'pagerduty', name: 'PagerDuty', category: 'Alerting' },
    { id: 'sentry', name: 'Sentry', category: 'Error Tracking' },
    { id: 'dynatrace', name: 'Dynatrace', category: 'APM' },
  ];

  const filteredTools = popularTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToolToggle = (toolId: string) => {
    const newTools = selectedTools.includes(toolId)
      ? selectedTools.filter((id) => id !== toolId)
      : [...selectedTools, toolId];
    onChange(newTools, customTools);
  };

  const handleCustomChange = (value: string) => {
    onChange(selectedTools, value);
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Monitoring & Logging Tools
          </label>
          <div className="h-48 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Monitoring & Logging Tools
          <span className="text-muted-foreground font-normal ml-2">
            (Select all that apply)
          </span>
        </label>

        <div className="relative mb-3">
          <Icon
            name="MagnifyingGlassIcon"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search monitoring tools..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
          {filteredTools.map((tool) => (
            <label
              key={tool.id}
              className="flex items-center space-x-2 p-3 bg-card border border-border rounded-md hover:border-primary/50 transition-micro cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedTools.includes(tool.id)}
                onChange={() => handleToolToggle(tool.id)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary transition-micro cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-micro truncate">
                  {tool.name}
                </p>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </div>
            </label>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-8 bg-muted/50 border border-dashed border-border rounded-md">
            <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No tools found matching "{searchQuery}"</p>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Other Tools (Custom Entry)
          </label>
          <textarea
            value={customTools}
            onChange={(e) => handleCustomChange(e.target.value)}
            rows={2}
            placeholder="List any additional monitoring or logging tools not mentioned above..."
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro resize-y"
          />
        </div>

        {selectedTools.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
            <span>{selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected</span>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 mt-2 text-error text-sm">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringToolsSection;
