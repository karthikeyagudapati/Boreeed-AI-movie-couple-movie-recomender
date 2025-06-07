import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Upload, Users, Plus, X, Star, ArrowLeft, Play, Eye, EyeOff, RefreshCw } from "lucide-react";

interface User {
  id: string;
  name: string;
  platforms: string[];
  preferences: string[];
  viewingHistory?: File;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  genres: string[];
  year: number;
  rating: number;
  matchPercentage: number;
  availableOn: string[];
  commonInterest: number;
  director?: string;
  cast?: string[];
  watched?: boolean;
}

interface GroupRecommenderProps {
  platform: string;
  country: string;
  onBack: () => void;
}

const GroupRecommender: React.FC<GroupRecommenderProps> = ({ platform, country, onBack }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: '', platforms: [], preferences: [] }
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const availablePlatforms = [
    'Netflix', 'Amazon Prime Video', 'Disney+ Hotstar', 'ZEE5', 'Voot', 
    'Hulu', 'HBO Max', 'Apple TV+', 'Paramount+', 'Peacock'
  ];

  // Comprehensive movie database with different genres
  const movieDatabase: Movie[] = [
    // Action Movies
    { id: 1, title: 'Extraction', description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.', genres: ['Action', 'Thriller'], year: 2020, rating: 4.1, matchPercentage: 89, availableOn: ['Netflix'], commonInterest: 85, director: 'Sam Hargrave', cast: ['Chris Hemsworth', 'Rudhraksh Jaiswal'] },
    { id: 2, title: 'The Old Guard', description: 'A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret.', genres: ['Action', 'Fantasy'], year: 2020, rating: 4.0, matchPercentage: 87, availableOn: ['Netflix'], commonInterest: 82, director: 'Gina Prince-Bythewood', cast: ['Charlize Theron', 'KiKi Layne'] },
    { id: 3, title: 'John Wick', description: 'An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.', genres: ['Action', 'Crime'], year: 2014, rating: 4.3, matchPercentage: 91, availableOn: ['Amazon Prime Video'], commonInterest: 88, director: 'Chad Stahelski', cast: ['Keanu Reeves', 'Michael Nyqvist'] },
    
    // Romance Movies
    { id: 4, title: 'The Kissing Booth', description: 'A high school student is forced to confront her secret crush at a kissing booth.', genres: ['Romance', 'Comedy'], year: 2018, rating: 3.8, matchPercentage: 76, availableOn: ['Netflix'], commonInterest: 72, director: 'Vince Marcello', cast: ['Joey King', 'Jacob Elordi'] },
    { id: 5, title: 'To All the Boys I\'ve Loved Before', description: 'A teenage girl\'s secret love letters are exposed and wreak havoc on her love life.', genres: ['Romance', 'Comedy'], year: 2018, rating: 4.2, matchPercentage: 85, availableOn: ['Netflix'], commonInterest: 81, director: 'Susan Johnson', cast: ['Lana Condor', 'Noah Centineo'] },
    { id: 6, title: 'The Notebook', description: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom.', genres: ['Romance', 'Drama'], year: 2004, rating: 4.5, matchPercentage: 92, availableOn: ['Amazon Prime Video'], commonInterest: 89, director: 'Nick Cassavetes', cast: ['Ryan Gosling', 'Rachel McAdams'] },
    
    // Horror Movies
    { id: 7, title: 'The Conjuring', description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.', genres: ['Horror', 'Mystery'], year: 2013, rating: 4.4, matchPercentage: 88, availableOn: ['HBO Max'], commonInterest: 84, director: 'James Wan', cast: ['Patrick Wilson', 'Vera Farmiga'] },
    { id: 8, title: 'Hereditary', description: 'A grieving family is haunted by tragedy and disturbing secrets.', genres: ['Horror', 'Drama'], year: 2018, rating: 4.1, matchPercentage: 86, availableOn: ['Netflix'], commonInterest: 80, director: 'Ari Aster', cast: ['Toni Collette', 'Gabriel Byrne'] },
    { id: 9, title: 'A Quiet Place', description: 'A family lives in silence to avoid creatures that hunt by sound.', genres: ['Horror', 'Thriller'], year: 2018, rating: 4.3, matchPercentage: 90, availableOn: ['Paramount+'], commonInterest: 87, director: 'John Krasinski', cast: ['Emily Blunt', 'John Krasinski'] },
    
    // Comedy Movies
    { id: 10, title: 'The Hangover', description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night.', genres: ['Comedy'], year: 2009, rating: 4.2, matchPercentage: 84, availableOn: ['Netflix'], commonInterest: 79, director: 'Todd Phillips', cast: ['Bradley Cooper', 'Ed Helms'] },
    { id: 11, title: 'Superbad', description: 'Two co-dependent high school seniors are forced to deal with separation anxiety.', genres: ['Comedy'], year: 2007, rating: 4.0, matchPercentage: 82, availableOn: ['Hulu'], commonInterest: 77, director: 'Greg Mottola', cast: ['Jonah Hill', 'Michael Cera'] },
    { id: 12, title: 'Knives Out', description: 'A detective investigates the death of a patriarch of an eccentric, combative family.', genres: ['Comedy', 'Crime', 'Mystery'], year: 2019, rating: 4.4, matchPercentage: 89, availableOn: ['Amazon Prime Video'], commonInterest: 85, director: 'Rian Johnson', cast: ['Daniel Craig', 'Chris Evans'] },
    
    // Sci-Fi Movies
    { id: 13, title: 'Blade Runner 2049', description: 'A young blade runner discovers a secret that could plunge what\'s left of society into chaos.', genres: ['Sci-Fi', 'Drama'], year: 2017, rating: 4.6, matchPercentage: 93, availableOn: ['Netflix'], commonInterest: 90, director: 'Denis Villeneuve', cast: ['Ryan Gosling', 'Harrison Ford'] },
    { id: 14, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', genres: ['Sci-Fi', 'Drama'], year: 2014, rating: 4.7, matchPercentage: 95, availableOn: ['Amazon Prime Video'], commonInterest: 92, director: 'Christopher Nolan', cast: ['Matthew McConaughey', 'Anne Hathaway'] },
    { id: 15, title: 'The Matrix', description: 'A computer programmer discovers that reality as he knows it is a simulation.', genres: ['Sci-Fi', 'Action'], year: 1999, rating: 4.5, matchPercentage: 91, availableOn: ['HBO Max'], commonInterest: 88, director: 'The Wachowskis', cast: ['Keanu Reeves', 'Laurence Fishburne'] },
    
    // War Movies
    { id: 16, title: 'Saving Private Ryan', description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper.', genres: ['War', 'Drama'], year: 1998, rating: 4.8, matchPercentage: 96, availableOn: ['Amazon Prime Video'], commonInterest: 94, director: 'Steven Spielberg', cast: ['Tom Hanks', 'Matt Damon'] },
    { id: 17, title: '1917', description: 'Two British soldiers are given an impossible mission during World War I.', genres: ['War', 'Drama'], year: 2019, rating: 4.5, matchPercentage: 92, availableOn: ['Netflix'], commonInterest: 89, director: 'Sam Mendes', cast: ['George MacKay', 'Dean-Charles Chapman'] },
    { id: 18, title: 'Dunkirk', description: 'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army.', genres: ['War', 'Drama'], year: 2017, rating: 4.3, matchPercentage: 88, availableOn: ['HBO Max'], commonInterest: 85, director: 'Christopher Nolan', cast: ['Fionn Whitehead', 'Barry Keoghan'] },
    
    // Drama Movies
    { id: 19, title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', genres: ['Drama'], year: 1994, rating: 4.9, matchPercentage: 98, availableOn: ['Netflix'], commonInterest: 96, director: 'Frank Darabont', cast: ['Tim Robbins', 'Morgan Freeman'] },
    { id: 20, title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.', genres: ['Drama', 'Romance'], year: 1994, rating: 4.7, matchPercentage: 94, availableOn: ['Amazon Prime Video'], commonInterest: 91, director: 'Robert Zemeckis', cast: ['Tom Hanks', 'Robin Wright'] },
    
    // Additional diverse movies
    { id: 21, title: 'Spider-Man: Into the Spider-Verse', description: 'Teen Miles Morales becomes Spider-Man and must save the city from Kingpin.', genres: ['Animation', 'Action', 'Adventure'], year: 2018, rating: 4.6, matchPercentage: 93, availableOn: ['Netflix'], commonInterest: 90, director: 'Peter Ramsey', cast: ['Shameik Moore', 'Jake Johnson'] },
    { id: 22, title: 'Parasite', description: 'A poor family schemes to become employed by a wealthy family.', genres: ['Thriller', 'Drama'], year: 2019, rating: 4.8, matchPercentage: 96, availableOn: ['Hulu'], commonInterest: 94, director: 'Bong Joon-ho', cast: ['Song Kang-ho', 'Lee Sun-kyun'] },
    { id: 23, title: 'Get Out', description: 'A young African-American visits his white girlfriend\'s parents for the weekend.', genres: ['Horror', 'Thriller'], year: 2017, rating: 4.4, matchPercentage: 89, availableOn: ['Netflix'], commonInterest: 86, director: 'Jordan Peele', cast: ['Daniel Kaluuya', 'Allison Williams'] },
    { id: 24, title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman.', genres: ['Action', 'Adventure'], year: 2015, rating: 4.5, matchPercentage: 91, availableOn: ['HBO Max'], commonInterest: 88, director: 'George Miller', cast: ['Tom Hardy', 'Charlize Theron'] },
    { id: 25, title: 'La La Land', description: 'A jazz musician and an aspiring actress meet and fall in love in Los Angeles.', genres: ['Romance', 'Music'], year: 2016, rating: 4.3, matchPercentage: 87, availableOn: ['Netflix'], commonInterest: 83, director: 'Damien Chazelle', cast: ['Ryan Gosling', 'Emma Stone'] },
    { id: 26, title: 'The Grand Budapest Hotel', description: 'The adventures of a legendary concierge at a famous European hotel.', genres: ['Comedy', 'Adventure'], year: 2014, rating: 4.2, matchPercentage: 85, availableOn: ['Disney+ Hotstar'], commonInterest: 81, director: 'Wes Anderson', cast: ['Ralph Fiennes', 'F. Murray Abraham'] },
    { id: 27, title: 'Moonlight', description: 'A young African-American man grapples with his identity and sexuality.', genres: ['Drama'], year: 2016, rating: 4.4, matchPercentage: 88, availableOn: ['Netflix'], commonInterest: 85, director: 'Barry Jenkins', cast: ['Mahershala Ali', 'Naomie Harris'] },
    { id: 28, title: 'The Avengers', description: 'Earth\'s mightiest heroes must come together to stop an alien invasion.', genres: ['Action', 'Adventure', 'Sci-Fi'], year: 2012, rating: 4.5, matchPercentage: 92, availableOn: ['Disney+ Hotstar'], commonInterest: 89, director: 'Joss Whedon', cast: ['Robert Downey Jr.', 'Chris Evans'] },
    { id: 29, title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, and others intertwine in Los Angeles.', genres: ['Crime', 'Drama'], year: 1994, rating: 4.7, matchPercentage: 94, availableOn: ['Netflix'], commonInterest: 91, director: 'Quentin Tarantino', cast: ['John Travolta', 'Samuel L. Jackson'] },
    { id: 30, title: 'The Dark Knight', description: 'Batman must accept one of the greatest psychological and physical tests.', genres: ['Action', 'Crime', 'Drama'], year: 2008, rating: 4.8, matchPercentage: 96, availableOn: ['HBO Max'], commonInterest: 94, director: 'Christopher Nolan', cast: ['Christian Bale', 'Heath Ledger'] }
  ];

  // Platform theme colors
  const getThemeColors = () => {
    switch (platform) {
      case 'netflix':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400'
        };
      case 'amazon-prime':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-700',
          accent: 'border-blue-500',
          text: 'text-blue-400'
        };
      case 'disney-hotstar':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-600',
          accent: 'border-blue-400',
          text: 'text-blue-300'
        };
      case 'zee5':
        return {
          primary: 'bg-purple-600',
          secondary: 'bg-purple-700',
          accent: 'border-purple-500',
          text: 'text-purple-400'
        };
      case 'voot':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-600',
          accent: 'border-orange-400',
          text: 'text-orange-400'
        };
      default:
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400'
        };
    }
  };

  const theme = getThemeColors();

  const addUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: '',
      platforms: [],
      preferences: []
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

  const handleFileUpload = (userId: string, file: File) => {
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.name.endsWith('.xlsx'))) {
      updateUser(userId, 'viewingHistory', file);
    } else {
      alert('Please upload a valid CSV or Excel file');
    }
  };

  const markAsWatched = (movieId: number) => {
    const newWatchedMovies = new Set(watchedMovies);
    newWatchedMovies.add(movieId);
    setWatchedMovies(newWatchedMovies);

    // Remove from current recommendations
    setRecommendations(prev => prev.filter(movie => movie.id !== movieId));
  };

  const getMoreRecommendations = () => {
    generateRecommendations(true);
  };

  const generateRecommendations = (getMore = false) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredMovies = [...movieDatabase];

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
        const currentMovieIds = recommendations.map(movie => movie.id);
        filteredMovies = filteredMovies.filter(movie => !currentMovieIds.includes(movie.id));
      }

      // Shuffle and get random movies
      const shuffled = filteredMovies.sort(() => Math.random() - 0.5);
      
      // Get 15-20 movies instead of 10
      const numberOfMovies = Math.min(shuffled.length, getMore ? 10 : 20);
      const selectedMovies = shuffled.slice(0, numberOfMovies);

      // Add some randomness to the scores
      const randomizedMovies = selectedMovies.map(movie => ({
        ...movie,
        matchPercentage: Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5),
        commonInterest: Math.min(98, movie.commonInterest + Math.floor(Math.random() * 10) - 5)
      }));

      if (getMore) {
        setRecommendations(prev => [...prev, ...randomizedMovies]);
      } else {
        setRecommendations(randomizedMovies);
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
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
              Back to Platform Selection
            </Button>
            <div className="flex items-center gap-4">
              <Badge className={`${theme.primary} text-white font-semibold px-4 py-2`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-200 bg-gray-800/50">
                {country}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Group Setup */}
        <Card className="mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className={`h-8 w-8 ${theme.text}`} />
              <h2 className="text-2xl font-bold text-white">Set Up Your Group</h2>
            </div>

            <ScrollArea className="h-96 w-full">
              <div className="space-y-4">
                {users.map((user, index) => (
                  <Card key={user.id} className="bg-gray-700/70 border-gray-500 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">User {index + 1}</h3>
                        {users.length > 1 && (
                          <Button
                            onClick={() => removeUser(user.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-300 hover:text-red-200 hover:bg-red-900/30"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-200">Name</label>
                          <Input
                            placeholder="Enter name"
                            value={user.name}
                            onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                            className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-200">OTT Subscriptions</label>
                          <div className="grid grid-cols-2 gap-2">
                            {availablePlatforms.slice(0, 4).map((platform) => (
                              <div key={platform} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${user.id}-${platform}`}
                                  checked={user.platforms.includes(platform)}
                                  onCheckedChange={(checked) => {
                                    const newPlatforms = checked
                                      ? [...user.platforms, platform]
                                      : user.platforms.filter(p => p !== platform);
                                    updateUser(user.id, 'platforms', newPlatforms);
                                  }}
                                />
                                <label htmlFor={`${user.id}-${platform}`} className="text-xs cursor-pointer text-gray-200">
                                  {platform}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-200">Upload Viewing History (Optional)</label>
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(user.id, file);
                          }}
                          className="hidden"
                          id={`file-${user.id}`}
                        />
                        <label htmlFor={`file-${user.id}`}>
                          <Button variant="outline" className="w-full border-gray-500 text-gray-200 hover:bg-gray-600 bg-gray-700/50" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              {user.viewingHistory ? user.viewingHistory.name : 'Choose CSV/Excel file'}
                            </span>
                          </Button>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Button
              onClick={addUser}
              variant="outline"
              className={`mt-4 ${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Friend
            </Button>
          </CardContent>
        </Card>

        {/* Genre Selection */}
        <Card className="mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-white">Select Preferred Genres</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(selectedGenres.filter(g => g !== genre));
                      }
                    }}
                  />
                  <label htmlFor={genre} className="text-sm cursor-pointer text-gray-200">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={() => generateRecommendations(false)}
          disabled={isLoading || users.some(user => !user.name)}
          className={`w-full ${theme.primary} hover:${theme.secondary} text-white font-semibold py-4 mb-8`}
        >
          {isLoading ? 'Finding Perfect Matches for Your Group...' : 'Get Group Recommendations'}
        </Button>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                <Play className={`h-6 w-6 ${theme.text}`} />
                Perfect for Your Group ({recommendations.length} recommendations)
              </h2>
              <Button
                onClick={getMoreRecommendations}
                disabled={isLoading}
                variant="outline"
                className={`${theme.accent} ${theme.text} hover:bg-gray-700/50 bg-gray-800/50`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Get More Movies
              </Button>
            </div>

            <div className="space-y-4">
              {recommendations.map((movie) => (
                <Card key={movie.id} className="bg-gray-800/70 border-gray-600 hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
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
                            {movie.cast.join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-3 ml-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{movie.matchPercentage}%</div>
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
                          onClick={() => markAsWatched(movie.id)}
                          variant="outline"
                          size="sm"
                          className="border-gray-500 text-gray-200 hover:bg-gray-600"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Already Watched
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRecommender;
