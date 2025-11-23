'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Endpoint {
  id: string;
  path: string;
  method: string;
}

interface APIsData {
  baseUrls: string[];
  documentationFile: File | null;
  authType: string;
  keyEndpoints: Endpoint[];
}

interface APIsSectionProps {
  data: APIsData;
  onChange: (data: APIsData) => void;
}

const APIsSection = ({ data, onChange }: APIsSectionProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [newEndpoint, setNewEndpoint] = useState({ path: '', method: 'GET' });

  const authTypes = ['OAuth 2.0', 'API Key', 'JWT Bearer Token', 'Basic Auth', 'HMAC', 'None'];
  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const addBaseUrl = () => {
    if (newUrl.trim()) {
      onChange({ ...data, baseUrls: [...data.baseUrls, newUrl.trim()] });
      setNewUrl('');
    }
  };

  const removeBaseUrl = (index: number) => {
    onChange({ ...data, baseUrls: data.baseUrls.filter((_, i) => i !== index) });
  };

  const addEndpoint = () => {
    if (newEndpoint.path.trim()) {
      onChange({
        ...data,
        keyEndpoints: [
          ...data.keyEndpoints,
          { id: Date.now().toString(), path: newEndpoint.path, method: newEndpoint.method },
        ],
      });
      setNewEndpoint({ path: '', method: 'GET' });
    }
  };

  const removeEndpoint = (id: string) => {
    onChange({ ...data, keyEndpoints: data.keyEndpoints.filter((ep) => ep.id !== id) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ ...data, documentationFile: file });
  };

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CodeBracketIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">APIs</h3>
          <p className="text-sm text-muted-foreground">Configure API endpoint testing parameters</p>
        </div>
      </div>

      {/* Base URLs */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Base URLs</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addBaseUrl()}
            placeholder="https://api.example.com/v1"
            className="flex-1 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addBaseUrl}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
        {data.baseUrls.length > 0 && (
          <div className="space-y-2">
            {data.baseUrls.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-foreground truncate">{url}</span>
                <button
                  onClick={() => removeBaseUrl(index)}
                  className="text-error hover:text-error/80 transition-micro"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Authentication Type */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Authentication Type</label>
        <select
          value={data.authType}
          onChange={(e) => onChange({ ...data, authType: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select authentication type</option>
          {authTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Key Endpoints */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Key Endpoints</label>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <select
            value={newEndpoint.method}
            onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value })}
            className="md:col-span-3 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {httpMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newEndpoint.path}
            onChange={(e) => setNewEndpoint({ ...newEndpoint, path: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addEndpoint()}
            placeholder="/users/{id}"
            className="md:col-span-7 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addEndpoint}
            className="md:col-span-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
        {data.keyEndpoints.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Method</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Endpoint Path</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.keyEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="border-t border-border">
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === 'GET' ?'bg-success/10 text-success'
                            : endpoint.method === 'POST' ?'bg-primary/10 text-primary'
                            : endpoint.method === 'DELETE' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-foreground font-mono">{endpoint.path}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeEndpoint(endpoint.id)}
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
        )}
      </div>

      {/* Documentation Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">API Documentation (Optional)</label>
        <div className="flex items-center space-x-3">
          <label className="flex-1 flex items-center justify-center px-4 py-3 bg-background border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro">
            <Icon name="DocumentArrowUpIcon" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              {data.documentationFile ? data.documentationFile.name : 'Upload Swagger/OpenAPI spec'}
            </span>
            <input type="file" onChange={handleFileUpload} accept=".json,.yaml,.yml" className="hidden" />
          </label>
          {data.documentationFile && (
            <button
              onClick={() => onChange({ ...data, documentationFile: null })}
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

export default APIsSection;
