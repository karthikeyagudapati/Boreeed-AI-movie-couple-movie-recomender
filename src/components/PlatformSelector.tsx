
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { availablePlatforms } from '@/utils/movieDatabase';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformChange
}) => {
  const handlePlatformToggle = (platform: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...selectedPlatforms, platform]
      : selectedPlatforms.filter(p => p !== platform);
    onPlatformChange(newPlatforms);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-200">OTT Subscriptions</label>
      <div className="grid grid-cols-2 gap-2">
        {availablePlatforms.slice(0, 4).map((platform) => (
          <div key={platform} className="flex items-center space-x-2 bg-gray-600/30 p-2 rounded">
            <Checkbox
              id={`platform-${platform}`}
              checked={selectedPlatforms.includes(platform)}
              onCheckedChange={(checked) => handlePlatformToggle(platform, checked as boolean)}
              className="border-gray-400"
            />
            <label htmlFor={`platform-${platform}`} className="text-xs cursor-pointer text-gray-200">
              {platform}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;
