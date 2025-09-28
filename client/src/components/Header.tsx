import { useState } from 'react';
import { Search, Menu, X, Film, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MovieService } from '../services/movieService';
import { Movie } from '../types/movie';

interface HeaderProps {
  onSearch?: (movies: Movie[]) => void;
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
}

export default function Header({ onSearch, onCategoryChange, activeCategory = 'popular' }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const categories = [
    { id: 'popular', label: 'Popular' },
    { id: 'trending', label: 'Trending' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Coming Soon' }
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await MovieService.searchMovies(query);
      setSearchResults(results);
      setShowSearchResults(true);
      onSearch?.(results);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
      onSearch?.([]);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Category changed to: ${categoryId}`);
    onCategoryChange?.(categoryId);
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    console.log(`Dark mode toggled: ${!isDarkMode}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" data-testid="logo-icon" />
            <span className="font-display font-bold text-xl" data-testid="logo-text">
              CineReviews
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                data-testid={`nav-${category.id}`}
                className="hover-elevate"
              >
                {category.label}
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4"
                data-testid="search-input"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-card-border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                {searchResults.slice(0, 5).map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 p-3 hover-elevate cursor-pointer"
                    onClick={() => {
                      console.log(`Movie selected: ${movie.title}`);
                      setShowSearchResults(false);
                    }}
                    data-testid={`search-result-${movie.id}`}
                  >
                    <img
                      src={MovieService.getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{movie.title}</h4>
                      <p className="text-muted-foreground text-xs">
                        {movie.release_date.split('-')[0]} • ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              data-testid="theme-toggle"
              className="hover-elevate"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-elevate"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" data-testid="mobile-menu">
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleCategoryClick(category.id)}
                  className="justify-start hover-elevate"
                  data-testid={`mobile-nav-${category.id}`}
                >
                  {category.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}