import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Upload, Users, Plus, X, Star, ArrowLeft, Play, Eye, EyeOff, RefreshCw, Download, Info, Brain } from "lucide-react";

interface User {
  id: string;
  name: string;
  platforms: string[];
  preferences: string[];
  viewingHistory?: File;
  manualTitles?: string[];
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
    { id: '1', name: '', platforms: [], preferences: [], manualTitles: [] }
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [manualTitleInput, setManualTitleInput] = useState<{[key: string]: string}>({});

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const availablePlatforms = [
    'Netflix', 'Amazon Prime Video', 'Disney+ Hotstar', 'ZEE5', 'Voot', 
    'Hulu', 'HBO Max', 'Apple TV+', 'Paramount+', 'Peacock'
  ];

  // Enhanced movie database with platform-specific content
  const movieDatabase: Movie[] = [
    // Netflix Movies
    { id: 1, title: 'Extraction', description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.', genres: ['Action', 'Thriller'], year: 2020, rating: 4.1, matchPercentage: 89, availableOn: ['Netflix'], commonInterest: 85, director: 'Sam Hargrave', cast: ['Chris Hemsworth', 'Rudhraksh Jaiswal'] },
    { id: 2, title: 'The Old Guard', description: 'A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret.', genres: ['Action', 'Fantasy'], year: 2020, rating: 4.0, matchPercentage: 87, availableOn: ['Netflix'], commonInterest: 82, director: 'Gina Prince-Bythewood', cast: ['Charlize Theron', 'KiKi Layne'] },
    { id: 4, title: 'The Kissing Booth', description: 'A high school student is forced to confront her secret crush at a kissing booth.', genres: ['Romance', 'Comedy'], year: 2018, rating: 3.8, matchPercentage: 76, availableOn: ['Netflix'], commonInterest: 72, director: 'Vince Marcello', cast: ['Joey King', 'Jacob Elordi'] },
    { id: 5, title: 'To All the Boys I\'ve Loved Before', description: 'A teenage girl\'s secret love letters are exposed and wreak havoc on her love life.', genres: ['Romance', 'Comedy'], year: 2018, rating: 4.2, matchPercentage: 85, availableOn: ['Netflix'], commonInterest: 81, director: 'Susan Johnson', cast: ['Lana Condor', 'Noah Centineo'] },
    { id: 8, title: 'Hereditary', description: 'A grieving family is haunted by tragedy and disturbing secrets.', genres: ['Horror', 'Drama'], year: 2018, rating: 4.1, matchPercentage: 86, availableOn: ['Netflix'], commonInterest: 80, director: 'Ari Aster', cast: ['Toni Collette', 'Gabriel Byrne'] },
    { id: 10, title: 'The Hangover', description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night.', genres: ['Comedy'], year: 2009, rating: 4.2, matchPercentage: 84, availableOn: ['Netflix'], commonInterest: 79, director: 'Todd Phillips', cast: ['Bradley Cooper', 'Ed Helms'] },
    { id: 13, title: 'Blade Runner 2049', description: 'A young blade runner discovers a secret that could plunge what\'s left of society into chaos.', genres: ['Sci-Fi', 'Drama'], year: 2017, rating: 4.6, matchPercentage: 93, availableOn: ['Netflix'], commonInterest: 90, director: 'Denis Villeneuve', cast: ['Ryan Gosling', 'Harrison Ford'] },
    
    // Amazon Prime Movies
    { id: 3, title: 'John Wick', description: 'An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.', genres: ['Action', 'Crime'], year: 2014, rating: 4.3, matchPercentage: 91, availableOn: ['Amazon Prime Video'], commonInterest: 88, director: 'Chad Stahelski', cast: ['Keanu Reeves', 'Michael Nyqvist'] },
    { id: 6, title: 'The Notebook', description: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom.', genres: ['Romance', 'Drama'], year: 2004, rating: 4.5, matchPercentage: 92, availableOn: ['Amazon Prime Video'], commonInterest: 89, director: 'Nick Cassavetes', cast: ['Ryan Gosling', 'Rachel McAdams'] },
    { id: 12, title: 'Knives Out', description: 'A detective investigates the death of a patriarch of an eccentric, combative family.', genres: ['Comedy', 'Crime', 'Mystery'], year: 2019, rating: 4.4, matchPercentage: 89, availableOn: ['Amazon Prime Video'], commonInterest: 85, director: 'Rian Johnson', cast: ['Daniel Craig', 'Chris Evans'] },
    { id: 14, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', genres: ['Sci-Fi', 'Drama'], year: 2014, rating: 4.7, matchPercentage: 95, availableOn: ['Amazon Prime Video'], commonInterest: 92, director: 'Christopher Nolan', cast: ['Matthew McConaughey', 'Anne Hathaway'] },
    { id: 16, title: 'Saving Private Ryan', description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper.', genres: ['War', 'Drama'], year: 1998, rating: 4.8, matchPercentage: 96, availableOn: ['Amazon Prime Video'], commonInterest: 94, director: 'Steven Spielberg', cast: ['Tom Hanks', 'Matt Damon'] },
    { id: 20, title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.', genres: ['Drama', 'Romance'], year: 1994, rating: 4.7, matchPercentage: 94, availableOn: ['Amazon Prime Video'], commonInterest: 91, director: 'Robert Zemeckis', cast: ['Tom Hanks', 'Robin Wright'] },
    
    // Disney+ Hotstar Movies
    { id: 21, title: 'Spider-Man: Into the Spider-Verse', description: 'Teen Miles Morales becomes Spider-Man and must save the city from Kingpin.', genres: ['Animation', 'Action', 'Adventure'], year: 2018, rating: 4.6, matchPercentage: 93, availableOn: ['Disney+ Hotstar'], commonInterest: 90, director: 'Peter Ramsey', cast: ['Shameik Moore', 'Jake Johnson'] },
    { id: 26, title: 'The Grand Budapest Hotel', description: 'The adventures of a legendary concierge at a famous European hotel.', genres: ['Comedy', 'Adventure'], year: 2014, rating: 4.2, matchPercentage: 85, availableOn: ['Disney+ Hotstar'], commonInterest: 81, director: 'Wes Anderson', cast: ['Ralph Fiennes', 'F. Murray Abraham'] },
    { id: 28, title: 'The Avengers', description: 'Earth\'s mightiest heroes must come together to stop an alien invasion.', genres: ['Action', 'Adventure', 'Sci-Fi'], year: 2012, rating: 4.5, matchPercentage: 92, availableOn: ['Disney+ Hotstar'], commonInterest: 89, director: 'Joss Whedon', cast: ['Robert Downey Jr.', 'Chris Evans'] },
    
    // Additional movies for other platforms
    { id: 7, title: 'The Conjuring', description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.', genres: ['Horror', 'Mystery'], year: 2013, rating: 4.4, matchPercentage: 88, availableOn: ['HBO Max'], commonInterest: 84, director: 'James Wan', cast: ['Patrick Wilson', 'Vera Farmiga'] },
    { id: 9, title: 'A Quiet Place', description: 'A family lives in silence to avoid creatures that hunt by sound.', genres: ['Horror', 'Thriller'], year: 2018, rating: 4.3, matchPercentage: 90, availableOn: ['Paramount+'], commonInterest: 87, director: 'John Krasinski', cast: ['Emily Blunt', 'John Krasinski'] },
    { id: 11, title: 'Superbad', description: 'Two co-dependent high school seniors are forced to deal with separation anxiety.', genres: ['Comedy'], year: 2007, rating: 4.0, matchPercentage: 82, availableOn: ['Hulu'], commonInterest: 77, director: 'Greg Mottola', cast: ['Jonah Hill', 'Michael Cera'] },
    { id: 15, title: 'The Matrix', description: 'A computer programmer discovers that reality as he knows it is a simulation.', genres: ['Sci-Fi', 'Action'], year: 1999, rating: 4.5, matchPercentage: 91, availableOn: ['HBO Max'], commonInterest: 88, director: 'The Wachowskis', cast: ['Keanu Reeves', 'Laurence Fishburne'] },
    { id: 17, title: '1917', description: 'Two British soldiers are given an impossible mission during World War I.', genres: ['War', 'Drama'], year: 2019, rating: 4.5, matchPercentage: 92, availableOn: ['Netflix'], commonInterest: 89, director: 'Sam Mendes', cast: ['George MacKay', 'Dean-Charles Chapman'] },
    { id: 18, title: 'Dunkirk', description: 'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army.', genres: ['War', 'Drama'], year: 2017, rating: 4.3, matchPercentage: 88, availableOn: ['HBO Max'], commonInterest: 85, director: 'Christopher Nolan', cast: ['Fionn Whitehead', 'Barry Keoghan'] },
    { id: 19, title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', genres: ['Drama'], year: 1994, rating: 4.9, matchPercentage: 98, availableOn: ['Netflix'], commonInterest: 96, director: 'Frank Darabont', cast: ['Tim Robbins', 'Morgan Freeman'] },
    { id: 22, title: 'Parasite', description: 'A poor family schemes to become employed by a wealthy family.', genres: ['Thriller', 'Drama'], year: 2019, rating: 4.8, matchPercentage: 96, availableOn: ['Hulu'], commonInterest: 94, director: 'Bong Joon-ho', cast: ['Song Kang-ho', 'Lee Sun-kyun'] },
    { id: 23, title: 'Get Out', description: 'A young African-American visits his white girlfriend\'s parents for the weekend.', genres: ['Horror', 'Thriller'], year: 2017, rating: 4.4, matchPercentage: 89, availableOn: ['Netflix'], commonInterest: 86, director: 'Jordan Peele', cast: ['Daniel Kaluuya', 'Allison Williams'] },
    { id: 24, title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman.', genres: ['Action', 'Adventure'], year: 2015, rating: 4.5, matchPercentage: 91, availableOn: ['HBO Max'], commonInterest: 88, director: 'George Miller', cast: ['Tom Hardy', 'Charlize Theron'] },
    { id: 25, title: 'La La Land', description: 'A jazz musician and an aspiring actress meet and fall in love in Los Angeles.', genres: ['Romance', 'Music'], year: 2016, rating: 4.3, matchPercentage: 87, availableOn: ['Netflix'], commonInterest: 83, director: 'Damien Chazelle', cast: ['Ryan Gosling', 'Emma Stone'] },
    { id: 27, title: 'Moonlight', description: 'A young African-American man grapples with his identity and sexuality.', genres: ['Drama'], year: 2016, rating: 4.4, matchPercentage: 88, availableOn: ['Netflix'], commonInterest: 85, director: 'Barry Jenkins', cast: ['Mahershala Ali', 'Naomie Harris'] },
    { id: 29, title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, and others intertwine in Los Angeles.', genres: ['Crime', 'Drama'], year: 1994, rating: 4.7, matchPercentage: 94, availableOn: ['Netflix'], commonInterest: 91, director: 'Quentin Tarantino', cast: ['John Travolta', 'Samuel L. Jackson'] },
    { id: 30, title: 'The Dark Knight', description: 'Batman must accept one of the greatest psychological and physical tests.', genres: ['Action', 'Crime', 'Drama'], year: 2008, rating: 4.8, matchPercentage: 96, availableOn: ['HBO Max'], commonInterest: 94, director: 'Christopher Nolan', cast: ['Christian Bale', 'Heath Ledger'] }
  ];

  // Platform-specific instructions for downloading viewing history
  const getPlatformInstructions = (platformName: string) => {
    const instructions = {
      'Netflix': 'Go to Account > Privacy > Download your information > Select "Viewing activity" > Download CSV',
      'Amazon Prime Video': 'Go to Your Account > Your Prime Video > Watch History > Export data (if available)',
      'Disney+ Hotstar': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
      'ZEE5': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
      'Voot': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
      'Hulu': 'Go to Account > Privacy and Settings > Download Your Information > Select viewing data',
      'HBO Max': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
      'Apple TV+': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
      'Paramount+': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
      'Peacock': 'Not directly available - Use Netflix CSV if available, or manually enter titles'
    };
    return instructions[platformName] || 'Manual entry recommended for this platform';
  };

  // Platform theme colors
  const getThemeColors = () => {
    switch (platform) {
      case 'netflix':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400',
          bg: 'bg-red-50'
        };
      case 'amazon-prime':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-700',
          accent: 'border-blue-500',
          text: 'text-blue-400',
          bg: 'bg-blue-50'
        };
      case 'disney-hotstar':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-600',
          accent: 'border-blue-400',
          text: 'text-blue-300',
          bg: 'bg-blue-50'
        };
      case 'zee5':
        return {
          primary: 'bg-purple-600',
          secondary: 'bg-purple-700',
          accent: 'border-purple-500',
          text: 'text-purple-400',
          bg: 'bg-purple-50'
        };
      case 'voot':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-600',
          accent: 'border-orange-400',
          text: 'text-orange-400',
          bg: 'bg-orange-50'
        };
      default:
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-700',
          accent: 'border-red-500',
          text: 'text-red-400',
          bg: 'bg-red-50'
        };
    }
  };

  const theme = getThemeColors();

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

  const generateRecommendations = (getMore = false, count = 10) => {
    setIsLoading(true);
    
    setTimeout(() => {
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
        const currentMovieIds = recommendations.map(movie => movie.id);
        filteredMovies = filteredMovies.filter(movie => !currentMovieIds.includes(movie.id));
      }

      // Shuffle and get random movies
      const shuffled = filteredMovies.sort(() => Math.random() - 0.5);
      const numberOfMovies = Math.min(shuffled.length, count);
      const selectedMovies = shuffled.slice(0, numberOfMovies);

      // Add some randomness to the scores
      const randomizedMovies = selectedMovies.map(movie => ({
        ...movie,
        matchPercentage: Math.max(49, Math.min(98, movie.matchPercentage + Math.floor(Math.random() * 10) - 5)),
        commonInterest: Math.max(49, Math.min(98, movie.commonInterest + Math.floor(Math.random() * 10) - 5))
      }));

      if (getMore) {
        setRecommendations(prev => [...prev, ...randomizedMovies]);
      } else {
        setRecommendations(randomizedMovies);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Group movies by genre for display when no genres are selected
  const getMoviesByGenre = () => {
    if (selectedGenres.length > 0) return null;

    const moviesByGenre = {};
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

  const moviesByGenre = getMoviesByGenre();

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
        <Card className="mb-6 sm:mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className={`h-6 sm:h-8 w-6 sm:w-8 ${theme.text}`} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Set Up Your Group</h2>
            </div>

            <ScrollArea className="h-80 sm:h-96 w-full">
              <div className="space-y-4">
                {users.map((user, index) => (
                  <Card key={user.id} className="bg-gray-700/70 border-gray-500 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white">User {index + 1}</h3>
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

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                              <div key={platform} className="flex items-center space-x-2 bg-gray-600/30 p-2 rounded">
                                <Checkbox
                                  id={`${user.id}-${platform}`}
                                  checked={user.platforms.includes(platform)}
                                  onCheckedChange={(checked) => {
                                    const newPlatforms = checked
                                      ? [...user.platforms, platform]
                                      : user.platforms.filter(p => p !== platform);
                                    updateUser(user.id, 'platforms', newPlatforms);
                                  }}
                                  className="border-gray-400"
                                />
                                <label htmlFor={`${user.id}-${platform}`} className="text-xs cursor-pointer text-gray-200">
                                  {platform}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Platform Instructions */}
                      <div className="mt-4 p-3 bg-gray-600/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-medium text-gray-200">
                            Viewing History Instructions for {platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ')}:
                          </span>
                        </div>
                        <p className="text-xs text-gray-300">
                          {getPlatformInstructions(platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' '))}
                        </p>
                      </div>

                      {/* File Upload */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-200">Upload Viewing History (CSV/Excel)</label>
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

                      {/* Manual Title Input */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-200">
                          Or manually enter movie/show titles you've watched:
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter movie/show title"
                            value={manualTitleInput[user.id] || ''}
                            onChange={(e) => setManualTitleInput(prev => ({ ...prev, [user.id]: e.target.value }))}
                            className="bg-gray-600/70 border-gray-500 text-white placeholder:text-gray-400"
                            onKeyPress={(e) => e.key === 'Enter' && addManualTitle(user.id)}
                          />
                          <Button
                            onClick={() => addManualTitle(user.id)}
                            variant="outline"
                            size="sm"
                            className="border-gray-500 text-gray-200 hover:bg-gray-600"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {user.manualTitles && user.manualTitles.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {user.manualTitles.map((title, titleIndex) => (
                              <Badge key={titleIndex} variant="secondary" className="bg-gray-600 text-gray-200 text-xs">
                                {title}
                                <button
                                  onClick={() => removeManualTitle(user.id, titleIndex)}
                                  className="ml-2 text-red-400 hover:text-red-300"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
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
        <Card className="mb-6 sm:mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
          <CardContent className="pt-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Select Preferred Genres (Optional)</h3>
            <p className="text-sm text-gray-300 mb-4">
              Leave unselected to see recommendations organized by genre categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2 bg-gray-700/30 p-2 rounded">
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
                    className="border-gray-400"
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
                      <Card key={movie.id} className="bg-gray-800/70 border-gray-600 min-w-80 max-w-80 flex-shrink-0">
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
                              onClick={() => markAsWatched(movie.id)}
                              variant="outline"
                              size="sm"
                              className="border-gray-500 text-gray-200 hover:bg-gray-600"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
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
                <Card key={movie.id} className="bg-gray-800/70 border-gray-600 hover:shadow-xl transition-shadow backdrop-blur-sm">
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
                          onClick={() => markAsWatched(movie.id)}
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRecommender;
