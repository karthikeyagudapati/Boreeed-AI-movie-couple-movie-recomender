import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";
import { Movie, ThemeColors } from '@/types/groupRecommender';

interface MovieCardProps {
  movie: Movie;
  theme: ThemeColors;
  onMarkAsWatched: (movieId: number) => void;
  compact?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, theme, onMarkAsWatched, compact = false }) => {
  const [isWatched, setIsWatched] = useState(false);

  const handleMarkAsWatched = () => {
    setIsWatched(true);
    onMarkAsWatched(movie.id);
  };

  return (
    <Card className={`${compact ? 'w-64' : 'w-full'} bg-gray-800/70 border-gray-600 backdrop-blur-sm hover:bg-gray-700/70 transition-all duration-300`}>
      <CardContent className="p-4">
        <div className={`flex ${compact ? 'flex-col' : 'flex-col sm:flex-row'} gap-4`}>
          {/* Movie poster placeholder */}
          <div className={`${compact ? 'w-full h-32' : 'w-full sm:w-32 h-48 sm:h-32'} bg-gradient-to-br ${theme.bg} rounded-lg flex items-center justify-center`}>
            <Play className="h-8 w-8 text-white opacity-60" />
          </div>

          {/* Movie details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-bold text-white line-clamp-2`}>
                {movie.title}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-yellow-500 text-sm font-medium">{movie.rating}</span>
              </div>
            </div>

            {!compact && (
              <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>
            )}

            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, compact ? 2 : 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs bg-gray-600 text-gray-200">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={`${theme.primary} text-white text-xs`}>
                  {movie.matchPercentage}% Match
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                  {movie.year}
                </Badge>
              </div>

              {/* Improved watched button with better colors */}
              <Button
                onClick={handleMarkAsWatched}
                disabled={isWatched}
                size="sm"
                className={
                  isWatched 
                    ? "bg-red-600 text-white hover:bg-red-700 border-red-500 cursor-not-allowed opacity-75" 
                    : "bg-green-600 text-white hover:bg-green-700 border-green-500"
                }
              >
                {isWatched ? '✓ Watched' : 'Mark as Watched'}
              </Button>
            </div>

            {/* Available platforms */}
            <div className="flex flex-wrap gap-1">
              {movie.availableOn.map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs border-blue-400 text-blue-300 bg-blue-900/20">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
