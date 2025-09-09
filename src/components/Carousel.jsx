import React from "react";
import Slider from "react-slick";

export default function Carousel({ movies }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <p className="mt-2 text-sm truncate">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
