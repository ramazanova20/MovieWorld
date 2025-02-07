import React from 'react'
import CarusellMovies from './CarusellMovies'
import CarusellShows from './CarusellShows'
import Banner from './Banner'
import HistoryFilms from './HistoryFilms'

function Main() {
  return (
    <div className='
   
    bg-[#800000]

    '>
        {/* <Banner/> */}
        <HistoryFilms/>
        <CarusellMovies/>
        
        <CarusellShows/>

    </div>
  )
}

export default Main