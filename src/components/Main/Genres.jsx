import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext";
import Loading from "./Loading";

const genreImages = {
  Comedy: "https://images.pexels.com/photos/7489030/pexels-photo-7489030.jpeg?auto=compress&cs=tinysrgb&w=600",
  Drama: "https://images.pexels.com/photos/30497423/pexels-photo-30497423/free-photo-of-black-and-white-artistic-portrait-in-tehran.jpeg?auto=compress&cs=tinysrgb&w=600",
  Horror: "https://images.pexels.com/photos/29116290/pexels-photo-29116290/free-photo-of-hooded-figure-in-a-ghostly-mask-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
  Thriller: "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  Action: "https://media.istockphoto.com/id/1415767358/photo/action-movie-scene-with-two-fbi-agents-at-the-crime-scene-in-a-fogged-room-of-criminals.jpg?s=2048x2048&w=is&k=20&c=OKB6dhQ7tiWfg1FWRVXJBaVv8CmDGP41A9BRoAPEc8g=",
  Crime: "https://images.pexels.com/photos/7266008/pexels-photo-7266008.jpeg?auto=compress&cs=tinysrgb&w=600",
  Romance: "https://images.pexels.com/photos/30521415/pexels-photo-30521415/free-photo-of-serbian-orthodox-wedding-ceremony-handshake.jpeg?auto=compress&cs=tinysrgb&w=600",
  Adventure: "https://images.pexels.com/photos/7368310/pexels-photo-7368310.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  Espionage: "https://images.pexels.com/photos/7319480/pexels-photo-7319480.jpeg?auto=compress&cs=tinysrgb&w=600",
  Music: "https://images.pexels.com/photos/27508913/pexels-photo-27508913/free-photo-of-a-person-playing-an-acoustic-guitar.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  Mystery: "https://images.pexels.com/photos/19057447/pexels-photo-19057447/free-photo-of-red-cinematic-lighting-hands-touch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Supernatural: "https://images.pexels.com/photos/6944923/pexels-photo-6944923.jpeg?auto=compress&cs=tinysrgb&w=600",
  Fantasy: "https://media.istockphoto.com/id/1277822133/photo/futuristic-scifi-battle-ships-hover-over-an-alien-planet.jpg?s=2048x2048&w=is&k=20&c=5ZlPyISB5Zzik9Q0a14uJLtKirWkjhQLl9OxdO91Hjw=",
  Family: "https://media.istockphoto.com/id/1290261736/photo/family-mother-father-and-children-watching-projector-film-movi.jpg?s=2048x2048&w=is&k=20&c=yd-InI1MmGDmOiIqnXAIyMBkwdtwDq0Hn7skqYywruY=",
  Anime: "https://images.pexels.com/photos/9334944/pexels-photo-9334944.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  History: "https://images.pexels.com/photos/3617568/pexels-photo-3617568.jpeg?auto=compress&cs=tinysrgb&w=600",
  Medical: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600",
  Legal: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600",
  Western: "https://images.pexels.com/photos/20180791/pexels-photo-20180791/free-photo-of-cowgirl-with-horses-and-colt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  War: "https://images.pexels.com/photos/163490/war-desert-guns-gunshow-163490.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  Sports: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg"
};

const Genres = () => {
  const { data } = useAllDataContext(); 
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  
  const extractGenres = (shows) => {
    const genres = new Set();
    shows.forEach((show) => {
      show.genres.forEach((genre) => {
        genres.add(genre);
      });
    });
    return [...genres]; 
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const genres = extractGenres(data);
      setGenres(genres);
      setLoading(false);
    }
  }, [data]); 

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Genres</h1>
      {genres.length > 0 ? (
        <div className="flex flex-wrap justify-center md:gap-2 lg:gap-3 xl:gap-5 2xl:gap-12 mx-auto mb-4">
          {genres.map((genre, index) => (
            <div key={index} className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-32 max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
              <img
                src={genreImages[genre] || "https://images.pexels.com/photos/9482199/pexels-photo-9482199.jpeg?auto=compress&cs=tinysrgb&w=600"}
                alt={genre}
                className="w-full h-full"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-yellow-300 font-bold text-xl p-2">
                <Link to={`/genre/${genre}`} className="text-center bg-black/50 md:w-40">{genre}</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Not Found!</p>
      )}
    </div>
    </div>
  );
};

export default Genres;
