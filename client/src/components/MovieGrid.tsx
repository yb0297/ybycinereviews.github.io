import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  title?: string;
  onMovieSelect?: (movie: Movie) => void;
  onLike?: (movie: Movie) => void;
  onBookmark?: (movie: Movie) => void;
  className?: string;
}

export default function MovieGrid({ 
  movies, 
  loading = false, 
  title,
  onMovieSelect,
  onLike,
  onBookmark,
  className = ""
}: MovieGridProps) {
  
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && (
          <h2 className="text-2xl font-display font-bold text-foreground">
            {title}
          </h2>
        )}
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && (
          <h2 className="text-2xl font-display font-bold text-foreground">
            {title}
          </h2>
        )}
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg" data-testid="no-movies-message">
            No movies found
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <h2 
            className="text-2xl font-display font-bold text-foreground"
            data-testid="grid-title"
          >
            {title}
          </h2>
          <span 
            className="text-muted-foreground text-sm"
            data-testid="movie-count"
          >
            {movies.length} movie{movies.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6"
        data-testid="movie-grid"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={onMovieSelect}
            onLike={onLike}
            onBookmark={onBookmark}
          />
        ))}
      </div>
    </div>
  );
}