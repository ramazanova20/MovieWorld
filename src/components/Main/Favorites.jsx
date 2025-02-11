import React from "react";
import { TiDelete } from "react-icons/ti";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, removeFromFavorites } = useAllDataContext();

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 uppercase italic text-white">Favorite TV shows and Movies</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-24">
          <img
            src="https://i.gifer.com/8V9H.gif"
            // src="https://media.tenor.com/Sn439TTjoTAAAAAj/movie-time.gif"
            // src="https://media0.giphy.com/media/7yE5Tqcb2IKeJj5x9A/giphy.gif?cid=6c09b9520s32h56jjkgb91v2xhqrlp4vvzn6zq2x5hgm2uxi&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            alt=""
            className="m-auto"
          />
          <Link to="/" className="text-white hover:text-yellow-400 hover:underline">
            <p className="mt-4">
              Let's discover your Favorite TV shows and Movies
            </p>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 mb-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="max-w-[200px] overflow-hidden shadow-lg bg-white relative flex flex-col transition-transform duration-200 hover:scale-105"
              >
                <div className=" text-sm p-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => removeFromFavorites(item.id)}>
                    <TiDelete className="text-2xl text-red-500 hover:text-red-600" />
                  </button>
                </div>
                <Link to={item.type === "movie" ? `/film/${item.id}` : `/show/${item.id}`}>
                  <div className=" max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                    <img
                      className="h-full w-full"
                      src={item.image?.medium || item.medium_cover_image || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                      alt={item.name || item.title}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Favorites;
