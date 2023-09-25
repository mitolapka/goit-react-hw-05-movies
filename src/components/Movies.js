import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const navigate = useNavigate();
  const apiKey = '37e7d95cf2428fca838e6974f910059b'; 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    navigate(`/movies?query=${searchQuery}`);
    await fetchMovies(searchQuery);
  };

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
        localStorage.setItem('movies', JSON.stringify(data.results));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
const clearLocalStorageOnLoad = () => {
  localStorage.clear(); 
};

window.addEventListener('load', clearLocalStorageOnLoad);
  return (
    <div>
      <h2>Movies</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
