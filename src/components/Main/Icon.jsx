import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PiFilmSlateLight,PiFilmSlateFill } from "react-icons/pi";


function Icon() {
  const [heart, setHeart] = useState(false);
  const heartChange = () => setHeart(!heart);

  return (
    <span onClick={heartChange} className='text-2xl font-bold'>
      {heart ? <PiFilmSlateFill className="text-yellow-500" /> : <PiFilmSlateLight  className="text-yellow-500" />}
    </span>
  );
}

export default Icon;
