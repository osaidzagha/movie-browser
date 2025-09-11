import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, getTrendingMovies } from "../api/tmdb";
import toast from "react-hot-toast";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoadingTrending(true);
      try {
        const data = await getTrendingMovies();
        setTrending(data || []);
      } catch (err) {
        toast.error("Failed to load trending movies");
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const results = await searchMovies(trimmedQuery);
        setMovies(results || []);
        setHasSearched(true);
      } catch (err) {
        toast.error("Failed to search movies");
      } finally {
        setLoadingSearch(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <div className="flex justify-center my-4">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {!query && (
        <>
          {loadingTrending ? (
            <p className="text-center">Loading trending movies...</p>
          ) : trending.length > 0 ? (
            <Carousel movies={trending} />
          ) : (
            <p className="text-center">No trending movies found.</p>
          )}
        </>
      )}

      {query && (
        <div className="mt-6">
          {loadingSearch ? (
            <p className="text-center">Searching...</p>
          ) : hasSearched && movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map(
                (movie) => movie && <MovieCard key={movie.id} movie={movie} />
              )}
            </div>
          ) : hasSearched ? (
            <p className="text-center">No results found.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
