
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface ManualTitleInputProps {
  userId: string;
  titles: string[];
  inputValue: string;
  onInputChange: (userId: string, value: string) => void;
  onAddTitle: (userId: string) => void;
  onRemoveTitle: (userId: string, titleIndex: number) => void;
}

const ManualTitleInput: React.FC<ManualTitleInputProps> = ({
  userId,
  titles,
  inputValue,
  onInputChange,
  onAddTitle,
  onRemoveTitle
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddTitle(userId);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">
        Manually Add Favorite Movies/Shows
      </label>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter movie or show title..."
          value={inputValue}
          onChange={(e) => onInputChange(userId, e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400"
        />
        <Button
          onClick={() => onAddTitle(userId)}
          disabled={!inputValue.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {titles && titles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {titles.map((title, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-600/20 text-blue-200 border border-blue-500/30 px-3 py-1 flex items-center gap-2 hover:bg-blue-600/30 transition-colors"
            >
              <span className="text-xs">{title}</span>
              <X
                className="h-3 w-3 cursor-pointer hover:text-red-400 transition-colors"
                onClick={() => onRemoveTitle(userId, index)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualTitleInput;
