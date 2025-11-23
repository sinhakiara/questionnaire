'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface FileUploadSectionProps {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  error?: string;
}

const FileUploadSection = ({ files, onChange, error }: FileUploadSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const allowedTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    Array.from(selectedFiles).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type not allowed: ${file.name}`);
        return;
      }
      if (file.size > maxFileSize) {
        alert(`File too large: ${file.name} (max 10MB)`);
        return;
      }

      newFiles.push({
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      });
    });

    onChange([...files, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    onChange(files.filter((file) => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return 'DocumentTextIcon';
    if (type.includes('image')) return 'PhotoIcon';
    if (type.includes('presentation')) return 'PresentationChartBarIcon';
    if (type.includes('word') || type.includes('document')) return 'DocumentIcon';
    return 'DocumentIcon';
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Architecture Diagrams & Documentation
          </label>
          <div className="h-32 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Architecture Diagrams & Technical Documentation
          <span className="text-muted-foreground font-normal ml-2">
            (Optional - helps us understand your environment)
          </span>
        </label>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-md p-8 text-center transition-micro ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-background'
          }`}
        >
          <Icon name="CloudArrowUpIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supported: PDF, PNG, JPG, PPTX, DOCX (Max 10MB per file)
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-micro"
          >
            Select Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.pptx,.docx"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium text-foreground">Uploaded Files ({files.length})</p>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-md"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Icon name={getFileIcon(file.type) as any} size={20} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-muted-foreground hover:text-error transition-micro ml-2"
                  aria-label="Remove file"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

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

export default FileUploadSection;
