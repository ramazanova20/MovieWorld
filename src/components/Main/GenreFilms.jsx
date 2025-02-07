import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext";
import Icon from "./Icon";

const GenreFilms = () => {
  const { genreName } = useParams();
  const { data, moviedata,addToFavorites } = useAllDataContext();
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data || !moviedata) {
      setLoading(false);
      return;
    }

    try {
      // **TVMaze API**-dən uyğun serialları seç
      const tvShows = data?.filter(show => show.genres?.includes(genreName)) || [];

      // **YTS API**-dən uyğun filmləri seç
      const movies = moviedata.filter(movie => movie.genres?.includes(genreName)) || [];

      // İkisini birləşdir
      setFilteredItems([...tvShows, ...movies]);
      setLoading(false);
    } catch (err) {
      setError(`Xəta: ${err.message}`);
      setLoading(false);
    }
  }, [genreName, data, moviedata]);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-2xl font-bold text-center my-4">
        {genreName} Janrına Aid Filmlər və Seriallar
      </h1>

      {filteredItems.length > 0 ? (
        <div className="flex flex-wrap gap-4 mx-auto justify-center m-1">
          {filteredItems.map((item, i) => (
            <div key={i} className="w-[180px] rounded-lg shadow-lg mt-4 relative">
              <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => addToFavorites(item)}>
                 <Icon/>
                </button>
              </div>
              <Link to={item.type === "movie" ? `/film/${item.id}` : `/show/${item.id}`}>
                <div className="w-full h-full">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={item.image?.medium || item.medium_cover_image || "https://via.placeholder.com/180x240"}
                    alt={item.name || item.title}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">Bu janrda heç bir film və ya serial tapılmadı</p>
      )}
    </div>
    </div>
  );
};

export default GenreFilms;
