'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigationItems = [
    { label: 'Business Context', path: '/client-business-context' },
    { label: 'Engagement', path: '/engagement-preferences' },
    { label: 'Environment', path: '/environment-overview' },
    { label: 'Asset Scoping', path: '/asset-selection-scoping' },
    { label: 'Review', path: '/review-edit-summary' },
  ];

  const moreItems = [
    { label: 'Submit & Download', path: '/submit-pdf-download' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-card border-b border-border shadow-form ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-micro">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="ShieldCheckIcon" size={24} className="text-primary-foreground" variant="solid" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground leading-tight">PenTest</span>
            <span className="text-xs text-muted-foreground leading-tight">Questionnaire</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
            >
              {item.label}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro flex items-center space-x-1">
              <span>More</span>
              <Icon name="ChevronDownIcon" size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-interactive opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-micro">
              {moreItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro first:rounded-t-md last:rounded-b-md"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Utilities */}
        <div className="flex items-center space-x-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
            aria-label="Toggle dark mode"
          >
            <Icon name={isDarkMode ? 'SunIcon' : 'MoonIcon'} size={20} />
          </button>

          {/* Help */}
          <button
            className="hidden md:flex p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
            aria-label="Help"
          >
            <Icon name="QuestionMarkCircleIcon" size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-4 py-3 space-y-1">
            {[...navigationItems, ...moreItems].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro flex items-center space-x-2"
            >
              <Icon name="QuestionMarkCircleIcon" size={20} />
              <span>Help</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
