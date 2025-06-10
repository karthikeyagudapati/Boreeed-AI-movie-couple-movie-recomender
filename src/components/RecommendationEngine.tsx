import { Movie } from '@/types/groupRecommender';
import { movieDatabase } from '@/utils/movieDatabase';
import { expandedMovieDatabase } from '@/utils/expandedMovieDatabase';
import { megaMovieDatabase } from '@/utils/megaMovieDatabase';

export const generateMovieRecommendations = (
  platform: string,
  selectedGenres: string[],
  watchedMovies: Set<number>,
  currentMovies: Movie[] = [],
  getMore: boolean = false,
  count: number = 50,
  crossPlatform: boolean = false,
  manualTitles: string[] = [],
  selectedLanguages: string[] = []
): Movie[] => {
  // Use MEGA database for maximum variety (1000+ movies)
  let filteredMovies = [...megaMovieDatabase, ...expandedMovieDatabase, ...movieDatabase];

  console.log('Cross-platform mode:', crossPlatform);
  console.log('Selected platform:', platform);
  console.log('Manual titles provided:', manualTitles);
  console.log('Selected languages:', selectedLanguages);
  console.log('Total movies in database:', filteredMovies.length);

  // ENHANCED LANGUAGE FILTERING - Only show movies in selected languages
  if (selectedLanguages && selectedLanguages.length > 0) {
    console.log('Filtering by languages:', selectedLanguages);
    filteredMovies = filteredMovies.filter(movie => {
      // Add language property to movies (simulation for demonstration)
      const movieLanguage = getMovieLanguage(movie.title, movie.genres);
      const matchesLanguage = selectedLanguages.includes(movieLanguage);
      
      if (matchesLanguage) {
        console.log(`Including ${movie.title} - Language: ${movieLanguage}`);
      }
      
      return matchesLanguage;
    });
    console.log('Movies after language filtering:', filteredMovies.length);
  }

  // Analyze manual titles to boost similar movies
  if (manualTitles && manualTitles.length > 0) {
    console.log('Analyzing manual titles for preferences:', manualTitles);
    
    // Extract genres from manual titles by matching with existing movies
    const inferredGenres = new Set<string>();
    manualTitles.forEach(title => {
      const matchingMovies = filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(movie.title.toLowerCase())
      );
      
      matchingMovies.forEach(movie => {
        movie.genres.forEach(genre => inferredGenres.add(genre));
      });
    });
    
    console.log('Inferred genres from manual titles:', Array.from(inferredGenres));
    
    // Boost movies with similar genres
    filteredMovies = filteredMovies.map(movie => {
      const hasInferredGenre = movie.genres.some(genre => inferredGenres.has(genre));
      const matchBoost = hasInferredGenre ? 20 : 0;
      
      return {
        ...movie,
        matchPercentage: Math.min(98, movie.matchPercentage + matchBoost),
        commonInterest: Math.min(98, movie.commonInterest + matchBoost)
      };
    });
  }

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

  // Filter by match percentage (35% or higher for maximum variety)
  filteredMovies = filteredMovies.filter(movie => movie.matchPercentage >= 35);
  console.log('Movies above 35% match:', filteredMovies.length);

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
    matchPercentage: Math.max(35, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5)),
    commonInterest: Math.max(35, Math.min(98, movie.commonInterest + Math.floor(Math.random() * 10) - 5))
  }));
};

// Helper function to determine movie language based on title and genres
const getMovieLanguage = (title: string, genres: string[]): string => {
  // Telugu movie patterns
  const teluguPatterns = [
    'RRR', 'Baahubali', 'Pushpa', 'Arjun Reddy', 'Geetha Govindam', 'Majili', 'Dear Comrade',
    'Saaho', 'Maharshi', 'Ala Vaikunthapurramuloo', 'Aravinda Sametha', 'Rangasthalam',
    'Bharat Ane Nenu', 'Mahanati', 'HIT', 'Agent', 'Bheeshma', 'Karthikeya 2'
  ];
  
  // Tamil movie patterns
  const tamilPatterns = [
    'Vikram', 'Beast', 'Master', 'Bigil', 'Mersal', 'Sarkar', 'Kabali', 'Kaala',
    'Enthiran', 'Sivaji', 'Anniyan', 'Ghilli', 'Thuppakki', 'Kaththi'
  ];
  
  // Hindi movie patterns
  const hindiPatterns = [
    'Dangal', 'Baahubali', 'PK', '3 Idiots', 'Sultan', 'Tiger', 'War', 'Pathaan',
    'KGF', 'Pushpa', 'Sooryavanshi', 'Simmba', 'Padmaavat', 'Gully Boy'
  ];
  
  const titleLower = title.toLowerCase();
  
  // Check for Telugu patterns
  if (teluguPatterns.some(pattern => titleLower.includes(pattern.toLowerCase()))) {
    return 'te';
  }
  
  // Check for Tamil patterns
  if (tamilPatterns.some(pattern => titleLower.includes(pattern.toLowerCase()))) {
    return 'ta';
  }
  
  // Check for Hindi patterns
  if (hindiPatterns.some(pattern => titleLower.includes(pattern.toLowerCase()))) {
    return 'hi';
  }
  
  // Default to English for other movies
  return 'en';
};

