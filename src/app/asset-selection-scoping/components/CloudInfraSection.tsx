'use client';


import Icon from '@/components/ui/AppIcon';

interface CloudInfraData {
  providers: string[];
  keyServices: string;
  sharedResponsibility: string;
  architectureDiagram: File | null;
}

interface CloudInfraSectionProps {
  data: CloudInfraData;
  onChange: (data: CloudInfraData) => void;
}

const CloudInfraSection = ({ data, onChange }: CloudInfraSectionProps) => {
  const cloudProviders = [
    { id: 'aws', name: 'Amazon Web Services (AWS)', icon: 'CloudIcon' },
    { id: 'azure', name: 'Microsoft Azure', icon: 'CloudIcon' },
    { id: 'gcp', name: 'Google Cloud Platform (GCP)', icon: 'CloudIcon' },
    { id: 'digitalocean', name: 'DigitalOcean', icon: 'CloudIcon' },
    { id: 'ibm', name: 'IBM Cloud', icon: 'CloudIcon' },
    { id: 'oracle', name: 'Oracle Cloud', icon: 'CloudIcon' },
  ];

  const toggleProvider = (providerId: string) => {
    const updated = data.providers.includes(providerId)
      ? data.providers.filter((p) => p !== providerId)
      : [...data.providers, providerId];
    onChange({ ...data, providers: updated });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ ...data, architectureDiagram: file });
  };

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CloudIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cloud Infrastructure</h3>
          <p className="text-sm text-muted-foreground">Configure cloud environment testing scope</p>
        </div>
      </div>

      {/* Cloud Providers */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Cloud Providers</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cloudProviders.map((provider) => (
            <label
              key={provider.id}
              className="flex items-center space-x-3 p-4 bg-background border border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro"
            >
              <input
                type="checkbox"
                checked={data.providers.includes(provider.id)}
                onChange={() => toggleProvider(provider.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
              />
              <Icon name={provider.icon as any} size={20} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{provider.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Key Services */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Key Services & Resources</label>
        <textarea
          value={data.keyServices}
          onChange={(e) => onChange({ ...data, keyServices: e.target.value })}
          placeholder="List the primary cloud services and resources to be tested (e.g., EC2 instances, S3 buckets, Lambda functions, Azure VMs, GCP Cloud Functions)"
          rows={4}
          className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Include compute, storage, networking, databases, and serverless components
        </p>
      </div>

      {/* Shared Responsibility Model */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Shared Responsibility Model</label>
        <textarea
          value={data.sharedResponsibility}
          onChange={(e) => onChange({ ...data, sharedResponsibility: e.target.value })}
          placeholder="Describe the security responsibilities split between your organization and the cloud provider. What aspects are you managing vs. provider-managed?"
          rows={4}
          className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">
            <strong>Example:</strong> We manage application security, data encryption, and IAM policies. Provider
            manages physical infrastructure, network security, and hypervisor security.
          </p>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Architecture Diagram (Optional)</label>
        <div className="flex items-center space-x-3">
          <label className="flex-1 flex items-center justify-center px-4 py-3 bg-background border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro">
            <Icon name="DocumentArrowUpIcon" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              {data.architectureDiagram ? data.architectureDiagram.name : 'Upload cloud architecture diagram'}
            </span>
            <input type="file" onChange={handleFileUpload} accept=".png,.jpg,.jpeg,.pdf,.svg" className="hidden" />
          </label>
          {data.architectureDiagram && (
            <button
              onClick={() => onChange({ ...data, architectureDiagram: null })}
              className="p-2 text-error hover:text-error/80 transition-micro"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CloudInfraSection;
