import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, getTrendingMovies } from "../api/tmdb";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const randomHeroMovie =
    trending.length > 0
      ? trending[Math.floor(Math.random() * trending.length)]
      : null;

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

      {!query && randomHeroMovie && (
        <Link to={`/movie/${randomHeroMovie.id}`}>
          <div
            className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl mb-8 overflow-hidden"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${randomHeroMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-8 left-8 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold">
                {randomHeroMovie.title || randomHeroMovie.original_title}
              </h1>
              <p className="mt-2 text-sm md:text-lg line-clamp-3">
                {randomHeroMovie.overview || "No description available."}
              </p>
            </div>
          </div>
        </Link>
      )}

      {!query && trending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
          {loadingTrending ? (
            <p>Loading trending movies...</p>
          ) : (
            <Carousel movies={trending} />
          )}
        </div>
      )}

      {query && (
        <div className="mt-6">
          {loadingSearch ? (
            <p className="text-center">Searching...</p>
          ) : hasSearched && movies.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Search Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movies.map(
                  (movie) => movie && <MovieCard key={movie.id} movie={movie} />
                )}
              </div>
            </>
          ) : hasSearched ? (
            <p className="text-center">No results found.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
