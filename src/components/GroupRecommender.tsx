
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Play, RefreshCw, Brain } from "lucide-react";
import { User, Movie, GroupRecommenderProps } from '@/types/groupRecommender';
import { getThemeColors } from '@/utils/platformTheme';
import { generateMovieRecommendations, getMoviesByGenre } from '@/components/RecommendationEngine';
import GroupSetup from '@/components/GroupSetup';
import GenreSelection from '@/components/GenreSelection';
import MovieCard from '@/components/MovieCard';

const GroupRecommender: React.FC<GroupRecommenderProps> = ({ platform, country, onBack }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: '', platforms: [], preferences: [], manualTitles: [] }
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [manualTitleInput, setManualTitleInput] = useState<{[key: string]: string}>({});

  const theme = getThemeColors(platform);

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

  const handleFileUpload = (userId: string, file: File) => {
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.name.endsWith('.xlsx'))) {
      updateUser(userId, 'viewingHistory', file);
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
    
    // Get a new movie to replace the watched one
    setTimeout(() => {
      generateRecommendations(true, 1);
    }, 500);
  };

  const getMoreRecommendations = () => {
    generateRecommendations(true);
  };

  const generateRecommendations = (getMore = false, count = 15) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newMovies = generateMovieRecommendations(
        platform,
        selectedGenres,
        watchedMovies,
        recommendations,
        getMore,
        count
      );

      if (getMore) {
        setRecommendations(prev => [...prev, ...newMovies]);
      } else {
        setRecommendations(newMovies);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const moviesByGenre = selectedGenres.length === 0 ? getMoviesByGenre(platform, watchedMovies) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      {/* Header with Theme Colors */}
      <div className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Platform Selection</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge className={`${theme.primary} text-white font-semibold px-2 sm:px-4 py-2 text-xs sm:text-sm`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50 text-xs sm:text-sm">
                {country}
              </Badge>
              <Button
                onClick={() => setShowAlgorithm(!showAlgorithm)}
                variant="outline"
                size="sm"
                className="border-gray-500 text-gray-200 hover:bg-gray-600"
              >
                <Brain className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Algorithm</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      {showAlgorithm && (
        <div className="bg-gray-800/90 border-b border-gray-700 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gray-700/70 border-gray-500">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  Recommendation Algorithm
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">Content Filtering</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Platform-specific content matching</li>
                      <li>• Genre preference analysis</li>
                      <li>• Match percentage ≥ 49% threshold</li>
                      <li>• Viewing history integration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-400">Group Consensus</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Multi-user preference aggregation</li>
                      <li>• Common interest calculation</li>
                      <li>• Weighted scoring system</li>
                      <li>• Real-time preference updates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
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

        {/* Genre Selection */}
        <GenreSelection
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
        />

        {/* Generate Button */}
        <Button
          onClick={() => generateRecommendations(false)}
          disabled={isLoading || users.some(user => !user.name)}
          className={`w-full ${theme.primary} hover:${theme.secondary} text-white font-semibold py-4 mb-6 sm:mb-8`}
        >
          {isLoading ? 'Finding Perfect Matches for Your Group...' : 'Get Group Recommendations'}
        </Button>

        {/* Recommendations - Genre-wise or Selected */}
        {moviesByGenre && Object.keys(moviesByGenre).length > 0 && selectedGenres.length === 0 && (
          <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
              <Play className={`h-5 sm:h-6 w-5 sm:w-6 ${theme.text}`} />
              Recommendations by Genre
            </h2>
            
            {Object.entries(moviesByGenre).map(([genre, movies]) => (
              <div key={genre} className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-gray-600 pb-2">
                  {genre} Movies
                </h3>
                <ScrollArea className="w-full">
                  <div className="flex space-x-4 pb-4">
                    {movies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        theme={theme}
                        onMarkAsWatched={markAsWatched}
                        compact
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        )}

        {/* Regular Recommendations */}
        {recommendations.length > 0 && selectedGenres.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
                <Play className={`h-5 sm:h-6 w-5 sm:w-6 ${theme.text}`} />
                Perfect for Your Group ({recommendations.length} recommendations)
              </h2>
              <Button
                onClick={getMoreRecommendations}
                disabled={isLoading}
                variant="outline"
                className={`${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50`}
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
