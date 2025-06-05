
"""
Joint Movie Recommendation System - Core Engine
============================================

This module implements the main recommendation algorithms for generating
joint recommendations for multiple users (couples, families, groups).

Author: Your Name
Date: 2024
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Tuple, Optional
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import TfidfVectorizer
import warnings
warnings.filterwarnings('ignore')

class JointMovieRecommender:
    """
    Advanced Joint Movie Recommendation System
    
    This class implements multiple algorithms for generating movie recommendations
    that satisfy multiple users simultaneously. It combines collaborative filtering,
    content-based filtering, and novel group recommendation techniques.
    """
    
    def __init__(self, ratings_df: pd.DataFrame, movies_df: pd.DataFrame):
        """
        Initialize the Joint Recommender
        
        Args:
            ratings_df (pd.DataFrame): User ratings data (user_id, movie_id, rating, timestamp)
            movies_df (pd.DataFrame): Movie metadata (movie_id, title, genres, year)
        """
        self.ratings_df = ratings_df
        self.movies_df = movies_df
        self.user_movie_matrix = None
        self.movie_features_matrix = None
        self.setup_matrices()
        
    def setup_matrices(self):
        """Setup user-movie matrix and movie features matrix"""
        print("🔄 Setting up recommendation matrices...")
        
        # Create user-movie rating matrix
        self.user_movie_matrix = self.ratings_df.pivot_table(
            index='user_id', 
            columns='movie_id', 
            values='rating',
            fill_value=0
        )
        
        # Create movie features matrix using genres
        self.setup_movie_features()
        print("✅ Matrices setup complete!")
        
    def setup_movie_features(self):
        """Create TF-IDF matrix for movie genres and features"""
        # Combine genres and other features
        movies_features = self.movies_df.copy()
        movies_features['features'] = movies_features['genres'].fillna('')
        
        # Add year as a feature (decade)
        movies_features['decade'] = (movies_features['year'] // 10) * 10
        movies_features['features'] += ' decade_' + movies_features['decade'].astype(str)
        
        # Create TF-IDF matrix
        tfidf = TfidfVectorizer(stop_words='english')
        self.movie_features_matrix = tfidf.fit_transform(movies_features['features'])
        
    def get_user_profile(self, user_id: int) -> Dict:
        """
        Create a comprehensive profile for a user
        
        Args:
            user_id (int): User ID
            
        Returns:
            Dict: User profile with preferences, statistics, and behavior patterns
        """
        user_ratings = self.ratings_df[self.ratings_df['user_id'] == user_id]
        
        if user_ratings.empty:
            return {"error": f"User {user_id} not found in dataset"}
        
        # Get user's movie ratings with metadata
        user_movies = user_ratings.merge(self.movies_df, on='movie_id')
        
        # Calculate basic statistics
        profile = {
            'user_id': user_id,
            'total_ratings': len(user_ratings),
            'avg_rating': user_ratings['rating'].mean(),
            'rating_std': user_ratings['rating'].std(),
            'rating_distribution': user_ratings['rating'].value_counts().to_dict(),
        }
        
        # Genre preferences
        genre_ratings = []
        for _, movie in user_movies.iterrows():
            genres = movie['genres'].split('|') if pd.notna(movie['genres']) else []
            for genre in genres:
                genre_ratings.append({'genre': genre, 'rating': movie['rating']})
        
        genre_df = pd.DataFrame(genre_ratings)
        if not genre_df.empty:
            genre_preferences = genre_df.groupby('genre')['rating'].agg(['mean', 'count']).round(2)
            genre_preferences = genre_preferences[genre_preferences['count'] >= 3]  # Minimum 3 ratings
            profile['favorite_genres'] = genre_preferences.sort_values('mean', ascending=False).head(5).to_dict('index')
        
        # Temporal patterns
        user_ratings['timestamp'] = pd.to_datetime(user_ratings['timestamp'], unit='s')
        user_ratings['hour'] = user_ratings['timestamp'].dt.hour
        user_ratings['day_of_week'] = user_ratings['timestamp'].dt.day_name()
        
        profile['viewing_patterns'] = {
            'most_active_hours': user_ratings['hour'].value_counts().head(3).to_dict(),
            'most_active_days': user_ratings['day_of_week'].value_counts().head(3).to_dict()
        }
        
        # Top rated movies
        top_movies = user_movies.nlargest(10, 'rating')[['title', 'rating', 'genres']]
        profile['top_movies'] = top_movies.to_dict('records')
        
        return profile
    
    def calculate_user_similarity(self, user1_id: int, user2_id: int) -> Dict:
        """
        Calculate similarity between two users
        
        Args:
            user1_id (int): First user ID
            user2_id (int): Second user ID
            
        Returns:
            Dict: Similarity metrics and analysis
        """
        # Get user rating vectors
        if user1_id not in self.user_movie_matrix.index or user2_id not in self.user_movie_matrix.index:
            return {"error": "One or both users not found"}
        
        user1_ratings = self.user_movie_matrix.loc[user1_id]
        user2_ratings = self.user_movie_matrix.loc[user2_id]
        
        # Find commonly rated movies
        common_movies = (user1_ratings > 0) & (user2_ratings > 0)
        common_count = common_movies.sum()
        
        if common_count < 5:
            return {"error": "Not enough common movies (minimum 5 required)"}
        
        # Calculate similarities
        user1_common = user1_ratings[common_movies]
        user2_common = user2_ratings[common_movies]
        
        # Cosine similarity
        cosine_sim = cosine_similarity([user1_common], [user2_common])[0][0]
        
        # Pearson correlation
        pearson_corr = np.corrcoef(user1_common, user2_common)[0][1]
        
        # Rating difference analysis
        rating_diff = np.abs(user1_common - user2_common)
        avg_diff = rating_diff.mean()
        
        # Genre preference similarity
        profile1 = self.get_user_profile(user1_id)
        profile2 = self.get_user_profile(user2_id)
        
        similarity_report = {
            'cosine_similarity': round(cosine_sim, 3),
            'pearson_correlation': round(pearson_corr, 3),
            'common_movies_count': common_count,
            'avg_rating_difference': round(avg_diff, 2),
            'similarity_level': self._classify_similarity(cosine_sim),
            'compatibility_score': round((cosine_sim + (1 - avg_diff/4)) / 2, 3)
        }
        
        return similarity_report
    
    def _classify_similarity(self, similarity_score: float) -> str:
        """Classify similarity score into categories"""
        if similarity_score >= 0.8:
            return "Very High - Perfect movie partners! 🎬❤️"
        elif similarity_score >= 0.6:
            return "High - Great compatibility! 🌟"
        elif similarity_score >= 0.4:
            return "Moderate - Some shared tastes 👍"
        elif similarity_score >= 0.2:
            return "Low - Different preferences 🤔"
        else:
            return "Very Low - Opposite tastes! 😅"
    
    def recommend_for_individual(self, user_id: int, n_recommendations: int = 20) -> List[Dict]:
        """
        Generate individual recommendations using collaborative filtering
        
        Args:
            user_id (int): User ID
            n_recommendations (int): Number of recommendations
            
        Returns:
            List[Dict]: Recommended movies with scores and explanations
        """
        if user_id not in self.user_movie_matrix.index:
            return []
        
        user_ratings = self.user_movie_matrix.loc[user_id]
        
        # Find similar users using cosine similarity
        user_similarities = cosine_similarity([user_ratings], self.user_movie_matrix)[0]
        similar_users_idx = np.argsort(user_similarities)[::-1][1:51]  # Top 50 similar users
        
        # Get recommendations from similar users
        recommendations = {}
        for similar_user_idx in similar_users_idx:
            similar_user_id = self.user_movie_matrix.index[similar_user_idx]
            similar_user_ratings = self.user_movie_matrix.iloc[similar_user_idx]
            similarity_score = user_similarities[similar_user_idx]
            
            # Find movies rated highly by similar user but not rated by target user
            unrated_movies = (user_ratings == 0) & (similar_user_ratings >= 4.0)
            
            for movie_id in self.user_movie_matrix.columns[unrated_movies]:
                if movie_id not in recommendations:
                    recommendations[movie_id] = []
                recommendations[movie_id].append(similarity_score * similar_user_ratings[movie_id])
        
        # Calculate final scores
        final_recommendations = []
        for movie_id, scores in recommendations.items():
            if len(scores) >= 3:  # At least 3 similar users recommended it
                avg_score = np.mean(scores)
                confidence = len(scores) / 50.0  # Confidence based on number of recommenders
                
                movie_info = self.movies_df[self.movies_df['movie_id'] == movie_id].iloc[0]
                final_recommendations.append({
                    'movie_id': movie_id,
                    'title': movie_info['title'],
                    'genres': movie_info['genres'],
                    'year': movie_info['year'],
                    'predicted_rating': round(avg_score, 2),
                    'confidence': round(confidence, 2),
                    'recommendation_reason': f"Users with similar taste rated this {avg_score:.1f}/5.0"
                })
        
        # Sort by predicted rating and return top N
        final_recommendations.sort(key=lambda x: x['predicted_rating'], reverse=True)
        return final_recommendations[:n_recommendations]
    
    def recommend_for_couple(self, user1_id: int, user2_id: int, 
                           method: str = 'hybrid', n_recommendations: int = 15) -> List[Dict]:
        """
        Generate joint recommendations for a couple
        
        Args:
            user1_id (int): First user ID
            user2_id (int): Second user ID  
            method (str): Recommendation method ('intersection', 'weighted', 'least_misery', 'hybrid')
            n_recommendations (int): Number of recommendations
            
        Returns:
            List[Dict]: Joint recommendations with explanations
        """
        # Get individual recommendations
        recs1 = self.recommend_for_individual(user1_id, 50)
        recs2 = self.recommend_for_individual(user2_id, 50)
        
        if not recs1 or not recs2:
            return []
        
        # Convert to dictionaries for easier lookup
        recs1_dict = {rec['movie_id']: rec for rec in recs1}
        recs2_dict = {rec['movie_id']: rec for rec in recs2}
        
        joint_recommendations = []
        
        if method == 'intersection':
            # Only movies both users would like
            common_movies = set(recs1_dict.keys()) & set(recs2_dict.keys())
            for movie_id in common_movies:
                rec1, rec2 = recs1_dict[movie_id], recs2_dict[movie_id]
                joint_score = (rec1['predicted_rating'] + rec2['predicted_rating']) / 2
                
                joint_recommendations.append({
                    **rec1,
                    'joint_score': round(joint_score, 2),
                    'user1_score': rec1['predicted_rating'],
                    'user2_score': rec2['predicted_rating'],
                    'method': 'intersection',
                    'explanation': f"Both of you would love this! Predicted ratings: {rec1['predicted_rating']:.1f} & {rec2['predicted_rating']:.1f}"
                })
        
        elif method == 'weighted':
            # Weighted combination of both users' preferences
            all_movies = set(recs1_dict.keys()) | set(recs2_dict.keys())
            for movie_id in all_movies:
                score1 = recs1_dict.get(movie_id, {}).get('predicted_rating', 2.5)
                score2 = recs2_dict.get(movie_id, {}).get('predicted_rating', 2.5)
                
                # Equal weights for now, can be customized
                joint_score = (score1 + score2) / 2
                
                if joint_score >= 3.5:  # Only recommend if joint score is decent
                    movie_info = recs1_dict.get(movie_id) or recs2_dict.get(movie_id)
                    joint_recommendations.append({
                        **movie_info,
                        'joint_score': round(joint_score, 2),
                        'user1_score': round(score1, 2),
                        'user2_score': round(score2, 2),
                        'method': 'weighted',
                        'explanation': f"Balanced choice for both: {score1:.1f} & {score2:.1f}"
                    })
        
        elif method == 'least_misery':
            # Minimize the worst rating between users
            all_movies = set(recs1_dict.keys()) | set(recs2_dict.keys())
            for movie_id in all_movies:
                score1 = recs1_dict.get(movie_id, {}).get('predicted_rating', 2.5)
                score2 = recs2_dict.get(movie_id, {}).get('predicted_rating', 2.5)
                
                # Use minimum score to ensure no one is miserable
                joint_score = min(score1, score2)
                
                if joint_score >= 3.5:
                    movie_info = recs1_dict.get(movie_id) or recs2_dict.get(movie_id)
                    joint_recommendations.append({
                        **movie_info,
                        'joint_score': round(joint_score, 2),
                        'user1_score': round(score1, 2),
                        'user2_score': round(score2, 2),
                        'method': 'least_misery',
                        'explanation': f"Safe choice - ensures no one dislikes it! ({score1:.1f}, {score2:.1f})"
                    })
        
        elif method == 'hybrid':
            # Combine multiple methods with different weights
            intersection_recs = self.recommend_for_couple(user1_id, user2_id, 'intersection', 50)
            weighted_recs = self.recommend_for_couple(user1_id, user2_id, 'weighted', 50)
            
            # Create hybrid scoring
            all_hybrid_movies = {}
            
            # High weight for intersection (both like)
            for rec in intersection_recs:
                movie_id = rec['movie_id']
                all_hybrid_movies[movie_id] = {
                    **rec,
                    'hybrid_score': rec['joint_score'] * 1.2,  # Boost intersection movies
                    'method': 'hybrid_intersection'
                }
            
            # Medium weight for weighted recommendations
            for rec in weighted_recs:
                movie_id = rec['movie_id']
                if movie_id not in all_hybrid_movies:
                    all_hybrid_movies[movie_id] = {
                        **rec,
                        'hybrid_score': rec['joint_score'],
                        'method': 'hybrid_weighted'
                    }
            
            joint_recommendations = list(all_hybrid_movies.values())
            joint_recommendations.sort(key=lambda x: x.get('hybrid_score', x['joint_score']), reverse=True)
        
        # Sort and return top recommendations
        if method != 'hybrid':
            joint_recommendations.sort(key=lambda x: x['joint_score'], reverse=True)
        
        return joint_recommendations[:n_recommendations]
    
    def analyze_group_preferences(self, user_ids: List[int]) -> Dict:
        """
        Analyze preferences and compatibility for a group of users
        
        Args:
            user_ids (List[int]): List of user IDs
            
        Returns:
            Dict: Group analysis including preferences overlap and compatibility
        """
        if len(user_ids) < 2:
            return {"error": "Need at least 2 users for group analysis"}
        
        # Get individual profiles
        profiles = {}
        for user_id in user_ids:
            profile = self.get_user_profile(user_id)
            if 'error' not in profile:
                profiles[user_id] = profile
        
        if len(profiles) < 2:
            return {"error": "Not enough valid user profiles"}
        
        # Analyze genre preferences overlap
        all_genres = set()
        user_genres = {}
        
        for user_id, profile in profiles.items():
            if 'favorite_genres' in profile:
                user_genre_prefs = set(profile['favorite_genres'].keys())
                user_genres[user_id] = user_genre_prefs
                all_genres.update(user_genre_prefs)
        
        # Find common genres
        common_genres = set.intersection(*user_genres.values()) if user_genres else set()
        
        # Calculate pairwise similarities
        similarities = {}
        for i, user1 in enumerate(user_ids):
            for user2 in user_ids[i+1:]:
                if user1 in profiles and user2 in profiles:
                    sim = self.calculate_user_similarity(user1, user2)
                    if 'error' not in sim:
                        similarities[f"{user1}-{user2}"] = sim
        
        # Group compatibility score
        if similarities:
            avg_compatibility = np.mean([sim['compatibility_score'] for sim in similarities.values()])
            group_harmony = "High" if avg_compatibility >= 0.7 else "Medium" if avg_compatibility >= 0.5 else "Low"
        else:
            avg_compatibility = 0
            group_harmony = "Unknown"
        
        return {
            'group_size': len(profiles),
            'common_genres': list(common_genres),
            'all_preferred_genres': list(all_genres),
            'genre_overlap_percentage': round(len(common_genres) / len(all_genres) * 100, 1) if all_genres else 0,
            'pairwise_similarities': similarities,
            'group_compatibility_score': round(avg_compatibility, 3),
            'group_harmony_level': group_harmony,
            'recommendation_strategy': self._suggest_group_strategy(avg_compatibility, len(common_genres))
        }
    
    def _suggest_group_strategy(self, compatibility_score: float, common_genres: int) -> str:
        """Suggest the best recommendation strategy for the group"""
        if compatibility_score >= 0.7 and common_genres >= 3:
            return "intersection - High compatibility, focus on shared preferences"
        elif compatibility_score >= 0.5:
            return "weighted - Moderate compatibility, balance individual preferences"
        else:
            return "least_misery - Low compatibility, avoid movies anyone would dislike"
    
    def get_recommendation_explanation(self, movie_id: int, user_ids: List[int]) -> Dict:
        """
        Provide detailed explanation for why a movie was recommended to a group
        
        Args:
            movie_id (int): Movie ID
            user_ids (List[int]): List of user IDs
            
        Returns:
            Dict: Detailed explanation of the recommendation
        """
        movie_info = self.movies_df[self.movies_df['movie_id'] == movie_id]
        if movie_info.empty:
            return {"error": "Movie not found"}
        
        movie_info = movie_info.iloc[0]
        
        explanation = {
            'movie_title': movie_info['title'],
            'genres': movie_info['genres'],
            'year': movie_info['year'],
            'individual_predictions': {},
            'group_factors': []
        }
        
        # Get individual predictions
        for user_id in user_ids:
            user_recs = self.recommend_for_individual(user_id, 100)
            movie_rec = next((rec for rec in user_recs if rec['movie_id'] == movie_id), None)
            
            if movie_rec:
                explanation['individual_predictions'][user_id] = {
                    'predicted_rating': movie_rec['predicted_rating'],
                    'confidence': movie_rec['confidence'],
                    'reason': movie_rec['recommendation_reason']
                }
            else:
                explanation['individual_predictions'][user_id] = {
                    'predicted_rating': 'Not in top recommendations',
                    'confidence': 0,
                    'reason': 'This movie was not individually recommended for this user'
                }
        
        # Analyze why it's good for the group
        movie_genres = set(movie_info['genres'].split('|')) if pd.notna(movie_info['genres']) else set()
        
        # Check genre preferences
        for user_id in user_ids:
            profile = self.get_user_profile(user_id)
            if 'favorite_genres' in profile:
                user_fav_genres = set(profile['favorite_genres'].keys())
                genre_overlap = movie_genres & user_fav_genres
                if genre_overlap:
                    explanation['group_factors'].append(
                        f"User {user_id} likes {', '.join(genre_overlap)} genre(s)"
                    )
        
        return explanation

# Example usage and testing functions
def main():
    """Example usage of the Joint Movie Recommender"""
    
    # This would typically load real data
    print("🎬 Joint Movie Recommendation System")
    print("=" * 50)
    
    # Example with sample data structure
    sample_ratings = pd.DataFrame({
        'user_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],
        'movie_id': [101, 102, 103, 101, 104, 105, 102, 103, 106],
        'rating': [5.0, 4.0, 3.0, 4.0, 5.0, 3.0, 4.0, 5.0, 4.0],
        'timestamp': [946684800, 946684900, 946685000, 946684850, 946684950, 946685050, 946684875, 946684975, 946685075]
    })
    
    sample_movies = pd.DataFrame({
        'movie_id': [101, 102, 103, 104, 105, 106],
        'title': ['Toy Story', 'Jumanji', 'Grumpier Old Men', 'Waiting to Exhale', 'Father of the Bride Part II', 'Heat'],
        'genres': ['Animation|Children|Comedy', 'Adventure|Children|Fantasy', 'Comedy|Romance', 'Comedy|Drama', 'Comedy', 'Action|Crime|Thriller'],
        'year': [1995, 1995, 1995, 1995, 1995, 1995]
    })
    
    # Initialize recommender
    recommender = JointMovieRecommender(sample_ratings, sample_movies)
    
    # Example recommendations
    print("\n👤 Individual Profile for User 1:")
    profile1 = recommender.get_user_profile(1)
    print(f"Total ratings: {profile1['total_ratings']}")
    print(f"Average rating: {profile1['avg_rating']:.2f}")
    
    print("\n💕 Couple Recommendations for Users 1 & 2:")
    couple_recs = recommender.recommend_for_couple(1, 2, method='hybrid')
    for i, rec in enumerate(couple_recs[:3], 1):
        print(f"{i}. {rec['title']} - Joint Score: {rec['joint_score']}")
    
    print("\n🤝 User Similarity Analysis:")
    similarity = recommender.calculate_user_similarity(1, 2)
    print(f"Compatibility: {similarity['similarity_level']}")
    print(f"Compatibility Score: {similarity['compatibility_score']}")

if __name__ == "__main__":
    main()
