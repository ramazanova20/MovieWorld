import React, { createContext, useState, useEffect, useContext} from "react";
import { getAllData,getMovieData } from "../services/api";

export const DataContext = createContext();

export const useAllDataContext = () => {  
  return useContext(DataContext);
};

function DataContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [moviedata, setMovieData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const addToFavorites = (item) => {
    setFavorites((listFavorites) => {
      if (!listFavorites.some((fav) => fav.id === item.id)) {
        return [...listFavorites, item];
      }
      return listFavorites;
    });
  };


  const removeFromFavorites = (id) => {
    setFavorites((listFavorites) =>
      listFavorites.filter((item) => item.id !== id)
    );
  };


  useEffect(() => {
    getAllData().then(res => setData(res));
  }, []);

  useEffect(() => {
    getMovieData().then((res) => {
      console.log("Fetched Movies:", res); // Console-da baxmaq üçün
      setMovieData(res); // Əsasən res.data.movies-lə işləmək lazımdır
    });
  }, []);
  return (
    <DataContext.Provider value={{ 
      data, 
      moviedata,
      favorites,
      addToFavorites,
      removeFromFavorites,
      setFavorites,
       }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
