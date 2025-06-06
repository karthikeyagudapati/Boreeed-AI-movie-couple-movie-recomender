
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FilmIcon, Users, ChartBar, Play, Star, Moon, Sun, Eye, EyeOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Movie {
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
}

const NetflixRecommender = () => {
  // State for the recommendation form and results
  const [user1Id, setUser1Id] = useState<string>('2');
  const [user2Id, setUser2Id] = useState<string>('3');
  const [recommendationMethod, setRecommendationMethod] = useState<string>('hybrid');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [userProfiles, setUserProfiles] = useState<any>({});
  const [activeTab, setActiveTab] = useState<string>('recommendations');
  const [showDetailedExplanation, setShowDetailedExplanation] = useState<boolean>(false);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());

  // Available user IDs and genres
  const availableUsers = Array.from({ length: 11 }, (_, i) => i + 2); // 2-12
  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
  ];

  // Extended sample movie data with minimum 15 movies
  const sampleMovies: Movie[] = [
    { 
      id: 1, 
      title: 'The Shawshank Redemption', 
      genres: ['Drama'], 
      year: 1994, 
      score: 4.8,
      user1Score: 4.9,
      user2Score: 4.7, 
      confidenceScore: 0.92,
      poster: 'https://images.unsplash.com/photo-1489599828705-0ec3b478e4fa?w=300&h=450&fit=crop'
    },
    { 
      id: 2, 
      title: 'Pulp Fiction', 
      genres: ['Crime', 'Drama'], 
      year: 1994, 
      score: 4.7, 
      user1Score: 4.8,
      user2Score: 4.6,
      confidenceScore: 0.89,
      poster: 'https://images.unsplash.com/photo-1478720568477-b0c8f11b9c4e?w=300&h=450&fit=crop'
    },
    { 
      id: 3, 
      title: 'The Dark Knight', 
      genres: ['Action', 'Crime', 'Drama'], 
      year: 2008, 
      score: 4.6, 
      user1Score: 4.4,
      user2Score: 4.8,
      confidenceScore: 0.88,
      poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop'
    },
    { 
      id: 4, 
      title: 'The Lord of the Rings: The Return of the King', 
      genres: ['Adventure', 'Drama', 'Fantasy'], 
      year: 2003, 
      score: 4.5, 
      user1Score: 4.7,
      user2Score: 4.3,
      confidenceScore: 0.85,
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop'
    },
    { 
      id: 5, 
      title: 'The Matrix', 
      genres: ['Action', 'Science Fiction'], 
      year: 1999, 
      score: 4.4, 
      user1Score: 4.3,
      user2Score: 4.5,
      confidenceScore: 0.83,
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop'
    },
    { 
      id: 6, 
      title: 'Goodfellas', 
      genres: ['Crime', 'Drama'], 
      year: 1990, 
      score: 4.3, 
      user1Score: 4.5,
      user2Score: 4.1,
      confidenceScore: 0.8,
      poster: 'https://images.unsplash.com/photo-1489599828705-0ec3b478e4fa?w=300&h=450&fit=crop'
    },
    { 
      id: 7, 
      title: 'Inception', 
      genres: ['Action', 'Adventure', 'Science Fiction'], 
      year: 2010, 
      score: 4.3, 
      user1Score: 4.2,
      user2Score: 4.4,
      confidenceScore: 0.79,
      poster: 'https://images.unsplash.com/photo-1478720568477-b0c8f11b9c4e?w=300&h=450&fit=crop'
    },
    { 
      id: 8, 
      title: 'Interstellar', 
      genres: ['Adventure', 'Drama', 'Science Fiction'], 
      year: 2014, 
      score: 4.2, 
      user1Score: 4.1,
      user2Score: 4.3,
      confidenceScore: 0.78,
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop'
    },
    { 
      id: 9, 
      title: 'Forrest Gump', 
      genres: ['Comedy', 'Drama', 'Romance'], 
      year: 1994, 
      score: 4.1, 
      user1Score: 4.0,
      user2Score: 4.2,
      confidenceScore: 0.76,
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop'
    },
    { 
      id: 10, 
      title: 'The Godfather', 
      genres: ['Crime', 'Drama'], 
      year: 1972, 
      score: 4.0, 
      user1Score: 3.9,
      user2Score: 4.1,
      confidenceScore: 0.75,
      poster: 'https://images.unsplash.com/photo-1489599828705-0ec3b478e4fa?w=300&h=450&fit=crop'
    },
    { 
      id: 11, 
      title: 'The Avengers', 
      genres: ['Action', 'Adventure', 'Science Fiction'], 
      year: 2012, 
      score: 3.9, 
      user1Score: 3.8,
      user2Score: 4.0,
      confidenceScore: 0.73,
      poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop'
    },
    { 
      id: 12, 
      title: 'Titanic', 
      genres: ['Drama', 'Romance'], 
      year: 1997, 
      score: 3.8, 
      user1Score: 3.7,
      user2Score: 3.9,
      confidenceScore: 0.71,
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop'
    },
    { 
      id: 13, 
      title: 'The Lion King', 
      genres: ['Animation', 'Adventure', 'Drama'], 
      year: 1994, 
      score: 3.7, 
      user1Score: 3.6,
      user2Score: 3.8,
      confidenceScore: 0.69,
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop'
    },
    { 
      id: 14, 
      title: 'Star Wars: A New Hope', 
      genres: ['Adventure', 'Fantasy', 'Science Fiction'], 
      year: 1977, 
      score: 3.6, 
      user1Score: 3.5,
      user2Score: 3.7,
      confidenceScore: 0.67,
      poster: 'https://images.unsplash.com/photo-1478720568477-b0c8f11b9c4e?w=300&h=450&fit=crop'
    },
    { 
      id: 15, 
      title: 'Jurassic Park', 
      genres: ['Adventure', 'Science Fiction', 'Thriller'], 
      year: 1993, 
      score: 3.5, 
      user1Score: 3.4,
      user2Score: 3.6,
      confidenceScore: 0.65,
      poster: 'https://images.unsplash.com/photo-1489599828705-0ec3b478e4fa?w=300&h=450&fit=crop'
    }
  ];

  // Sample user profiles
  const sampleProfiles = {
    user1: {
      totalRatings: 285,
      avgRating: 3.8,
      favoriteGenres: ['Drama', 'Science Fiction', 'Thriller'],
      topMovies: ['Fight Club', 'Interstellar', 'The Departed']
    },
    user2: {
      totalRatings: 219,
      avgRating: 3.6,
      favoriteGenres: ['Action', 'Drama', 'Comedy'],
      topMovies: ['The Dark Knight', 'Pulp Fiction', 'The Grand Budapest Hotel']
    }
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    }
  };

  const toggleWatched = (movieId: number) => {
    const newWatchedMovies = new Set(watchedMovies);
    if (watchedMovies.has(movieId)) {
      newWatchedMovies.delete(movieId);
    } else {
      newWatchedMovies.add(movieId);
    }
    setWatchedMovies(newWatchedMovies);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter movies by selected genres if any, ensure minimum 10 results
      let filteredMovies = sampleMovies;
      if (selectedGenres.length > 0) {
        filteredMovies = sampleMovies.filter(movie => 
          movie.genres.some(genre => selectedGenres.includes(genre))
        );
        // If filtered results are less than 10, add more movies to reach minimum
        if (filteredMovies.length < 10) {
          const remainingMovies = sampleMovies.filter(movie => 
            !filteredMovies.some(fm => fm.id === movie.id)
          );
          filteredMovies = [...filteredMovies, ...remainingMovies.slice(0, 10 - filteredMovies.length)];
        }
      }
      
      setResults(filteredMovies);
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

  const renderScore = (score: number) => {
    const percentage = (score / 5) * 100;
    return (
      <div className="flex items-center gap-2">
        <Progress value={percentage} className="h-2 w-24" />
        <span className="text-sm font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  const themeClasses = isDarkTheme 
    ? "bg-black text-white" 
    : "bg-gray-50 text-gray-900";

  const cardClasses = isDarkTheme 
    ? "bg-gray-900/50 border-gray-700" 
    : "bg-white/90 border-gray-200";

  const inputClasses = isDarkTheme 
    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
    : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";

  const labelClasses = isDarkTheme 
    ? "text-white font-semibold" 
    : "text-gray-900 font-semibold";

  const headingClasses = isDarkTheme 
    ? "text-white font-bold" 
    : "text-gray-900 font-bold";

  return (
    <div className={`w-full max-w-6xl mx-auto pb-20 ${themeClasses}`}>
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch 
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>

      {/* Form Card */}
      <Card className={`mb-8 ${cardClasses} shadow-2xl`}>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <h3 className={`text-lg ${headingClasses}`}>User 1</h3>
                <div className="space-y-2">
                  <Label htmlFor="user1Id" className={labelClasses}>User ID</Label>
                  <Select value={user1Id} onValueChange={setUser1Id}>
                    <SelectTrigger className={`h-12 border-2 focus:ring-2 focus:ring-red-500 ${
                      isDarkTheme 
                        ? "bg-black border-red-500 text-white hover:bg-gray-900" 
                        : "bg-white border-red-600 text-black hover:bg-gray-50"
                    }`}>
                      <SelectValue placeholder="Select User 1" />
                    </SelectTrigger>
                    <SelectContent className={`border-2 z-50 ${
                      isDarkTheme 
                        ? "bg-black border-red-500" 
                        : "bg-white border-red-600"
                    }`}>
                      {availableUsers.map(userId => (
                        <SelectItem 
                          key={userId} 
                          value={userId.toString()}
                          className={`${
                            isDarkTheme 
                              ? "text-white hover:bg-red-900 focus:bg-red-900" 
                              : "text-black hover:bg-red-50 focus:bg-red-50"
                          }`}
                        >
                          User {userId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className={`text-lg ${headingClasses}`}>User 2</h3>
                <div className="space-y-2">
                  <Label htmlFor="user2Id" className={labelClasses}>User ID</Label>
                  <Select value={user2Id} onValueChange={setUser2Id}>
                    <SelectTrigger className={`h-12 border-2 focus:ring-2 focus:ring-red-500 ${
                      isDarkTheme 
                        ? "bg-black border-red-500 text-white hover:bg-gray-900" 
                        : "bg-white border-red-600 text-black hover:bg-gray-50"
                    }`}>
                      <SelectValue placeholder="Select User 2" />
                    </SelectTrigger>
                    <SelectContent className={`border-2 z-50 ${
                      isDarkTheme 
                        ? "bg-black border-red-500" 
                        : "bg-white border-red-600"
                    }`}>
                      {availableUsers.map(userId => (
                        <SelectItem 
                          key={userId} 
                          value={userId.toString()}
                          className={`${
                            isDarkTheme 
                              ? "text-white hover:bg-red-900 focus:bg-red-900" 
                              : "text-black hover:bg-red-50 focus:bg-red-50"
                          }`}
                        >
                          User {userId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-lg ${headingClasses}`}>Select Genres</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {availableGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                      className={`border-2 ${
                        selectedGenres.includes(genre) 
                          ? "border-red-500 bg-red-500" 
                          : isDarkTheme 
                            ? "border-red-500" 
                            : "border-red-600"
                      }`}
                    />
                    <Label 
                      htmlFor={genre} 
                      className={`text-sm cursor-pointer font-medium ${
                        selectedGenres.includes(genre) 
                          ? "text-red-500 font-bold" 
                          : labelClasses
                      }`}
                    >
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-lg ${headingClasses}`}>Recommendation Algorithm</h3>
              <RadioGroup 
                defaultValue="hybrid" 
                value={recommendationMethod}
                onValueChange={setRecommendationMethod}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className={`flex items-center space-x-2 border-2 p-4 rounded-md transition-all cursor-pointer ${
                  recommendationMethod === 'intersection' 
                    ? isDarkTheme 
                      ? "border-red-500 bg-red-900/50 shadow-lg" 
                      : "border-red-600 bg-red-50 shadow-lg"
                    : isDarkTheme 
                      ? "border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-red-400" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-500"
                }`}>
                  <RadioGroupItem 
                    value="intersection" 
                    id="intersection" 
                    className={`border-2 ${
                      recommendationMethod === 'intersection' 
                        ? "border-red-500 text-red-500" 
                        : isDarkTheme 
                          ? "border-gray-400" 
                          : "border-gray-500"
                    }`} 
                  />
                  <Label 
                    htmlFor="intersection" 
                    className={`flex-grow cursor-pointer font-medium ${
                      recommendationMethod === 'intersection' 
                        ? "text-red-500 font-bold" 
                        : labelClasses
                    }`}
                  >
                    Intersection
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 border-2 p-4 rounded-md transition-all cursor-pointer ${
                  recommendationMethod === 'weighted' 
                    ? isDarkTheme 
                      ? "border-red-500 bg-red-900/50 shadow-lg" 
                      : "border-red-600 bg-red-50 shadow-lg"
                    : isDarkTheme 
                      ? "border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-red-400" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-500"
                }`}>
                  <RadioGroupItem 
                    value="weighted" 
                    id="weighted" 
                    className={`border-2 ${
                      recommendationMethod === 'weighted' 
                        ? "border-red-500 text-red-500" 
                        : isDarkTheme 
                          ? "border-gray-400" 
                          : "border-gray-500"
                    }`} 
                  />
                  <Label 
                    htmlFor="weighted" 
                    className={`flex-grow cursor-pointer font-medium ${
                      recommendationMethod === 'weighted' 
                        ? "text-red-500 font-bold" 
                        : labelClasses
                    }`}
                  >
                    Weighted
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 border-2 p-4 rounded-md transition-all cursor-pointer ${
                  recommendationMethod === 'least-misery' 
                    ? isDarkTheme 
                      ? "border-red-500 bg-red-900/50 shadow-lg" 
                      : "border-red-600 bg-red-50 shadow-lg"
                    : isDarkTheme 
                      ? "border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-red-400" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-500"
                }`}>
                  <RadioGroupItem 
                    value="least-misery" 
                    id="least-misery" 
                    className={`border-2 ${
                      recommendationMethod === 'least-misery' 
                        ? "border-red-500 text-red-500" 
                        : isDarkTheme 
                          ? "border-gray-400" 
                          : "border-gray-500"
                    }`} 
                  />
                  <Label 
                    htmlFor="least-misery" 
                    className={`flex-grow cursor-pointer font-medium ${
                      recommendationMethod === 'least-misery' 
                        ? "text-red-500 font-bold" 
                        : labelClasses
                    }`}
                  >
                    Least Misery
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 border-2 p-4 rounded-md transition-all cursor-pointer ${
                  recommendationMethod === 'hybrid' 
                    ? isDarkTheme 
                      ? "border-red-500 bg-red-900/50 shadow-lg" 
                      : "border-red-600 bg-red-50 shadow-lg"
                    : isDarkTheme 
                      ? "border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-red-400" 
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-500"
                }`}>
                  <RadioGroupItem 
                    value="hybrid" 
                    id="hybrid" 
                    className={`border-2 ${
                      recommendationMethod === 'hybrid' 
                        ? "border-red-500 text-red-500" 
                        : isDarkTheme 
                          ? "border-gray-400" 
                          : "border-gray-500"
                    }`} 
                  />
                  <Label 
                    htmlFor="hybrid" 
                    className={`flex-grow cursor-pointer font-medium ${
                      recommendationMethod === 'hybrid' 
                        ? "text-red-500 font-bold" 
                        : labelClasses
                    }`}
                  >
                    Hybrid
                  </Label>
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
            <Card className={`${cardClasses} shadow-xl`}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium ${headingClasses}`}>Movie Compatibility Score</h3>
                      <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Based on your viewing histories and preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className={`text-3xl font-bold ${headingClasses}`}>{(compatibility * 100).toFixed(0)}%</div>
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
            <TabsList className={`grid grid-cols-2 mb-6 ${isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
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
                <h2 className={`text-xl font-bold ${headingClasses}`}>
                  Recommended For Both of You ({results.length} movies)
                </h2>
                
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${labelClasses}`}>Show Details</span>
                  <Switch 
                    checked={showDetailedExplanation}
                    onCheckedChange={setShowDetailedExplanation}
                  />
                </div>
              </div>
              
              {/* Scrollable movie results */}
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {results.map((movie) => (
                    <Card key={movie.id} className={`overflow-hidden hover:shadow-xl transition-shadow ${cardClasses} ${watchedMovies.has(movie.id) ? 'opacity-60' : ''}`}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Movie Poster */}
                          <div className="w-full md:w-1/4 h-[180px] md:h-auto relative">
                            <img 
                              src={movie.poster} 
                              alt={movie.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNTAgMjI1TDE3NSAyMDBIMTI1TDE1MCAyMjVaIiBmaWxsPSIjNjM2MzYzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjcwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vdmllIFBvc3RlcjwvdGV4dD4KPC9zdmc+';
                              }}
                            />
                            {watchedMovies.has(movie.id) && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Eye className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Movie Information */}
                          <div className="p-4 md:p-6 flex-1">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className={`text-xl font-bold ${headingClasses}`}>{movie.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-sm font-medium ${labelClasses}`}>{movie.year}</span>
                                  <span className={`w-1 h-1 rounded-full ${isDarkTheme ? "bg-gray-500" : "bg-gray-400"}`}></span>
                                  <span className={`text-sm ${labelClasses}`}>{movie.genres.join(', ')}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-2 md:mt-0">
                                <div className="flex items-center bg-red-600 px-3 py-2 rounded-md">
                                  <Star className="w-4 h-4 text-white mr-1" />
                                  <span className="text-white font-bold">{movie.score.toFixed(1)}</span>
                                </div>
                                <Button
                                  onClick={() => toggleWatched(movie.id)}
                                  variant="outline"
                                  size="sm"
                                  className={`${watchedMovies.has(movie.id) ? 'bg-green-600 text-white' : ''}`}
                                >
                                  {watchedMovies.has(movie.id) ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                            
                            {showDetailedExplanation && (
                              <div className="mt-4 space-y-3">
                                <Separator className={isDarkTheme ? "bg-gray-600" : "bg-gray-300"} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className={`text-sm font-medium ${labelClasses}`}>User 1 Score:</span>
                                      {renderScore(movie.user1Score || 0)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className={`text-sm font-medium ${labelClasses}`}>User 2 Score:</span>
                                      {renderScore(movie.user2Score || 0)}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className={`text-sm font-medium mb-1 ${headingClasses}`}>Why this movie?</h4>
                                    <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
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
              </ScrollArea>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={cardClasses}>
                  <CardContent className="pt-6">
                    <h3 className={`text-lg font-bold mb-4 ${headingClasses}`}>User 1 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Total Ratings</div>
                        <div className={`text-2xl font-bold ${headingClasses}`}>{userProfiles.user1?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Average Rating</div>
                        <div className={`text-2xl font-bold ${headingClasses}`}>{userProfiles.user1?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user1?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-red-600 text-white rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user1?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className={`text-sm ${labelClasses}`}>{movie}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={cardClasses}>
                  <CardContent className="pt-6">
                    <h3 className={`text-lg font-bold mb-4 ${headingClasses}`}>User 2 Profile</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Total Ratings</div>
                        <div className={`text-2xl font-bold ${headingClasses}`}>{userProfiles.user2?.totalRatings}</div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Average Rating</div>
                        <div className={`text-2xl font-bold ${headingClasses}`}>{userProfiles.user2?.avgRating.toFixed(1)}</div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Favorite Genres</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userProfiles.user2?.favoriteGenres.map((genre: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-red-600 text-white rounded-md text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className={`text-sm ${labelClasses}`}>Top Movies</div>
                        <ul className="list-disc list-inside mt-1">
                          {userProfiles.user2?.topMovies.map((movie: string, index: number) => (
                            <li key={index} className={`text-sm ${labelClasses}`}>{movie}</li>
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
