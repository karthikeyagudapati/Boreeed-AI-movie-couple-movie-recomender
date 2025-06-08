
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Users, Plus, X, Download } from "lucide-react";
import { User, ThemeColors } from '@/types/groupRecommender';
import { availablePlatforms } from '@/utils/movieDatabase';
import { getPlatformInstructions } from '@/utils/platformInstructions';

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
              <Card key={user.id} className="bg-gray-700/70 border-gray-500 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">User {index + 1}</h3>
                    {users.length > 1 && (
                      <Button
                        onClick={() => onRemoveUser(user.id)}
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
                        onChange={(e) => onUpdateUser(user.id, 'name', e.target.value)}
                        className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">OTT Subscriptions</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availablePlatforms.slice(0, 4).map((platform) => (
                          <div key={platform} className="flex items-center space-x-2 bg-gray-600/30 p-2 rounded">
                            <Checkbox
                              id={`${user.id}-${platform}`}
                              checked={user.platforms.includes(platform)}
                              onCheckedChange={(checked) => {
                                const newPlatforms = checked
                                  ? [...user.platforms, platform]
                                  : user.platforms.filter(p => p !== platform);
                                onUpdateUser(user.id, 'platforms', newPlatforms);
                              }}
                              className="border-gray-400"
                            />
                            <label htmlFor={`${user.id}-${platform}`} className="text-xs cursor-pointer text-gray-200">
                              {platform}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Platform Instructions */}
                  <div className="mt-4 p-3 bg-gray-600/30 rounded-lg">
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
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2 text-gray-200">Upload Viewing History (CSV/Excel)</label>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileUpload(user.id, file);
                      }}
                      className="hidden"
                      id={`file-${user.id}`}
                    />
                    <label htmlFor={`file-${user.id}`}>
                      <Button variant="outline" className="w-full border-gray-500 text-gray-200 hover:bg-gray-600 bg-gray-700/50" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          {user.viewingHistory ? user.viewingHistory.name : 'Choose CSV/Excel file'}
                        </span>
                      </Button>
                    </label>
                  </div>

                  {/* Manual Title Input */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Or manually enter movie/show titles you've watched:
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter movie/show title"
                        value={manualTitleInput[user.id] || ''}
                        onChange={(e) => onManualTitleInputChange(user.id, e.target.value)}
                        className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && onAddManualTitle(user.id)}
                      />
                      <Button
                        onClick={() => onAddManualTitle(user.id)}
                        variant="outline"
                        size="sm"
                        className="border-gray-500 text-gray-200 hover:bg-gray-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {user.manualTitles && user.manualTitles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {user.manualTitles.map((title, titleIndex) => (
                          <Badge key={titleIndex} variant="secondary" className="bg-gray-600 text-gray-200 text-xs">
                            {title}
                            <button
                              onClick={() => onRemoveManualTitle(user.id, titleIndex)}
                              className="ml-2 text-red-400 hover:text-red-300"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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
