import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllData, getMovieData } from "../../services/api";
import { useAllDataContext } from "../../context/AllDataContext";
import Icon from "./Icon";

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

  if (loading) return <div>Yüklənir...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-xl font-bold mb-3">Qiymətləndirilmiş Filmlər</h1>
      <h3 className="text-lg mb-3">Seçilmiş reytinq: {rating} ★</h3>

      {filteredFilms.length > 0 ? (
        <div className="flex flex-wrap gap-2 mx-auto justify-center m-1">
          {filteredFilms.map((film, i) => (
            <div key={i} className="w-[180px] shadow-lg relative mt-4">
              <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => addToFavorites(show)}>
                 <Icon/>
                </button>
              </div>
              <Link to={film.type === "movie" ? `/film/${film.id}` : `/show/${film.id}`}>
                <div className="w-full h-full ">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={film.image?.medium || film.medium_cover_image}
                    alt={film.name || film.title}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Bu reytinqə uyğun film tapılmadı.</p>
      )}
    </div>
    </div>
  );
};

export default RatingFilms;
