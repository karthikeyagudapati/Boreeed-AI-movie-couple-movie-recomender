import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FilmIcon, Users, ChartBar, Play, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  score: number;
  user1Score?: number;
  user2Score?: number;
  confidenceScore: number;
}

const NetflixRecommender = () => {
  // State for the recommendation form and results
  const [user1Id, setUser1Id] = useState<string>('1');
  const [user2Id, setUser2Id] = useState<string>('2');
  const [recommendationMethod, setRecommendationMethod] = useState<string>('hybrid');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [userProfiles, setUserProfiles] = useState<any>({});
  const [activeTab, setActiveTab] = useState<string>('recommendations');
  const [showDetailedExplanation, setShowDetailedExplanation] = useState<boolean>(false);

  // Sample movie data (in a real app, this would come from the API)
  const sampleMovies: Movie[] = [
    { 
      id: 1, 
      title: 'The Shawshank Redemption', 
      genres: ['Drama'], 
      year: 1994, 
      score: 4.8,
      user1Score: 4.9,
      user2Score: 4.7, 
      confidenceScore: 0.92 
    },
    { 
      id: 2, 
      title: 'Pulp Fiction', 
      genres: ['Crime', 'Drama'], 
      year: 1994, 
      score: 4.7, 
      user1Score: 4.8,
      user2Score: 4.6,
      confidenceScore: 0.89 
    },
    { 
      id: 3, 
      title: 'The Dark Knight', 
      genres: ['Action', 'Crime', 'Drama'], 
      year: 2008, 
      score: 4.6, 
      user1Score: 4.4,
      user2Score: 4.8,
      confidenceScore: 0.88 
    },
    { 
      id: 4, 
      title: 'The Lord of the Rings: The Return of the King', 
      genres: ['Adventure', 'Drama', 'Fantasy'], 
      year: 2003, 
      score: 4.5, 
      user1Score: 4.7,
      user2Score: 4.3,
      confidenceScore: 0.85 
    },
    { 
      id: 5, 
      title: 'The Matrix', 
      genres: ['Action', 'Sci-Fi'], 
      year: 1999, 
      score: 4.4, 
      user1Score: 4.3,
      user2Score: 4.5,
      confidenceScore: 0.83 
    },
    { 
      id: 6, 
      title: 'Goodfellas', 
      genres: ['Biography', 'Crime', 'Drama'], 
      year: 1990, 
      score: 4.3, 
      user1Score: 4.5,
      user2Score: 4.1,
      confidenceScore: 0.8 
    },
    { 
      id: 7, 
      title: 'Inception', 
      genres: ['Action', 'Adventure', 'Sci-Fi'], 
      year: 2010, 
      score: 4.3, 
      user1Score: 4.2,
      user2Score: 4.4,
      confidenceScore: 0.79 
    }
  ];

  // Sample user profiles
  const sampleProfiles = {
    user1: {
      totalRatings: 285,
      avgRating: 3.8,
      favoriteGenres: ['Drama', 'Sci-Fi', 'Thriller'],
      topMovies: ['Fight Club', 'Interstellar', 'The Departed']
    },
    user2: {
      totalRatings: 219,
      avgRating: 3.6,
      favoriteGenres: ['Action', 'Drama', 'Comedy'],
      topMovies: ['The Dark Knight', 'Pulp Fiction', 'The Grand Budapest Hotel']
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setResults(sampleMovies);
      setCompatibility(0.72); // Sample compatibility score
      setUserProfiles(sampleProfiles);
      setIsLoading(false);
    }, 1500);
  };

  // Function to generate compatibility message
  const getCompatibilityMessage = (score: number) => {
    if (score >= 0.8) return "Perfect movie partners!";
    if (score >= 0.6) return "Great compatibility!";
    if (score >= 0.4) return "Decent match";
    if (score >= 0.2) return "Some differences";
    return "Very different tastes";
  };

  // Function to render a progress bar based on a score (0-5)
  const renderScore = (score: number) => {
    const percentage = (score / 5) * 100;
    return (
      <div className="flex items-center gap-2">
        <Progress value={percentage} className="h-2 w-24" />
        <span className="text-sm font-medium text-white">{score.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      {/* Form Card */}
      <Card className="mb-8 bg-gray-800/70 border-gray-700 shadow-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium text-white">User 1</h3>
                <div className="space-y-2">
                  <Label htmlFor="user1Id" className="text-gray-300">User ID</Label>
                  <Input 
                    id="user1Id"
                    placeholder="Enter User 1 ID"
                    value={user1Id}
                    onChange={(e) => setUser1Id(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium text-white">User 2</h3>
                <div className="space-y-2">
                  <Label htmlFor="user2Id" className="text-gray-300">User ID</Label>
                  <Input 
                    id="user2Id"
                    placeholder="Enter User 2 ID"
                    value={user2Id}
                    onChange={(e) => setUser2Id(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Recommendation Algorithm</h3>
              <RadioGroup 
                defaultValue="hybrid" 
                value={recommendationMethod}
                onValueChange={setRecommendationMethod}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="flex items-center space-x-2 border border-gray-600 bg-gray-700/50 p-3 rounded-md hover:bg-gray-600/50">
                  <RadioGroupItem value="intersection" id="intersection" className="border-gray-400" />
                  <Label htmlFor="intersection" className="flex-grow cursor-pointer text-white">Intersection</Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-gray-600 bg-gray-700/50 p-3 rounded-md hover:bg-gray-600/50">
                  <RadioGroupItem value="weighted" id="weighted" className="border-gray-400" />
                  <Label htmlFor="weighted" className="flex-grow cursor-pointer text-white">Weighted</Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-gray-600 bg-gray-700/50 p-3 rounded-md hover:bg-gray-600/50">
                  <RadioGroupItem value="least-misery" id="least-misery" className="border-gray-400" />
                  <Label htmlFor="least-misery" className="flex-grow cursor-pointer text-white">Least Misery</Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-gray-600 bg-gray-700/50 p-3 rounded-md hover:bg-gray-600/50">
                  <RadioGroupItem value="hybrid" id="hybrid" className="border-gray-400" />
                  <Label htmlFor="hybrid" className="flex-grow cursor-pointer text-white">Hybrid</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Finding Your Perfect Match...' : 'Get Movie Recommendations'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Compatibility Score Card */}
          {compatibility !== null && (
            <Card className="bg-gray-800/70 border-gray-700 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Movie Compatibility Score</h3>
                      <p className="text-gray-400 text-sm">Based on your viewing histories and preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-white">{(compatibility * 100).toFixed(0)}%</div>
                      <div className="ml-2 px-3 py-1 rounded bg-red-600 text-white text-xs font-medium">
                        {getCompatibilityMessage(compatibility)}
                      </div>
                    </div>
                    <Progress value={compatibility * 100} className="h-2 w-48 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs for different views */}
          <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-800 border-gray-700">
              <TabsTrigger value="recommendations" className="text-base data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <Play className="h-4 w-4 mr-2" />
                Your Movie Matches
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-base data-[state=active]:bg-red-600 data-[state=active]:text-white">
                <ChartBar className="h-4 w-4 mr-2" />
                User Analysis
              </TabsTrigger>
            </TabsList>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Recommended For Both of You</h2>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Show Details</span>
                  <Switch 
                    checked={showDetailedExplanation}
                    onCheckedChange={setShowDetailedExplanation}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {results.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden hover:shadow-xl transition-shadow bg-gray-800/50 border-gray-700">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Movie Poster */}
                        <div className="w-full md:w-1/4 bg-gray-700 h-[180px] md:h-auto flex items-center justify-center">
                          <Play className="h-12 w-12 text-gray-400" />
                        </div>
                        
                        {/* Movie Information */}
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium text-gray-300">{movie.year}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                <span className="text-sm text-gray-300">{movie.genres.join(', ')}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="flex items-center bg-red-600 px-3 py-2 rounded-md">
                                <Star className="w-4 h-4 text-white mr-1" />
                                <span className="text-white font-bold">{movie.score.toFixed(1)}</span>
                              </div>
                              <div className="ml-2 text-xs text-gray-400">
                                {movie.confidenceScore >= 0.8 ? 'High confidence' : 'Medium confidence'}
                              </div>
                            </div>
                          </div>
                          
                          {showDetailedExplanation && (
                            <div className="mt-4 space-y-3">
                              <Separator className="bg-gray-600" />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-300">User 1 Score:</span>
                                    {renderScore(movie.user1Score || 0)}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-300">User 2 Score:</span>
                                    {renderScore(movie.user2Score || 0)}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-1 text-white">Why this movie?</h4>
                                  <p className="text-sm text-gray-400">
                                    {
                                      movie.user1Score && movie.user2Score && 
                                      Math.abs(movie.user1Score - movie.user2Score) < 0.5 
                                        ? "Both users are predicted to enjoy this movie at similar levels." 
                                        : "This movie balances the preferences of both users."
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User 1 Profile */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 text-white">User 1 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-400">Total Ratings</div>
                        <div className="text-2xl font-bold text-white">{userProfiles.user1?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Average Rating</div>
                        <div className="text-2xl font-bold text-white">{userProfiles.user1?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user1?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-red-600 text-white rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user1?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className="text-sm text-gray-300">{movie}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User 2 Profile */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 text-white">User 2 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-400">Total Ratings</div>
                        <div className="text-2xl font-bold text-white">{userProfiles.user2?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Average Rating</div>
                        <div className="text-2xl font-bold text-white">{userProfiles.user2?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user2?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-red-600 text-white rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user2?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className="text-sm text-gray-300">{movie}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default NetflixRecommender;
