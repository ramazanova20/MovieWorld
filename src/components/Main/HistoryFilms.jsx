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

  // Təsadüfi History janrına aid film seçmək
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

  // Episod şəkillərini gətirmək
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

  if (loading) return <div>Yüklənir...</div>;
  if (error) return <div>{error}</div>;
  if (!randomFilm) return <p className="text-center text-gray-700">Bu janrda heç bir film tapılmadı</p>;

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      {/* <h1 className="text-2xl font-bold text-center my-4">History Janrından Təsadüfi Film</h1> */}
      <div className="h-full  flex justify-center">
        <div className="w-full md:w-full h-full  rounded-lg shadow-lg bg-white relative">
          <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 text-white">
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
