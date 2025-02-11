import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext";
import Icon from "./Icon";
import Loading from "./Loading";

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
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-2xl font-bold text-center my-4 text-white">
        {genreName} Movies and TV Series by Genre
      </h1>

      {filteredItems.length > 0 ? (
        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1 mb-6">
          {filteredItems.map((item, i) => (
            <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
              <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
                <button onClick={() => addToFavorites(item)}>
                 <Icon/>
                </button>
              </div>
              <div className="rounded-lg shadow-lg">
                 <Link to={item.type === "movie" ? `/film/${item.id}` : `/show/${item.id}`}>
                 <div className=" max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                   <img  src={item.image?.medium || item.medium_cover_image || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                   alt={item.name || item.title} className="w-full h-auto " />
                 </div>
               </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No movies or shows found in this genre</p>
      )}
    </div>
    </div>
  );
};

export default GenreFilms;
