import axios from "axios";

async function getAllData() {
  const res = await axios.get("https://api.tvmaze.com/shows");
  return res.data;
}
async function getMovieData() {
    const res = await axios.get("https://moviedata-xi.vercel.app/movie");
    return res.data; // ✅ Boş array qaytar ki, səhv olmasın
  }


  async function getInfoById(id) {
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    return res.data;
  }
  
  async function getEpisodeById(episodeId) {
    const res = await axios.get(`https://api.tvmaze.com/episodes/${episodeId}`);
    return res.data;
  }
  async function getMovieById(id) {
   
      const res = await axios.get(`https://moviedata-xi.vercel.app/movie/${id}`);
      return res.data;
   
  }
  
  
  export {
    getAllData, 
    getMovieData,
    getEpisodeById,
    getInfoById,
    getMovieById
  };