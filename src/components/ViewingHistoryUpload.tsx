
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Download, Zap } from "lucide-react";
import { getPlatformInstructions } from '@/utils/platformInstructions';

interface ViewingHistoryUploadProps {
  platform: string;
  uploadedFile?: File;
  onFileUpload: (file: File) => void;
}

const ViewingHistoryUpload: React.FC<ViewingHistoryUploadProps> = ({
  platform,
  uploadedFile,
  onFileUpload
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  const fileInputId = `file-${Date.now()}`;

  return (
    <div className="mt-4">
      {/* Cross-Platform Feature Info */}
      <div className="mb-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Cross-Platform Recommendations
          </span>
        </div>
        <p className="text-xs text-blue-200">
          Upload your Netflix viewing history to get personalized recommendations for {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')} and all other platforms based on your Netflix preferences!
        </p>
      </div>

      {/* Platform Instructions */}
      <div className="mb-4 p-3 bg-gray-600/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Download className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-200">
            Viewing History Instructions for {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}:
          </span>
        </div>
        <p className="text-xs text-gray-300">
          {getPlatformInstructions(platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' '))}
        </p>
        <div className="mt-2 p-2 bg-green-600/20 border border-green-500/30 rounded text-xs text-green-200">
          <strong>Pro Tip:</strong> Even if you're browsing {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}, you can upload your Netflix CSV file to get cross-platform recommendations!
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-200">
          Upload Viewing History (CSV/Excel) - Any Platform
        </label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id={fileInputId}
        />
        <label htmlFor={fileInputId}>
          <Button variant="outline" className="w-full border-gray-500 text-gray-200 hover:bg-gray-600 bg-gray-700/50" asChild>
            <span>
              <Upload className="h-4 w-4 mr-2" />
              {uploadedFile ? `${uploadedFile.name} ✓` : 'Choose Netflix CSV or other platform file'}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ViewingHistoryUpload;
