
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";
import { Movie, ThemeColors } from '@/types/groupRecommender';

interface MovieCardProps {
  movie: Movie;
  theme: ThemeColors;
  onMarkAsWatched: (movieId: number) => void;
  compact?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, theme, onMarkAsWatched, compact = false }) => {
  if (compact) {
    return (
      <Card className="bg-gray-800/70 border-gray-600 min-w-80 max-w-80 flex-shrink-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-white">{movie.title}</h4>
            <span className="text-sm text-gray-400">({movie.year})</span>
          </div>
          <p className="text-gray-200 text-sm mb-3 line-clamp-2">{movie.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm">
              <span className="text-green-400 font-bold">{movie.matchPercentage}%</span>
              <span className="text-gray-300 ml-2">Match</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{movie.rating}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {movie.availableOn.map((platform: string) => (
                <Badge key={platform} className={`${theme.primary} text-white text-xs`}>
                  {platform}
                </Badge>
              ))}
            </div>
            <Button
              onClick={() => onMarkAsWatched(movie.id)}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-200 hover:bg-gray-600"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/70 border-gray-600 hover:shadow-xl transition-shadow backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="flex-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">{movie.title}</h3>
              <span className="text-sm text-gray-400">({movie.year})</span>
            </div>
            <p className="text-gray-200 text-sm mb-3 leading-relaxed">{movie.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((genre: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-gray-600 text-gray-200 text-xs border-0">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                {movie.rating}
              </span>
              {movie.director && <span>Dir: {movie.director}</span>}
            </div>

            {movie.cast && (
              <div className="text-sm text-gray-400 mb-3">
                <span className="font-medium">Cast: </span>
                {movie.cast.slice(0, 2).join(', ')}
              </div>
            )}
          </div>

          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:ml-4 w-full lg:w-auto">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-400">{movie.matchPercentage}%</div>
              <div className="text-xs text-gray-300">Group Match</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{movie.commonInterest}%</div>
              <div className="text-xs text-gray-300">Common Interest</div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {movie.availableOn.map((platform: string) => (
                <Badge key={platform} className={`${theme.primary} text-white text-xs border-0`}>
                  {platform}
                </Badge>
              ))}
            </div>

            <Button
              onClick={() => onMarkAsWatched(movie.id)}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-200 hover:bg-gray-600"
            >
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Already Watched</span>
              <span className="sm:hidden">Watched</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