export const getMoviesByGenre = (
  platform: string,
  watchedMovies: Set<number>,
  crossPlatform: boolean = false,
  selectedLanguages: string[] = []
): { [key: string]: Movie[] } => {
  const moviesByGenre: { [key: string]: Movie[] } = {};
  let filteredMovies = [...megaMovieDatabase, ...expandedMovieDatabase, ...movieDatabase];

  console.log('Genre filtering - Cross-platform:', crossPlatform, 'Platform:', platform);
  console.log('Total movies for genre filtering:', filteredMovies.length);
  console.log('Selected languages for genre filtering:', selectedLanguages);

  // ENHANCED LANGUAGE FILTERING for genre-based recommendations
  if (selectedLanguages && selectedLanguages.length > 0) {
    console.log('Filtering genre movies by languages:', selectedLanguages);
    filteredMovies = filteredMovies.filter(movie => {
      const movieLanguage = getMovieLanguage(movie.title, movie.genres);
      return selectedLanguages.includes(movieLanguage);
    });
    console.log('Genre movies after language filtering:', filteredMovies.length);
  }

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
    // Show up to 40 movies per genre for extensive recommendations
    if (moviesByGenre[primaryGenre].length < 40) {
      moviesByGenre[primaryGenre].push({
        ...movie,
        matchPercentage: Math.max(35, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 8) - 4))
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

// Updated search function to use mega database
export const searchSimilarMovies = (
  searchTitle: string, 
  platform: string, 
  crossPlatform: boolean = false, 
  selectedLanguages: string[] = []
): Movie[] => {
  let allMovies = [...megaMovieDatabase, ...expandedMovieDatabase, ...movieDatabase];
  
  // Filter by language first if specified
  if (selectedLanguages && selectedLanguages.length > 0) {
    allMovies = allMovies.filter(movie => {
      const movieLanguage = getMovieLanguage(movie.title, movie.genres);
      return selectedLanguages.includes(movieLanguage);
    });
  }
  
  // Filter by platform if not cross-platform
  if (!crossPlatform) {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
    allMovies = allMovies.filter(movie => 
      movie.availableOn.includes(platformName) || 
      movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
    );
  }
  
  // Find the searched movie first
  const searchedMovie = allMovies.find(movie => 
    movie.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
    searchTitle.toLowerCase().includes(movie.title.toLowerCase())
  );
  
  if (!searchedMovie) {
    // If exact match not found, return movies with similar keywords
    const keywords = searchTitle.toLowerCase().split(' ');
    return allMovies.filter(movie => 
      keywords.some(keyword => 
        movie.title.toLowerCase().includes(keyword) ||
        movie.description.toLowerCase().includes(keyword) ||
        movie.genres.some(genre => genre.toLowerCase().includes(keyword))
      )
    ).slice(0, 30);
  }
  
  // Find similar movies based on genres, director, cast
  const similarMovies = allMovies.filter(movie => {
    if (movie.id === searchedMovie.id) return false;
    
    const sharedGenres = movie.genres.filter(genre => searchedMovie.genres.includes(genre)).length;
    const sameDirector = movie.director === searchedMovie.director;
    const sharedCast = movie.cast.some(actor => searchedMovie.cast.includes(actor));
    
    return sharedGenres > 0 || sameDirector || sharedCast;
  });
  
  // Sort by similarity score
  const scoredMovies = similarMovies.map(movie => {
    const sharedGenres = movie.genres.filter(genre => searchedMovie.genres.includes(genre)).length;
    const sameDirector = movie.director === searchedMovie.director ? 15 : 0;
    const sharedCast = movie.cast.filter(actor => searchedMovie.cast.includes(actor)).length;
    
    const similarityScore = (sharedGenres * 4) + sameDirector + (sharedCast * 2);
    
    return {
      ...movie,
      matchPercentage: Math.min(95, movie.matchPercentage + similarityScore * 2),
      commonInterest: Math.min(95, movie.commonInterest + similarityScore * 2)
    };
  });
  
  return scoredMovies.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 30);
};
