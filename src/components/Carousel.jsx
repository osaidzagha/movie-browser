import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard";

import { ChevronLeft, ChevronRight } from "lucide-react";

function NextArrow({ onClick }) {
  return (
    <div
      className="flex items-center justify-center w-12 h-12 
      rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
      hover:from-purple-600 hover:to-pink-600 
      text-white shadow-lg shadow-pink-500/50 
      cursor-pointer absolute z-10 right-4 top-1/2 
      -translate-y-1/2 transition"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="flex items-center justify-center w-12 h-12 
      rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
      hover:from-purple-600 hover:to-pink-600 
      text-white shadow-lg shadow-pink-500/50 
      cursor-pointer absolute z-10 left-4 top-1/2 
      -translate-y-1/2 transition"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );
}

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ],
};

export default function Carousel({ movies }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="my-6 relative px-4 md:px-6">
      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>

      <Slider key={windowWidth} {...carouselSettings}>
        {movies.map((movie) => (
          <div key={movie.id} className="p-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
