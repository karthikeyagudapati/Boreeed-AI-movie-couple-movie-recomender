
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, Linkedin, Phone, ExternalLink, Play, Users, Settings, BarChart3, BookOpen, Lightbulb, Code, Database } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: BookOpen },
    { id: 'getting-started', title: 'Getting Started', icon: Play },
    { id: 'user-guide', title: 'User Guide', icon: Users },
    { id: 'algorithms', title: 'Algorithms', icon: Settings },
    { id: 'features', title: 'Features', icon: Lightbulb },
    { id: 'api', title: 'API Reference', icon: Code },
    { id: 'technical', title: 'Technical Details', icon: Database },
    { id: 'about', title: 'About Developer', icon: Users }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Netflix Joint Movie Recommendation System</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              An intelligent AI-powered recommendation system that analyzes multiple users' preferences to suggest movies 
              that everyone will enjoy. Built with advanced machine learning algorithms and a modern React interface.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Users className="w-5 h-5" />
                    Multi-User Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Support for 2-12 users with individual preference analysis and group recommendation generation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <BarChart3 className="w-5 h-5" />
                    Smart Algorithms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Four different recommendation algorithms including Hybrid, Intersection, Weighted, and Least Misery approaches.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'getting-started':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Getting Started</h2>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Start Guide</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>Select the number of users (2-12) who will be participating in the movie selection</li>
                <li>Choose your preferred genres from the available options</li>
                <li>Select a recommendation algorithm that suits your group's needs</li>
                <li>Click "Get Recommendations" to generate personalized movie suggestions</li>
                <li>Browse through the recommended movies with posters and ratings</li>
                <li>Mark movies as "watched" to get fresh recommendations</li>
              </ol>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">System Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Internet connection for movie poster loading</li>
                <li>JavaScript enabled</li>
              </ul>
            </div>
          </div>
        );

      case 'user-guide':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">User Guide</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Choose between 2-12 users for your movie recommendation session.</p>
                  <Badge variant="outline">Tip: More users provide more diverse recommendations</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Genre Filtering</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Select from 17 available genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation'].map(genre => (
                      <Badge key={genre} variant="secondary">{genre}</Badge>
                    ))}
                    <Badge variant="outline">+9 more</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Movie Interaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Each movie card displays:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Movie poster and title</li>
                    <li>Release year and genres</li>
                    <li>Recommendation score</li>
                    <li>Confidence level</li>
                    <li>Watch status toggle</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'algorithms':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Recommendation Algorithms</h2>
            
            <div className="grid gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-blue-600">Hybrid Algorithm (Default)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Combines multiple recommendation approaches for optimal group satisfaction.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Best for: Mixed groups with diverse preferences
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600">Intersection Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Finds movies that all users would likely enjoy based on overlapping preferences.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Best for: Groups with similar tastes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-600">Weighted Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Combines individual preferences with custom weights to balance recommendations.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Best for: Groups where certain users' preferences should be prioritized
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-600">Least Misery Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Ensures no user will be completely dissatisfied with the recommendation.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Best for: Groups where consensus is crucial
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🎬 Movie Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Comprehensive movie collection</li>
                    <li>• High-quality movie posters</li>
                    <li>• Detailed movie information</li>
                    <li>• Genre categorization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🤖 AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Advanced machine learning</li>
                    <li>• Preference analysis</li>
                    <li>• Smart recommendations</li>
                    <li>• Confidence scoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>👥 Multi-User Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 2-12 user support</li>
                    <li>• Individual profiles</li>
                    <li>• Group dynamics</li>
                    <li>• Preference weighting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🎨 Modern UI</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Dark/Light theme toggle</li>
                    <li>• Responsive design</li>
                    <li>• Netflix-inspired interface</li>
                    <li>• Smooth animations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">API Reference</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Movie Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
{`interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  score: number;
  user1Score?: number;
  user2Score?: number;
  confidenceScore: number;
  poster?: string;
  watched?: boolean;
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Profile Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
{`interface UserProfile {
  totalRatings: number;
  avgRating: number;
  favoriteGenres: string[];
  topMovies: string[];
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
                    'Drama', 'Family', 'Fantasy', 'Horror', 'Music', 'Mystery',
                    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
                  ].map(genre => (
                    <Badge key={genre} variant="outline">{genre}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Technical Details</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">Frontend</div>
                    <div className="text-sm space-y-1">
                      <div>React 18</div>
                      <div>TypeScript</div>
                      <div>Tailwind CSS</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">UI Components</div>
                    <div className="text-sm space-y-1">
                      <div>Shadcn/UI</div>
                      <div>Lucide Icons</div>
                      <div>Radix UI</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">Build Tools</div>
                    <div className="text-sm space-y-1">
                      <div>Vite</div>
                      <div>ESLint</div>
                      <div>PostCSS</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Component-based React architecture</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• Modern ES6+ JavaScript features</li>
                  <li>• Client-side routing with React Router</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Lazy loading for movie posters</li>
                  <li>• Optimized rendering with React hooks</li>
                  <li>• Efficient state management</li>
                  <li>• Fast build times with Vite</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">About the Developer</h2>
            
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Karthikeya Gudapati</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Passionate about AI, Machine Learning, and creating innovative recommendation systems
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                      onClick={() => window.open('https://github.com/karthikeyagudapati', '_blank')}
                    >
                      <Github className="w-4 h-4" />
                      GitHub Profile
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => window.open('https://www.linkedin.com/in/karthikeya-gudapati-6a5b52266', '_blank')}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => window.open('tel:+918309480281', '_blank')}
                    >
                      <Phone className="w-4 h-4" />
                      +91 8309480281
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Demonstrate advanced recommendation system algorithms</li>
                  <li>• Showcase modern React development practices</li>
                  <li>• Create an intuitive user experience for group decision making</li>
                  <li>• Implement machine learning concepts in web applications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact & Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Open to collaboration and new opportunities in AI/ML development. 
                  Feel free to reach out for project discussions, job opportunities, or technical consultations.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>• Available for full-time positions</p>
                  <p>• Open to freelance projects</p>
                  <p>• Interested in AI/ML research collaborations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Button>
              <div className="text-2xl font-bold text-red-600">Documentation</div>
            </div>
            <div className="text-sm text-gray-500">
              Netflix AI Recommender
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === section.id 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
