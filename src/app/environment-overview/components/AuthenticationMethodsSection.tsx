'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AuthMethod {
  id: string;
  label: string;
  description: string;
}

interface AuthenticationMethodsSectionProps {
  selectedMethods: string[];
  customDetails: Record<string, string>;
  onChange: (methods: string[], details: Record<string, string>) => void;
  error?: string;
}

const AuthenticationMethodsSection = ({
  selectedMethods,
  customDetails,
  onChange,
  error,
}: AuthenticationMethodsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const authMethods: AuthMethod[] = [
    { id: 'sso', label: 'Single Sign-On (SSO)', description: 'SAML, OAuth, OpenID Connect' },
    { id: 'mfa', label: 'Multi-Factor Authentication (MFA)', description: 'SMS, TOTP, Biometric' },
    { id: 'ldap', label: 'LDAP/Active Directory', description: 'Directory-based authentication' },
    { id: 'oauth', label: 'OAuth 2.0', description: 'Token-based authorization' },
    { id: 'basic', label: 'Basic Authentication', description: 'Username and password' },
    { id: 'certificate', label: 'Certificate-Based', description: 'PKI/SSL certificates' },
    { id: 'custom', label: 'Custom Implementation', description: 'Proprietary authentication system' },
  ];

  const handleMethodToggle = (methodId: string) => {
    const newMethods = selectedMethods.includes(methodId)
      ? selectedMethods.filter((id) => id !== methodId)
      : [...selectedMethods, methodId];
    onChange(newMethods, customDetails);
  };

  const handleDetailChange = (methodId: string, detail: string) => {
    const newDetails = { ...customDetails, [methodId]: detail };
    onChange(selectedMethods, newDetails);
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Authentication Methods *
          </label>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Authentication Methods *
          <span className="text-muted-foreground font-normal ml-2">
            (Select all that apply)
          </span>
        </label>
        <div className="space-y-3">
          {authMethods.map((method) => (
            <div key={method.id} className="space-y-2">
              <label className="flex items-start space-x-3 p-4 bg-card border border-border rounded-md hover:border-primary/50 transition-micro cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedMethods.includes(method.id)}
                  onChange={() => handleMethodToggle(method.id)}
                  className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary transition-micro cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-micro">
                      {method.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                </div>
              </label>

              {selectedMethods.includes(method.id) && (method.id === 'custom' || method.id === 'sso') && (
                <div className="ml-7 pl-4 border-l-2 border-primary/30">
                  <input
                    type="text"
                    value={customDetails[method.id] || ''}
                    onChange={(e) => handleDetailChange(method.id, e.target.value)}
                    placeholder={`Provide details about your ${method.label.toLowerCase()}...`}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-micro"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
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

export default AuthenticationMethodsSection;
