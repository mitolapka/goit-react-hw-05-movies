// App.js
import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Movies from './Movies';
import MovieDetails from './MovieDetails';

export const App = () => {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </div>
  );
};

