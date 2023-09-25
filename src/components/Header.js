
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'

const Header = () => {
  return (
    <header>
      <nav className='navigate'>
        <ul className='header'>
          <li className='header-home'><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
          <li className='header-movies'><Link to="/movies" style={{ textDecoration: 'none' }}>Movies</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
