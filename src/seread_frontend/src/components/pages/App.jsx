import React, { useContext } from "react";
import { AuthContext } from "../common/AuthContext";
import Navbar from "../common/Navbar";
import '../../../assets/styles/app.css';

function App() {

  const { isAuthenticated, handleLogin } = useContext(AuthContext);

  return (
    <div id="screen" style={{ textAlign: "center", marginTop: "5%" }}>
      {/* <Navbar /> */}
      <h1 style={{ fontSize: "10rem", fontWeight: "bold", marginBottom: "0px"}}>Seread</h1>
      <h2 style={{ fontSize: "3rem" }}>where people reveal their DARKEST secrets</h2>
      <p style={{ marginTop: "20px", fontSize: "1.5rem" }}>Explore or Reveal Secrets now!!</p>
      {!isAuthenticated && (
        <button onClick={handleLogin} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem" }}>
          Log in with Internet Identity
        </button>
      )}
    </div>
  );
}

export default App;
