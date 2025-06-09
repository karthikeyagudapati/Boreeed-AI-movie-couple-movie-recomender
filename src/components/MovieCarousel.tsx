
import React from 'react';
import { Movie, ThemeColors } from '@/types/groupRecommender';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  theme: ThemeColors;
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
  if (movies.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-bold text-white border-b border-gray-600 pb-2 flex items-center gap-2">
        {title}
        {showCount && (
          <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">
            {movies.length} movies
          </span>
        )}
      </h3>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <MovieCard
                  movie={movie}
                  theme={theme}
                  onMarkAsWatched={onMarkAsWatched}
                  compact
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700" />
          <CarouselNext className="hidden md:flex -right-4 bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700" />
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCarousel;
