import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getInfoById, getEpisodeById} from "../../services/api"; 
import { Pagination } from 'antd';
import { useAllDataContext } from "../../context/AllDataContext";
import "../../index.css";
import Icon from "./Icon";
import Loading from "./Loading";

function ShowInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { data,addToFavorites } = useAllDataContext();
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [episodeImages, setEpisodeImages] = useState({}); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getInfoById(id); 
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchEpisodeImages = async () => {
      const newEpisodeImages = {};
      for (const item of  (data || [])) {
        if (item._links?.previousepisode?.href) {
          try {
            const episodeData = await getEpisodeById(item._links.previousepisode.href.split("/").pop());
            newEpisodeImages[item.id] = episodeData.image?.original || "";
          } catch (error) {
            console.error(`Error fetching episode image for ${item.id}:`, error);
          }
        }
      }
      setEpisodeImages(newEpisodeImages);
    };

    if (data && data.length > 0) {
      fetchEpisodeImages();
    }
  }, [data]);

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInfo = (data || []).slice(startIndex, endIndex);

  if (!product) {
    return (
      <div>
       <Loading/>
      </div>
    );  
  }

  return (
    <div className="bg-[#1A1A2E]">
    <div className="container lg:max-w-[1280px] mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-full relative">
          <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
            <button onClick={() => addToFavorites(product)}>
             <Icon/>
            </button>
          </div>
          <img
            className="h-full w-full object-contain"
            src={episodeImages[product.id] || "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt={product.name}
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex space-x-2 text-sm">
              <p>{product.premiered}</p>
              <p>-</p>
              <p>{product.ended}</p>
            </div>
            <div className="hidden md:flex md:flex-col">
            <p className="text-sm">{product.language}</p>
            <p className="text-sm">{product.type}</p>
            <p className="text-sm">{product.genres?.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h1 className="uppercase italic text-2xl font-bold mb-4 text-white">Shows</h1>
        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
          {paginatedInfo.map((item, i) => (
            <div key={i} className="w-[180px] shadow-lg bg-white relative">
              <div className="rounded-4xl bg-white pt-1.5 px-1.5 absolute top-2.5 right-2.5 shadow-[0px_0px_6px_2px_#c8e232]">
                <button onClick={() => addToFavorites(item)}>
                 <Icon/>
                </button>
              </div>
              <Link to={`/show/${item.id}`}  onClick={scrollToTop}>
                <div className="max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                  <img
                    className="w-full h-full"
                    src={item.image?.medium || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={item.name}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-6">
          <Pagination
            current={page}
            total={data.length} 
            pageSize={pageSize} 
            onChange={(newPage) => setPage(newPage)} 
            className="custom-pagination"
            showSizeChanger={false} 
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShowInfo;