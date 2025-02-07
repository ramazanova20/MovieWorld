import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAllDataContext } from '../../context/AllDataContext';
import { IoSearch } from "react-icons/io5";
import { PiFilmSlateLight } from "react-icons/pi";
import MobileMenu from './MobileMenu';

function Menu() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ratingDropdownVisible, setRatingDropdownVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const { data, moviedata, favorites } = useAllDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);

  useEffect(() => {
    const source = [...(data || []), ...(moviedata || [])];  // Both data and moviedata combined
    
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
    } else {
      const filteredData = source.filter(item =>
        (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      setFilteredProducts(filteredData);
    }
  }, [searchQuery, data, moviedata]);

  useEffect(() => {
    if (Array.isArray(data) && Array.isArray(moviedata)) {
      const tvGenres = new Set(data.flatMap(show => show.genres));
      const movieGenres = new Set(moviedata.flatMap(movie => movie.genres));
      setGenres([...new Set([...tvGenres, ...movieGenres])]);
    }
    setLoading(false);
  }, [data, moviedata]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setRatingDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleRating = (value) => {
    setRating(value);
    setRatingDropdownVisible(false);
    navigate(`/rated?rating=${value}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container max-w-[1280px] mx-auto p-3'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        <div className='text-lg font-bold text-white'>MovieWorld</div>
        <div className='flex flex-wrap items-center gap-6'>
          <div className='text-white hover:underline hidden md:flex'>
            <Link to={`/`} >
              Home Page
            </Link>
          </div>
          <div className='text-white hover:underline hidden md:flex'>
            <Link to={`/show`}>
              All Shows
            </Link>
          </div>
          <div className='text-white hover:underline hidden md:flex'>
            <Link to={`/film`}>
              All Films
            </Link>
          </div>
          <MobileMenu />
          <div className='relative' ref={dropdownRef}>
            <button onClick={() => setDropdownVisible(!dropdownVisible)} className="text-white hover:underline">
              Genres
            </button>
            {dropdownVisible && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg p-4 rounded-md min-w-[150px] max-w-full z-10">
                <ul className='flex flex-col gap-2'>
                  {genres.length > 0 ? genres.map((genre, index) => (
                    <li key={index}>
                      <Link to={`/genre/${genre}`} className="text-blue-500 hover:underline">
                        {genre}
                      </Link>
                    </li>
                  )) : <li>No genres found</li>}
                </ul>
              </div>
            )}
          </div>
          <div className="relative" ref={ratingDropdownRef}>
            <button onClick={() => setRatingDropdownVisible(!ratingDropdownVisible)} className="text-white hover:underline">
              Rating
            </button>
            {ratingDropdownVisible && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg p-4 rounded-md min-w-[150px] z-10">
                <h3>Reytinq seçin:</h3>
                <div>
                  {[...Array(10)].map((_, index) => (
                    <button key={index} onClick={() => handleRating(index + 1)}
                      className={`text-lg mx-1 ${rating >= index + 1 ? 'text-yellow-500' : 'text-gray-400'}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Link to="/favorites">
              <PiFilmSlateLight className="text-2xl transition-transform duration-300 hover:scale-150 text-yellow-500" />
            </Link>
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex relative">
                <input
                  type="text"
                  className="border p-2 rounded-l-md w-full sm:w-[200px]"
                  placeholder="Axtar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="border p-2 rounded-r-md bg-gray-200">
                  <IoSearch />
                </button>
              </div>
            </form>
            {searchQuery && (
              <div className="absolute left-0 right-0 bg-white shadow-lg mt-2 max-h-[300px] overflow-y-scroll z-10">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 10).map((product, index) => (
                    <Link key={index} to={product.type === "movie" ? `/film/${product.id}` : `/show/${product.id}`} className="flex gap-3 p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchQuery("")}> 
                      <img className="w-10 h-10 object-contain" src={product.image?.medium || product.medium_cover_image} alt={product.name || product.title} />
                      <h3>{product.name || product.title}</h3>
                    </Link>
                  ))
                ) : (
                  <p className="p-4">No products found.</p>
                )}
              </div>
            )}
          </div>
          
        </div>
       
      </div>
    </div>
  );
}

export default Menu;
