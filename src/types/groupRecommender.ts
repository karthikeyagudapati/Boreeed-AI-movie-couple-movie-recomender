
export interface User {
  id: string;
  name: string;
  platforms: string[];
  preferences: string[];
  viewingHistory?: File;
  manualTitles?: string[];
}

export interface Movie {
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

export interface GroupRecommenderProps {
  platform: string;
  country: string;
  onBack: () => void;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  bg: string;
}
