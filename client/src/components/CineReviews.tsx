import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';
import Header from './Header';
import HeroSection from './HeroSection';
import MovieGrid from './MovieGrid';
import MovieModal from './MovieModal';

export default function CineReviews() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load initial data
  useEffect(() => {
    loadMovies('popular');
  }, []);

  const loadMovies = async (category: string) => {
    setLoading(true);
    setIsSearching(false);
    try {
      let movieData: Movie[] = [];
      
      switch (category) {
        case 'trending':
          movieData = await MovieService.getTrendingMovies();
          break;
        case 'top-rated':
          movieData = await MovieService.getTopRatedMovies();
          break;
        case 'upcoming':
          movieData = await MovieService.getPopularMovies(); // Using popular as placeholder
          break;
        default:
          movieData = await MovieService.getPopularMovies();
      }
      
      setMovies(movieData);
      
      // Set featured movie (first movie from the list)
      if (movieData.length > 0 && !featuredMovie) {
        setFeaturedMovie(movieData[0]);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchResults([]);
    loadMovies(category);
  };

  const handleSearch = (results: Movie[]) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleLike = (movie: Movie) => {
    console.log(`Liked movie: ${movie.title}`);
    // TODO: implement like functionality
  };

  const handleBookmark = (movie: Movie) => {
    console.log(`Bookmarked movie: ${movie.title}`);
    // TODO: implement bookmark functionality
  };

  const handleShare = (movie: Movie) => {
    console.log(`Shared movie: ${movie.title}`);
    // TODO: implement share functionality
  };

  const displayMovies = isSearching ? searchResults : movies;
  const gridTitle = isSearching 
    ? `Search Results` 
    : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ') + ' Movies';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />

      {/* Hero Section - Only show when not searching */}
      {!isSearching && featuredMovie && (
        <HeroSection
          movie={featuredMovie}
          onPlayTrailer={() => console.log('Play trailer for featured movie')}
          onLike={handleLike}
          onBookmark={handleBookmark}
          onShare={handleShare}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MovieGrid
          movies={displayMovies}
          loading={loading}
          title={gridTitle}
          onMovieSelect={handleMovieSelect}
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      </main>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        open={showModal}
        onOpenChange={setShowModal}
        onLike={handleLike}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </div>
  );
}