import React from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const TopShowsList = () => {
  const { data, addToFavorites } = useAllDataContext();
  const showList = data?.filter((show) => show.rating.average > 7) || [];

  return (
    <div className="bg-[#800000]">
    <div className="max-w-[1280px] mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mb-6">7+ Reytinqli Showlar</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {showList.map((show, index) => (
          
          <div key={index} className="rounded-lg shadow-lg w-[180px] relative">
            <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => addToFavorites(show)}>
               <Icon/>
              </button>
            </div>
            <Link to={ `/show/${show.id}`}>
            <img
              src={show.image?.medium || "https://via.placeholder.com/180x240"}
              alt={show.name}
              className="w-full h-[240px] object-cover"
            />
             </Link>
          </div>
          
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopShowsList;
