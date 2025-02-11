import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllData, getMovieData } from "../../services/api";
import { useAllDataContext } from "../../context/AllDataContext";
import Icon from "./Icon";
import Loading from "./Loading";

const RatingFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites } = useAllDataContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rating = Number(queryParams.get("rating")) || 0;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shows = await getAllData(); // TV şouları
        const moviesResponse = await getMovieData(); // Filmlər
        console.log("Movies Response:", moviesResponse);

        // Filmlər `info` içindədirsə, onu yoxlayırıq
        // const movies = Array.isArray(moviesResponse?.movie) ? moviesResponse.movie : [];

        const allFilms = [
          ...shows.map((show) => ({
            ...show,
            type: "show",
            rating: show.rating?.average || 0, // TV şoular üçün reytinq
          })),
          ...moviesResponse.map((movie) => ({
            ...movie,
            type: "movie",
            rating: movie.rating || 0, // Filmlər üçün reytinq
          }))
        ];

        setFilms(allFilms);
      } catch (err) {
        setError(`Xəta: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredFilms = films.filter((film) => Math.round(film.rating) === rating);

  if (loading) return <div><Loading/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-xl font-bold mb-3 text-white italic">Rated Movies</h1>
      <h3 className="text-lg mb-3 text-white underline">Selected rating: {rating} ★</h3>

      {filteredFilms.length > 0 ? (
        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1 mb-6">
          {filteredFilms.map((film, i) => (
            <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
              <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
                <button onClick={() => addToFavorites(film)}>
                 <Icon/>
                </button>
              </div>
              <div className="rounded-lg shadow-lg">
                 <Link to={film.type === "movie" ? `/film/${film.id}` : `/show/${film.id}`}>
                 <div className=" max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                   <img src={film.image?.medium || film.medium_cover_image || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={film.name || film.title} className="w-full h-full " />
                 </div>
               </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No movies matching this rating were found.</p>
      )}
    </div>
    </div>
  );
};

export default RatingFilms;
