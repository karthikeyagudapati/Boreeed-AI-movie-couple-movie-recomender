import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, RefreshCw, Brain, Zap, BarChart } from "lucide-react";
import { User, Movie, GroupRecommenderProps } from '@/types/groupRecommender';
import { getThemeColors } from '@/utils/platformTheme';
import { generateMovieRecommendations, getMoviesByGenre, analyzeViewingHistory } from '@/components/RecommendationEngine';
import GroupSetup from '@/components/GroupSetup';
import GenreSelection from '@/components/GenreSelection';
import LanguageSelector from '@/components/LanguageSelector';
import PlatformModeSelector from '@/components/PlatformModeSelector';
import MovieCard from '@/components/MovieCard';
import MovieCarousel from '@/components/MovieCarousel';
import RecommendationVisualizations from '@/components/RecommendationVisualizations';
import AdvancedMovieSearch from '@/components/AdvancedMovieSearch';

const GroupRecommender: React.FC<GroupRecommenderProps> = ({ platform, country, onBack }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: '', platforms: [], preferences: [], manualTitles: [] }
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en']); // Default to English
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [manualTitleInput, setManualTitleInput] = useState<{[key: string]: string}>({});
  const [crossPlatformMode, setCrossPlatformMode] = useState(false);

  const theme = getThemeColors(platform);
  const hasViewingHistory = users.some(user => user.viewingHistory);

  const addUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: '',
      platforms: [],
      preferences: [],
      manualTitles: []
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (userId: string) => {
    if (users.length > 1) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const updateUser = (userId: string, field: keyof User, value: any) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };

  const addManualTitle = (userId: string) => {
    const title = manualTitleInput[userId]?.trim();
    if (title) {
      const user = users.find(u => u.id === userId);
      if (user) {
        const updatedTitles = [...(user.manualTitles || []), title];
        updateUser(userId, 'manualTitles', updatedTitles);
        setManualTitleInput(prev => ({ ...prev, [userId]: '' }));
      }
    }
  };

  const removeManualTitle = (userId: string, titleIndex: number) => {
    const user = users.find(u => u.id === userId);
    if (user && user.manualTitles) {
      const updatedTitles = user.manualTitles.filter((_, index) => index !== titleIndex);
      updateUser(userId, 'manualTitles', updatedTitles);
    }
  };

  const handleFileUpload = async (userId: string, file: File) => {
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.name.endsWith('.xlsx'))) {
      updateUser(userId, 'viewingHistory', file);
      
      // Enable cross-platform mode when file is uploaded
      setCrossPlatformMode(true);
      
      // Analyze viewing history and suggest genres
      try {
        const detectedGenres = await analyzeViewingHistory(file);
        setSelectedGenres(prev => [...new Set([...prev, ...detectedGenres])]);
      } catch (error) {
        console.log('Error analyzing viewing history:', error);
      }
    } else {
      alert('Please upload a valid CSV or Excel file');
    }
  };

  const handleManualTitleInputChange = (userId: string, value: string) => {
    setManualTitleInput(prev => ({ ...prev, [userId]: value }));
  };

  const markAsWatched = (movieId: number) => {
    const newWatchedMovies = new Set(watchedMovies);
    newWatchedMovies.add(movieId);
    setWatchedMovies(newWatchedMovies);

    setRecommendations(prev => prev.filter(movie => movie.id !== movieId));
    setSimilarMovies(prev => prev.filter(movie => movie.id !== movieId));
    
    // Get a new movie to replace the watched one
    setTimeout(() => {
      generateRecommendations(true, 1);
    }, 500);
  };

  const getMoreRecommendations = () => {
    generateRecommendations(true);
  };

  const generateRecommendations = (getMore = false, count = 50) => {
    setIsLoading(true);
    
    // Collect all manual titles from all users
    const allManualTitles = users.flatMap(user => user.manualTitles || []);
    console.log('All manual titles from users:', allManualTitles);
    console.log('Selected languages:', selectedLanguages);
    
    setTimeout(() => {
      const newMovies = generateMovieRecommendations(
        platform,
        selectedGenres,
        watchedMovies,
        recommendations,
        getMore,
        count,
        crossPlatformMode,
        allManualTitles,
        selectedLanguages // Pass selected languages to recommendation engine
      );

      // Language filtering is now handled in the recommendation engine
      let filteredMovies = newMovies;
      console.log('Recommendations after language filtering:', filteredMovies.length);

      if (getMore) {
        setRecommendations(prev => [...prev, ...filteredMovies]);
      } else {
        setRecommendations(filteredMovies);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSimilarMoviesFound = (movies: Movie[]) => {
    setSimilarMovies(movies);
  };

  const moviesByGenre = selectedGenres.length === 0 ? getMoviesByGenre(platform, watchedMovies, crossPlatformMode, selectedLanguages) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      {/* Header with Theme Colors - Mobile optimized */}
      <div className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-gray-800 text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Platform Selection</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-wrap">
              <Badge className={`${theme.primary} text-white font-semibold px-2 sm:px-4 py-2 text-xs sm:text-sm`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50 text-xs sm:text-sm">
                {country}
              </Badge>
              {crossPlatformMode && (
                <Badge className="bg-blue-600 text-white text-xs sm:text-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Cross-Platform</span>
                  <span className="sm:hidden">Cross</span>
                </Badge>
              )}
              {selectedLanguages.length > 0 && (
                <Badge className="bg-green-600 text-white text-xs sm:text-sm">
                  {selectedLanguages.length} Lang{selectedLanguages.length > 1 ? 's' : ''}
                </Badge>
              )}
              <Button
                onClick={() => setShowAnalysis(!showAnalysis)}
                variant="outline"
                size="sm"
                className="border-gray-500 text-gray-200 hover:bg-gray-600 bg-gray-800/50 text-xs"
              >
                <BarChart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Analysis</span>
              </Button>
              <Button
                onClick={() => setShowAlgorithm(!showAlgorithm)}
                variant="outline"
                size="sm"
                className="border-gray-500 text-gray-200 hover:bg-gray-600 bg-gray-800/50 text-xs"
              >
                <Brain className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Algorithm</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section - Mobile optimized */}
      {showAnalysis && (
        <div className="bg-gray-900/95 border-b border-gray-700 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gray-800/90 border-gray-600 shadow-xl">
              <CardContent className="p-2 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <BarChart className="h-5 w-5 text-green-400" />
                  Recommendation Analysis Dashboard
                </h3>
                <div className="bg-gray-900/80 p-2 sm:p-4 rounded-lg border border-gray-700">
                  <RecommendationVisualizations />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Algorithm Explanation - Mobile optimized */}
      {showAlgorithm && (
        <div className="bg-gray-900/95 border-b border-gray-700 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gray-800/90 border-gray-600 shadow-xl">
              <CardContent className="p-2 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-blue-400" />
                  Advanced Recommendation Algorithm
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
                  <div className="bg-gray-900/80 p-3 sm:p-4 rounded-lg border border-gray-700">
                    <h4 className="font-semibold mb-2 text-green-400 text-sm sm:text-base">Content Filtering Engine</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Platform-specific content matching</li>
                      <li>• Advanced genre & language preferences</li>
                      <li>• Match percentage ≥ 45% threshold</li>
                      <li>• CSV viewing history integration</li>
                      <li>• 1000+ movie database with language support</li>
                      <li>• Cross-platform preference transfer</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/80 p-3 sm:p-4 rounded-lg border border-gray-700">
                    <h4 className="font-semibold mb-2 text-blue-400 text-sm sm:text-base">Multi-Language Intelligence</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Regional content discovery (20+ languages)</li>
                      <li>• Enhanced match scoring (+15% boost)</li>
                      <li>• Multi-platform content discovery</li>
                      <li>• Viewing pattern analysis</li>
                      <li>• Smart genre-based categorization</li>
                      <li>• Real-time recommendation engine</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Advanced Movie Search */}
        <AdvancedMovieSearch
          platform={platform}
          crossPlatformMode={crossPlatformMode}
          selectedLanguages={selectedLanguages}
          onSimilarMoviesFound={handleSimilarMoviesFound}
        />

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-3 text-white">
                <Play className={`h-4 sm:h-5 w-4 sm:w-5 ${theme.text}`} />
                <span className="hidden sm:inline">Similar Movies ({similarMovies.length} recommendations)</span>
                <span className="sm:hidden">Similar ({similarMovies.length})</span>
              </h2>
              <Button
                onClick={() => setSimilarMovies([])}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-500 hover:bg-gray-700 text-xs"
              >
                Clear
              </Button>
            </div>
            <MovieCarousel
              title=""
              movies={similarMovies}
              theme={theme}
              onMarkAsWatched={markAsWatched}
              showCount={false}
            />
          </div>
        )}

        {/* Group Setup */}
        <GroupSetup
          users={users}
          platform={platform}
          theme={theme}
          manualTitleInput={manualTitleInput}
          onAddUser={addUser}
          onRemoveUser={removeUser}
          onUpdateUser={updateUser}
          onAddManualTitle={addManualTitle}
          onRemoveManualTitle={removeManualTitle}
          onFileUpload={handleFileUpload}
          onManualTitleInputChange={handleManualTitleInputChange}
        />

        {/* Platform Mode Selector */}
        <PlatformModeSelector
          platform={platform}
          crossPlatformMode={crossPlatformMode}
          onModeChange={setCrossPlatformMode}
          hasViewingHistory={hasViewingHistory}
        />

        {/* Language Selection */}
        <LanguageSelector
          selectedLanguages={selectedLanguages}
          onLanguageChange={setSelectedLanguages}
        />

        {/* Genre Selection */}
        <GenreSelection
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
        />

        {/* Generate Button - Mobile optimized */}
        <Button
          onClick={() => generateRecommendations(false)}
          disabled={isLoading || users.some(user => !user.name)}
          className={`w-full ${theme.primary} hover:${theme.secondary} text-white font-semibold py-4 mb-6 sm:mb-8 text-sm sm:text-base`}
        >
          {isLoading ? 'Finding Perfect Matches for Your Group...' : 
           crossPlatformMode ? 'Get Cross-Platform Group Recommendations (50+ Movies)' : 'Get Group Recommendations (50+ Movies)'}
        </Button>

        {/* Recommendations - Genre-wise with Carousels */}
        {moviesByGenre && Object.keys(moviesByGenre).length > 0 && selectedGenres.length === 0 && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
              <Play className={`h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 ${theme.text}`} />
              <span className="hidden sm:inline">
                {crossPlatformMode ? 'Cross-Platform Recommendations by Genre' : 'Recommendations by Genre'}
              </span>
              <span className="sm:hidden">Recommendations</span>
              <Badge variant="outline" className="text-xs text-gray-300 border-gray-500">
                All Movies Above 45% Match
              </Badge>
            </h2>
            
            {Object.entries(moviesByGenre).map(([genre, movies]) => (
              <MovieCarousel
                key={genre}
                title={`${genre} Movies`}
                movies={movies}
                theme={theme}
                onMarkAsWatched={markAsWatched}
              />
            ))}
          </div>
        )}

        {/* Regular Recommendations - Also with Carousel */}
        {recommendations.length > 0 && selectedGenres.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
                <Play className={`h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 ${theme.text}`} />
                <span className="hidden sm:inline">
                  {crossPlatformMode ? 'Cross-Platform Matches' : 'Perfect for Your Group'} ({recommendations.length} recommendations)
                </span>
                <span className="sm:hidden">Matches ({recommendations.length})</span>
              </h2>
              <Button
                onClick={getMoreRecommendations}
                disabled={isLoading}
                variant="outline"
                className={`${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50 text-xs sm:text-sm`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Get More Movies</span>
                <span className="sm:hidden">More</span>
              </Button>
            </div>

            <div className="space-y-4">
              {recommendations.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  theme={theme}
                  onMarkAsWatched={markAsWatched}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRecommender;

}
