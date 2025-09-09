

export default function MovieCard({ movie }) {
        if(!movie.poster_path) return null

  return (
    <div className="cursor-pointer hover:scale-105 transform transition">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
      )}
      <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
    </div>
  );
}
