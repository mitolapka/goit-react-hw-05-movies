import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const apiKey = '37e7d95cf2428fca838e6974f910059b';
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;

    fetch(trendingUrl)
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies(data.results);
      })
      .catch((error) => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div>
      <h2>Trending Today</h2>
      <ul>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
