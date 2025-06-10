
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguages, onLanguageChange }) => {
  const toggleLanguage = (languageCode: string) => {
    if (selectedLanguages.includes(languageCode)) {
      onLanguageChange(selectedLanguages.filter(lang => lang !== languageCode));
    } else {
      onLanguageChange([...selectedLanguages, languageCode]);
    }
  };

  return (
    <Card className="bg-gray-800/70 border-gray-600 shadow-2xl backdrop-blur-md mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Select Languages</h2>
          <Badge variant="outline" className="text-gray-300 border-gray-500">
            {selectedLanguages.length} selected
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {languages.map((language) => {
            const isSelected = selectedLanguages.includes(language.code);
            return (
              <div
                key={language.code}
                onClick={() => toggleLanguage(language.code)}
                className={`
                  flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'bg-blue-600/80 border-blue-500 text-white shadow-lg scale-105' 
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500'
                  }
                `}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium truncate">{language.name}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>💡 Select languages to filter recommendations. Leave empty to show all languages.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
