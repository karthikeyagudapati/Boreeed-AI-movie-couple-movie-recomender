
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Globe, Tv, Film } from "lucide-react";

interface OTTPlatform {
  id: string;
  name: string;
  color: string;
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

  const ottPlatforms: OTTPlatform[] = [
    {
      id: 'netflix',
      name: 'Netflix',
      color: 'bg-red-600',
      logo: '🎬',
      description: 'Global streaming giant with diverse content',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil']
    },
    {
      id: 'amazon-prime',
      name: 'Amazon Prime Video',
      color: 'bg-blue-600',
      logo: '📺',
      description: 'Amazon\'s premium streaming service',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan']
    },
    {
      id: 'disney-hotstar',
      name: 'Disney+ Hotstar',
      color: 'bg-blue-500',
      logo: '🏰',
      description: 'Disney content plus Indian entertainment',
      availableCountries: ['India', 'Indonesia', 'Malaysia', 'Thailand', 'Singapore']
    },
    {
      id: 'zee5',
      name: 'ZEE5',
      color: 'bg-purple-600',
      logo: '🎭',
      description: 'Indian entertainment platform',
      availableCountries: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia']
    },
    {
      id: 'voot',
      name: 'Voot',
      color: 'bg-orange-500',
      logo: '📱',
      description: 'Viacom18\'s digital platform',
      availableCountries: ['India', 'United Kingdom', 'United States']
    },
    {
      id: 'hulu',
      name: 'Hulu',
      color: 'bg-green-500',
      logo: '🌟',
      description: 'Popular US streaming service',
      availableCountries: ['United States', 'Japan']
    },
    {
      id: 'hbo-max',
      name: 'HBO Max',
      color: 'bg-purple-700',
      logo: '👑',
      description: 'Premium HBO content and more',
      availableCountries: ['United States', 'Latin America']
    },
    {
      id: 'apple-tv',
      name: 'Apple TV+',
      color: 'bg-gray-800',
      logo: '🍎',
      description: 'Apple\'s original content platform',
      availableCountries: ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan']
    }
  ];

  const countries = [
    'United States', 'India', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'Brazil', 'Indonesia', 'Malaysia', 
    'Thailand', 'Singapore', 'Latin America'
  ];

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
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your Universal OTT Recommendation Engine
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get personalized movie and show recommendations across all major streaming platforms. 
              Select your country and preferred OTT service to discover content you'll love.
            </p>
          </div>

          {/* Country Selection */}
          <div className="mb-12">
            <Card className="bg-gray-800/50 border-gray-700 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold">Select Your Country</h3>
                </div>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {countries.map(country => (
                      <SelectItem 
                        key={country} 
                        value={country}
                        className="text-white hover:bg-gray-700"
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* OTT Platform Selection */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
              <Tv className="h-8 w-8 text-red-500" />
              Choose Your Streaming Platform
            </h2>
            
            {!selectedCountry && (
              <p className="text-yellow-400 mb-6">⚠️ Please select a country to see available platforms</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {getAvailablePlatforms().map((platform) => (
                <Card 
                  key={platform.id} 
                  className={`cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 ${
                    selectedPlatform === platform.id 
                      ? 'border-red-500 bg-red-900/30' 
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-400'
                  } ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handlePlatformClick(platform.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}>
                      {platform.logo}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{platform.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{platform.description}</p>
                    
                    {selectedCountry && platform.availableCountries.includes(selectedCountry) && (
                      <Badge className="bg-green-600 text-white">
                        Available in {selectedCountry}
                      </Badge>
                    )}
                    
                    {selectedCountry && !platform.availableCountries.includes(selectedCountry) && (
                      <Badge variant="outline" className="border-red-500 text-red-400">
                        Not available in {selectedCountry}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          {selectedPlatform && selectedCountry && (
            <div className="mt-12">
              <Card className="bg-gradient-to-r from-red-600 to-purple-600 border-none max-w-md mx-auto">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Film className="h-12 w-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-2">Ready to Discover?</h3>
                    <p className="text-sm mb-4 text-gray-100">
                      You've selected {ottPlatforms.find(p => p.id === selectedPlatform)?.name} in {selectedCountry}
                    </p>
                    <Button 
                      className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
                      onClick={() => onPlatformSelect(selectedPlatform, selectedCountry)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StreamSense AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
              <p className="text-gray-400">Support for 8+ major streaming platforms across multiple countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
              <p className="text-gray-400">AI-powered suggestions based on your viewing history and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Platform</h3>
              <p className="text-gray-400">Discover content across all your subscribed streaming services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTTSelector;
