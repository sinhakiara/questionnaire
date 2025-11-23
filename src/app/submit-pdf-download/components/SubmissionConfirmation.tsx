import Icon from '@/components/ui/AppIcon';

interface SubmissionConfirmationProps {
  referenceNumber: string;
  submissionDate: string;
  submissionTime: string;
}

export default function SubmissionConfirmation({
  referenceNumber,
  submissionDate,
  submissionTime,
}: SubmissionConfirmationProps) {
  return (
    <div className="bg-success/10 border-2 border-success rounded-lg p-6 md:p-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={28} className="text-success-foreground" variant="solid" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Questionnaire Submitted Successfully
          </h2>
          <p className="text-muted-foreground mb-4">
            Thank you for completing the PenTest Questionnaire. Your responses have been securely submitted and encrypted.
          </p>
          <div className="bg-card rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Reference Number:</span>
              <span className="text-sm font-mono font-semibold text-foreground">{referenceNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Submission Date:</span>
              <span className="text-sm font-semibold text-foreground">{submissionDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Submission Time:</span>
              <span className="text-sm font-semibold text-foreground">{submissionTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
