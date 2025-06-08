
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { User, ThemeColors } from '@/types/groupRecommender';
import PlatformSelector from './PlatformSelector';
import ViewingHistoryUpload from './ViewingHistoryUpload';
import ManualTitleInput from './ManualTitleInput';

interface UserCardProps {
  user: User;
  index: number;
  platform: string;
  theme: ThemeColors;
  manualTitleInput: string;
  canRemove: boolean;
  onRemove: () => void;
  onUpdateUser: (field: keyof User, value: any) => void;
  onAddManualTitle: () => void;
  onRemoveManualTitle: (titleIndex: number) => void;
  onFileUpload: (file: File) => void;
  onManualTitleInputChange: (value: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  index,
  platform,
  theme,
  manualTitleInput,
  canRemove,
  onRemove,
  onUpdateUser,
  onAddManualTitle,
  onRemoveManualTitle,
  onFileUpload,
  onManualTitleInputChange
}) => {
  return (
    <Card className="bg-gray-700/70 border-gray-500 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">User {index + 1}</h3>
          {canRemove && (
            <Button
              onClick={onRemove}
              variant="ghost"
              size="sm"
              className="text-red-300 hover:text-red-200 hover:bg-red-900/30"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Name</label>
            <Input
              placeholder="Enter name"
              value={user.name}
              onChange={(e) => onUpdateUser('name', e.target.value)}
              className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
            />
          </div>

          <PlatformSelector
            selectedPlatforms={user.platforms}
            onPlatformChange={(platforms) => onUpdateUser('platforms', platforms)}
          />
        </div>

        <ViewingHistoryUpload
          platform={platform}
          uploadedFile={user.viewingHistory}
          onFileUpload={onFileUpload}
        />

        <ManualTitleInput
          userId={user.id}
          manualTitles={user.manualTitles || []}
          inputValue={manualTitleInput}
          onInputChange={onManualTitleInputChange}
          onAddTitle={onAddManualTitle}
          onRemoveTitle={onRemoveManualTitle}
        />
      </CardContent>
    </Card>
  );
};

export default UserCard;
