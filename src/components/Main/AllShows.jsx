import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAllDataContext } from "../../context/AllDataContext"; 
import { Pagination } from 'antd';
import Icon from "./Icon";
import Loading from "./Loading";

function AllShows() {
   const { data, addToFavorites } = useAllDataContext();
  const [showProductList, setShowProductList] = useState([]);
 
 const [page, setPage] = useState(1);
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = showProductList.slice(startIndex, endIndex);
  useEffect(() => {
    if (data) {
      setShowProductList(data);
    }
  }, [data]);
    if (!data || data.length === 0) {
        return <div className="container lg:max-w-[1280px] mx-auto p-3">
        <Loading/>
      </div>;
      }
  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div className="flex flex-wrap gap-10 justify-center m-1">
              {paginatedInfo.map((item) => {
                return (
                  <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
                    <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
                      <button onClick={() => addToFavorites(item)}>
                       <Icon/>
                      </button>
                    </div>
                    <div className="rounded-lg shadow-lg">
                        <Link to={ `/show/${item.id}`}>
                        <div className=" max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                          <img src={item.image?.medium || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                          alt={item.name} className="w-full h-auto " />
                        </div>
                      </Link>
                    </div>
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

export default AllShows