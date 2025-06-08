
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Monitor } from "lucide-react";

interface PlatformModeSelectorProps {
  platform: string;
  crossPlatformMode: boolean;
  onModeChange: (crossPlatform: boolean) => void;
  hasViewingHistory: boolean;
}

const PlatformModeSelector: React.FC<PlatformModeSelectorProps> = ({
  platform,
  crossPlatformMode,
  onModeChange,
  hasViewingHistory
}) => {
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');

  if (!hasViewingHistory) return null;

  return (
    <Card className="mb-6 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
      <CardContent className="pt-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-blue-400" />
          Recommendation Mode
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          Choose how you want to receive recommendations based on your viewing history
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Platform Specific */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-102 ${
              !crossPlatformMode 
                ? 'border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/20' 
                : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
            }`}
            onClick={() => onModeChange(false)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{platformName} Only</h4>
              <Badge variant={!crossPlatformMode ? "default" : "outline"} className="text-xs">
                {!crossPlatformMode ? "Selected" : "Available"}
              </Badge>
            </div>
            <p className="text-xs text-gray-300">
              Get recommendations only from {platformName} based on your viewing history
            </p>
          </div>

          {/* Cross Platform */}
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-102 ${
              crossPlatformMode 
                ? 'border-green-500 bg-green-600/20 shadow-lg shadow-green-500/20' 
                : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
            }`}
            onClick={() => onModeChange(true)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Cross-Platform
              </h4>
              <Badge variant={crossPlatformMode ? "default" : "outline"} className="text-xs">
                {crossPlatformMode ? "Selected" : "Available"}
              </Badge>
            </div>
            <p className="text-xs text-gray-300">
              Get recommendations from all platforms based on your viewing preferences
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformModeSelector;
