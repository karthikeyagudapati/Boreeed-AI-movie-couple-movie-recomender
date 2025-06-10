
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Star, Play, Clock, Calendar } from "lucide-react";
import { Movie } from '@/types/groupRecommender';
import { megaMovieDatabase } from '@/utils/megaMovieDatabase';
import { searchSimilarMovies } from '@/components/RecommendationEngine';

interface AdvancedMovieSearchProps {
  platform: string;
  crossPlatformMode: boolean;
  selectedLanguages: string[];
  onSimilarMoviesFound: (movies: Movie[]) => void;
}

const AdvancedMovieSearch: React.FC<AdvancedMovieSearchProps> = ({
  platform,
  crossPlatformMode,
  selectedLanguages,
  onSimilarMoviesFound
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Real-time search suggestions as user types
  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions = megaMovieDatabase.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8);
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDialogOpen(true);
    setShowSuggestions(false);
    setSearchQuery(movie.title);
    
    // Find similar movies
    findSimilarMovies(movie);
  };

  const findSimilarMovies = (movie: Movie) => {
    const similarMovies = megaMovieDatabase.filter(m => {
      if (m.id === movie.id) return false;
      
      const sharedGenres = m.genres.filter(genre => movie.genres.includes(genre)).length;
      const sameDirector = m.director === movie.director;
      const sharedCast = m.cast.some(actor => movie.cast.includes(actor));
      
      return sharedGenres > 0 || sameDirector || sharedCast;
    });
    
    // Sort by similarity and platform availability
    const scoredMovies = similarMovies.map(m => {
      const sharedGenres = m.genres.filter(genre => movie.genres.includes(genre)).length;
      const sameDirector = m.director === movie.director ? 15 : 0;
      const sharedCast = m.cast.filter(actor => movie.cast.includes(actor)).length * 2;
      
      const similarityScore = (sharedGenres * 4) + sameDirector + sharedCast;
      
      return {
        ...m,
        matchPercentage: Math.min(95, m.matchPercentage + similarityScore * 2),
        commonInterest: Math.min(95, m.commonInterest + similarityScore * 2)
      };
    });
    
    const topSimilar = scoredMovies
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 20);
    
    onSimilarMoviesFound(topSimilar);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      setTimeout(() => {
        const results = searchSimilarMovies(searchQuery, platform, crossPlatformMode, selectedLanguages);
        setSearchSuggestions([]);
        setSelectedMovie(null);
        onSimilarMoviesFound(results);
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <>
      <Card className="mb-6 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md relative z-10">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-5 sm:h-6 w-5 sm:w-6 text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Smart Movie Search</h2>
            <Badge className="bg-green-600 text-white text-xs">Real-time</Badge>
          </div>
          
          <div className="relative z-50">
            <Input
              placeholder="Type movie name (e.g., 'HIT-3', 'Avengers')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 text-sm sm:text-base pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            
            {/* Search Suggestions Dropdown - High z-index to appear above other elements */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto">
                {searchSuggestions.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                    onClick={() => handleMovieSelect(movie)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center flex-shrink-0">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">{movie.title}</h4>
                        <p className="text-xs text-gray-400 truncate">{movie.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs bg-gray-600 text-gray-200">
                            {movie.genres[0]}
                          </Badge>
                          <span className="text-xs text-gray-400">{movie.year}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-yellow-500">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            💡 Start typing to see instant suggestions. Click any movie to see similar recommendations!
          </div>
        </CardContent>
      </Card>

      {/* Movie Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMovie && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Play className="h-5 w-5 text-red-400" />
                  {selectedMovie.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{selectedMovie.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-500">{selectedMovie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>2h 15m</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedMovie.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.genres.map((genre) => (
                      <Badge key={genre} className="bg-red-600 text-white">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Director</h4>
                  <p className="text-gray-300">{selectedMovie.director}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cast</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.cast.map((actor) => (
                      <Badge key={actor} variant="outline" className="border-gray-500 text-gray-300">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Available On</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.availableOn.map((platform) => (
                      <Badge key={platform} className="bg-blue-600 text-white">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <Button 
                    onClick={() => setIsDialogOpen(false)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Find Similar Movies
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdvancedMovieSearch;
