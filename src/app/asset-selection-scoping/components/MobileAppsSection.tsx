'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MobileApp {
  id: string;
  name: string;
  platform: string;
  features: string;
  binaryFile: File | null;
}

interface MobileAppsSectionProps {
  apps: MobileApp[];
  onChange: (apps: MobileApp[]) => void;
}

const MobileAppsSection = ({ apps, onChange }: MobileAppsSectionProps) => {
  const [newApp, setNewApp] = useState<MobileApp>({
    id: '',
    name: '',
    platform: '',
    features: '',
    binaryFile: null,
  });

  const platforms = ['iOS', 'Android', 'React Native', 'Flutter', 'Xamarin', 'Ionic'];

  const addApp = () => {
    if (newApp.name.trim() && newApp.platform) {
      onChange([...apps, { ...newApp, id: Date.now().toString() }]);
      setNewApp({ id: '', name: '', platform: '', features: '', binaryFile: null });
    }
  };

  const removeApp = (id: string) => {
    onChange(apps.filter((app) => app.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewApp({ ...newApp, binaryFile: file });
  };

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="DevicePhoneMobileIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Mobile Applications</h3>
          <p className="text-sm text-muted-foreground">Configure mobile app testing parameters</p>
        </div>
      </div>

      {/* Add New App Form */}
      <div className="space-y-4 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">App Name</label>
            <input
              type="text"
              value={newApp.name}
              onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
              placeholder="MyApp"
              className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Platform</label>
            <select
              value={newApp.platform}
              onChange={(e) => setNewApp({ ...newApp, platform: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select platform</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Key Features</label>
          <textarea
            value={newApp.features}
            onChange={(e) => setNewApp({ ...newApp, features: e.target.value })}
            placeholder="Describe main features (e.g., User authentication, Payment processing, GPS tracking)"
            rows={3}
            className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">App Binary (Optional)</label>
          <label className="flex items-center justify-center px-4 py-3 bg-background border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro">
            <Icon name="DocumentArrowUpIcon" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              {newApp.binaryFile ? newApp.binaryFile.name : 'Upload .apk or .ipa file'}
            </span>
            <input type="file" onChange={handleFileUpload} accept=".apk,.ipa" className="hidden" />
          </label>
        </div>

        <button
          onClick={addApp}
          disabled={!newApp.name.trim() || !newApp.platform}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="PlusIcon" size={20} className="inline mr-2" />
          Add Mobile App
        </button>
      </div>

      {/* Apps List */}
      {apps.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Added Applications ({apps.length})</h4>
          <div className="space-y-3">
            {apps.map((app) => (
              <div key={app.id} className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm font-semibold text-foreground">{app.name}</h5>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                        {app.platform}
                      </span>
                    </div>
                    {app.features && (
                      <p className="text-sm text-muted-foreground">{app.features}</p>
                    )}
                    {app.binaryFile && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="DocumentIcon" size={14} />
                        <span>{app.binaryFile.name}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeApp(app.id)}
                    className="text-error hover:text-error/80 transition-micro"
                  >
                    <Icon name="TrashIcon" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppsSection;
