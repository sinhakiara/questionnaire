'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface UserRole {
  id: string;
  roleName: string;
  permissions: string;
}

interface WebAppsData {
  urls: string[];
  techStack: string[];
  authMechanisms: string[];
  userRoles: UserRole[];
  sitemapFile: File | null;
}

interface WebAppsSectionProps {
  data: WebAppsData;
  onChange: (data: WebAppsData) => void;
}

const WebAppsSection = ({ data, onChange }: WebAppsSectionProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [newRole, setNewRole] = useState({ roleName: '', permissions: '' });

  const techStackOptions = [
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Django',
    'Ruby on Rails',
    'ASP.NET',
    'PHP',
    'Java Spring',
    'Other',
  ];

  const authOptions = [
    'OAuth 2.0',
    'SAML',
    'JWT',
    'Session-based',
    'Basic Auth',
    'API Keys',
    'Multi-factor Authentication',
    'Single Sign-On (SSO)',
  ];

  const addUrl = () => {
    if (newUrl.trim()) {
      onChange({ ...data, urls: [...data.urls, newUrl.trim()] });
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    onChange({ ...data, urls: data.urls.filter((_, i) => i !== index) });
  };

  const toggleTechStack = (tech: string) => {
    const updated = data.techStack.includes(tech)
      ? data.techStack.filter((t) => t !== tech)
      : [...data.techStack, tech];
    onChange({ ...data, techStack: updated });
  };

  const toggleAuthMechanism = (auth: string) => {
    const updated = data.authMechanisms.includes(auth)
      ? data.authMechanisms.filter((a) => a !== auth)
      : [...data.authMechanisms, auth];
    onChange({ ...data, authMechanisms: updated });
  };

  const addUserRole = () => {
    if (newRole.roleName.trim() && newRole.permissions.trim()) {
      onChange({
        ...data,
        userRoles: [
          ...data.userRoles,
          { id: Date.now().toString(), roleName: newRole.roleName, permissions: newRole.permissions },
        ],
      });
      setNewRole({ roleName: '', permissions: '' });
    }
  };

  const removeUserRole = (id: string) => {
    onChange({ ...data, userRoles: data.userRoles.filter((role) => role.id !== id) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ ...data, sitemapFile: file });
  };

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="GlobeAltIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Web Applications</h3>
          <p className="text-sm text-muted-foreground">Configure web application testing parameters</p>
        </div>
      </div>

      {/* URLs */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Application URLs</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addUrl()}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addUrl}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
        {data.urls.length > 0 && (
          <div className="space-y-2">
            {data.urls.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-foreground truncate">{url}</span>
                <button
                  onClick={() => removeUrl(index)}
                  className="text-error hover:text-error/80 transition-micro"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Technology Stack */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Technology Stack</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {techStackOptions.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTechStack(tech)}
              className={`px-3 py-2 text-sm rounded-md border transition-micro ${
                data.techStack.includes(tech)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:border-primary/50'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Authentication Mechanisms */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Authentication Mechanisms</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {authOptions.map((auth) => (
            <label key={auth} className="flex items-center space-x-2 p-3 bg-background border border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro">
              <input
                type="checkbox"
                checked={data.authMechanisms.includes(auth)}
                onChange={() => toggleAuthMechanism(auth)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm text-foreground">{auth}</span>
            </label>
          ))}
        </div>
      </div>

      {/* User Roles */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">User Roles & Permissions</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newRole.roleName}
            onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
            placeholder="Role name (e.g., Admin)"
            className="px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              value={newRole.permissions}
              onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
              placeholder="Permissions (e.g., Read, Write, Delete)"
              className="flex-1 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={addUserRole}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro"
            >
              <Icon name="PlusIcon" size={20} />
            </button>
          </div>
        </div>
        {data.userRoles.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Role Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Permissions</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.userRoles.map((role) => (
                  <tr key={role.id} className="border-t border-border">
                    <td className="px-4 py-2 text-sm text-foreground">{role.roleName}</td>
                    <td className="px-4 py-2 text-sm text-foreground">{role.permissions}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeUserRole(role.id)}
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

      {/* Sitemap Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Sitemap Upload (Optional)</label>
        <div className="flex items-center space-x-3">
          <label className="flex-1 flex items-center justify-center px-4 py-3 bg-background border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-micro">
            <Icon name="DocumentArrowUpIcon" size={20} className="text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              {data.sitemapFile ? data.sitemapFile.name : 'Choose file or drag here'}
            </span>
            <input type="file" onChange={handleFileUpload} accept=".xml,.txt" className="hidden" />
          </label>
          {data.sitemapFile && (
            <button
              onClick={() => onChange({ ...data, sitemapFile: null })}
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

export default WebAppsSection;
