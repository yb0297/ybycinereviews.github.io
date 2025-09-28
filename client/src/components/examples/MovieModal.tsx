import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MovieModal from '../MovieModal';

const sampleMovie = {
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
};

export default function MovieModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>
        Open Movie Modal
      </Button>
      
      <MovieModal
        movie={sampleMovie}
        open={isOpen}
        onOpenChange={setIsOpen}
        onLike={(movie) => console.log('Liked:', movie.title)}
        onBookmark={(movie) => console.log('Bookmarked:', movie.title)}
        onShare={(movie) => console.log('Shared:', movie.title)}
      />
    </div>
  );
}