import React, { useState, useEffect } from "react";
import axios from './axios';
import requests from './requests';

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect( () => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const { results } = request.data;
      setMovie(results[Math.floor(Math.random() * results.length - 1)]);
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header 
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
      >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">+ My List</button>
        </div>

        <h1 className="banner__description">{truncate(movie?.overview, 175)}</h1>

      </div>

      <div className="banner__fade_bottom" />
    </header>
  );
}

export default Banner;
