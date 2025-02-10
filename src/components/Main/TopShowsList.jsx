import React from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const TopShowsList = () => {
  const { data, addToFavorites } = useAllDataContext();
  const showList = data?.filter((show) => show.rating.average > 7) || [];

  return (
    <div className="bg-[#1A1A2E]">
    <div className="max-w-[1280px] mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">7+ Rated Shows</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {showList.map((show, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
            <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
              <button onClick={() => addToFavorites(show)}>
               <Icon/>
              </button>
            </div>
            <Link to={ `/show/${show.id}`}>
            <div className="max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
            <img
              src={show.image?.medium || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
              alt={show.name}
              className="w-full h-full object-cover"
            />
            </div>
             </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopShowsList;
