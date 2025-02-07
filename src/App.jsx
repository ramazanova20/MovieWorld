import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './components/Main/Main'
import Genres from './components/Main/Genres'
import GenreFilms from './components/Main/GenreFilms'
import RatingFilter from './components/Main/RatingFilter'
import RatingFilms from './components/Main/RatingFilms'
import FilmInfo from './components/Main/FilmInfo'
import ShowInfo from './components/Main/ShowInfo'
import LatestShows from './components/Main/LatestShows'
import LatestMovies from './components/Main/LatestMovie'
import TopShowsList from './components/Main/TopShowsList'
import TopMoviesList from './components/Main/TopMoviesList'
import CarusellMovies from './components/Main/CarusellMovies'
import AllShows from './components/Main/AllShows'
import AllMovies from './components/Main/AllMovies'
import Banner from './components/Main/Banner'
import Favorites from './components/Main/Favorites'
import { useAllDataContext } from './context/AllDataContext'
import Contact from './components/Header/Contact'


function App() {

  const { favorites, setFavorites, removeFromFavorites } = useAllDataContext();
  return (
    <>
     
     <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Main favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/genres" element={<Genres/>} />
      <Route path="/rating" element={<RatingFilter/>} />
      <Route path="/genre/:genreName" element={<GenreFilms favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/rated" element={<RatingFilms favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/film/:id" element={<FilmInfo/>} /> {/* Filmlər üçün marşrut */}
      <Route path="/show/:id" element={<ShowInfo favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/movie" element={<CarusellMovies/>} />
      <Route path="/latestShows" element={<LatestShows favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/latestMovies" element={<LatestMovies/>} />
        <Route path="/topShows" element={<TopShowsList favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/topMovies" element={<TopMoviesList/>} />
        <Route path="/show" element={<AllShows favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/film" element={<AllMovies/>} />
        <Route path="/banner" element={<Banner/>} />
        <Route path="/contact" element={<Contact/>} />
        
        <Route
  path="/favorites"
  element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
/>
      </Route>
     </Routes>
    </>
  )
}

export default App
