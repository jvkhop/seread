import React from "react";
// import { AuthContext } from "../common/AuthContext";
import Navbar from "../common/Navbar";
import '../../../assets/styles/app.css';
import oak_planks from '../../../assets/images/Oak_Planks.png';

var backgroundPic = {
  backgroundImage: `url(${oak_planks})`,
};

function App() {

  // const { isAuthenticated, handleLogin } = useContext(AuthContext);

  return (
    <div className="about-container" style={ backgroundPic }>
      <Navbar />
      <div className="heading">
        <h1>Seread</h1>
        <h2 className="sub-heading">("But wt* is this?")</h2>
      </div>
      <div className="content">
        <p>
          A place where people reveal their darkest secrets to earn IFL token (and your brain).
          Everything is anonymous and cost you just a click.
        </p>
      </div>
      <p className="CTA">Could we have your permission to have you in the Secret world, sir?</p>
      {/* {!isAuthenticated && (
          <button onClick={handleLogin} className="login-button">
            Log in with Internet Identity
          </button>
        )} */}
      <p className="NoteForIi">Everything is anonymous when you use Internet Identity</p>
    </div>)
};

export default App;
