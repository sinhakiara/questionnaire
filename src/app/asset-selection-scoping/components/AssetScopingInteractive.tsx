'use client';

import { useState, useEffect } from 'react';
import AssetTypeSelector from './AssetTypeSelector';
import WebAppsSection from './WebAppsSection';
import APIsSection from './APIsSection';
import CloudInfraSection from './CloudInfraSection';
import MobileAppsSection from './MobileAppsSection';
import NetworksSection from './NetworksSection';
import OtherAssetsSection from './OtherAssetsSection';
import ScopeDefinition from './ScopeDefinition';
import ValidationFeedback from '@/components/common/ValidationFeedback';

interface ValidationError {
  field: string;
  message: string;
}

const AssetScopingInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Web Apps Data
  const [webAppsData, setWebAppsData] = useState({
    urls: [],
    techStack: [],
    authMechanisms: [],
    userRoles: [],
    sitemapFile: null,
  });

  // APIs Data
  const [apisData, setAPIsData] = useState({
    baseUrls: [],
    documentationFile: null,
    authType: '',
    keyEndpoints: [],
  });

  // Cloud Infrastructure Data
  const [cloudData, setCloudData] = useState({
    providers: [],
    keyServices: '',
    sharedResponsibility: '',
    architectureDiagram: null,
  });

  // Mobile Apps Data
  const [mobileApps, setMobileApps] = useState([]);

  // Networks Data
  const [networkRanges, setNetworkRanges] = useState([]);

  // Other Assets Data
  const [otherAssetsData, setOtherAssetsData] = useState({
    description: '',
  });

  // Scope Definition Data
  const [scopeData, setScopeData] = useState({
    inScope: '',
    outOfScope: '',
    geoRestrictions: '',
  });

  useEffect(() => {
    setIsHydrated(true);
    
    // Load saved data from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('assetScopingData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setSelectedAssets(parsed.selectedAssets || []);
          setWebAppsData(parsed.webAppsData || webAppsData);
          setAPIsData(parsed.apisData || apisData);
          setCloudData(parsed.cloudData || cloudData);
          setMobileApps(parsed.mobileApps || []);
          setNetworkRanges(parsed.networkRanges || []);
          setOtherAssetsData(parsed.otherAssetsData || otherAssetsData);
          setScopeData(parsed.scopeData || scopeData);
        } catch (error) {
          console.error('Error loading saved data:', error);
        }
      }
    }
  }, []);

  const handleAssetToggle = (assetId: string) => {
    setSelectedAssets((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  const handleSaveDraft = () => {
    if (!isHydrated) return;
    
    setSaveStatus('saving');
    
    const dataToSave = {
      selectedAssets,
      webAppsData,
      apisData,
      cloudData,
      mobileApps,
      networkRanges,
      otherAssetsData,
      scopeData,
      lastSaved: new Date().toISOString(),
    };

    try {
      localStorage.setItem('assetScopingData', JSON.stringify(dataToSave));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];

    if (selectedAssets.length === 0) {
      errors.push({
        field: 'Asset Selection',
        message: 'Please select at least one asset type',
      });
    }

    if (selectedAssets.includes('web-apps') && webAppsData.urls.length === 0) {
      errors.push({
        field: 'Web Applications',
        message: 'Please add at least one URL for web applications',
      });
    }

    if (selectedAssets.includes('apis') && apisData.baseUrls.length === 0) {
      errors.push({
        field: 'APIs',
        message: 'Please add at least one base URL for APIs',
      });
    }

    if (selectedAssets.includes('cloud') && cloudData.providers.length === 0) {
      errors.push({
        field: 'Cloud Infrastructure',
        message: 'Please select at least one cloud provider',
      });
    }

    if (selectedAssets.includes('mobile') && mobileApps.length === 0) {
      errors.push({
        field: 'Mobile Applications',
        message: 'Please add at least one mobile application',
      });
    }

    if (selectedAssets.includes('networks') && networkRanges.length === 0) {
      errors.push({
        field: 'Networks',
        message: 'Please add at least one network range',
      });
    }

    if (selectedAssets.includes('other') && !otherAssetsData.description.trim()) {
      errors.push({
        field: 'Other Assets',
        message: 'Please provide a description for other assets',
      });
    }

    if (!scopeData.inScope.trim()) {
      errors.push({
        field: 'Scope Definition',
        message: 'Please define in-scope assets and activities',
      });
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading asset scoping form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <ValidationFeedback
          errors={validationErrors}
          type="summary"
          onDismiss={() => setValidationErrors([])}
        />
      )}

      {/* Asset Type Selection */}
      <AssetTypeSelector selectedAssets={selectedAssets} onAssetToggle={handleAssetToggle} />

      {/* Conditional Asset Sections */}
      {selectedAssets.length > 0 && (
        <div className="space-y-6">
          {selectedAssets.includes('web-apps') && (
            <WebAppsSection data={webAppsData} onChange={setWebAppsData} />
          )}

          {selectedAssets.includes('apis') && <APIsSection data={apisData} onChange={setAPIsData} />}

          {selectedAssets.includes('cloud') && (
            <CloudInfraSection data={cloudData} onChange={setCloudData} />
          )}

          {selectedAssets.includes('mobile') && (
            <MobileAppsSection apps={mobileApps} onChange={setMobileApps} />
          )}

          {selectedAssets.includes('networks') && (
            <NetworksSection ranges={networkRanges} onChange={setNetworkRanges} />
          )}

          {selectedAssets.includes('other') && (
            <OtherAssetsSection data={otherAssetsData} onChange={setOtherAssetsData} />
          )}

          {/* Scope Definition - Always show when assets are selected */}
          <ScopeDefinition data={scopeData} onChange={setScopeData} />
        </div>
      )}
    </div>
  );
};

export default AssetScopingInteractive;
