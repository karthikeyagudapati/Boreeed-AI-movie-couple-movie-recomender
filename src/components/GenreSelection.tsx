
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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

  const handleSelectAll = () => {
    if (selectedGenres.length === availableGenres.length) {
      onGenreChange([]);
    } else {
      onGenreChange([...availableGenres]);
    }
  };

  const isAllSelected = selectedGenres.length === availableGenres.length;

  return (
    <Card className="mb-6 sm:mb-8 bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">Select Preferred Genres (Optional)</h3>
          <Button
            onClick={handleSelectAll}
            variant="outline"
            size="sm"
            className={`border-2 font-semibold transition-all ${
              isAllSelected 
                ? 'border-red-500 bg-red-600 text-white hover:bg-red-700' 
                : 'border-blue-500 bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Leave unselected to see recommendations organized by genre categories
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {availableGenres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <div 
                key={genre} 
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                  isSelected 
                    ? 'bg-blue-600/30 border-blue-400 shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                }`}
                onClick={() => handleGenreToggle(genre, !isSelected)}
              >
                <Checkbox
                  id={genre}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleGenreToggle(genre, checked as boolean)}
                  className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <label htmlFor={genre} className="text-sm cursor-pointer text-gray-200 font-medium">
                  {genre}
                </label>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenreSelection;
