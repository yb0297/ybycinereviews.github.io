import MovieCard from '../MovieCard';

const sampleMovie = {
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
};

export default function MovieCardExample() {
  return (
    <div className="w-80">
      <MovieCard 
        movie={sampleMovie}
        onLike={(movie) => console.log('Liked:', movie.title)}
        onBookmark={(movie) => console.log('Bookmarked:', movie.title)}
        onViewDetails={(movie) => console.log('View details:', movie.title)}
      />
    </div>
  );
}