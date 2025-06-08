
import { Movie } from '@/types/groupRecommender';
import { movieDatabase } from '@/utils/movieDatabase';

export const generateMovieRecommendations = (
  platform: string,
  selectedGenres: string[],
  watchedMovies: Set<number>,
  currentMovies: Movie[] = [],
  getMore: boolean = false,
  count: number = 15,
  crossPlatform: boolean = false
): Movie[] => {
  let filteredMovies = [...movieDatabase];

  // If cross-platform is enabled, include movies from all platforms
  // Otherwise, filter by the selected platform
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    if (platformName !== 'All') {
      filteredMovies = filteredMovies.filter(movie => 
        movie.availableOn.includes(platformName) || 
        movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
      );
    }
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

  // If cross-platform and viewing history is available, boost relevance
  if (crossPlatform) {
    // Prioritize movies that are similar to Netflix viewing patterns
    filteredMovies = filteredMovies.map(movie => ({
      ...movie,
      matchPercentage: Math.min(98, movie.matchPercentage + 15), // Boost match for cross-platform
      commonInterest: Math.min(98, movie.commonInterest + 10)
    }));
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
  watchedMovies: Set<number>,
  crossPlatform: boolean = false
): { [key: string]: Movie[] } => {
  const moviesByGenre: { [key: string]: Movie[] } = {};
  let filteredMovies = [...movieDatabase];

  // Filter by platform unless cross-platform is enabled
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    if (platformName !== 'All') {
      filteredMovies = filteredMovies.filter(movie => 
        movie.availableOn.includes(platformName) || 
        movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
      );
    }
  }

  // Show ALL movies with match percentage >= 49% (not limiting to top movies)
  filteredMovies = filteredMovies.filter(movie => 
    movie.matchPercentage >= 49 && !watchedMovies.has(movie.id)
  );

  // Group by primary genre and show ALL matching movies
  filteredMovies.forEach(movie => {
    const primaryGenre = movie.genres[0];
    if (!moviesByGenre[primaryGenre]) {
      moviesByGenre[primaryGenre] = [];
    }
    // Remove the limit, show all movies above 49%
    moviesByGenre[primaryGenre].push({
      ...movie,
      matchPercentage: Math.max(49, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5))
    });
  });

  // Sort movies within each genre by match percentage
  Object.keys(moviesByGenre).forEach(genre => {
    moviesByGenre[genre].sort((a, b) => b.matchPercentage - a.matchPercentage);
  });

  return moviesByGenre;
};

export const analyzeViewingHistory = (file: File): Promise<string[]> => {
  return new Promise((resolve) => {
    // Simulate analyzing viewing history and extracting preferences
    setTimeout(() => {
      // Mock analysis - in real implementation, this would parse the CSV
      const detectedGenres = ['Action', 'Comedy', 'Drama', 'Thriller'];
      resolve(detectedGenres);
    }, 1000);
  });
};
