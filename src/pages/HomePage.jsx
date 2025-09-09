import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, getTrendingMovies } from "../api/tmdb";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMovies();
      setTrending(data);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const results = await searchMovies(query);
      setMovies(results);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-center my-4">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      <Carousel movies={trending} />

      {movies.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
