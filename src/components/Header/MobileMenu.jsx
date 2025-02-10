import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";

function MobileMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="lg:hidden relative ">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-white text-2xl z-50 relative"
      >
        
        {showMenu ? "" : <IoMenu />}
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40 transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="w-3/4 h-full bg-gray-900 p-6">
          <button
            onClick={() => setShowMenu(false)}
            className="text-white text-2xl absolute top-4 right-4"
          >
            <IoClose />
          </button>
          <ul className="flex flex-col gap-6 text-white text-lg mt-10">
            <li>
              <Link to="/" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/show" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                All Shows
              </Link>
            </li>
            <li>
              <Link to="/film" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                All Films
              </Link>
            </li>
            <li>
              <Link to="/genres" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Genres
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
