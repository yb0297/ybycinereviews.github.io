import MovieGrid from '../MovieGrid';

const sampleMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime.",
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
    overview: "A thief who steals corporate secrets through dreams.",
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
    overview: "A team of explorers travel through a wormhole.",
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
  }
];

export default function MovieGridExample() {
  return (
    <div className="p-6">
      <MovieGrid 
        movies={sampleMovies}
        title="Popular Movies"
        onMovieSelect={(movie) => console.log('Selected:', movie.title)}
        onLike={(movie) => console.log('Liked:', movie.title)}
        onBookmark={(movie) => console.log('Bookmarked:', movie.title)}
      />
    </div>
  );
}