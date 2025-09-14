import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  if (!movie.poster_path) return null;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="cursor-pointer hover:scale-105 transform transition duration-300">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 md:h-80 object-contain rounded-lg shadow-md"
        />
        <div className="mt-3">
          <h3 className="text-sm md:text-base font-semibold text-gray-100 hover:text-purple-400 truncate">
            {movie.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Rating:{" "}
            <span className="text-yellow-400">
              {movie.vote_average ?? "N/A"}
            </span>
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">
            {movie.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
}
