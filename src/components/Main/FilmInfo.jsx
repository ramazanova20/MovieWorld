import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/api";
import { Pagination } from "antd";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";
import "../../index.css";
import Loading from "./Loading";

function FilmInfo() {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const { moviedata,ad } = useAllDataContext(); 

    
    const [page, setPage] = useState(1);
    const pageSize = 15; 

    useEffect(() => {
        const fetchMovie = async () => {
            const moviedata = await getMovieById(id);
            if (moviedata) {
                setMovie(moviedata);
            }
        };
        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div><Loading/></div>;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = moviedata.slice(startIndex, endIndex) || []; 

    return (
        <div className="bg-[#1A1A2E]">
        <div className="container lg:max-w-[1280px] mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="w-full md:w-full relative">
                    <img
                        className="h-full w-full object-contain"
                        src={movie.background_image_original || "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={movie.title}
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center md:items-center text-white p-4">
                        <h2 className="text-4xl md:text-6xl font-semibold">{movie.title}</h2>
                        <p className="text-xl">{movie.year}</p>
                        <div className="hidden md:flex md:flex-col text-center">
                            <p className="text-xl">{movie.rating}★</p>
                            <p className="text-xl">{movie.language}</p>
                            <p className="text-xl">{movie.genres?.join(", ")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h1 className="uppercase italic text-2xl font-bold mb-4 text-white">Movies</h1>
                <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
                    {paginatedInfo.map((item, i) => (
                        <div key={i} className="w-[180px] shadow-lg bg-white">
                            <Link to={`/film/${item.id}`}>
                                <div className="max-w-xs rounded-4xl hover:overflow-hidden shadow-lg hover:border-2 md:hover:border-4 hover:border-white">
                                    <img
                                        className="w-full h-full"
                                        src={item.large_cover_image || item.medium_cover_image || "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=600"}
                                        alt={item.title}
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                
                <div className="flex justify-center py-6">
                    <Pagination
                        current={page}
                        total={moviedata.length || 0}
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

export default FilmInfo;