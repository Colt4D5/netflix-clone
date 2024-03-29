import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    console.log(movie)
    if (trailerURL) {
      console.log(movie);
      setTrailerURL("");
    } else if (!trailerURL) {
      console.log(movie);
      movieTrailer(movie?.title || movie?.name)
        .then(url => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get('v'));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters" >
        {movies &&
          movies.map((movie) => {
            return (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className={`row__poster  ${isLargeRow && "row__poster_large"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          )})}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;