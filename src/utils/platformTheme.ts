
import { ThemeColors } from '@/types/groupRecommender';

export const getThemeColors = (platform: string): ThemeColors => {
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
