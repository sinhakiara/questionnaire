'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NetworkRange {
  id: string;
  ipRange: string;
  protocols: string;
  type: string;
}

interface NetworksSectionProps {
  ranges: NetworkRange[];
  onChange: (ranges: NetworkRange[]) => void;
}

const NetworksSection = ({ ranges, onChange }: NetworksSectionProps) => {
  const [newRange, setNewRange] = useState<NetworkRange>({
    id: '',
    ipRange: '',
    protocols: '',
    type: 'internal',
  });

  const addRange = () => {
    if (newRange.ipRange.trim() && newRange.protocols.trim()) {
      onChange([...ranges, { ...newRange, id: Date.now().toString() }]);
      setNewRange({ id: '', ipRange: '', protocols: '', type: 'internal' });
    }
  };

  const removeRange = (id: string) => {
    onChange(ranges.filter((range) => range.id !== id));
  };

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="ServerIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Networks</h3>
          <p className="text-sm text-muted-foreground">Configure network infrastructure testing scope</p>
        </div>
      </div>

      {/* Add New Range Form */}
      <div className="space-y-4 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">IP Range/CIDR</label>
            <input
              type="text"
              value={newRange.ipRange}
              onChange={(e) => setNewRange({ ...newRange, ipRange: e.target.value })}
              placeholder="192.168.1.0/24 or 10.0.0.1-10.0.0.255"
              className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Network Type</label>
            <select
              value={newRange.type}
              onChange={(e) => setNewRange({ ...newRange, type: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="internal">Internal Network</option>
              <option value="external">External Network</option>
              <option value="dmz">DMZ</option>
              <option value="wireless">Wireless Network</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Protocols & Ports</label>
          <input
            type="text"
            value={newRange.protocols}
            onChange={(e) => setNewRange({ ...newRange, protocols: e.target.value })}
            placeholder="TCP/80, TCP/443, UDP/53, SSH/22"
            className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Specify protocols and ports to be tested (comma-separated)
          </p>
        </div>

        <button
          onClick={addRange}
          disabled={!newRange.ipRange.trim() || !newRange.protocols.trim()}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="PlusIcon" size={20} className="inline mr-2" />
          Add Network Range
        </button>
      </div>

      {/* Ranges List */}
      {ranges.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Network Ranges ({ranges.length})</h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">IP Range</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Protocols/Ports</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ranges.map((range) => (
                  <tr key={range.id} className="border-t border-border">
                    <td className="px-4 py-2 text-sm text-foreground font-mono">{range.ipRange}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          range.type === 'internal' ?'bg-success/10 text-success'
                            : range.type === 'external' ?'bg-warning/10 text-warning' :'bg-primary/10 text-primary'
                        }`}
                      >
                        {range.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-foreground">{range.protocols}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeRange(range.id)}
                        className="text-error hover:text-error/80 transition-micro"
                      >
                        <Icon name="TrashIcon" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworksSection;
