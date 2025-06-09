
import { Movie } from '@/types/groupRecommender';
import { movieDatabase } from '@/utils/movieDatabase';
import { expandedMovieDatabase } from '@/utils/expandedMovieDatabase';

export const generateMovieRecommendations = (
  platform: string,
  selectedGenres: string[],
  watchedMovies: Set<number>,
  currentMovies: Movie[] = [],
  getMore: boolean = false,
  count: number = 30,
  crossPlatform: boolean = false
): Movie[] => {
  // Use expanded database for more variety
  let filteredMovies = [...expandedMovieDatabase, ...movieDatabase];

  console.log('Cross-platform mode:', crossPlatform);
  console.log('Selected platform:', platform);
  console.log('Total movies in database:', filteredMovies.length);

  // Enhanced Platform filtering logic
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    console.log('Filtering for platform:', platformName);
    
    if (platformName !== 'All') {
      filteredMovies = filteredMovies.filter(movie => {
        const hasExactMatch = movie.availableOn.includes(platformName);
        const hasPartialMatch = movie.availableOn.some(p => 
          p.toLowerCase().includes(platform.toLowerCase()) ||
          platform.toLowerCase().includes(p.toLowerCase())
        );
        return hasExactMatch || hasPartialMatch;
      });
      
      console.log(`Movies available on ${platformName}:`, filteredMovies.length);
    }
  } else {
    console.log('Cross-platform mode: showing all movies');
  }

  // Filter by match percentage (49% or higher)
  filteredMovies = filteredMovies.filter(movie => movie.matchPercentage >= 49);
  console.log('Movies above 49% match:', filteredMovies.length);

  // Filter by selected genres if any
  if (selectedGenres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genres.some(genre => selectedGenres.includes(genre))
    );
    console.log('Movies matching selected genres:', filteredMovies.length);
  }

  // Filter out watched movies
  filteredMovies = filteredMovies.filter(movie => !watchedMovies.has(movie.id));

  // Filter out currently displayed movies if getting more
  if (getMore) {
    const currentMovieIds = currentMovies.map(movie => movie.id);
    filteredMovies = filteredMovies.filter(movie => !currentMovieIds.includes(movie.id));
  }

  // Enhanced cross-platform logic for viewing history analysis
  if (crossPlatform) {
    // Boost relevance for cross-platform recommendations
    filteredMovies = filteredMovies.map(movie => ({
      ...movie,
      matchPercentage: Math.min(98, movie.matchPercentage + 15),
      commonInterest: Math.min(98, movie.commonInterest + 10)
    }));
  }

  // If no movies found for specific platform, suggest enabling cross-platform
  if (filteredMovies.length === 0 && !crossPlatform) {
    console.warn(`No movies found for ${platform}. Consider enabling cross-platform mode.`);
  }

  // Shuffle and get random movies
  const shuffled = filteredMovies.sort(() => Math.random() - 0.5);
  const numberOfMovies = Math.min(shuffled.length, count);
  const selectedMovies = shuffled.slice(0, numberOfMovies);

  console.log('Final filtered movies count:', filteredMovies.length);
  console.log('Selected movies count:', selectedMovies.length);

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
  let filteredMovies = [...expandedMovieDatabase, ...movieDatabase];

  console.log('Genre filtering - Cross-platform:', crossPlatform, 'Platform:', platform);
  console.log('Total movies for genre filtering:', filteredMovies.length);

  // Filter by platform unless cross-platform is enabled
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    console.log('Genre filtering for platform:', platformName);
    
    if (platformName !== 'All') {
      filteredMovies = filteredMovies.filter(movie => {
        const hasExactMatch = movie.availableOn.includes(platformName);
        const hasPartialMatch = movie.availableOn.some(p => 
          p.toLowerCase().includes(platform.toLowerCase()) ||
          platform.toLowerCase().includes(p.toLowerCase())
        );
        return hasExactMatch || hasPartialMatch;
      });
      
      console.log(`Genre movies available on ${platformName}:`, filteredMovies.length);
    }
  }

  // Show ALL movies with match percentage >= 49%
  filteredMovies = filteredMovies.filter(movie => 
    movie.matchPercentage >= 49 && !watchedMovies.has(movie.id)
  );

  console.log('Total filtered movies for genres:', filteredMovies.length);

  // Group by primary genre and show MORE movies per genre (25 per genre)
  filteredMovies.forEach(movie => {
    const primaryGenre = movie.genres[0];
    if (!moviesByGenre[primaryGenre]) {
      moviesByGenre[primaryGenre] = [];
    }
    // Show up to 25 movies per genre for better recommendations
    if (moviesByGenre[primaryGenre].length < 25) {
      moviesByGenre[primaryGenre].push({
        ...movie,
        matchPercentage: Math.max(49, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5))
      });
    }
  });

  // Sort movies within each genre by match percentage
  Object.keys(moviesByGenre).forEach(genre => {
    moviesByGenre[genre].sort((a, b) => b.matchPercentage - a.matchPercentage);
    console.log(`${genre} movies:`, moviesByGenre[genre].length);
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
