import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ConsultantInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  alt: string;
  responseTime: string;
}

interface ConsultantContactProps {
  consultant: ConsultantInfo;
}

export default function ConsultantContact({ consultant }: ConsultantContactProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="UserCircleIcon" size={24} className="text-primary" />
        <span>Your Assigned Consultant</span>
      </h3>
      
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary">
          <AppImage
            src={consultant.image}
            alt={consultant.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-semibold text-foreground">{consultant.name}</h4>
          <p className="text-sm text-muted-foreground mb-3">{consultant.title}</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground" />
              <a href={`mailto:${consultant.email}`} className="text-primary hover:underline">
                {consultant.email}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="PhoneIcon" size={16} className="text-muted-foreground" />
              <a href={`tel:${consultant.phone}`} className="text-foreground hover:text-primary">
                {consultant.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="ClockIcon" size={16} className="text-success" />
          <span className="text-muted-foreground">Expected Response Time:</span>
          <span className="font-semibold text-foreground">{consultant.responseTime}</span>
        </div>
      </div>
    </div>
  );
}
