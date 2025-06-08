
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
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
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-200">Upload Viewing History (CSV/Excel)</label>
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
              {uploadedFile ? uploadedFile.name : 'Choose CSV/Excel file'}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ViewingHistoryUpload;
