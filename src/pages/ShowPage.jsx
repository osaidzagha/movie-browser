import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import toast from "react-hot-toast";

export default function ShowPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!movie) return <p className="text-white p-6">Movie not found.</p>;

  return (
    <div className="relative bg-black min-h-screen">
      <div
        className="w-full h-[100vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center px-8 gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-80 rounded-lg shadow-lg"
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-white">
            {movie.title || movie.original_title}
          </h1>
          <p className="mb-4 text-gray-300">{movie.overview}</p>
          <p className="text-yellow-400 font-semibold">
            ⭐ Rating: {movie.vote_average ?? "N/A"}
          </p>
          <p className="text-gray-300">📅 Release Date: {movie.release_date}</p>
          <p className="text-gray-300">⏱ Runtime: {movie.runtime} mins</p>
          <p className="text-gray-300">
            🎭 Genres: {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="text-gray-300">
            🌍 Language: {movie.original_language?.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
