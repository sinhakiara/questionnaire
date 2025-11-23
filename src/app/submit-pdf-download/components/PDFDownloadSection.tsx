'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PDFDownloadSectionProps {
  documentInfo: {
    pageCount: number;
    fileSize: string;
    generatedAt: string;
  };
  clientName: string;
  onDownload: () => void;
  onEmailDelivery: () => void;
}

export default function PDFDownloadSection({
  documentInfo,
  clientName,
  onDownload,
  onEmailDelivery,
}: PDFDownloadSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload();
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const handleEmailDelivery = async () => {
    setIsEmailSending(true);
    await onEmailDelivery();
    setTimeout(() => setIsEmailSending(false), 2000);
  };

  // Generate dynamic filename
  const pdfFileName = `PenTest_Questionnaire_${clientName}_${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="DocumentTextIcon" size={24} className="text-primary" />
        <span>Questionnaire Document</span>
      </h3>
      
      <div className="bg-muted rounded-md p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-16 bg-error rounded flex items-center justify-center">
            <Icon name="DocumentIcon" size={28} className="text-error-foreground" variant="solid" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground break-all">{pdfFileName}</h4>
            <p className="text-xs text-muted-foreground mt-1">Complete questionnaire with all responses</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Pages</p>
            <p className="text-sm font-semibold text-foreground">{documentInfo.pageCount}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Size</p>
            <p className="text-sm font-semibold text-foreground">{documentInfo.fileSize}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Generated</p>
            <p className="text-sm font-semibold text-foreground">{documentInfo.generatedAt}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-micro disabled:opacity-50 disabled:cursor-not-allowed shadow-interactive"
        >
          {isDownloading ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span className="font-medium">Downloading...</span>
            </>
          ) : (
            <>
              <Icon name="ArrowDownTrayIcon" size={20} />
              <span className="font-medium">Download PDF</span>
            </>
          )}
        </button>

        <button
          onClick={handleEmailDelivery}
          disabled={isEmailSending}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEmailSending ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span className="font-medium">Sending...</span>
            </>
          ) : (
            <>
              <Icon name="EnvelopeIcon" size={20} />
              <span className="font-medium">Email to Me</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Document includes security watermarks and encryption metadata
      </p>
    </div>
  );
}
