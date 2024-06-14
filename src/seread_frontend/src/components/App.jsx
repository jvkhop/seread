import React from "react";
import SecretList from "./SecretList";

import Navbar from "./Navbar";

function App() {
  return (
    <div id="screen">
      <Navbar></Navbar>
      <h1>Seread: Share and Read Secrets</h1>
      <SecretList />
    </div>
  );
}

export default App;
