import React, { useEffect, useState } from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "../../index.css";
import Icon from "./Icon";

function CarusellMovies() {
  const { moviedata,addToFavorites } = useAllDataContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (moviedata && moviedata.length > 0) {
      setIsLoading(false);
    }
  }, [moviedata]);

  // 7+ reytinqli filmləri filtr edir
  const filmList = moviedata?.filter((movie) => movie.rating > 7) || [];

  // 2020-2024 aralığındakı filmləri filtr edir
  const filterFilms = moviedata?.filter((movie) => {
    if (!movie.year) return false; // movie.year yoxlanır
    // artıq movie.year bir ədəd olduğu üçün split istifadə etməyə ehtiyac yoxdur
    return [2020, 2021, 2022, 2023, 2024].includes(movie.year);
  }) || [];

  if (isLoading) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div className="bg-[#800000]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <div>
        <h2 className="text-center text-2xl font-bold mb-6 flex justify-between">
          7+ Reytinqli Movies
          <Link to="/topMovies" className="text-blue-500 text-sm hover:underline">View All</Link>
        </h2>
        {filmList.length > 0 ? (
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
            {filmList.map((movie, index) => (
              <SwiperSlide key={index} className="flex justify-center w-[180px]">
                <div className="rounded-lg shadow-lg">
                <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => addToFavorites(show)}>
                   <Icon/>
                  </button>
                </div>
                <Link to={`/film/${Number(movie.id)}`}>
                  <img
                    src={movie.large_cover_image || "https://via.placeholder.com/180x240"}
                    alt={movie.title}
                    className="w-full h-[240px] object-cover"
                  />
                </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">Uyğun film tapılmadı.</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold mb-6 flex justify-between">
          Latest Movies from 2020 Onwards
          <Link to="/latestMovies" className="text-blue-500 text-sm hover:underline">View All</Link>
        </h2>
        {filterFilms.length > 0 ? (
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
            {filterFilms.map((movie, index) => (
              <SwiperSlide key={index} className="flex justify-center w-[300px]">
                <div className="rounded-lg shadow-lg relative">
                <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => addToFavorites(show)}>
                   <Icon/>
                  </button>
                </div>
                    <Link to={`/film/${Number(movie.id)}`}>
                  <img
                    src={movie.large_cover_image || "https://via.placeholder.com/180x240"}
                    alt={movie.title}
                    className="w-full h-[240px] object-cover"
                  />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">Uyğun film tapılmadı.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default CarusellMovies;
