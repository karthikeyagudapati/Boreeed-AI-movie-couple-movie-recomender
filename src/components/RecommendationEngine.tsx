
import { Movie } from '@/types/groupRecommender';
import { movieDatabase } from '@/utils/movieDatabase';

export const generateMovieRecommendations = (
  platform: string,
  selectedGenres: string[],
  watchedMovies: Set<number>,
  currentMovies: Movie[] = [],
  getMore: boolean = false,
  count: number = 15
): Movie[] => {
  let filteredMovies = [...movieDatabase];

  // Filter by platform if specific platform is selected
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
  if (platformName !== 'All') {
    filteredMovies = filteredMovies.filter(movie => 
      movie.availableOn.includes(platformName) || 
      movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
    );
  }

  // Filter by match percentage (49% or higher)
  filteredMovies = filteredMovies.filter(movie => movie.matchPercentage >= 49);

  // Filter by selected genres if any
  if (selectedGenres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genres.some(genre => selectedGenres.includes(genre))
    );
  }

  // Filter out watched movies
  filteredMovies = filteredMovies.filter(movie => !watchedMovies.has(movie.id));

  // Filter out currently displayed movies if getting more
  if (getMore) {
    const currentMovieIds = currentMovies.map(movie => movie.id);
    filteredMovies = filteredMovies.filter(movie => !currentMovieIds.includes(movie.id));
  }

  // Shuffle and get random movies
  const shuffled = filteredMovies.sort(() => Math.random() - 0.5);
  const numberOfMovies = Math.min(shuffled.length, count);
  const selectedMovies = shuffled.slice(0, numberOfMovies);

  // Add some randomness to the scores
  return selectedMovies.map(movie => ({
    ...movie,
    matchPercentage: Math.max(49, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5)),
    commonInterest: Math.max(49, Math.min(98, movie.commonInterest + Math.floor(Math.random() * 10) - 5))
  }));
};

export const getMoviesByGenre = (
  platform: string,
  watchedMovies: Set<number>
): { [key: string]: Movie[] } => {
  const moviesByGenre: { [key: string]: Movie[] } = {};
  let filteredMovies = [...movieDatabase];

  // Filter by platform
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
  if (platformName !== 'All') {
    filteredMovies = filteredMovies.filter(movie => 
      movie.availableOn.includes(platformName) || 
      movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
    );
  }

  // Filter by match percentage
  filteredMovies = filteredMovies.filter(movie => 
    movie.matchPercentage >= 49 && !watchedMovies.has(movie.id)
  );

  // Group by primary genre
  filteredMovies.forEach(movie => {
    const primaryGenre = movie.genres[0];
    if (!moviesByGenre[primaryGenre]) {
      moviesByGenre[primaryGenre] = [];
    }
    if (moviesByGenre[primaryGenre].length < 5) {
      moviesByGenre[primaryGenre].push({
        ...movie,
        matchPercentage: Math.max(49, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5))
      });
    }
  });

  return moviesByGenre;
};
