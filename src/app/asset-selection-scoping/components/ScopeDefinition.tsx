'use client';

import Icon from '@/components/ui/AppIcon';

interface ScopeDefinitionData {
  inScope: string;
  outOfScope: string;
  geoRestrictions: string;
}

interface ScopeDefinitionProps {
  data: ScopeDefinitionData;
  onChange: (data: ScopeDefinitionData) => void;
}

const ScopeDefinition = ({ data, onChange }: ScopeDefinitionProps) => {
  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="DocumentTextIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scope Definition</h3>
          <p className="text-sm text-muted-foreground">Define clear boundaries for the engagement</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* In Scope */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            <Icon name="CheckCircleIcon" size={16} className="inline text-success mr-1" variant="solid" />
            In-Scope Assets & Activities
          </label>
          <textarea
            value={data.inScope}
            onChange={(e) => onChange({ ...data, inScope: e.target.value })}
            placeholder="Clearly define what is included in the testing scope. Be specific about systems, applications, networks, and testing activities that are authorized."
            rows={5}
            className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Example: All web applications on *.example.com, production API endpoints, internal network 10.0.0.0/8,
            social engineering via email
          </p>
        </div>

        {/* Out of Scope */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            <Icon name="XCircleIcon" size={16} className="inline text-error mr-1" variant="solid" />
            Out-of-Scope Assets & Activities
          </label>
          <textarea
            value={data.outOfScope}
            onChange={(e) => onChange({ ...data, outOfScope: e.target.value })}
            placeholder="Specify what is explicitly excluded from testing. Include systems, networks, or activities that should not be tested under any circumstances."
            rows={5}
            className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Example: Third-party payment processors, customer production databases, physical security testing, DoS
            attacks
          </p>
        </div>

        {/* Geographic/Regulatory Restrictions */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            <Icon name="GlobeAltIcon" size={16} className="inline text-warning mr-1" />
            Geographic & Regulatory Restrictions
          </label>
          <textarea
            value={data.geoRestrictions}
            onChange={(e) => onChange({ ...data, geoRestrictions: e.target.value })}
            placeholder="Describe any geographic limitations, regulatory requirements, or compliance constraints that apply to the testing engagement."
            rows={4}
            className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Example: Testing must originate from US-based IP addresses only, GDPR compliance required for EU data,
            PCI-DSS restrictions apply
          </p>
        </div>
      </div>

      <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" variant="solid" />
          <div>
            <p className="text-sm font-medium text-warning">Important</p>
            <p className="text-xs text-warning/80 mt-1">
              Clear scope definition is critical for legal protection and successful engagement. Any ambiguity may
              result in unauthorized testing or missed vulnerabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeDefinition;
