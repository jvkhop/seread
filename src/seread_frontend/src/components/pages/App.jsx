import React from "react";
// import { AuthContext } from "../common/AuthContext";
import Navbar from "../common/Navbar";
import '../../../assets/styles/app.css';
import oak_planks from '../../../assets/images/Oak_Planks.png';
import Greeting from "../common/Greeting";
import SecretList from "./SecretList";

var backgroundPic = {
  backgroundImage: `url(${oak_planks})`,
};

function App() {

  // const { isAuthenticated, handleLogin } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="test">
          <Greeting />
          <SecretList />
        </div>
      </div>
    </>)
};

export default App;
