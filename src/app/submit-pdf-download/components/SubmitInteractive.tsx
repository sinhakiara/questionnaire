'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf'; // 1. IMPORT JSPDF
import SubmissionConfirmation from './SubmissionConfirmation';
import NextStepsTimeline from './NextStepsTimeline';
import PDFDownloadSection from './PDFDownloadSection';
import ConsultantContact from './ConsultantContact';
import SecurityConfirmation from './SecurityConfirmation';
import EngagementSummary from './EngagementSummary';
import AdditionalResources from './AdditionalResources';

// ... (keep all your existing interfaces: TimelineStep, ConsultantInfo, etc.)
interface TimelineStep {
  title: string;
  description: string;
  timeframe: string;
  icon: string;
  completed: boolean;
}

interface ConsultantInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  alt: string;
  responseTime: string;
}

interface SecurityDetail {
  label: string;
  value: string;
  icon: string;
}

interface SummaryItem {
  label: string;
  value: string;
  icon: string;
}

interface Resource {
  title: string;
  description: string;
  icon: string;
  link: string;
}


export default function SubmitInteractive() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [clientName, setClientName] = useState<string>('Client');

  useEffect(() => {
    setIsHydrated(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);

    // Load client name from localStorage
    loadClientName();
  }, []);

  const loadClientName = () => {
    if (typeof window === 'undefined') return;

    try {
      const businessContext = localStorage.getItem('pentest-business-context');
      if (businessContext) {
        const data = JSON.parse(businessContext);
        if (data?.companyName) {
          // Sanitize company name for filename (remove special characters)
          const sanitizedName = data.companyName.replace(/[^a-zA-Z0-9]/g, '_');
          setClientName(sanitizedName);
        }
      }
    } catch (error) {
      console.error('Error loading client name:', error);
    }
  };

  const referenceNumber = 'PT-2025-11-23-7891';
  const submissionDate = '11/23/2025';
  const submissionTime = '07:19 AM';

  const timelineSteps: TimelineStep[] = [
    // ... (keep your existing timelineSteps data)
    {
      title: 'Questionnaire Submitted',
      description: 'Your responses have been received and are being reviewed by our security team.',
      timeframe: 'Completed',
      icon: 'CheckCircleIcon',
      completed: true
    },
    {
      title: 'Initial Review',
      description: 'Our consultant will review your responses and prepare preliminary recommendations.',
      timeframe: '1-2 Business Days',
      icon: 'DocumentMagnifyingGlassIcon',
      completed: false
    },
    {
      title: 'Consultation Call',
      description: 'Schedule a call to discuss scope, timeline, and address any questions.',
      timeframe: '3-5 Business Days',
      icon: 'PhoneIcon',
      completed: false
    },
    {
      title: 'Proposal Delivery',
      description: 'Receive detailed proposal with scope, methodology, timeline, and pricing.',
      timeframe: '5-7 Business Days',
      icon: 'DocumentTextIcon',
      completed: false
    },
    {
      title: 'Engagement Kickoff',
      description: 'Sign agreement and begin penetration testing engagement.',
      timeframe: '2-3 Weeks',
      icon: 'RocketLaunchIcon',
      completed: false
    }
  ];

  const consultantInfo: ConsultantInfo = {
    // ... (keep your existing consultantInfo data)
    name: 'Sarah Mitchell',
    title: 'Senior Security Consultant',
    email: 'sarah.mitchell@pentestconsulting.com',
    phone: '+1 (555) 123-4567',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    alt: 'Professional headshot of woman with shoulder-length brown hair in navy blazer smiling at camera',
    responseTime: '24-48 hours'
  };

  const securityDetails: SecurityDetail[] = [
    // ... (keep your existing securityDetails data)
    {
      label: 'Encryption Status',
      value: 'AES-256 encryption applied to all submitted data',
      icon: 'LockClosedIcon'
    },
    {
      label: 'Data Handling',
      value: 'GDPR and CCPA compliant processing and storage',
      icon: 'ShieldCheckIcon'
    },
    {
      label: 'Retention Policy',
      value: 'Data retained for 90 days post-engagement or until deletion requested',
      icon: 'ClockIcon'
    },
    {
      label: 'Access Control',
      value: 'Limited to assigned consultant and authorized security personnel only',
      icon: 'UserGroupIcon'
    }
  ];

  const summaryItems: SummaryItem[] = [
    // ... (keep your existing summaryItems data)
    {
      label: 'Engagement Type',
      value: 'Comprehensive Security Assessment',
      icon: 'ShieldCheckIcon'
    },
    {
      label: 'Estimated Timeline',
      value: '4-6 weeks',
      icon: 'CalendarIcon'
    },
    {
      label: 'Scope Complexity',
      value: 'Medium to High',
      icon: 'ChartBarIcon'
    },
    {
      label: 'Asset Types',
      value: 'Web Apps, APIs, Cloud Infrastructure',
      icon: 'ServerIcon'
    }
  ];

  const resources: Resource[] = [
    // ... (keep your existing resources data)
    {
      title: 'Penetration Testing Preparation Guide',
      description: 'Best practices for preparing your team and infrastructure for testing',
      icon: 'DocumentTextIcon',
      link: '#'
    },
    {
      title: 'Security Assessment Methodology',
      description: 'Learn about our testing approach and industry-standard frameworks',
      icon: 'AcademicCapIcon',
      link: '#'
    },
    {
      title: 'Engagement Process Overview',
      description: 'Detailed walkthrough of what to expect during the engagement',
      icon: 'MapIcon',
      link: '#'
    },
    {
      title: 'Compliance & Regulatory Resources',
      description: 'Information on meeting security compliance requirements',
      icon: 'ClipboardDocumentCheckIcon',
      link: '#'
    }
  ];

  const documentInfo = {
    pageCount: 12,
    fileSize: '2.4 MB',
    generatedAt: '07:19 AM'
  };

  // 2. UPDATED handleDownload FUNCTION
  const handleDownload = async () => {
    if (!isHydrated) return;

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate PDF filename with client name
      const fileName = `PenTest_Questionnaire_${clientName}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Initialize jsPDF
      const doc = new jsPDF();

      // --- Add Content to the PDF ---
      // Set font sizes
      doc.setFontSize(20);
      doc.text('Penetration Testing Questionnaire', 20, 20);

      doc.setFontSize(12);
      doc.text(`Reference Number: ${referenceNumber}`, 20, 35);
      doc.text(`Client: ${clientName.replace(/_/g, ' ')}`, 20, 45);
      doc.text(`Submission Date: ${submissionDate} at ${submissionTime}`, 20, 55);

      // Add a line break
      doc.setLineWidth(0.5);
      doc.line(20, 65, 190, 65);

      // Add section title
      doc.setFontSize(16);
      doc.text('Engagement Summary', 20, 80);
      doc.setFontSize(12);
      summaryItems.forEach((item, index) => {
        doc.text(`${item.label}: ${item.value}`, 20, 90 + (index * 7));
      });

      // Add another section
      doc.setFontSize(16);
      doc.text('Security & Compliance', 20, 130);
      doc.setFontSize(12);
      securityDetails.forEach((detail, index) => {
        const lines = doc.splitTextToSize(`${detail.label}: ${detail.value}`, 170);
        doc.text(lines, 20, 140 + (index * 10));
      });
      
      // Add a footer
      doc.setFontSize(10);
      doc.text(`This document was generated on ${new Date().toLocaleString()} and is confidential.`, 20, 280);

      // Save the PDF
      doc.save(fileName);

      console.log('PDF download completed:', fileName);
    } catch (error) {
      console.error('PDF download failed:', error);
    }
  };

  const handleEmailDelivery = async () => {
    if (!isHydrated) return;

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would call an API here
    console.log('Email delivery initiated for:', consultantInfo.email);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded-lg" />
              <div className="h-96 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Toast Notification */}
      {showToast &&
        <div className="fixed top-20 right-6 z-50 max-w-md w-full bg-card border border-border rounded-lg shadow-interactive animate-slide-in">
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Submission Successful</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your questionnaire has been submitted and PDF generated successfully.
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      }

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Submission Confirmation */}
        <div className="mb-8">
          <SubmissionConfirmation
            referenceNumber={referenceNumber}
            submissionDate={submissionDate}
            submissionTime={submissionTime}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PDFDownloadSection
              documentInfo={documentInfo}
              clientName={clientName}
              onDownload={handleDownload}
              onEmailDelivery={handleEmailDelivery}
            />
            <ConsultantContact consultant={consultantInfo} />
            <SecurityConfirmation securityDetails={securityDetails} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <NextStepsTimeline steps={timelineSteps} />
            <EngagementSummary summaryItems={summaryItems} />
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-6">
          <AdditionalResources resources={resources} />
        </div>

        {/* Footer Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-sm font-semibold text-foreground mb-1">Need to make changes?</h4>
              <p className="text-sm text-muted-foreground">
                You can return to the review page to edit your responses before final submission.
              </p>
            </div>
            <button
              onClick={() => router.push('/review-edit-summary')}
              className="px-6 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-micro"
            >
              Back to Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
