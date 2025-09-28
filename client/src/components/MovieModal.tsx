import { useState } from 'react';
import { X, Star, Play, Heart, BookmarkPlus, Share2, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';

interface MovieModalProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLike?: (movie: Movie) => void;
  onBookmark?: (movie: Movie) => void;
  onShare?: (movie: Movie) => void;
}

export default function MovieModal({ 
  movie, 
  open, 
  onOpenChange,
  onLike,
  onBookmark,
  onShare
}: MovieModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!movie) return null;

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

  const genres = [
    { id: 28, name: 'Action' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' }
  ];

  // Mock reviews data - TODO: remove mock functionality
  const mockReviews = [
    {
      id: '1',
      author: 'John Doe',
      author_details: {
        name: 'John Doe',
        username: 'johndoe',
        avatar_path: '/avatar1.jpg',
        rating: 9
      },
      content: "An absolutely phenomenal film that redefined the superhero genre. Heath Ledger's performance as the Joker is unforgettable.",
      created_at: '2023-01-15T10:30:00Z',
      updated_at: '2023-01-15T10:30:00Z',
      url: ''
    },
    {
      id: '2',
      author: 'Jane Smith',
      author_details: {
        name: 'Jane Smith',
        username: 'janesmith',
        avatar_path: '/avatar2.jpg',
        rating: 8
      },
      content: "Dark, gritty, and incredibly well-crafted. Christopher Nolan's direction is masterful.",
      created_at: '2023-02-20T14:45:00Z',
      updated_at: '2023-02-20T14:45:00Z',
      url: ''
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
        data-testid="movie-modal"
      >
        <DialogHeader className="sr-only">
          <h2>{movie.title} Details</h2>
        </DialogHeader>

        {/* Backdrop Header */}
        <div 
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(${MovieService.getBackdropUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/20 backdrop-blur hover:bg-background/40 text-primary-foreground"
            onClick={() => onOpenChange(false)}
            data-testid="button-close-modal"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Movie Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-6">
              <img
                src={MovieService.getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-lg shadow-lg"
                data-testid="modal-poster"
              />
              <div className="flex-1 space-y-2">
                <h1 
                  className="text-2xl font-display font-bold text-primary-foreground"
                  data-testid="modal-title"
                >
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 text-primary-foreground/80">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span>{movie.release_date.split('-')[0]}</span>
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
                <div className="flex gap-2">
                  {genres.slice(0, 3).map((genre) => (
                    <Badge key={genre.id} variant="secondary" className="bg-background/20 text-primary-foreground border-primary-foreground/20">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3" data-testid="modal-actions">
            <Button size="lg" data-testid="button-play-trailer-modal">
              <Play className="h-4 w-4 mr-2" />
              Watch Trailer
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLike}
              data-testid="button-like-modal"
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBookmark}
              data-testid="button-bookmark-modal"
              className={isBookmarked ? 'text-blue-500' : ''}
            >
              <BookmarkPlus className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              data-testid="button-share-modal"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} data-testid="modal-tabs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
              <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Plot Summary</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="modal-overview">
                  {movie.overview}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">User Reviews</h3>
                <div className="space-y-4" data-testid="modal-reviews">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border border-card-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {review.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{review.author}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-sm text-muted-foreground">
                                {review.author_details.rating}/10
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="modal-details">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Movie Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Release Date:</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(movie.release_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Language:</span>
                      <span className="text-sm text-muted-foreground">
                        {movie.original_language.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Runtime:</span>
                      <span className="text-sm text-muted-foreground">152 minutes</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ratings & Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">Average Rating:</span>
                      <span className="text-sm text-muted-foreground">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Total Votes:</span>
                      <span className="text-sm text-muted-foreground">
                        {movie.vote_count.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Popularity Score:</span>
                      <span className="text-sm text-muted-foreground">
                        {movie.popularity.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}