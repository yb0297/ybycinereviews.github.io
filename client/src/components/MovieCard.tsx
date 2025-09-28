import { useState } from 'react';
import { Star, Heart, BookmarkPlus, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';

interface MovieCardProps {
  movie: Movie;
  onLike?: (movie: Movie) => void;
  onBookmark?: (movie: Movie) => void;
  onViewDetails?: (movie: Movie) => void;
  className?: string;
}

export default function MovieCard({ 
  movie, 
  onLike, 
  onBookmark, 
  onViewDetails,
  className = ""
}: MovieCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log(`Movie ${isLiked ? 'unliked' : 'liked'}: ${movie.title}`);
    onLike?.(movie);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    console.log(`Movie ${isBookmarked ? 'unbookmarked' : 'bookmarked'}: ${movie.title}`);
    onBookmark?.(movie);
  };

  const handleViewDetails = () => {
    console.log(`Viewing details for: ${movie.title}`);
    onViewDetails?.(movie);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div 
      className={`group relative bg-card border border-card-border rounded-lg overflow-hidden hover-elevate cursor-pointer transition-all duration-300 ${className}`}
      onClick={handleViewDetails}
      data-testid={`movie-card-${movie.id}`}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={MovieService.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          data-testid={`movie-poster-${movie.id}`}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant="secondary" 
            className="bg-background/80 backdrop-blur text-foreground border-0"
            data-testid={`movie-rating-${movie.id}`}
          >
            <Star className={`h-3 w-3 mr-1 ${getRatingColor(movie.vote_average)} fill-current`} />
            {movie.vote_average.toFixed(1)}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur hover:bg-background/90"
            onClick={handleLike}
            data-testid={`button-like-${movie.id}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'text-red-400 fill-current' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur hover:bg-background/90"
            onClick={handleBookmark}
            data-testid={`button-bookmark-${movie.id}`}
          >
            <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? 'text-blue-400 fill-current' : ''}`} />
          </Button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-background/20 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-background/40"
            data-testid={`button-view-details-${movie.id}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        <h3 
          className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors"
          data-testid={`movie-title-${movie.id}`}
        >
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-4 w-4" />
          <span data-testid={`movie-year-${movie.id}`}>
            {movie.release_date.split('-')[0]}
          </span>
          <span>•</span>
          <span data-testid={`movie-votes-${movie.id}`}>
            {movie.vote_count.toLocaleString()} votes
          </span>
        </div>

        <p 
          className="text-muted-foreground text-sm line-clamp-3 leading-relaxed"
          data-testid={`movie-overview-${movie.id}`}
        >
          {movie.overview}
        </p>
      </div>
    </div>
  );
}