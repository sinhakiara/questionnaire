'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LegalAgreementProps {
  onAcceptanceChange: (accepted: boolean, auditConsent: boolean) => void;
}

const LegalAgreement = ({ onAcceptanceChange }: LegalAgreementProps) => {
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [auditConsent, setAuditConsent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNdaChange = (checked: boolean) => {
    setNdaAccepted(checked);
    onAcceptanceChange(checked, auditConsent);
  };

  const handleAuditChange = (checked: boolean) => {
    setAuditConsent(checked);
    onAcceptanceChange(ndaAccepted, checked);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-muted/50 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="DocumentTextIcon" size={24} className="text-primary" variant="solid" />
          <div>
            <h3 className="text-base font-semibold text-foreground">Legal Agreement & Consent</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Please review and accept the terms before submission
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* NDA Terms Preview */}
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-sm font-semibold text-foreground">
              Non-Disclosure Agreement (NDA) Terms
            </h4>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <div className="mt-3 p-4 bg-muted/30 rounded-md text-sm text-muted-foreground space-y-2 max-h-64 overflow-y-auto">
              <p>
                <strong>1. Confidential Information:</strong> All information disclosed during the penetration testing engagement, including but not limited to system architectures, vulnerabilities, security controls, and business processes, shall be considered confidential.
              </p>
              <p>
                <strong>2. Non-Disclosure:</strong> The testing organization agrees to maintain strict confidentiality of all information obtained during the engagement and will not disclose such information to any third party without prior written consent.
              </p>
              <p>
                <strong>3. Data Protection:</strong> All questionnaire responses and engagement data will be encrypted using AES-256 encryption and stored securely with access limited to authorized personnel only.
              </p>
              <p>
                <strong>4. Retention Period:</strong> Confidential information will be retained only for the duration necessary to complete the engagement and will be securely destroyed upon completion or as mutually agreed.
              </p>
              <p>
                <strong>5. Compliance:</strong> Both parties agree to comply with all applicable data protection regulations including GDPR, CCPA, and industry-specific compliance requirements.
              </p>
            </div>
          )}
        </div>

        {/* NDA Acceptance Checkbox */}
        <div className="mb-4">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
              <input
                type="checkbox"
                checked={ndaAccepted}
                onChange={(e) => handleNdaChange(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground group-hover:text-foreground/80 transition-micro">
                <span className="font-semibold">I accept the NDA terms</span> and acknowledge that all information provided in this questionnaire is confidential and will be handled in accordance with the agreement.
              </p>
              {!ndaAccepted && (
                <p className="text-xs text-error mt-1 flex items-center space-x-1">
                  <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
                  <span>Required to proceed with submission</span>
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Audit Logging Consent */}
        <div className="pt-4 border-t border-border">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
              <input
                type="checkbox"
                checked={auditConsent}
                onChange={(e) => handleAuditChange(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground group-hover:text-foreground/80 transition-micro">
                <span className="font-semibold">Enable audit logging</span> (Optional)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Allow detailed logging of questionnaire interactions for compliance and security audit purposes. Logs include timestamps, field modifications, and user actions.
              </p>
            </div>
          </label>
        </div>

        {/* Encryption Notice */}
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md flex items-start space-x-2">
          <Icon name="LockClosedIcon" size={16} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
          <p className="text-xs text-success">
            All submitted data will be encrypted using AES-256 encryption before transmission and storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalAgreement;
