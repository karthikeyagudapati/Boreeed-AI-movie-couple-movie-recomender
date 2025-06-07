
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Upload, Star, Calendar, Clock, Zap, TrendingUp, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  score: number;
  user1Score?: number;
  user2Score?: number;
  confidenceScore: number;
  description: string;
  duration: string;
  rating: string;
  director: string;
  cast: string[];
  popularity: number;
  trending: boolean;
  watched?: boolean;
}

interface EnhancedNetflixRecommenderProps {
  platform: string;
  country: string;
  onBack: () => void;
}

const EnhancedNetflixRecommender: React.FC<EnhancedNetflixRecommenderProps> = ({ 
  platform, 
  country, 
  onBack 
}) => {
  const [user1Id, setUser1Id] = useState<string>('2');
  const [user2Id, setUser2Id] = useState<string>('3');
  const [recommendationMethod, setRecommendationMethod] = useState<string>('hybrid');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [showDetailedExplanation, setShowDetailedExplanation] = useState<boolean>(false);

  // Enhanced movie database with more diverse content
  const enhancedMovieDatabase: Movie[] = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      genres: ['Drama'],
      year: 1994,
      score: 4.8,
      user1Score: 4.9,
      user2Score: 4.7,
      confidenceScore: 92,
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      duration: '2h 22m',
      rating: 'R',
      director: 'Frank Darabont',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      popularity: 98,
      trending: false
    },
    {
      id: 2,
      title: 'Stranger Things',
      genres: ['Sci-Fi', 'Horror', 'Drama'],
      year: 2016,
      score: 4.6,
      user1Score: 4.8,
      user2Score: 4.4,
      confidenceScore: 89,
      description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
      duration: '51m per episode',
      rating: 'TV-14',
      director: 'The Duffer Brothers',
      cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      popularity: 95,
      trending: true
    },
    {
      id: 3,
      title: 'The Crown',
      genres: ['Drama', 'Biography', 'History'],
      year: 2016,
      score: 4.4,
      user1Score: 4.3,
      user2Score: 4.5,
      confidenceScore: 87,
      description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
      duration: '1h per episode',
      rating: 'TV-MA',
      director: 'Peter Morgan',
      cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
      popularity: 88,
      trending: false
    },
    {
      id: 4,
      title: 'Squid Game',
      genres: ['Thriller', 'Drama', 'Action'],
      year: 2021,
      score: 4.5,
      user1Score: 4.7,
      user2Score: 4.3,
      confidenceScore: 91,
      description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize.',
      duration: '1h per episode',
      rating: 'TV-MA',
      director: 'Hwang Dong-hyuk',
      cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-jun'],
      popularity: 97,
      trending: true
    },
    {
      id: 5,
      title: 'Money Heist',
      genres: ['Crime', 'Drama', 'Thriller'],
      year: 2017,
      score: 4.3,
      user1Score: 4.4,
      user2Score: 4.2,
      confidenceScore: 86,
      description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.',
      duration: '1h 10m per episode',
      rating: 'TV-MA',
      director: 'Álex Pina',
      cast: ['Úrsula Corberó', 'Álvaro Morte', 'Itziar Ituño'],
      popularity: 94,
      trending: false
    },
    {
      id: 6,
      title: 'Bridgerton',
      genres: ['Romance', 'Drama', 'Period'],
      year: 2020,
      score: 4.1,
      user1Score: 3.9,
      user2Score: 4.3,
      confidenceScore: 83,
      description: 'Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.',
      duration: '1h per episode',
      rating: 'TV-MA',
      director: 'Chris Van Dusen',
      cast: ['Nicola Coughlan', 'Jonathan Bailey', 'Simone Ashley'],
      popularity: 92,
      trending: true
    },
    {
      id: 7,
      title: 'The Witcher',
      genres: ['Fantasy', 'Action', 'Adventure'],
      year: 2019,
      score: 4.2,
      user1Score: 4.5,
      user2Score: 3.9,
      confidenceScore: 85,
      description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
      duration: '1h per episode',
      rating: 'TV-MA',
      director: 'Lauren Schmidt Hissrich',
      cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
      popularity: 89,
      trending: false
    },
    {
      id: 8,
      title: 'Wednesday',
      genres: ['Comedy', 'Horror', 'Family'],
      year: 2022,
      score: 4.3,
      user1Score: 4.2,
      user2Score: 4.4,
      confidenceScore: 88,
      description: 'Wednesday Addams attempts to master her emerging psychic ability, thwart a monstrous killing spree and solve the supernatural mystery.',
      duration: '45m per episode',
      rating: 'TV-14',
      director: 'James Lovato',
      cast: ['Jenna Ortega', 'Emma Myers', 'Hunter Doohan'],
      popularity: 96,
      trending: true
    },
    // Add more diverse content based on platform and country
    {
      id: 9,
      title: 'Sacred Games',
      genres: ['Crime', 'Drama', 'Thriller'],
      year: 2018,
      score: 4.4,
      user1Score: 4.6,
      user2Score: 4.2,
      confidenceScore: 90,
      description: 'A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.',
      duration: '50m per episode',
      rating: 'TV-MA',
      director: 'Vikramaditya Motwane',
      cast: ['Saif Ali Khan', 'Nawazuddin Siddiqui', 'Radhika Apte'],
      popularity: 91,
      trending: false
    },
    {
      id: 10,
      title: 'Scam 1992',
      genres: ['Biography', 'Crime', 'Drama'],
      year: 2020,
      score: 4.7,
      user1Score: 4.8,
      user2Score: 4.6,
      confidenceScore: 93,
      description: 'The rise and fall of Harshad Mehta, a stockbroker who single-handedly took the stock market to dizzying heights and his catastrophic downfall.',
      duration: '1h per episode',
      rating: 'TV-14',
      director: 'Hansal Mehta',
      cast: ['Pratik Gandhi', 'Shreya Dhanwanthary', 'Hemant Kher'],
      popularity: 89,
      trending: false
    },
    {
      id: 11,
      title: 'Mirzapur',
      genres: ['Action', 'Crime', 'Drama'],
      year: 2018,
      score: 4.2,
      user1Score: 4.4,
      user2Score: 4.0,
      confidenceScore: 84,
      description: 'A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.',
      duration: '45m per episode',
      rating: 'TV-MA',
      director: 'Karan Anshuman',
      cast: ['Pankaj Tripathi', 'Ali Fazal', 'Vikrant Massey'],
      popularity: 87,
      trending: false
    },
    {
      id: 12,
      title: 'The Family Man',
      genres: ['Action', 'Drama', 'Thriller'],
      year: 2019,
      score: 4.5,
      user1Score: 4.6,
      user2Score: 4.4,
      confidenceScore: 89,
      description: 'A working man from the National Investigation Agency tries to protect the nation while trying to protect his family at the same time.',
      duration: '45m per episode',
      rating: 'TV-MA',
      director: 'Raj Nidimoru',
      cast: ['Manoj Bajpayee', 'Priyamani', 'Sharib Hashmi'],
      popularity: 92,
      trending: true
    }
  ];

  const availableUsers = Array.from({ length: 11 }, (_, i) => i + 2);
  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Period',
    'Romance', 'Sci-Fi', 'Science Fiction', 'Thriller', 'War', 'Western'
  ];

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      // Here you would process the CSV file
      console.log('Processing CSV file:', file.name);
    } else {
      alert('Please upload a valid CSV file');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // Filter movies based on selected criteria and ensure minimum 15 results
      let filteredMovies = enhancedMovieDatabase;
      
      // Apply genre filter if any selected
      if (selectedGenres.length > 0) {
        filteredMovies = enhancedMovieDatabase.filter(movie => 
          movie.genres.some(genre => selectedGenres.includes(genre))
        );
      }

      // Apply recommendation method logic
      switch (recommendationMethod) {
        case 'intersection':
          filteredMovies = filteredMovies.filter(movie => 
            movie.user1Score && movie.user2Score && 
            Math.abs(movie.user1Score - movie.user2Score) < 0.5
          );
          break;
        case 'weighted':
          filteredMovies = filteredMovies.map(movie => ({
            ...movie,
            score: movie.user1Score && movie.user2Score ? 
              (movie.user1Score + movie.user2Score) / 2 : movie.score
          }));
          break;
        case 'least-misery':
          filteredMovies = filteredMovies.filter(movie => 
            movie.user1Score && movie.user2Score && 
            Math.min(movie.user1Score, movie.user2Score) >= 3.5
          );
          break;
      }

      // Ensure minimum 15 results
      if (filteredMovies.length < 15) {
        const remainingMovies = enhancedMovieDatabase
          .filter(movie => !filteredMovies.some(fm => fm.id === movie.id))
          .slice(0, 15 - filteredMovies.length);
        filteredMovies = [...filteredMovies, ...remainingMovies];
      }

      // Sort by score and take top results
      filteredMovies.sort((a, b) => b.score - a.score);
      
      setResults(filteredMovies.slice(0, 20));
      setCompatibility(0.78);
      setIsLoading(false);
    }, 2000);
  };

  const getCompatibilityMessage = (score: number) => {
    if (score >= 0.8) return "Perfect movie partners!";
    if (score >= 0.6) return "Great compatibility!";
    if (score >= 0.4) return "Good match";
    return "Different tastes";
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'netflix': return 'bg-red-600';
      case 'amazon-prime': return 'bg-blue-600';
      case 'disney-hotstar': return 'bg-blue-500';
      case 'zee5': return 'bg-purple-600';
      case 'voot': return 'bg-orange-500';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
      {/* Header */}
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
              <Badge className={`${getPlatformColor()} text-white font-semibold px-4 py-2`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {country}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* CSV Upload Section */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700 shadow-2xl">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <Upload className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Upload Your Viewing History</h3>
              <p className="text-gray-400">Upload your Netflix viewing history CSV for personalized recommendations</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    {csvFile ? csvFile.name : 'Select CSV File'}
                  </span>
                </Button>
              </label>
              {csvFile && (
                <p className="text-green-400 text-sm mt-2 text-center">✓ File uploaded successfully</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Form */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700 shadow-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-semibold mb-2 block">User 1</Label>
                  <Select value={user1Id} onValueChange={setUser1Id}>
                    <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select User 1" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {availableUsers.map(userId => (
                        <SelectItem key={userId} value={userId.toString()} className="text-white hover:bg-gray-700">
                          User {userId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white font-semibold mb-2 block">User 2</Label>
                  <Select value={user2Id} onValueChange={setUser2Id}>
                    <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select User 2" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {availableUsers.map(userId => (
                        <SelectItem key={userId} value={userId.toString()} className="text-white hover:bg-gray-700">
                          User {userId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Genre Selection */}
              <div>
                <Label className="text-white font-semibold mb-4 block">Select Genres</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {availableGenres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                        className="border-red-500"
                      />
                      <Label htmlFor={genre} className="text-sm text-white cursor-pointer">
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Algorithm Selection */}
              <div>
                <Label className="text-white font-semibold mb-4 block">Recommendation Algorithm</Label>
                <RadioGroup value={recommendationMethod} onValueChange={setRecommendationMethod}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'intersection', label: 'Intersection' },
                      { value: 'weighted', label: 'Weighted' },
                      { value: 'least-misery', label: 'Least Misery' },
                      { value: 'hybrid', label: 'Hybrid' }
                    ].map((method) => (
                      <div key={method.value} className="flex items-center space-x-2 bg-gray-700 p-3 rounded border">
                        <RadioGroupItem value={method.value} id={method.value} />
                        <Label htmlFor={method.value} className="text-white cursor-pointer">
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3" disabled={isLoading}>
                {isLoading ? 'Finding Your Perfect Match...' : 'Get Movie Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            {/* Compatibility Score */}
            {compatibility !== null && (
              <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-600 rounded-full">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Compatibility Score</h3>
                        <p className="text-gray-400">Based on your viewing preferences</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{(compatibility * 100).toFixed(0)}%</div>
                      <div className="text-sm text-green-400">{getCompatibilityMessage(compatibility)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Movie Recommendations */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Recommended Movies ({results.length})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">Show Details</span>
                <Switch checked={showDetailedExplanation} onCheckedChange={setShowDetailedExplanation} />
              </div>
            </div>

            <ScrollArea className="h-[800px] w-full rounded-md border border-gray-700 p-4">
              <div className="space-y-4">
                {results.map((movie) => (
                  <Card key={movie.id} className={`bg-gray-800/50 border-gray-700 hover:shadow-xl transition-shadow ${watchedMovies.has(movie.id) ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                            {movie.trending && (
                              <Badge className="bg-red-600 text-white">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {movie.year}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {movie.duration}
                            </span>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {movie.rating}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {movie.genres.map((genre, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {movie.description}
                          </p>
                          
                          <div className="text-xs text-gray-400">
                            <p><strong>Director:</strong> {movie.director}</p>
                            <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-lg font-bold text-white">{movie.score.toFixed(1)}</span>
                              </div>
                              <div className="text-xs text-gray-400">Rating</div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4 text-green-400" />
                                <span className="text-lg font-bold text-white">{movie.confidenceScore}%</span>
                              </div>
                              <div className="text-xs text-gray-400">Match</div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => toggleWatched(movie.id)}
                            variant="outline"
                            size="sm"
                            className={`${watchedMovies.has(movie.id) ? 'bg-green-600 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`}
                          >
                            {watchedMovies.has(movie.id) ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress bars for individual scores */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>User 1 Score</span>
                            <span>{movie.user1Score?.toFixed(1) || 'N/A'}</span>
                          </div>
                          <Progress 
                            value={movie.user1Score ? (movie.user1Score / 5) * 100 : 0} 
                            className="h-2" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>User 2 Score</span>
                            <span>{movie.user2Score?.toFixed(1) || 'N/A'}</span>
                          </div>
                          <Progress 
                            value={movie.user2Score ? (movie.user2Score / 5) * 100 : 0} 
                            className="h-2" 
                          />
                        </div>
                      </div>
                      
                      {showDetailedExplanation && (
                        <div className="mt-4 p-3 bg-gray-700/50 rounded border border-gray-600">
                          <h4 className="text-sm font-semibold text-white mb-2">Why this recommendation?</h4>
                          <p className="text-xs text-gray-300">
                            This {movie.title} has a {movie.confidenceScore}% compatibility match based on your viewing history and preferences. 
                            The algorithm analyzed similar user patterns and genre preferences to suggest this content.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNetflixRecommender;
