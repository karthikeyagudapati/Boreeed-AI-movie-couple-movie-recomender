
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Plus } from "lucide-react";
import { User, ThemeColors } from '@/types/groupRecommender';
import UserCard from './UserCard';

interface GroupSetupProps {
  users: User[];
  platform: string;
  theme: ThemeColors;
  manualTitleInput: {[key: string]: string};
  onAddUser: () => void;
  onRemoveUser: (userId: string) => void;
  onUpdateUser: (userId: string, field: keyof User, value: any) => void;
  onAddManualTitle: (userId: string) => void;
  onRemoveManualTitle: (userId: string, titleIndex: number) => void;
  onFileUpload: (userId: string, file: File) => void;
  onManualTitleInputChange: (userId: string, value: string) => void;
}

const GroupSetup: React.FC<GroupSetupProps> = ({
  users,
  platform,
  theme,
  manualTitleInput,
  onAddUser,
  onRemoveUser,
  onUpdateUser,
  onAddManualTitle,
  onRemoveManualTitle,
  onFileUpload,
  onManualTitleInputChange
}) => {
  return (
    <Card className="mb-6 sm:mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className={`h-6 sm:h-8 w-6 sm:w-8 ${theme.text}`} />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Set Up Your Group</h2>
        </div>

        <ScrollArea className="h-80 sm:h-96 w-full">
          <div className="space-y-4">
            {users.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                platform={platform}
                theme={theme}
                manualTitleInput={manualTitleInput[user.id] || ''}
                canRemove={users.length > 1}
                onRemove={() => onRemoveUser(user.id)}
                onUpdateUser={(field, value) => onUpdateUser(user.id, field, value)}
                onAddManualTitle={() => onAddManualTitle(user.id)}
                onRemoveManualTitle={(titleIndex) => onRemoveManualTitle(user.id, titleIndex)}
                onFileUpload={(file) => onFileUpload(user.id, file)}
                onManualTitleInputChange={(value) => onManualTitleInputChange(user.id, value)}
              />
            ))}
          </div>
        </ScrollArea>

        <Button
          onClick={onAddUser}
          variant="outline"
          className={`mt-4 ${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Friend
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupSetup;
