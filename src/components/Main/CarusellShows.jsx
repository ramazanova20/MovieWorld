import React from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";  // React Router Link import edilir

import "swiper/css";
import "swiper/css/navigation";
import "../../index.css";
import { getAllData } from "../../services/api";
import Icon from "./Icon";

const CarusellShows = () => {
  const { data, addToFavorites } = useAllDataContext();

  const showList = data?.filter((showss) => showss.rating.average > 7) || [];
  const filterShows = data?.filter(show => show.ended && [2020, 2021, 2022, 2023, 2024].includes(parseInt(show.ended.split('-')[0]))) || [];


  // Genres Section
  const [genres, setGenres] = React.useState([]);
  const [loadingGenres, setLoadingGenres] = React.useState(true);
  const [errorGenres, setErrorGenres] = React.useState(null);

  const genreImages = {
    Comedy: "https://images.pexels.com/photos/7489030/pexels-photo-7489030.jpeg?auto=compress&cs=tinysrgb&w=600",
    Drama: "https://images.pexels.com/photos/30497423/pexels-photo-30497423/free-photo-of-black-and-white-artistic-portrait-in-tehran.jpeg?auto=compress&cs=tinysrgb&w=600",
    Horror: "https://images.pexels.com/photos/29116290/pexels-photo-29116290/free-photo-of-hooded-figure-in-a-ghostly-mask-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
    Thriller: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600",
    Action: "https://media.istockphoto.com/id/1415767358/photo/action-movie-scene-with-two-fbi-agents-at-the-crime-scene-in-a-fogged-room-of-criminals.jpg?s=2048x2048&w=is&k=20&c=OKB6dhQ7tiWfg1FWRVXJBaVv8CmDGP41A9BRoAPEc8g=",
    Crime: "https://images.pexels.com/photos/7266008/pexels-photo-7266008.jpeg?auto=compress&cs=tinysrgb&w=600",
    Romance: "https://images.pexels.com/photos/30521415/pexels-photo-30521415/free-photo-of-serbian-orthodox-wedding-ceremony-handshake.jpeg?auto=compress&cs=tinysrgb&w=600",
    Adventure: "https://images.pexels.com/photos/7368310/pexels-photo-7368310.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    Espionage: "https://images.pexels.com/photos/7319480/pexels-photo-7319480.jpeg?auto=compress&cs=tinysrgb&w=600",
    Music: "https://images.pexels.com/photos/27508913/pexels-photo-27508913/free-photo-of-a-person-playing-an-acoustic-guitar.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    Mystery: "https://images.pexels.com/photos/19057447/pexels-photo-19057447/free-photo-of-red-cinematic-lighting-hands-touch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    Supernatural: "https://images.pexels.com/photos/6944923/pexels-photo-6944923.jpeg?auto=compress&cs=tinysrgb&w=600",
    Fantasy: "https://media.istockphoto.com/id/1186653215/photo/mars-colony-expedition-on-alien-planet-life-on-mars-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=cD_8a1iV6uVz4AzDj5RUv9-Ic7u0FaKczozf08SrzNo=",
    Family: "https://images.pexels.com/photos/6274862/pexels-photo-6274862.jpeg?auto=compress&cs=tinysrgb&w=600",
    Anime: "https://images.pexels.com/photos/9334944/pexels-photo-9334944.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    History: "https://images.pexels.com/photos/36006/renaissance-schallaburg-figures-facade.jpg?auto=compress&cs=tinysrgb&w=600",
    Medical: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600",
    Legal: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600",
    Western: "https://images.pexels.com/photos/20180791/pexels-photo-20180791/free-photo-of-cowgirl-with-horses-and-colt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    War: "https://images.pexels.com/photos/163490/war-desert-guns-gunshow-163490.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    Sports: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg"
  };
  
  React.useEffect(() => {
    const fetchGenres = async () => {
      try {
        const shows = await getAllData();
        const genres = new Set();
        shows.forEach((show) => {
          show.genres.forEach((genre) => {
            genres.add(genre);
          });
        });
        setGenres([...genres]);
      } catch (err) {
        setErrorGenres(`Error: ${err.message}`);
      } finally {
        setLoadingGenres(false);
      }
    };
    
    fetchGenres();
  }, []);

  // Loading or error messages for genres
  if (loadingGenres) {
    return <div>Loading...</div>;
  }

  if (errorGenres) {
    return <div>{errorGenres}</div>;
  }

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1>fhdsfdsjfkzfmi jofi cvofqof</h1>
      {/* 7+ Reytinqli Filmlər */}
      <div>
        <h2 className="text-center text-2xl font-bold mb-6 flex justify-between">
          7+ Reytinqli Shows
          <Link to="/topShows" className="text-blue-500 text-sm hover:underline">View All</Link>
        </h2>
        {showList.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {showList.map((show, index) => (
              <SwiperSlide key={index} className="flex justify-center w-[180px] relative">
                <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => addToFavorites(show)}>
                   <Icon/>
                  </button>
                </div>
                <div className="rounded-lg shadow-lg">
                    <Link to={ `/show/${show.id}`}>

                      <div className="relative max-w-xs rounded-4xl overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                        <img src={show.image?.medium || "https://via.placeholder.com/180x240"}
                          alt={show.name} className="w-full h-auto transition-opacity duration-300 hover:opacity-80" />

                      </div>

                  {/* <img
                    src={show.image?.medium || "https://via.placeholder.com/180x240"}
                    alt={show.name}
                    className="w-full h-[240px] object-cover"
                  /> */}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">Uyğun film tapılmadı.</p>
        )}
      </div>

      {/* Filmlər */}
      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold mb-6 flex justify-between">
        Latest Shows from 2020 Onwards
          <Link to="/latestShows" className="text-blue-500 text-sm hover:underline">View All</Link>
        </h2>
        {filterShows.length > 0 ? (
          <Swiper
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {filterShows.map((latest, index) => (
              <SwiperSlide key={index} className="flex justify-center w-[300px] relative">
                <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => addToFavorites(show)}>
                   <Icon/>
                  </button>
                </div>
                <div className="rounded-lg shadow-lg">
                    <Link to={ `/show/${latest.id}`}>
                    <div className="relative max-w-xs rounded-4xl overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                      <img src={latest.image?.medium || "https://via.placeholder.com/180x240"}
                        alt={latest.name} className="w-full h-auto transition-opacity duration-300 hover:opacity-80" />
                    </div>
                    
                  {/* <img
                    src={latest.image?.medium || "https://via.placeholder.com/180x240"}
                    alt={latest.name}
                    className="w-full h-[240px] object-cover"
                  /> */}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">Uyğun film tapılmadı.</p>
        )}
      </div>

      {/* Genres Carousel */}
      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold mb-6 flex justify-between">
          Genres
          <Link to="/genres" className="text-blue-500 text-sm hover:underline">
            View All
          </Link>
        </h2>
        {genres.length > 0 ? (
          <Swiper
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {genres.map((genre, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center w-[280px]">
                <div key={index} className="relative">
                    <Link to={ `/genre/${genre}`}>
                    <div className="relative max-w-xs rounded-4xl overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                      <img src={genreImages[genre] || "https://images.pexels.com/photos/5435459/pexels-photo-5435459.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={genre} className="w-full h-auto transition-opacity duration-300 hover:opacity-80" />
                    </div>
                      {/* <img
                        src={genreImages[genre] || "https://images.pexels.com/photos/5435459/pexels-photo-5435459.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={genre}
                        className="w-full h-[240px] object-cover"
                      /> */}
                    </Link>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-yellow-300 font-bold text-xl p-2">
                    <Link to={`/genre/${genre}`} className="text-center bg-black/50 md:w-44">{genre}</Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No genres found</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default CarusellShows;
