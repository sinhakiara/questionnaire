import Icon from '@/components/ui/AppIcon';

interface ValidationIssue {
  id: string;
  section: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
  navigationPath: string;
}

interface ValidationPanelProps {
  issues: ValidationIssue[];
  onNavigate: (path: string) => void;
}

const ValidationPanel = ({ issues, onNavigate }: ValidationPanelProps) => {
  if (issues.length === 0) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" variant="solid" />
          <div>
            <h3 className="text-base font-semibold text-success">All Validations Passed</h3>
            <p className="text-sm text-success/80 mt-1">
              Your questionnaire is complete and ready for submission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-error/10 border-b border-error/20 px-6 py-4">
        <div className="flex items-start space-x-3">
          <Icon name="ExclamationTriangleIcon" size={24} className="text-error flex-shrink-0" variant="solid" />
          <div>
            <h3 className="text-base font-semibold text-error">
              {errorCount > 0 ? `${errorCount} Error${errorCount > 1 ? 's' : ''}` : ''} 
              {errorCount > 0 && warningCount > 0 ? ' and ' : ''}
              {warningCount > 0 ? `${warningCount} Warning${warningCount > 1 ? 's' : ''}` : ''} Found
            </h3>
            <p className="text-sm text-error/80 mt-1">
              Please review and correct the following issues before submission:
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {issues.map((issue) => (
          <div key={issue.id} className="px-6 py-4 hover:bg-muted/50 transition-micro">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon
                    name={issue.severity === 'error' ? 'XCircleIcon' : 'ExclamationCircleIcon'}
                    size={16}
                    className={issue.severity === 'error' ? 'text-error' : 'text-warning'}
                    variant="solid"
                  />
                  <p className="text-sm font-medium text-foreground">{issue.section}</p>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  <span className="font-medium">{issue.field}:</span> {issue.message}
                </p>
              </div>
              <button
                onClick={() => onNavigate(issue.navigationPath)}
                className="ml-4 px-3 py-1 text-sm font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-md transition-micro flex-shrink-0"
              >
                Fix Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidationPanel;
