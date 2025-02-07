import React, { useState, useEffect } from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";

const Banner = () => {
  const { data } = useAllDataContext();

  if (!data || !Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  const filterShows = data.filter(show => {
    if (!show.ended) return false;
    const year = parseInt(show.ended.split('-')[0]);
    return [2020, 2021, 2022, 2023, 2024].includes(year);
  });

  // Təsadüfi seçilən məhsul üçün state
  const [featuredShow, setFeaturedShow] = useState(null);

  // useEffect ilə hər render zamanı yeni bir təsadüfi məhsul seçirik
  useEffect(() => {
    if (filterShows.length > 0) {
      const randomIndex = Math.floor(Math.random() * filterShows.length);
      setFeaturedShow(filterShows[randomIndex]);
    }
  }, [filterShows]); // filterShows dəyişdikcə təsadüfi məhsulu yenilə

  return (
    <div className="max-w-[1280px] mx-auto p-3">
      {/* Banneri göstəririk */}
      {featuredShow && (
        <div className="banner mb-6">
          <img
            src={featuredShow.image?.medium || "https://via.placeholder.com/1280x400"}
            alt={featuredShow.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <h3 className="text-2xl font-bold text-center mt-4">{featuredShow.name}</h3>
          <p className="text-center">{featuredShow.summary}</p>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6">Latest Movies from 2020 Onwards</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filterShows.map((show, index) => (
          <div key={index} className="rounded-lg shadow-lg">
            <Link to={`/show/${show.id}`}>
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
  );
};

export default Banner;
