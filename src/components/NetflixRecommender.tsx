
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FilmIcon, Users, ChartBar } from "lucide-react";
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
        <span className="text-sm font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      {/* Form Card */}
      <Card className="mb-8 bg-white shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium">User 1</h3>
                <div className="space-y-2">
                  <Label htmlFor="user1Id">User ID</Label>
                  <Input 
                    id="user1Id"
                    placeholder="Enter User 1 ID"
                    value={user1Id}
                    onChange={(e) => setUser1Id(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium">User 2</h3>
                <div className="space-y-2">
                  <Label htmlFor="user2Id">User ID</Label>
                  <Input 
                    id="user2Id"
                    placeholder="Enter User 2 ID"
                    value={user2Id}
                    onChange={(e) => setUser2Id(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommendation Method</h3>
              <RadioGroup 
                defaultValue="hybrid" 
                value={recommendationMethod}
                onValueChange={setRecommendationMethod}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="intersection" id="intersection" />
                  <Label htmlFor="intersection" className="flex-grow cursor-pointer">Intersection</Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="weighted" id="weighted" />
                  <Label htmlFor="weighted" className="flex-grow cursor-pointer">Weighted</Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="least-misery" id="least-misery" />
                  <Label htmlFor="least-misery" className="flex-grow cursor-pointer">Least Misery</Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid" className="flex-grow cursor-pointer">Hybrid</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Generating Recommendations...' : 'Find Movies For Us'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Compatibility Score Card */}
          {compatibility !== null && (
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Your Movie Compatibility</h3>
                      <p className="text-gray-500 text-sm">Based on your viewing histories and preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{(compatibility * 100).toFixed(0)}%</div>
                      <div className="ml-2 px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-medium">
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
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="recommendations" className="text-base">
                <FilmIcon className="h-4 w-4 mr-2" />
                Movies for You Both
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-base">
                <ChartBar className="h-4 w-4 mr-2" />
                User Analysis
              </TabsTrigger>
            </TabsList>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Joint Movie Recommendations</h2>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Show Detailed Explanation</span>
                  <Switch 
                    checked={showDetailedExplanation}
                    onCheckedChange={setShowDetailedExplanation}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {results.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Movie Poster (placeholder) */}
                        <div className="w-full md:w-1/4 bg-gray-200 h-[180px] md:h-auto flex items-center justify-center">
                          <FilmIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        
                        {/* Movie Information */}
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="text-xl font-bold">{movie.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium text-gray-700">{movie.year}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-sm text-gray-700">{movie.genres.join(', ')}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="px-3 py-2 bg-red-600 text-white rounded-md font-bold">
                                {movie.score.toFixed(1)}
                              </div>
                              <div className="ml-2 text-xs text-gray-500">
                                {movie.confidenceScore >= 0.8 ? 'High confidence' : 'Medium confidence'}
                              </div>
                            </div>
                          </div>
                          
                          {showDetailedExplanation && (
                            <div className="mt-4 space-y-3">
                              <Separator />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">User 1 Score:</span>
                                    {renderScore(movie.user1Score || 0)}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">User 2 Score:</span>
                                    {renderScore(movie.user2Score || 0)}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Why this movie?</h4>
                                  <p className="text-sm text-gray-600">
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
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4">User 1 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Total Ratings</div>
                        <div className="text-2xl font-bold">{userProfiles.user1?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                        <div className="text-2xl font-bold">{userProfiles.user1?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user1?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user1?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className="text-sm">{movie}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User 2 Profile */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4">User 2 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Total Ratings</div>
                        <div className="text-2xl font-bold">{userProfiles.user2?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                        <div className="text-2xl font-bold">{userProfiles.user2?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user2?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user2?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className="text-sm">{movie}</li>
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
