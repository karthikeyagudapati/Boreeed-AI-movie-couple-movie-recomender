
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { availableGenres } from '@/utils/movieDatabase';

interface GenreSelectionProps {
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
}

const GenreSelection: React.FC<GenreSelectionProps> = ({ selectedGenres, onGenreChange }) => {
  const handleGenreToggle = (genre: string, checked: boolean) => {
    if (checked) {
      onGenreChange([...selectedGenres, genre]);
    } else {
      onGenreChange(selectedGenres.filter(g => g !== genre));
    }
  };

  return (
    <Card className="mb-6 sm:mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
      <CardContent className="pt-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Select Preferred Genres (Optional)</h3>
        <p className="text-sm text-gray-300 mb-4">
          Leave unselected to see recommendations organized by genre categories
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {availableGenres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => handleGenreToggle(genre, checked as boolean)}
                className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label htmlFor={genre} className="text-sm cursor-pointer text-gray-200 font-medium">
                {genre}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenreSelection;
