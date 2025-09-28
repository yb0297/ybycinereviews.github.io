import { Movie, MovieDetails, Genre } from '../types/movie';

// Mock data for development - TODO: remove mock functionality
const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent, they must face the chaos unleashed by an anarchist mastermind known only as the Joker.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 32000,
    genre_ids: [28, 80, 18],
    original_language: "en",
    original_title: "The Dark Knight",
    popularity: 98.5,
    adult: false,
    video: false
  },
  {
    id: 2,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 28000,
    genre_ids: [28, 878, 53],
    original_language: "en",
    original_title: "Inception",
    popularity: 89.2,
    adult: false,
    video: false
  },
  {
    id: 3,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    backdrop_path: "/pbrkL804c8yAv3zBZR4QPWZyUdl.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 25000,
    genre_ids: [18, 878],
    original_language: "en",
    original_title: "Interstellar",
    popularity: 85.7,
    adult: false,
    video: false
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 26500,
    genre_ids: [80, 18],
    original_language: "en",
    original_title: "Pulp Fiction",
    popularity: 92.1,
    adult: false,
    video: false
  },
  {
    id: 5,
    title: "The Godfather",
    overview: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-24",
    vote_average: 9.2,
    vote_count: 18500,
    genre_ids: [80, 18],
    original_language: "en",
    original_title: "The Godfather",
    popularity: 87.3,
    adult: false,
    video: false
  },
  {
    id: 6,
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg",
    release_date: "1990-09-21",
    vote_average: 8.7,
    vote_count: 12000,
    genre_ids: [80, 18],
    original_language: "en",
    original_title: "Goodfellas",
    popularity: 78.9,
    adult: false,
    video: false
  }
];

export class MovieService {
  // TODO: replace with real API calls
  static async getPopularMovies(): Promise<Movie[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMovies;
  }

  static async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMovies.slice(0, 4);
  }

  static async getTopRatedMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  static async searchMovies(query: string): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!query.trim()) return [];
    
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async getMovieDetails(id: number): Promise<MovieDetails | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) return null;

    return {
      ...movie,
      budget: 180000000,
      genres: movie.genre_ids.map(id => mockGenres.find(g => g.id === id)!).filter(Boolean),
      homepage: "https://example.com",
      imdb_id: "tt0468569",
      production_companies: [],
      production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
      revenue: 1000000000,
      runtime: 152,
      spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }],
      status: "Released",
      tagline: "Why so serious?"
    };
  }

  static getGenres(): Genre[] {
    return mockGenres;
  }

  static getImageUrl(path: string, size: string = 'w500'): string {
    // TODO: replace with real image URLs
    return `https://picsum.photos/400/600?random=${path}`;
  }

  static getBackdropUrl(path: string, size: string = 'w1280'): string {
    // TODO: replace with real image URLs  
    return `https://picsum.photos/1280/720?random=${path}`;
  }
}