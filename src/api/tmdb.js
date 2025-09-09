const API_KEY = "55a6de34e3770297d021c43b857b9d9e";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  if (!query) return [];

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
