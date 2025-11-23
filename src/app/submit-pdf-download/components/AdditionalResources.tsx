import Icon from '@/components/ui/AppIcon';

interface Resource {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface AdditionalResourcesProps {
  resources: Resource[];
}

export default function AdditionalResources({ resources }: AdditionalResourcesProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="BookOpenIcon" size={24} className="text-primary" />
        <span>Additional Resources</span>
      </h3>
      
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-muted hover:bg-muted/80 rounded-md p-4 transition-micro group"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-micro">
                <Icon name={resource.icon as any} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-micro">
                    {resource.title}
                  </h4>
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} className="text-muted-foreground group-hover:text-primary transition-micro" />
                </div>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
