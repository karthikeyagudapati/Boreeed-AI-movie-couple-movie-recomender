
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Star, Play, Clock, Calendar, Check } from "lucide-react";
import { Movie } from '@/types/groupRecommender';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  theme: any;
  onMarkAsWatched: (movieId: number) => void;
  showCount?: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ 
  title, 
  movies, 
  theme, 
  onMarkAsWatched, 
  showCount = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const moviesPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + moviesPerView >= movies.length ? 0 : prevIndex + moviesPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, movies.length - moviesPerView) : Math.max(0, prevIndex - moviesPerView)
    );
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDialogOpen(true);
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + moviesPerView);

  if (movies.length === 0) return null;

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            {title}
            {showCount && (
              <Badge variant="outline" className="text-gray-300 border-gray-500">
                {movies.length} movies
              </Badge>
            )}
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-500 hover:bg-gray-700 bg-gray-800/50"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-500 hover:bg-gray-700 bg-gray-800/50"
              disabled={currentIndex + moviesPerView >= movies.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-gray-800/70 rounded-lg p-4 hover:bg-gray-700/70 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-gray-500"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="w-full h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Play className="h-8 w-8 text-white" />
              </div>
              
              <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                {movie.title}
              </h4>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{movie.year}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-yellow-500">{movie.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.genres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs bg-gray-600 text-gray-200">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className="bg-green-600 text-white text-xs">
                  {movie.matchPercentage}% Match
                </Badge>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsWatched(movie.id);
                  }}
                  size="sm"
                  variant="outline"
                  className="text-xs border-gray-500 text-gray-300 hover:bg-gray-600"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Watched
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Details Dialog - Same popup effect as Smart Search */}
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
                
                <div className="pt-4 border-t border-gray-700 flex gap-3">
                  <Button 
                    onClick={() => {
                      onMarkAsWatched(selectedMovie.id);
                      setIsDialogOpen(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Watched
                  </Button>
                  <Button 
                    onClick={() => setIsDialogOpen(false)}
                    variant="outline"
                    className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-700"
                  >
                    Close
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

export default MovieCarousel;
