
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Globe, Tv, Film, Search } from "lucide-react";

interface OTTPlatform {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  logo: string;
  description: string;
  availableCountries: string[];
}

interface OTTSelectorProps {
  onPlatformSelect: (platform: string, country: string) => void;
}

const OTTSelector: React.FC<OTTSelectorProps> = ({ onPlatformSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [countrySearch, setCountrySearch] = useState<string>('');

  const ottPlatforms: OTTPlatform[] = [
    {
      id: 'netflix',
      name: 'Netflix',
      color: 'border-red-500',
      bgColor: 'bg-red-600',
      textColor: 'text-white',
      logo: '🎬',
      description: 'Global streaming giant with diverse content',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'South Korea', 'Mexico', 'Spain', 'Italy', 'Netherlands']
    },
    {
      id: 'amazon-prime',
      name: 'Amazon Prime Video',
      color: 'border-blue-500',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      logo: '📺',
      description: 'Amazon\'s premium streaming service',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'Mexico', 'Spain', 'Italy']
    },
    {
      id: 'disney-hotstar',
      name: 'Disney+ Hotstar',
      color: 'border-blue-400',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      logo: '🏰',
      description: 'Disney content plus Indian entertainment',
      availableCountries: ['India', 'Indonesia', 'Malaysia', 'Thailand', 'Singapore', 'Philippines']
    },
    {
      id: 'zee5',
      name: 'ZEE5',
      color: 'border-purple-500',
      bgColor: 'bg-purple-600',
      textColor: 'text-white',
      logo: '🎭',
      description: 'Indian entertainment platform',
      availableCountries: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Singapore']
    },
    {
      id: 'voot',
      name: 'Voot',
      color: 'border-orange-500',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
      logo: '📱',
      description: 'Viacom18\'s digital platform',
      availableCountries: ['India', 'United Kingdom', 'United States', 'Canada', 'Australia']
    },
    {
      id: 'hulu',
      name: 'Hulu',
      color: 'border-green-500',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      logo: '🌟',
      description: 'Popular US streaming service',
      availableCountries: ['United States', 'Japan']
    },
    {
      id: 'hbo-max',
      name: 'HBO Max',
      color: 'border-purple-600',
      bgColor: 'bg-purple-700',
      textColor: 'text-white',
      logo: '👑',
      description: 'Premium HBO content and more',
      availableCountries: ['United States', 'Latin America', 'Europe']
    },
    {
      id: 'apple-tv',
      name: 'Apple TV+',
      color: 'border-gray-500',
      bgColor: 'bg-gray-800',
      textColor: 'text-white',
      logo: '🍎',
      description: 'Apple\'s original content platform',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'Mexico']
    },
    {
      id: 'paramount-plus',
      name: 'Paramount+',
      color: 'border-blue-600',
      bgColor: 'bg-blue-700',
      textColor: 'text-white',
      logo: '⭐',
      description: 'CBS and Paramount content',
      availableCountries: ['United States', 'Canada', 'Australia', 'United Kingdom', 'Ireland']
    },
    {
      id: 'peacock',
      name: 'Peacock',
      color: 'border-indigo-500',
      bgColor: 'bg-indigo-600',
      textColor: 'text-white',
      logo: '🦚',
      description: 'NBCUniversal\'s streaming service',
      availableCountries: ['United States', 'United Kingdom', 'Ireland', 'Germany']
    }
  ];

  const countries = [
    'United States', 'India', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'Brazil', 'Indonesia', 'Malaysia', 
    'Thailand', 'Singapore', 'Latin America', 'South Korea', 'Mexico',
    'Spain', 'Italy', 'Netherlands', 'Philippines', 'United Arab Emirates',
    'Ireland', 'Europe'
  ];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const getAvailablePlatforms = () => {
    if (!selectedCountry) return ottPlatforms;
    return ottPlatforms.filter(platform => 
      platform.availableCountries.includes(selectedCountry)
    );
  };

  const handlePlatformClick = (platformId: string) => {
    if (!selectedCountry) {
      alert('Please select a country first!');
      return;
    }
    setSelectedPlatform(platformId);
    onPlatformSelect(platformId, selectedCountry);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              StreamSense AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-medium">
              Universal Group Recommendation Engine for All OTT Platforms
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Perfect for group movie nights! Get recommendations that work for everyone, 
              regardless of which streaming services each person has.
            </p>
          </div>

          {/* Enhanced Country Selection */}
          <div className="mb-12">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-md mx-auto shadow-2xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Select Your Country</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Type to search countries..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30"
                    />
                  </div>
                  
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="h-12 bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Choose your country" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
                      {filteredCountries.map(country => (
                        <SelectItem 
                          key={country} 
                          value={country}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced OTT Platform Selection */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-white">
              <Tv className="h-8 w-8 text-red-500" />
              Choose Your Streaming Platform
            </h2>
            
            {!selectedCountry && (
              <p className="text-yellow-300 mb-6 bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30">
                ⚠️ Please select a country to see available platforms
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {getAvailablePlatforms().map((platform) => (
                <Card 
                  key={platform.id} 
                  className={`cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 backdrop-blur-md ${
                    selectedPlatform === platform.id 
                      ? `${platform.color} bg-white/20 shadow-2xl` 
                      : 'border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15'
                  } ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handlePlatformClick(platform.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${platform.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg`}>
                      {platform.logo}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{platform.name}</h3>
                    <p className="text-sm text-gray-200 mb-4 leading-relaxed">{platform.description}</p>
                    
                    {selectedCountry && platform.availableCountries.includes(selectedCountry) && (
                      <Badge className="bg-green-600 text-white border-0">
                        ✓ Available in {selectedCountry}
                      </Badge>
                    )}
                    
                    {selectedCountry && !platform.availableCountries.includes(selectedCountry) && (
                      <Badge className="bg-red-600 text-white border-0">
                        ✗ Not available in {selectedCountry}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Call to Action */}
          {selectedPlatform && selectedCountry && (
            <div className="mt-12">
              <Card className="bg-gradient-to-r from-red-600 to-purple-600 border-none max-w-md mx-auto shadow-2xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Film className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2 text-white">Ready to Discover?</h3>
                    <p className="text-sm mb-4 text-gray-100">
                      You've selected {ottPlatforms.find(p => p.id === selectedPlatform)?.name} in {selectedCountry}
                    </p>
                    <Button 
                      className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
                      onClick={() => onPlatformSelect(selectedPlatform, selectedCountry)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Group Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Perfect for Group Movie Nights!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Multi-User Support</h3>
              <p className="text-gray-300">Add unlimited friends with different OTT subscriptions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Cross-Platform Recommendations</h3>
              <p className="text-gray-300">Find content available on platforms your group actually has</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">10+ Platforms Supported</h3>
              <p className="text-gray-300">Netflix, Prime Video, Disney+, Hulu, HBO Max, and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTTSelector;
