import React from "react";
import { TiDelete } from "react-icons/ti";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, removeFromFavorites } = useAllDataContext();

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 uppercase italic">Favorite TV shows and Movies</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <img
            src="https://media.tenor.com/Sn439TTjoTAAAAAj/movie-time.gif"
            // src="https://media0.giphy.com/media/7yE5Tqcb2IKeJj5x9A/giphy.gif?cid=6c09b9520s32h56jjkgb91v2xhqrlp4vvzn6zq2x5hgm2uxi&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            alt=""
            className="m-auto"
          />
          {/* <h2 className="text-2xl font-bold mb-4">EMPTY! Unfortunately</h2> */}
          <Link to="/" className="text-blue-500 hover:underline">
            Let's discover your Favorite TV shows and Movies
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col transition-transform duration-200 hover:scale-105"
              >
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => removeFromFavorites(item.id)}>
                    <TiDelete className="text-2xl text-red-600" />
                  </button>
                </div>
                <Link to={item.type === "movie" ? `/film/${item.id}` : `/show/${item.id}`}>
                  <div className="w-full h-full">
                    <img
                      className="h-full object-contain"
                      src={item.image?.medium || item.medium_cover_image || "https://via.placeholder.com/180x240"}
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
