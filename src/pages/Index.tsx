
import React, { useState } from 'react';
import OTTSelector from "@/components/OTTSelector";
import GroupRecommender from "@/components/GroupRecommender";
import RecommendationVisualizations from "@/components/RecommendationVisualizations";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Github, FileText, Play, Moon, Sun, Phone, ExternalLink, Linkedin } from "lucide-react";

const Index = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showRecommender, setShowRecommender] = useState<boolean>(false);

  const handlePlatformSelect = (platform: string, country: string) => {
    setSelectedPlatform(platform);
    setSelectedCountry(country);
    setShowRecommender(true);
  };

  const handleBackToSelection = () => {
    setShowRecommender(false);
    setSelectedPlatform(null);
    setSelectedCountry(null);
  };

  const themeClasses = isDarkTheme 
    ? "bg-black text-white" 
    : "bg-gray-50 text-gray-900";

  const navClasses = isDarkTheme 
    ? "bg-black/90 border-gray-800" 
    : "bg-white/90 border-gray-200";

  const cardClasses = isDarkTheme 
    ? "bg-gray-900/50 border-gray-700" 
    : "bg-white/90 border-gray-200";

  const buttonVariant = isDarkTheme ? "ghost" : "outline";

  // If a platform is selected and we're showing the recommender
  if (showRecommender && selectedPlatform && selectedCountry) {
    return (
      <GroupRecommender 
        platform={selectedPlatform}
        country={selectedCountry}
        onBack={handleBackToSelection}
      />
    );
  }

  // Show the main landing page with OTT selector
  return (
    <div className={`min-h-screen ${themeClasses} overflow-x-hidden`}>
      {/* Navigation */}
      <nav className={`${navClasses} backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center space-x-3">
                <div className="text-red-600 text-2xl sm:text-3xl font-black tracking-tight">BOREEED</div>
              </div>
              <div className="hidden md:flex space-x-6">
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Home</span>
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Platforms</span>
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Features</span>
                <span className="text-red-500 font-medium cursor-pointer">AI Recommender</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch 
                  checked={isDarkTheme}
                  onCheckedChange={setIsDarkTheme}
                />
                <Moon className="h-4 w-4" />
              </div>
              <Button 
                variant={buttonVariant} 
                size="sm"
                className={`${isDarkTheme ? "text-white hover:text-gray-300 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
                onClick={() => window.open('https://github.com/karthikeyagudapati', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - OTT Selector */}
      <OTTSelector onPlatformSelect={handlePlatformSelect} />

      {/* Features Section */}
      <div className={`py-12 sm:py-20 px-4 ${isDarkTheme ? "bg-gray-900/30" : "bg-gray-100/50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>Advanced algorithms analyze both users' preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Open Source</h3>
              <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>Built with transparency and community in mind</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data-Driven</h3>
              <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>Powered by real user behavior and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizations Section */}
      <div className={`py-12 sm:py-16 px-4 ${isDarkTheme ? "bg-gray-800/30" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <Card className={`${cardClasses} backdrop-blur-md rounded-lg shadow-2xl`}>
            <CardContent className="p-4 sm:p-8">
              <div className={`p-4 sm:p-8 rounded-xl ${isDarkTheme ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                <RecommendationVisualizations />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Developer Section */}
      <div className={`py-12 px-4 ${isDarkTheme ? "bg-gray-900/50" : "bg-gray-100/30"}`}>
        <div className="max-w-7xl mx-auto">
          <Card className={`${cardClasses} shadow-xl`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
                  Built by Karthikeya Gudapati
                </h3>
                <p className={`text-base sm:text-lg mb-6 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                  Passionate about AI, Machine Learning, and creating innovative recommendation systems
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 font-semibold border-2 ${
                      isDarkTheme 
                        ? "border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent" 
                        : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                    }`}
                    onClick={() => window.open('https://github.com/karthikeyagudapati', '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 font-semibold border-2 ${
                      isDarkTheme 
                        ? "border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent" 
                        : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    }`}
                    onClick={() => window.open('https://www.linkedin.com/in/karthikeya-gudapati-6a5b52266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank')}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 font-semibold border-2 ${
                      isDarkTheme 
                        ? "border-green-500 text-green-400 hover:bg-green-600 hover:text-white bg-transparent" 
                        : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                    }`}
                    onClick={() => window.open('tel:+918309480281', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Contact</span>
                  </Button>
                </div>
                
                <div className={`mt-4 text-sm font-medium ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                  Open to collaboration and new opportunities in AI/ML
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 sm:py-12 px-4 border-t ${isDarkTheme ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-red-600 text-xl sm:text-2xl font-black">BOREEED</span>
            <span className={`text-lg sm:text-xl font-light ${isDarkTheme ? "text-white" : "text-gray-900"}`}>AI Recommender</span>
          </div>
          <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
            Built with passion for data science and machine learning • Universal OTT Recommendation Platform
          </p>
          <div className={`mt-4 text-xs ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
            This is a portfolio project demonstrating joint recommendation systems across multiple streaming platforms
          </div>
          <div className={`mt-2 text-xs font-medium ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
            © 2024 Karthikeya Gudapati - All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
