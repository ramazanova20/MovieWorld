import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext"; 
import { Pagination } from 'antd';
import Icon from "./Icon";

function AllMovies() {
   const { moviedata, addToFavorites } = useAllDataContext();
  const [showProductList, setShowProductList] = useState([]);
 
 const [page, setPage] = useState(1);
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = showProductList.slice(startIndex, endIndex);
  useEffect(() => {
    if (moviedata) {
      setShowProductList(moviedata);
    }
  }, [moviedata]);
    if (!moviedata || moviedata.length === 0) {
        return <div className="container lg:max-w-[1280px] mx-auto p-3 ">
        <p>loading</p>
      </div>;
      }
  return (
    <div className="bg-[#800000]">
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div className="flex flex-wrap gap-10 justify-center ">
              {paginatedInfo.map((item) => {
                return (
                  <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
                    <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5">
                      <button onClick={() => addToFavorites(show)}>
                       <Icon/>
                      </button>
                    </div>
                    
                    <Link to={`/film/${item.id}`}>
                      <div className="w-full h-[280px]">
                        <img
                          className="object-cover w-full h-full"
                          src={item.large_cover_image}
                          alt={item.title}
                        />
                      </div>
                    </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center py-6">
          <Pagination
            current={page}
            total={showProductList.length} 
            pageSize={pageSize} 
            onChange={(newPage) => setPage(newPage)} 
            className="custom-pagination"
            showSizeChanger={false} 
          />
        </div>
    </div>
    </div>
  )
}

export default AllMovies