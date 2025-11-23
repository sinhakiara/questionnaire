import React from 'react';

interface InfoRowProps {
  label: string;
  value: string | string[] | React.ReactNode;
  className?: string;
}

const InfoRow = ({ label, value, className = '' }: InfoRowProps) => {
  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
    return <p className="text-foreground">{value}</p>;
  };

  return (
    <div className={`py-3 border-b border-border last:border-b-0 ${className}`}>
      <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
      {renderValue()}
    </div>
  );
};

export default InfoRow;
