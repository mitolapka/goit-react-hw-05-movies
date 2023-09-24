import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Navigate to the search results page
    navigate(`/movies?query=${searchQuery}`);
  };

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
      {/* Add more components or content for movie search and display */}
    </div>
  );
};

export default Movies;
