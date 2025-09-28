import HeroSection from '../HeroSection';

const featuredMovie = {
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

export default function HeroSectionExample() {
  return (
    <HeroSection 
      movie={featuredMovie}
      onPlayTrailer={() => console.log('Play trailer')}
      onBookmark={(movie) => console.log('Bookmark:', movie.title)}
      onLike={(movie) => console.log('Like:', movie.title)}
      onShare={(movie) => console.log('Share:', movie.title)}
    />
  );
}