
import React from 'react';
import NetflixRecommender from "@/components/NetflixRecommender";
import RecommendationVisualizations from "@/components/RecommendationVisualizations";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <h1 className="text-2xl font-bold text-white">NetflixAI</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-white hover:text-red-400">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" className="text-white hover:text-red-400">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Joint Movie
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600"> Recommendation </span>
              System
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Find the perfect movie for your next movie night. Our AI combines your preferences to recommend films you'll both enjoy.
            </p>
          </div>

          {/* Main Content */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 rounded-2xl shadow-xl">
            <CardContent className="p-0">
              <div className="mb-8">
                <NetflixRecommender />
              </div>
              <Separator className="my-12 bg-white/20" />
              <div className="bg-white p-8 rounded-xl">
                <RecommendationVisualizations />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <span className="text-xl font-bold text-white">NetflixAI</span>
          </div>
          <p className="text-gray-400">
            Built with passion for data science and real-world problem solving
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
