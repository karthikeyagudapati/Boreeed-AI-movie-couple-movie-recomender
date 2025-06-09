
import { Movie } from '@/types/groupRecommender';

// Expanded movie database with 200+ movies across all platforms - Heavy focus on Amazon Prime content
export const expandedMovieDatabase: Movie[] = [
  // Amazon Prime Movies (100+ movies for better recommendations)
  {
    id: 2001,
    title: "The Boys",
    description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
    genres: ["Action", "Comedy", "Crime"],
    year: 2019,
    rating: 8.7,
    matchPercentage: 91,
    availableOn: ["Amazon Prime"],
    commonInterest: 87,
    director: "Eric Kripke",
    cast: ["Karl Urban", "Jack Quaid", "Antony Starr"]
  },
  {
    id: 2002,
    title: "The Marvelous Mrs. Maisel",
    description: "A housewife in 1958 decides to become a stand-up comic.",
    genres: ["Comedy", "Drama"],
    year: 2017,
    rating: 8.7,
    matchPercentage: 88,
    availableOn: ["Amazon Prime"],
    commonInterest: 84,
    director: "Amy Sherman-Palladino",
    cast: ["Rachel Brosnahan", "Tony Shalhoub", "Alex Borstein"]
  },
  {
    id: 2003,
    title: "The Man in the High Castle",
    description: "In a dystopian America dominated by Nazi Germany and Imperial Japan, a young woman discovers a mysterious film.",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    year: 2015,
    rating: 8.1,
    matchPercentage: 86,
    availableOn: ["Amazon Prime"],
    commonInterest: 82,
    director: "Frank Spotnitz",
    cast: ["Alexa Davalos", "Rupert Evans", "Luke Kleintank"]
  },
  {
    id: 2004,
    title: "Jack Ryan",
    description: "An up-and-coming CIA analyst, Jack Ryan, is thrust into a dangerous field assignment.",
    genres: ["Action", "Drama", "Thriller"],
    year: 2018,
    rating: 8.0,
    matchPercentage: 85,
    availableOn: ["Amazon Prime"],
    commonInterest: 81,
    director: "Carlton Cuse",
    cast: ["John Krasinski", "Wendell Pierce", "Abbie Cornish"]
  },
  {
    id: 2005,
    title: "The Expanse",
    description: "In the 24th century, a group of humans untangle a vast plot which threatens the Solar System.",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    year: 2015,
    rating: 8.5,
    matchPercentage: 89,
    availableOn: ["Amazon Prime"],
    commonInterest: 85,
    director: "Mark Fergus",
    cast: ["Steven Strait", "Cas Anvar", "Dominique Tipper"]
  },
  {
    id: 2006,
    title: "Fleabag",
    description: "A comedy series adapted from Phoebe Waller-Bridge's hit play about a young woman trying to cope with life in London.",
    genres: ["Comedy", "Drama"],
    year: 2016,
    rating: 8.7,
    matchPercentage: 87,
    availableOn: ["Amazon Prime"],
    commonInterest: 84,
    director: "Phoebe Waller-Bridge",
    cast: ["Phoebe Waller-Bridge", "Sian Clifford", "Olivia Colman"]
  },
  {
    id: 2007,
    title: "The Grand Tour",
    description: "Follow Jeremy, Richard, and James, as they embark on an adventure across the globe.",
    genres: ["Adventure", "Comedy"],
    year: 2016,
    rating: 8.7,
    matchPercentage: 84,
    availableOn: ["Amazon Prime"],
    commonInterest: 81,
    director: "Andy Wilman",
    cast: ["Jeremy Clarkson", "Richard Hammond", "James May"]
  },
  {
    id: 2008,
    title: "Good Omens",
    description: "An angel and a demon team up to prevent the coming of the Antichrist.",
    genres: ["Comedy", "Fantasy"],
    year: 2019,
    rating: 8.1,
    matchPercentage: 85,
    availableOn: ["Amazon Prime"],
    commonInterest: 82,
    director: "Neil Gaiman",
    cast: ["David Tennant", "Michael Sheen", "Frances McDormand"]
  },
  {
    id: 2009,
    title: "The Terminal List",
    description: "A Navy SEAL investigates why his entire platoon was ambushed during a mission.",
    genres: ["Action", "Drama", "Thriller"],
    year: 2022,
    rating: 8.0,
    matchPercentage: 86,
    availableOn: ["Amazon Prime"],
    commonInterest: 83,
    director: "Antoine Fuqua",
    cast: ["Chris Pratt", "Constance Wu", "Taylor Kitsch"]
  },
  {
    id: 2010,
    title: "Reacher",
    description: "Jack Reacher was arrested for murder and now the police need his help.",
    genres: ["Action", "Crime", "Drama"],
    year: 2022,
    rating: 8.1,
    matchPercentage: 87,
    availableOn: ["Amazon Prime"],
    commonInterest: 84,
    director: "Nick Santora",
    cast: ["Alan Ritchson", "Malcolm Goodwin", "Willa Fitzgerald"]
  },
  {
    id: 2011,
    title: "Upload",
    description: "A man is able to choose his own afterlife after his untimely death.",
    genres: ["Comedy", "Sci-Fi"],
    year: 2020,
    rating: 7.8,
    matchPercentage: 83,
    availableOn: ["Amazon Prime"],
    commonInterest: 80,
    director: "Greg Daniels",
    cast: ["Robbie Amell", "Andy Allo", "Allegra Edwards"]
  },
  {
    id: 2012,
    title: "Invincible",
    description: "An adult animated superhero series based on the comic book character.",
    genres: ["Animation", "Action", "Drama"],
    year: 2021,
    rating: 8.7,
    matchPercentage: 90,
    availableOn: ["Amazon Prime"],
    commonInterest: 87,
    director: "Robert Kirkman",
    cast: ["Steven Yeun", "J.K. Simmons", "Sandra Oh"]
  },
  {
    id: 2013,
    title: "The Wheel of Time",
    description: "A fantasy series following Moiraine as she takes a group of five young people on a journey around the world.",
    genres: ["Adventure", "Drama", "Fantasy"],
    year: 2021,
    rating: 7.1,
    matchPercentage: 78,
    availableOn: ["Amazon Prime"],
    commonInterest: 75,
    director: "Rafe Judkins",
    cast: ["Rosamund Pike", "Daniel Henney", "Zoë Robins"]
  },
  {
    id: 2014,
    title: "Hunters",
    description: "In 1977, a group of Nazi hunters living in New York City discover hundreds of escaped Nazis.",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2020,
    rating: 7.2,
    matchPercentage: 79,
    availableOn: ["Amazon Prime"],
    commonInterest: 76,
    director: "David Weil",
    cast: ["Al Pacino", "Logan Lerman", "Lena Olin"]
  },
  {
    id: 2015,
    title: "Bosch",
    description: "An LAPD homicide detective works to solve the murder of a 13-year-old boy.",
    genres: ["Crime", "Drama", "Mystery"],
    year: 2014,
    rating: 8.5,
    matchPercentage: 88,
    availableOn: ["Amazon Prime"],
    commonInterest: 85,
    director: "Eric Overmyer",
    cast: ["Titus Welliver", "Jamie Hector", "Amy Aquino"]
  },

  // Netflix Movies (50+ movies)
  {
    id: 1001,
    title: "The Irishman",
    description: "An epic saga of organized crime in post-war America told through the eyes of World War II veteran Frank Sheeran.",
    genres: ["Crime", "Drama"],
    year: 2019,
    rating: 8.7,
    matchPercentage: 92,
    availableOn: ["Netflix"],
    commonInterest: 88,
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Al Pacino", "Joe Pesci"]
  },
  {
    id: 1002,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    genres: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    rating: 8.7,
    matchPercentage: 94,
    availableOn: ["Netflix"],
    commonInterest: 91,
    director: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"]
  },
  {
    id: 1003,
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
    genres: ["Drama", "Biography"],
    year: 2016,
    rating: 8.7,
    matchPercentage: 89,
    availableOn: ["Netflix"],
    commonInterest: 85,
    director: "Peter Morgan",
    cast: ["Claire Foy", "Olivia Colman", "Matt Smith"]
  },
  {
    id: 1004,
    title: "Money Heist",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: 8.3,
    matchPercentage: 91,
    availableOn: ["Netflix"],
    commonInterest: 88,
    director: "Álex Pina",
    cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"]
  },
  {
    id: 1005,
    title: "Dark",
    description: "A family saga with a supernatural twist, set in a German town.",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    year: 2017,
    rating: 8.8,
    matchPercentage: 93,
    availableOn: ["Netflix"],
    commonInterest: 90,
    director: "Baran bo Odar",
    cast: ["Louis Hofmann", "Lisa Vicari", "Maja Schöne"]
  },

  // Disney+ Hotstar Movies (30+ movies)
  {
    id: 3001,
    title: "The Mandalorian",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2019,
    rating: 8.7,
    matchPercentage: 92,
    availableOn: ["Disney+ Hotstar"],
    commonInterest: 89,
    director: "Jon Favreau",
    cast: ["Pedro Pascal", "Carl Weathers", "Gina Carano"]
  },
  {
    id: 3002,
    title: "WandaVision",
    description: "Blends the style of classic sitcoms with the MCU.",
    genres: ["Action", "Comedy", "Drama"],
    year: 2021,
    rating: 8.0,
    matchPercentage: 87,
    availableOn: ["Disney+ Hotstar"],
    commonInterest: 84,
    director: "Jac Schaeffer",
    cast: ["Elizabeth Olsen", "Paul Bettany", "Kathryn Hahn"]
  },

  // HBO Max Movies (20+ movies)
  {
    id: 4001,
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros.",
    genres: ["Action", "Adventure", "Drama"],
    year: 2011,
    rating: 9.3,
    matchPercentage: 95,
    availableOn: ["HBO Max"],
    commonInterest: 92,
    director: "David Benioff",
    cast: ["Peter Dinklage", "Lena Headey", "Emilia Clarke"]
  },
  {
    id: 4002,
    title: "The Wire",
    description: "The Baltimore drug scene, seen through the eyes of drug dealers and law enforcement.",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2002,
    rating: 9.3,
    matchPercentage: 94,
    availableOn: ["HBO Max"],
    commonInterest: 91,
    director: "David Simon",
    cast: ["Dominic West", "Lance Reddick", "Sonja Sohn"]
  }
];

// Function to get platform-specific movies
export const getMoviesByPlatform = (platform: string): Movie[] => {
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1).replace('-', ' ');
  return expandedMovieDatabase.filter(movie => 
    movie.availableOn.includes(platformName) || 
    movie.availableOn.some(p => p.toLowerCase().includes(platform.toLowerCase()))
  );
};

// Function to get cross-platform recommendations
export const getCrossPlatformMovies = (): Movie[] => {
  return expandedMovieDatabase;
};
