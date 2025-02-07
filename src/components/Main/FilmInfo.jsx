import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/api";
import { Pagination } from "antd";
import { useAllDataContext } from "../../context/AllDataContext";
import { Link } from "react-router-dom";
import "../../index.css";

function FilmInfo() {
    const { id } = useParams(); // URL-dən `id` götürürük
    const [movie, setMovie] = useState(null);
    const { moviedata,ad } = useAllDataContext(); // ✅ `useDataContext` istifadə edirik

    // Sayfalandırma üçün state
    const [page, setPage] = useState(1);
    const pageSize = 12; // Hər səhifədə neçə element göstəriləcək

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
        return <div>Loading...</div>;
    }

    // Səhifələnmiş məlumatları hesablayırıq
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = moviedata.slice(startIndex, endIndex) || []; // ✅ `moviedata` istifadə olunur

    return (
        <div className="bg-[#800000]">
        <div className="container lg:max-w-[1280px] mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-full md:w-full relative">
                    <img
                        className="h-full w-full object-contain"
                        src={movie.background_image_original || "https://via.placeholder.com/500"}
                        alt={movie.title}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
                        <h2 className="text-xl font-semibold">{movie.title}</h2>
                        <div className="hidden md:flex md:flex-col">
                        <p className="text-sm">{movie.year}</p>
                        <p className="text-sm">{movie.language}</p>
                        <p className="text-sm">{movie.genres?.join(", ")}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shows bölməsi */}
            <div className="my-4">
                <h1 className="uppercase italic text-2xl font-bold mb-4">Shows</h1>
                <div className="flex flex-wrap gap-4 mx-auto justify-center m-1">
                    {paginatedInfo.map((item, i) => (
                        <div key={i} className="w-[180px] rounded-lg shadow-lg bg-white">
                            <Link to={`/film/${item.id}`}>
                                <div className="w-full h-[240px]">
                                    <img
                                        className="object-cover w-full h-full rounded-t-lg"
                                        src={item.large_cover_image || item.medium_cover_image || "https://via.placeholder.com/180x240"}
                                        alt={item.title}
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Sayfalandırma (Pagination) */}
                <div className="flex justify-center py-6">
                    <Pagination
                        current={page}
                        total={moviedata.length || 0} // ✅ `moviedata`-dan total götürülür
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