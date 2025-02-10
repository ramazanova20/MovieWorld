import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext";
import { getEpisodeById } from "../../services/api"; 
import Icon from "./Icon";

const HistoryFilms = () => {
  const { data, addToFavorites } = useAllDataContext();
  const [randomFilm, setRandomFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodeImages, setEpisodeImages] = useState({}); 

  useEffect(() => {
    const fetchRandomFilm = () => {
      try {
        const tvFilms = data ? data.filter((show) => show.genres.includes("History")) : [];
        if (tvFilms.length > 0) {
          const randomIndex = Math.floor(Math.random() * tvFilms.length);
          setRandomFilm(tvFilms[randomIndex]);
        } else {
          setRandomFilm(null);
        }
      } catch (err) {
        setError(`Xəta: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomFilm();
  }, [data]);

  useEffect(() => {
    const fetchEpisodeImages = async () => {
      if (!randomFilm || !randomFilm._links?.previousepisode?.href) return;
      try {
        const episodeId = randomFilm._links.previousepisode.href.split("/").pop();
        const episodeData = await getEpisodeById(episodeId);
        setEpisodeImages((prev) => ({
          ...prev,
          [randomFilm.id]: episodeData.image?.original || ""
        }));
      } catch (error) {
        console.error(`Error fetching episode image for ${randomFilm.id}:`, error);
      }
    };
    fetchEpisodeImages();
  }, [randomFilm]);

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;
  if (!randomFilm) return <p className="text-center text-gray-700">No movies found in this genre</p>;

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <div className="h-full  flex justify-center">
        <div className="w-full md:w-full h-full  rounded-lg shadow-lg bg-white relative">
          <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 text-white shadow-[0px_0px_6px_2px_#c8e232]">
            <button className="text-white" onClick={() => addToFavorites(randomFilm)}>
              <Icon/>
            </button>
          </div>
          <Link to={`/show/${randomFilm.id}`}>
            <div className="w-full relative">
              <img
                className="h-full w-full object-cover rounded-t-lg"
                src={episodeImages[randomFilm.id] || "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=600"}
                alt={randomFilm.name}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white md:p-4">
            <h2 className="text-xl font-semibold">{randomFilm.name}</h2>
            <div className="flex space-x-2 text-sm">
              <p>{randomFilm.premiered}</p>
              <p>-</p>
              <p>{randomFilm.ended}</p>
            </div>
            {/* <p className="text-sm">{randomFilm.language}</p>
            <p className="text-sm">{randomFilm.type}</p> */}
          </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HistoryFilms;
