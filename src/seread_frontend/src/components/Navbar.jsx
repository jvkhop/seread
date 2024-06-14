// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
  const { isAuthenticated, handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Log out</button>
          ) : (
            <button onClick={handleLogin}>Log in with Internet Identity</button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
