import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function ShowPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      {/* Backdrop image covering the screen */}
      <div
        className="w-full h-[100vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center justify-center w-12 h-12 rounded-full
                   bg-gradient-to-r from-purple-500 to-pink-500
                   hover:from-purple-600 hover:to-pink-600
                   text-white shadow-lg shadow-pink-500/50 cursor-pointer z-20"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Main content: poster + movie info */}
      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center px-8 gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-80 rounded-lg shadow-lg"
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            {movie.title || movie.original_title}
          </h1>
          <p className="mb-4 text-gray-100 text-lg leading-relaxed">
            {movie.overview}
          </p>
          <p className="text-yellow-400 font-semibold">
            ⭐ Rating: {movie.vote_average ?? "N/A"}
          </p>
          <p className="text-gray-100 mb-1">
            📅 Release Date: {movie.release_date}
          </p>
          <p className="text-gray-100 mb-1">⏱ Runtime: {movie.runtime} mins</p>
          <p className="text-gray-100">
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
