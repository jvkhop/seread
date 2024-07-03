import React, { useState, useEffect, useContext } from "react";
import { seread_backend } from "../../../../declarations/seread_backend";
import '../../../assets/styles/secrets.css';
import Navbar from "../common/Navbar";
import { Principal } from "@dfinity/principal";
// import { AuthContext } from '../common/AuthContext';

function SecretList() {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [secrets, setSecrets] = useState([]);
  const [checker, setChecker] = useState([]);
  // const { isAuthenticated, principal, userCanister } = useContext(AuthContext);
  // const [likes, setLikes] = useState(0);
  const backendId = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");

  useEffect(() => {
    async function fetchSecrets() {
      const allSecrets = await seread_backend.getAllSecrets();
      console.log("Fetched Secrets:", allSecrets); // Debugging line
      setSecrets(allSecrets);
      // console.log(secrets);
    }
    fetchSecrets();
  }, []);

  async function handleClick() {
    try {
      // if (!isAuthenticated || !principal) {
      //   console.log("Not Logged in");
      //   setErrorMessage("Can you please log in first, master?");
      //   return;
      // }

      if (titleValue.trim() === "" || contentValue.trim() === "") {
        setErrorMessage("Title and content cannot be empty.");
        return;
      }

      const newPost = {
        userPrincipal: backendId,
        title: titleValue,
        content: contentValue,
        timestamp: BigInt(Date.now() * 1000000),
        likes: BigInt(0),
        id: 0
      };

      console.log("New Post Before Share:", newPost); // Debugging line

      await seread_backend.share(newPost);
      const newChecker = await seread_backend.getPost();
      setChecker(newChecker);
      console.log("Check the post added: ", newChecker);


      const allSecrets = await seread_backend.getAllSecrets();
      console.log("All Secrets After Share:", allSecrets); // Debugging line

      // Add the new secret to the list
      setSecrets(allSecrets);
      setIsHidden(false);
      setTitleValue("");
      setContentValue("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sharing secret:", error);
      setErrorMessage("Failed to share secret. Please try again.");
    }
  }

  async function handleBaddass(secret) {
    try {
      // if (!isAuthenticated && !principal) {
      //   setErrorMessage("Hi handsome (or beautify if you are girl), can you please log in?");
      //   return;
      // }
      // setLikes(secret.likes + 1);
      const currentSecret = { ...secret, likes: secret.likes };
      await seread_backend.baddassPost(currentSecret);

      // await seread_backend.baddassPost(secret);
      const allSecrets = await seread_backend.getAllSecrets();
      setSecrets(allSecrets);
      console.log(allSecrets);
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  }

  return (
    <div>
      <Navbar />
      <h1 className="label">Shhhhh!</h1>
      <div className="reveal-form">
        <p>
          <input
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="text-input"
          />
        </p>
        <p>
          <textarea
            placeholder="Content"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            className="textarea-input"
          />
        </p>
        <p className="trade-buttons">
          <button onClick={handleClick}>Reveal</button>
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!isHidden && <p>Secret shared successfully!</p>}
      </div>

      <h2>Secrets:</h2>
      <ul>
        {secrets.map((secret, index) => (
          <li key={index}>
            <h3>{secret.title}</h3>
            <p>{secret.content}</p>
            <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
            <button onClick={() => handleBaddass(secret)}>Baddass!</button>
            <p>
              {Number(secret.likes)} baddass!
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SecretList;
