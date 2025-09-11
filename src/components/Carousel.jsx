import React, { useState, useEffect } from "react";
import Slider from "react-slick";

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded cursor-pointer"
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded cursor-pointer"
      onClick={onClick}
    >
      &lt;
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
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-full h-64 object-cover"
            />
            <p className="mt-2 text-sm truncate">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
