
# Netflix Joint Movie Recommendation System - API Reference

## Overview
This document provides technical documentation for the Netflix Joint Movie Recommendation System built by Karthikeya Gudapati.

## Core Components

### NetflixRecommender Component
The main recommendation interface that handles user input and displays movie recommendations.

#### Props
- No external props (self-contained component)

#### Key Features
- User selection (2-12)
- Genre filtering
- Multiple recommendation algorithms
- Dark/Light theme support
- Movie poster display
- Watched movie tracking

### Recommendation Algorithms

#### 1. Intersection Algorithm
Finds movies that both users would likely enjoy based on their viewing history overlap.

#### 2. Weighted Algorithm
Combines individual user preferences with custom weights to balance recommendations.

#### 3. Least Misery Algorithm
Ensures neither user will be completely dissatisfied with the recommendation.

#### 4. Hybrid Algorithm (Default)
Combines multiple approaches for optimal group satisfaction.

## Data Structures

### Movie Interface
```typescript
interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  score: number;
  user1Score?: number;
  user2Score?: number;
  confidenceScore: number;
  poster?: string;
  watched?: boolean;
}
```

### User Profile Interface
```typescript
interface UserProfile {
  totalRatings: number;
  avgRating: number;
  favoriteGenres: string[];
  topMovies: string[];
}
```

## Available Genres
- Action
- Adventure
- Animation
- Comedy
- Crime
- Documentary
- Drama
- Family
- Fantasy
- Horror
- Music
- Mystery
- Romance
- Science Fiction
- Thriller
- War
- Western

## Theme Support
The application supports both dark and light themes with automatic color scheme adaptation.

## Contact Information
**Developer**: Karthikeya Gudapati
- **GitHub**: https://github.com/karthikeyagudapati
- **Phone**: +91 8309480281
- **Email**: [Contact through GitHub]

## Technology Stack
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- Lucide React Icons
- Vite

## Future Enhancements
- Real-time API integration
- Machine learning model integration
- Social features
- Advanced filtering options
- Personalized user profiles
