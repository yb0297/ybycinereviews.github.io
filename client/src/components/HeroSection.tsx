import { useState } from 'react';
import { Play, BookmarkPlus, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';

interface HeroSectionProps {
  movie: Movie;
  onPlayTrailer?: () => void;
  onBookmark?: (movie: Movie) => void;
  onLike?: (movie: Movie) => void;
  onShare?: (movie: Movie) => void;
}

export default function HeroSection({ 
  movie, 
  onPlayTrailer, 
  onBookmark, 
  onLike, 
  onShare 
}: HeroSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(`Movie ${isLiked ? 'unliked' : 'liked'}: ${movie.title}`);
    onLike?.(movie);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log(`Movie ${isBookmarked ? 'unbookmarked' : 'bookmarked'}: ${movie.title}`);
    onBookmark?.(movie);
  };

  const handleShare = () => {
    console.log(`Movie shared: ${movie.title}`);
    onShare?.(movie);
  };

  const handlePlayTrailer = () => {
    console.log(`Playing trailer for: ${movie.title}`);
    onPlayTrailer?.();
  };

  const genres = [
    { id: 28, name: 'Action' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' }
  ];

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${MovieService.getBackdropUrl(movie.backdrop_path)})`,
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Movie Title */}
          <h1 
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 leading-tight"
            data-testid="hero-title"
          >
            {movie.title}
          </h1>

          {/* Movie Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6" data-testid="hero-metadata">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-primary-foreground font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-primary-foreground/70">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            </div>
            <span className="text-primary-foreground/70">
              {movie.release_date.split('-')[0]}
            </span>
            <div className="flex gap-2">
              {genres.slice(0, 3).map((genre) => (
                <Badge key={genre.id} variant="secondary" className="bg-background/20 text-primary-foreground border-primary-foreground/20">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Movie Overview */}
          <p 
            className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            data-testid="hero-overview"
          >
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4" data-testid="hero-actions">
            <Button 
              size="lg" 
              onClick={handlePlayTrailer}
              data-testid="button-play-trailer"
              className="bg-primary/90 hover:bg-primary text-primary-foreground border border-primary-border backdrop-blur"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLike}
              data-testid="button-like"
              className={`bg-background/10 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-background/20 ${
                isLiked ? 'text-red-400' : ''
              }`}
            >
              <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              onClick={handleBookmark}
              data-testid="button-bookmark"
              className={`bg-background/10 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-background/20 ${
                isBookmarked ? 'text-blue-400' : ''
              }`}
            >
              <BookmarkPlus className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              onClick={handleShare}
              data-testid="button-share"
              className="bg-background/10 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}