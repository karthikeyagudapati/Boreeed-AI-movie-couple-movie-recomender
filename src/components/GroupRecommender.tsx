
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Upload, Users, Plus, X, Star, ArrowLeft, Play } from "lucide-react";

interface User {
  id: string;
  name: string;
  platforms: string[];
  preferences: string[];
  viewingHistory?: File;
}

interface GroupRecommenderProps {
  platform: string;
  country: string;
  onBack: () => void;
}

const GroupRecommender: React.FC<GroupRecommenderProps> = ({ platform, country, onBack }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: '', platforms: [], preferences: [] }
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const availablePlatforms = [
    'Netflix', 'Amazon Prime Video', 'Disney+ Hotstar', 'ZEE5', 'Voot', 
    'Hulu', 'HBO Max', 'Apple TV+', 'Paramount+', 'Peacock'
  ];

  // Platform theme colors
  const getThemeColors = () => {
    switch (platform) {
      case 'netflix':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400'
        };
      case 'amazon-prime':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-700',
          accent: 'border-blue-500',
          text: 'text-blue-400'
        };
      case 'disney-hotstar':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-600',
          accent: 'border-blue-400',
          text: 'text-blue-300'
        };
      case 'zee5':
        return {
          primary: 'bg-purple-600',
          secondary: 'bg-purple-700',
          accent: 'border-purple-500',
          text: 'text-purple-400'
        };
      case 'voot':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-600',
          accent: 'border-orange-400',
          text: 'text-orange-400'
        };
      default:
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400'
        };
    }
  };

  const theme = getThemeColors();

  const addUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: '',
      platforms: [],
      preferences: []
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (userId: string) => {
    if (users.length > 1) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const updateUser = (userId: string, field: keyof User, value: any) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };

  const handleFileUpload = (userId: string, file: File) => {
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.name.endsWith('.xlsx'))) {
      updateUser(userId, 'viewingHistory', file);
    } else {
      alert('Please upload a valid CSV or Excel file');
    }
  };

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          title: 'Stranger Things',
          description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
          genres: ['Sci-Fi', 'Horror', 'Drama'],
          year: 2016,
          rating: 4.6,
          matchPercentage: 94,
          availableOn: ['Netflix'],
          commonInterest: 85
        },
        {
          id: 2,
          title: 'The Crown',
          description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
          genres: ['Drama', 'Biography', 'History'],
          year: 2016,
          rating: 4.4,
          matchPercentage: 89,
          availableOn: ['Netflix'],
          commonInterest: 78
        },
        {
          id: 3,
          title: 'Money Heist',
          description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.',
          genres: ['Crime', 'Drama', 'Thriller'],
          year: 2017,
          rating: 4.3,
          matchPercentage: 87,
          availableOn: ['Netflix'],
          commonInterest: 82
        },
        {
          id: 4,
          title: 'Bridgerton',
          description: 'Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.',
          genres: ['Romance', 'Drama'],
          year: 2020,
          rating: 4.1,
          matchPercentage: 83,
          availableOn: ['Netflix'],
          commonInterest: 75
        },
        {
          id: 5,
          title: 'The Witcher',
          description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
          genres: ['Fantasy', 'Action', 'Adventure'],
          year: 2019,
          rating: 4.2,
          matchPercentage: 86,
          availableOn: ['Netflix'],
          commonInterest: 80
        },
        {
          id: 6,
          title: 'Wednesday',
          description: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.',
          genres: ['Comedy', 'Horror', 'Mystery'],
          year: 2022,
          rating: 4.3,
          matchPercentage: 88,
          availableOn: ['Netflix'],
          commonInterest: 84
        },
        {
          id: 7,
          title: 'Squid Game',
          description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize.',
          genres: ['Thriller', 'Drama', 'Action'],
          year: 2021,
          rating: 4.5,
          matchPercentage: 91,
          availableOn: ['Netflix'],
          commonInterest: 88
        },
        {
          id: 8,
          title: 'Dark',
          description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.',
          genres: ['Sci-Fi', 'Drama', 'Mystery'],
          year: 2017,
          rating: 4.7,
          matchPercentage: 93,
          availableOn: ['Netflix'],
          commonInterest: 90
        },
        {
          id: 9,
          title: 'Ozark',
          description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
          genres: ['Crime', 'Drama', 'Thriller'],
          year: 2017,
          rating: 4.4,
          matchPercentage: 85,
          availableOn: ['Netflix'],
          commonInterest: 79
        },
        {
          id: 10,
          title: 'Emily in Paris',
          description: 'A young American woman from the Midwest is hired by a marketing firm in Paris to provide them with an American perspective on things.',
          genres: ['Comedy', 'Drama', 'Romance'],
          year: 2020,
          rating: 3.9,
          matchPercentage: 76,
          availableOn: ['Netflix'],
          commonInterest: 68
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header with Theme Colors */}
      <div className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Platform Selection
            </Button>
            <div className="flex items-center gap-4">
              <Badge className={`${theme.primary} text-white font-semibold px-4 py-2`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50">
                {country}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Group Setup */}
        <Card className="mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className={`h-8 w-8 ${theme.text}`} />
              <h2 className="text-2xl font-bold text-white">Set Up Your Group</h2>
            </div>

            <ScrollArea className="h-96 w-full">
              <div className="space-y-4">
                {users.map((user, index) => (
                  <Card key={user.id} className="bg-gray-700/70 border-gray-500 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">User {index + 1}</h3>
                        {users.length > 1 && (
                          <Button
                            onClick={() => removeUser(user.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-300 hover:text-red-200 hover:bg-red-900/30"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-200">Name</label>
                          <Input
                            placeholder="Enter name"
                            value={user.name}
                            onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                            className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-200">OTT Subscriptions</label>
                          <div className="grid grid-cols-2 gap-2">
                            {availablePlatforms.slice(0, 4).map((platform) => (
                              <div key={platform} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${user.id}-${platform}`}
                                  checked={user.platforms.includes(platform)}
                                  onCheckedChange={(checked) => {
                                    const newPlatforms = checked
                                      ? [...user.platforms, platform]
                                      : user.platforms.filter(p => p !== platform);
                                    updateUser(user.id, 'platforms', newPlatforms);
                                  }}
                                />
                                <label htmlFor={`${user.id}-${platform}`} className="text-xs cursor-pointer text-gray-200">
                                  {platform}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-200">Upload Viewing History (Optional)</label>
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(user.id, file);
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Button
              onClick={addUser}
              variant="outline"
              className={`mt-4 ${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Friend
            </Button>
          </CardContent>
        </Card>

        {/* Genre Selection */}
        <Card className="mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-white">Select Preferred Genres</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(selectedGenres.filter(g => g !== genre));
                      }
                    }}
                  />
                  <label htmlFor={genre} className="text-sm cursor-pointer text-gray-200">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={generateRecommendations}
          disabled={isLoading || users.some(user => !user.name)}
          className={`w-full ${theme.primary} hover:${theme.secondary} text-white font-semibold py-4 mb-8`}
        >
          {isLoading ? 'Finding Perfect Matches for Your Group...' : 'Get Group Recommendations'}
        </Button>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <Play className={`h-6 w-6 ${theme.text}`} />
              Perfect for Your Group ({recommendations.length} recommendations)
            </h2>

            <div className="space-y-4">
              {recommendations.map((movie) => (
                <Card key={movie.id} className="bg-gray-800/70 border-gray-600 hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                        <p className="text-gray-200 text-sm mb-3 leading-relaxed">{movie.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {movie.genres.map((genre: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-gray-600 text-gray-200 text-xs border-0">
                              {genre}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <span>Year: {movie.year}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            {movie.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 ml-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{movie.matchPercentage}%</div>
                          <div className="text-xs text-gray-300">Group Match</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{movie.commonInterest}%</div>
                          <div className="text-xs text-gray-300">Common Interest</div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {movie.availableOn.map((platform: string) => (
                            <Badge key={platform} className={`${theme.primary} text-white text-xs border-0`}>
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRecommender;
