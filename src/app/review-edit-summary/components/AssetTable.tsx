import Icon from '@/components/ui/AppIcon';

interface Asset {
  id: string;
  type: string;
  name: string;
  details: string;
  scope: 'in-scope' | 'out-of-scope';
  priority: 'high' | 'medium' | 'low';
}

interface AssetTableProps {
  assets: Asset[];
}

const AssetTable = ({ assets }: AssetTableProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getScopeIcon = (scope: string) => {
    return scope === 'in-scope' ? (
      <Icon name="CheckCircleIcon" size={16} className="text-success" variant="solid" />
    ) : (
      <Icon name="XCircleIcon" size={16} className="text-error" variant="solid" />
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Asset Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Details</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Scope</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b border-border hover:bg-muted/50 transition-micro">
              <td className="px-4 py-3 text-sm text-foreground font-medium">{asset.type}</td>
              <td className="px-4 py-3 text-sm text-foreground">{asset.name}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{asset.details}</td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  {getScopeIcon(asset.scope)}
                  <span className="text-sm text-foreground capitalize">{asset.scope}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(asset.priority)}`}>
                  {asset.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{asset.type}</p>
                <p className="text-sm text-muted-foreground mt-1">{asset.name}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(asset.priority)}`}>
                {asset.priority}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{asset.details}</p>
            <div className="flex items-center space-x-2">
              {getScopeIcon(asset.scope)}
              <span className="text-sm text-foreground capitalize">{asset.scope}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetTable;
