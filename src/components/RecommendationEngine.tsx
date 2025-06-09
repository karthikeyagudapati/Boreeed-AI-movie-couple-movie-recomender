
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
  // Use MASSIVE expanded database for more variety (500+ movies)
  let filteredMovies = [...expandedMovieDatabase, ...movieDatabase];

  console.log('Cross-platform mode:', crossPlatform);
  console.log('Selected platform:', platform);
  console.log('Total movies in database:', filteredMovies.length);

  // IMPROVED Platform filtering logic - More flexible when user has viewing history
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    console.log('Filtering for platform:', platformName);
    
    if (platformName !== 'All') {
      // First try exact platform match
      let platformMovies = filteredMovies.filter(movie => {
        const hasExactMatch = movie.availableOn.includes(platformName);
        const hasPartialMatch = movie.availableOn.some(p => 
          p.toLowerCase().includes(platform.toLowerCase()) ||
          platform.toLowerCase().includes(p.toLowerCase())
        );
        return hasExactMatch || hasPartialMatch;
      });
      
      console.log(`Movies available on ${platformName}:`, platformMovies.length);
      
      // If we don't have enough movies for this platform, be more flexible
      if (platformMovies.length < 20) {
        console.log('Not enough movies for this platform, using more flexible matching...');
        // Include movies that might be on similar platforms or use broader matching
        platformMovies = filteredMovies.filter(movie => {
          // More flexible platform matching
          const platformLower = platform.toLowerCase();
          const moviePlatforms = movie.availableOn.map(p => p.toLowerCase());
          
          // Check for any partial matches or similar platforms
          return moviePlatforms.some(p => 
            p.includes(platformLower) || 
            platformLower.includes(p) ||
            (platformLower.includes('prime') && p.includes('amazon')) ||
            (platformLower.includes('netflix') && p.includes('netflix')) ||
            (platformLower.includes('disney') && (p.includes('disney') || p.includes('hotstar'))) ||
            (platformLower.includes('hbo') && p.includes('hbo'))
          );
        });
        
        // If still not enough, boost recommendations by adding cross-platform appeal
        if (platformMovies.length < 15) {
          console.log('Still not enough movies, adding top-rated cross-platform content...');
          const topRatedMovies = filteredMovies
            .filter(movie => movie.matchPercentage >= 85)
            .slice(0, 30);
          platformMovies = [...platformMovies, ...topRatedMovies];
        }
      }
      
      filteredMovies = platformMovies;
    }
  } else {
    console.log('Cross-platform mode: showing all movies');
  }

  // Filter by match percentage (45% or higher for more variety)
  filteredMovies = filteredMovies.filter(movie => movie.matchPercentage >= 45);
  console.log('Movies above 45% match:', filteredMovies.length);

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
      matchPercentage: Math.min(98, movie.matchPercentage + 10),
      commonInterest: Math.min(98, movie.commonInterest + 8)
    }));
  }

  // Enhanced recommendation for platform-specific with viewing history
  if (!crossPlatform && filteredMovies.length > 0) {
    // Boost match percentages for platform-specific recommendations
    filteredMovies = filteredMovies.map(movie => ({
      ...movie,
      matchPercentage: Math.min(95, movie.matchPercentage + 5),
      commonInterest: Math.min(95, movie.commonInterest + 5)
    }));
  }

  // If no movies found for specific platform, suggest enabling cross-platform
  if (filteredMovies.length === 0 && !crossPlatform) {
    console.warn(`No movies found for ${platform}. Consider enabling cross-platform mode.`);
  }

  // Remove duplicates based on movie ID
  const uniqueMovies = filteredMovies.filter((movie, index, self) => 
    index === self.findIndex(m => m.id === movie.id)
  );

  // Shuffle and get random movies
  const shuffled = uniqueMovies.sort(() => Math.random() - 0.5);
  const numberOfMovies = Math.min(shuffled.length, count);
  const selectedMovies = shuffled.slice(0, numberOfMovies);

  console.log('Final filtered movies count:', uniqueMovies.length);
  console.log('Selected movies count:', selectedMovies.length);

  // Add some randomness to the scores for variety
  return selectedMovies.map(movie => ({
    ...movie,
    matchPercentage: Math.max(45, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5)),
    commonInterest: Math.max(45, Math.min(98, movie.commonInterest + Math.floor(Math.random() * 10) - 5))
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

  // IMPROVED platform filtering for genre-based recommendations
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    console.log('Genre filtering for platform:', platformName);
    
    if (platformName !== 'All') {
      // First try exact platform match
      let platformMovies = filteredMovies.filter(movie => {
        const hasExactMatch = movie.availableOn.includes(platformName);
        const hasPartialMatch = movie.availableOn.some(p => 
          p.toLowerCase().includes(platform.toLowerCase()) ||
          platform.toLowerCase().includes(p.toLowerCase())
        );
        return hasExactMatch || hasPartialMatch;
      });
      
      console.log(`Genre movies available on ${platformName}:`, platformMovies.length);
      
      // If we don't have enough movies, be more flexible
      if (platformMovies.length < 30) {
        console.log('Not enough genre movies, using flexible matching...');
        const flexibleMovies = filteredMovies.filter(movie => {
          const platformLower = platform.toLowerCase();
          const moviePlatforms = movie.availableOn.map(p => p.toLowerCase());
          
          return moviePlatforms.some(p => 
            p.includes(platformLower) || 
            platformLower.includes(p) ||
            (platformLower.includes('prime') && p.includes('amazon')) ||
            (platformLower.includes('netflix') && p.includes('netflix')) ||
            (platformLower.includes('disney') && (p.includes('disney') || p.includes('hotstar'))) ||
            (platformLower.includes('hbo') && p.includes('hbo'))
          );
        });
        
        platformMovies = [...platformMovies, ...flexibleMovies];
        
        // If still not enough, add top-rated content
        if (platformMovies.length < 25) {
          const topContent = filteredMovies
            .filter(movie => movie.matchPercentage >= 80)
            .slice(0, 40);
          platformMovies = [...platformMovies, ...topContent];
        }
      }
      
      filteredMovies = platformMovies;
    }
  }

  // Show movies with match percentage >= 45% for more variety
  filteredMovies = filteredMovies.filter(movie => 
    movie.matchPercentage >= 45 && !watchedMovies.has(movie.id)
  );

  // Remove duplicates
  filteredMovies = filteredMovies.filter((movie, index, self) => 
    index === self.findIndex(m => m.id === movie.id)
  );

  console.log('Total filtered movies for genres:', filteredMovies.length);

  // Group by primary genre and show MORE movies per genre (30 per genre)
  filteredMovies.forEach(movie => {
    const primaryGenre = movie.genres[0];
    if (!moviesByGenre[primaryGenre]) {
      moviesByGenre[primaryGenre] = [];
    }
    // Show up to 30 movies per genre for extensive recommendations
    if (moviesByGenre[primaryGenre].length < 30) {
      moviesByGenre[primaryGenre].push({
        ...movie,
        matchPercentage: Math.max(45, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 8) - 4))
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
      const detectedGenres = ['Action', 'Comedy', 'Drama', 'Thriller', 'Sci-Fi', 'Romance'];
      resolve(detectedGenres);
    }, 1000);
  });
};
