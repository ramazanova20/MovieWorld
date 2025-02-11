import React from 'react'
import { Link } from "react-router-dom";

function HeaderTop() {
  return (
    <div className='container lg:max-w-[1280px] mx-auto p-3'>
        <ul className='flex flex-row justify-end text-white'>
            <li className='mr-2'>
              <Link to={`/aboutus`} >
                About Us
              </Link>
            </li>
            <li>
              <Link to={`/contact`} >
                Contact
              </Link>
            </li>
        </ul>
    </div>
  )
}

export default HeaderTop