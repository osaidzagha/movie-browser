import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  if (!movie.poster_path) return null;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="cursor-pointer hover:scale-105 transform transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
      </div>
    </Link>
  );
}
