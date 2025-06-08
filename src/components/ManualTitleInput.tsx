
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface ManualTitleInputProps {
  userId: string;
  manualTitles: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddTitle: () => void;
  onRemoveTitle: (titleIndex: number) => void;
}

const ManualTitleInput: React.FC<ManualTitleInputProps> = ({
  userId,
  manualTitles,
  inputValue,
  onInputChange,
  onAddTitle,
  onRemoveTitle
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddTitle();
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2 text-gray-200">
        Or manually enter movie/show titles you've watched:
      </label>
      <div className="flex gap-2">
        <Input
          placeholder="Enter movie/show title"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
          onKeyPress={handleKeyPress}
        />
        <Button
          onClick={onAddTitle}
          variant="outline"
          size="sm"
          className="border-gray-500 text-gray-200 hover:bg-gray-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {manualTitles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {manualTitles.map((title, titleIndex) => (
            <Badge key={titleIndex} variant="secondary" className="bg-gray-600 text-gray-200 text-xs">
              {title}
              <button
                onClick={() => onRemoveTitle(titleIndex)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualTitleInput;
