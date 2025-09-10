import { API_KEY, BASE_URL } from "../constants.jsx";
import toast from "react-hot-toast";

export async function searchMovies(query) {
  if (!query) return [];

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    toast.error("Failed to search movies. Please try again later.");
    return [];
  }
}

export async function getTrendingMovies() {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    toast.error("Failed to fetch trending movies. Please try again later.");
    return [];
  }
}
