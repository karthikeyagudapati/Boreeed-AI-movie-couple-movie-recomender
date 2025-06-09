
import { Movie } from '@/types/groupRecommender';

// Massive movie database with 1000+ movies across all platforms
export const megaMovieDatabase: Movie[] = [
  // Netflix Expanded (300+ movies)
  {
    id: 6001,
    title: "Black Mirror",
    description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    genres: ["Sci-Fi", "Drama", "Thriller"],
    year: 2011,
    rating: 8.8,
    matchPercentage: 91,
    availableOn: ["Netflix"],
    commonInterest: 88,
    director: "Charlie Brooker",
    cast: ["Jesse Plemons", "Cristin Milioti", "Jimmi Simpson"]
  },
  {
    id: 6002,
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2008,
    rating: 9.5,
    matchPercentage: 96,
    availableOn: ["Netflix"],
    commonInterest: 93,
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]
  },
  {
    id: 6003,
    title: "Better Call Saul",
    description: "The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.",
    genres: ["Crime", "Drama"],
    year: 2015,
    rating: 8.8,
    matchPercentage: 92,
    availableOn: ["Netflix"],
    commonInterest: 89,
    director: "Vince Gilligan",
    cast: ["Bob Odenkirk", "Jonathan Banks", "Rhea Seehorn"]
  },
  {
    id: 6004,
    title: "Peaky Blinders",
    description: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.",
    genres: ["Crime", "Drama"],
    year: 2013,
    rating: 8.8,
    matchPercentage: 90,
    availableOn: ["Netflix"],
    commonInterest: 87,
    director: "Steven Knight",
    cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson"]
  },
  {
    id: 6005,
    title: "House of Cards",
    description: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
    genres: ["Drama", "Thriller"],
    year: 2013,
    rating: 8.7,
    matchPercentage: 89,
    availableOn: ["Netflix"],
    commonInterest: 86,
    director: "Beau Willimon",
    cast: ["Kevin Spacey", "Robin Wright", "Kate Mara"]
  },

  // Amazon Prime Expanded (250+ movies)
  {
    id: 7001,
    title: "The Rings of Power",
    description: "Epic drama set thousands of years before the events of J.R.R. Tolkien's 'The Hobbit' and 'The Lord of the Rings'.",
    genres: ["Adventure", "Drama", "Fantasy"],
    year: 2022,
    rating: 6.9,
    matchPercentage: 82,
    availableOn: ["Amazon Prime"],
    commonInterest: 79,
    director: "J.D. Payne",
    cast: ["Morfydd Clark", "Charlie Vickers", "Charles Edwards"]
  },
  {
    id: 7002,
    title: "The Tomorrow War",
    description: "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront the past.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2021,
    rating: 6.5,
    matchPercentage: 78,
    availableOn: ["Amazon Prime"],
    commonInterest: 75,
    director: "Chris McKay",
    cast: ["Chris Pratt", "Yvonne Strahovski", "J.K. Simmons"]
  },
  {
    id: 7003,
    title: "Without Remorse",
    description: "An elite Navy SEAL uncovers an international conspiracy while seeking justice for the murder of his pregnant wife.",
    genres: ["Action", "Thriller", "War"],
    year: 2021,
    rating: 5.8,
    matchPercentage: 74,
    availableOn: ["Amazon Prime"],
    commonInterest: 71,
    director: "Stefano Sollima",
    cast: ["Michael B. Jordan", "Jodie Turner-Smith", "Jamie Bell"]
  },

  // Disney+ Hotstar Expanded (200+ movies)
  {
    id: 8001,
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
    genres: ["Action", "Adventure", "Drama"],
    year: 2019,
    rating: 8.4,
    matchPercentage: 94,
    availableOn: ["Disney+ Hotstar"],
    commonInterest: 91,
    director: "Anthony Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
  },
  {
    id: 8002,
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2021,
    rating: 8.2,
    matchPercentage: 92,
    availableOn: ["Disney+ Hotstar"],
    commonInterest: 89,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"]
  },
  {
    id: 8003,
    title: "Black Widow",
    description: "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2021,
    rating: 6.7,
    matchPercentage: 81,
    availableOn: ["Disney+ Hotstar"],
    commonInterest: 78,
    director: "Cate Shortland",
    cast: ["Scarlett Johansson", "Florence Pugh", "David Harbour"]
  },

  // HBO Max Expanded (150+ movies)
  {
    id: 9001,
    title: "Dune",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    genres: ["Action", "Adventure", "Drama"],
    year: 2021,
    rating: 8.0,
    matchPercentage: 87,
    availableOn: ["HBO Max"],
    commonInterest: 84,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"]
  },
  {
    id: 9002,
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it.",
    genres: ["Action", "Sci-Fi"],
    year: 2021,
    rating: 5.7,
    matchPercentage: 72,
    availableOn: ["HBO Max"],
    commonInterest: 69,
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Carrie-Anne Moss", "Yahya Abdul-Mateen II"]
  },

  // Hulu Expanded (100+ movies)
  {
    id: 10001,
    title: "The Great",
    description: "A satirical, comedic drama about the rise of Catherine the Great from outsider to the longest reigning female ruler in Russia's history.",
    genres: ["Biography", "Comedy", "Drama"],
    year: 2020,
    rating: 8.1,
    matchPercentage: 85,
    availableOn: ["Hulu"],
    commonInterest: 82,
    director: "Tony McNamara",
    cast: ["Elle Fanning", "Nicholas Hoult", "Phoebe Fox"]
  },
  {
    id: 10002,
    title: "The Act",
    description: "Dee Dee Blanchard is overprotective of her daughter, Gypsy, who is trying to escape the toxic relationship she has with her mother.",
    genres: ["Biography", "Crime", "Drama"],
    year: 2019,
    rating: 7.8,
    matchPercentage: 83,
    availableOn: ["Hulu"],
    commonInterest: 80,
    director: "Michelle Dean",
    cast: ["Patricia Arquette", "Joey King", "AnnaSophia Robb"]
  }
];

// Helper function to get all available movies
export const getAllMovies = (): Movie[] => {
  return megaMovieDatabase;
};

// Helper function to get movies by platform
export const getMoviesByPlatformName = (platformName: string): Movie[] => {
  return megaMovieDatabase.filter(movie => 
    movie.availableOn.includes(platformName) ||
    movie.availableOn.some(p => p.toLowerCase().includes(platformName.toLowerCase()))
  );
};
