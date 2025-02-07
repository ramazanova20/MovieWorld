import React from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const LatestShows = () => {
  const { data, addToFavorites } = useAllDataContext();

  // Check if data exists and is an array
  if (!data || !Array.isArray(data)) {
    return <div>Loading...</div>; // Or handle the loading state as needed
  }

  const filterShows = data.filter(show => {
    if (!show.ended) return false;
    const year = parseInt(show.ended.split('-')[0]);
    return [2020, 2021, 2022, 2023, 2024].includes(year);
  });

  return (
    <div className="bg-[#800000]">
    <div className="max-w-[1280px] mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Movies from 2020 Onwards</h2>
      <div className="flex flex-wrap gap-4 mx-auto justify-center m-1">
        {filterShows.map((show, index) => (
          <div key={index} className="rounded-lg shadow-lg relative">
            <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => addToFavorites(show)}>
               <Icon/>
              </button>
            </div>
            <Link to={`/show/${show.id}`}>
              <img
                src={show.image?.medium || "https://via.placeholder.com/180x240"}
                alt={show.name}
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

export default LatestShows;
