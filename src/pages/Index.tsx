
import React, { useState } from 'react';
import NetflixRecommender from "@/components/NetflixRecommender";
import RecommendationVisualizations from "@/components/RecommendationVisualizations";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Github, FileText, Play, Moon, Sun, Phone, ExternalLink } from "lucide-react";

const Index = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

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

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Netflix Navigation */}
      <nav className={`${navClasses} backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="text-red-600 text-3xl font-black tracking-tight">NETFLIX</div>
              </div>
              <div className="hidden md:flex space-x-6">
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Home</span>
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>TV Shows</span>
                <span className={`hover:text-gray-300 cursor-pointer ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Movies</span>
                <span className="text-red-500 font-medium cursor-pointer">AI Recommender</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
                className={`${isDarkTheme ? "text-white hover:text-gray-300 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
                onClick={() => window.open('https://github.com/karthikeyagudapati', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant={buttonVariant} className={`${isDarkTheme ? "text-white hover:text-gray-300 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}>
                <FileText className="w-4 h-4 mr-2" />
                Docs
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
              Find Your Perfect
              <span className="text-red-600"> Movie </span>
              Match
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto font-light ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Our AI combines two users' preferences to recommend movies you'll both love. 
              No more endless scrolling or settling for compromise.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold">
                <Play className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className={`px-8 py-3 text-lg font-semibold border-2 ${
                  isDarkTheme 
                    ? "border-white text-white hover:bg-white hover:text-black bg-transparent" 
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent"
                }`}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Card className={`${cardClasses} backdrop-blur-md rounded-lg shadow-2xl`}>
            <CardContent className="p-8">
              <div className="mb-8">
                <NetflixRecommender />
              </div>
              <Separator className={`my-12 ${isDarkTheme ? "bg-gray-700" : "bg-gray-300"}`} />
              <div className={`p-8 rounded-xl ${isDarkTheme ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                <RecommendationVisualizations />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 px-4 ${isDarkTheme ? "bg-gray-900/30" : "bg-gray-100/50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Developer Section */}
      <div className={`py-12 px-4 ${isDarkTheme ? "bg-gray-900/50" : "bg-gray-100/30"}`}>
        <div className="max-w-7xl mx-auto">
          <Card className={`${cardClasses} shadow-xl`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-4 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
                  Built by Karthikeya Gudapati
                </h3>
                <p className={`text-lg mb-6 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                  Passionate about AI, Machine Learning, and creating innovative recommendation systems
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="outline"
                    className={`flex items-center gap-2 font-semibold border-2 ${
                      isDarkTheme 
                        ? "border-red-500 text-red-400 hover:bg-red-600 hover:text-white bg-transparent" 
                        : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                    }`}
                    onClick={() => window.open('https://github.com/karthikeyagudapati', '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    GitHub Profile
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className={`flex items-center gap-2 font-semibold border-2 ${
                      isDarkTheme 
                        ? "border-green-500 text-green-400 hover:bg-green-600 hover:text-white bg-transparent" 
                        : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                    }`}
                    onClick={() => window.open('tel:+918309480281', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    +91 8309480281
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
      <footer className={`py-12 px-4 border-t ${isDarkTheme ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-red-600 text-2xl font-black">NETFLIX</span>
            <span className={`text-xl font-light ${isDarkTheme ? "text-white" : "text-gray-900"}`}>AI Recommender</span>
          </div>
          <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
            Built with passion for data science and machine learning • Not affiliated with Netflix, Inc.
          </p>
          <div className={`mt-4 text-xs ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
            This is a portfolio project demonstrating joint recommendation systems
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
