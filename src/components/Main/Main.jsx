import React from 'react'
import CarusellMovies from './CarusellMovies'
import CarusellShows from './CarusellShows'
import HistoryFilms from './HistoryFilms'

function Main() {
  return (
    <div className='bg-[#1A1A2E]'>

        <HistoryFilms/>
        <CarusellMovies/>
        <CarusellShows/>

    </div>
  )
}

export default Main