import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import '../../../assets/styles/navbar.css';
import compass from "../../../assets/images/Compass.gif";
import homeIcon from "../../../assets/images/home.svg";
import plusIcon from "../../../assets/images/plus.svg";
import proIcon from "../../../assets/images/profile.svg";

var compassBack = {
  backgroundImage: `url(${compass})`,
  backgroundRepeat: "no-repeat"
};

const Navbar = () => {
  // const { isAuthenticated, principal, handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <div className="nav-container">
      <div className="heading"><h1>Seread</h1></div>
      <div className="nav-bar">
        <div className="each-link"><img src={homeIcon} alt="" /><Link to="/" className="link-text">Home</Link></div>
        <div className="each-link"><img src={plusIcon} alt="" /><Link to="/reveal" className="link-text">Reveal</Link></div>
        <div className="each-link"><img src={proIcon} alt="" /><Link to="/profile" className="link-text">Profile</Link></div>
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
    </div>
  );
};

export default Navbar;
