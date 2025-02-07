import React from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const LatestMovies = () => {
  const { moviedata,addToFavorites } = useAllDataContext();

  if (!moviedata || moviedata.length === 0) {
    return <p className="text-center">No movies available.</p>;
  }

  // Yalnız 2020-dən sonrakı filmləri filterləyirik
  const filterFilms = moviedata.filter(film => film.year >= 2020);

  return (
    <div className="bg-[#800000]">
    <div className="max-w-[1280px] mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Movies from 2020 Onwards</h2>
      <div className="flex flex-wrap gap-4 mx-auto justify-center m-1 ">
        {filterFilms.map((film, index) => (
          <div key={index} className="rounded-lg shadow-lg relative">
            <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => addToFavorites(film)}>
               <Icon/>
              </button>
            </div>
            <Link to={`/film/:id`}>
            <img
              src={film.medium_cover_image || "https://via.placeholder.com/180x240"}
              alt={film.title}
              className="w-full h-full object-cover"
            />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default LatestMovies;
