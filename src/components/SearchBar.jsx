import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-1/2 p-2 rounded bg-gray-800 text-white focus:outline-none"
    />
  );
}
