import React from 'react';
import { Link } from 'react-router-dom';
import RightMenu from './RightMenu/RightMenu';

function NavBar() {
  const mystyle = {
    float: 'right',
  };

  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
      <Link to='/' className='navbar-brand'>
        My-Movie
      </Link>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/latest' className='nav-link'>
              Latest
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/favorites' className='nav-link'>
              My Favorites
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav'>
          <RightMenu style={mystyle} />
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
