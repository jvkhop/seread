import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import '../../../assets/styles/navbar.css';
import compass from "../../../assets/images/Compass.gif";

var compassBack = {
  backgroundImage: `url(${compass})`,
  backgroundRepeat: "no-repeat"
};

const Navbar = () => {
  // const { isAuthenticated, principal, handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <nav className="dropdown">
      <button className="dropbtn" style={compassBack}></button>
      <div className="dropdown-content">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/secrets" className="navbar-link">Secrets</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
        {/* {isAuthenticated && principal ? (
          <>
            <Link to="/reveal" className="navbar-link">Reveal Secrets</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <p onClick={handleLogout} className="navbar-link">Logout</p>
          </>
        ) : (
          <p onClick={handleLogin} className="navbar-link">Login</p>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
