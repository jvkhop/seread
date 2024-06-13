import React, { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { seread_backend } from "../../../declarations/seread_backend";

function SecretList() {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [principalId, setPrincipalId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    async function fetchSecrets() {
      const secrets = await seread_backend.getAllSecrets();
      setSecrets(secrets);
    }
    fetchSecrets();
  }, []);

  async function handleClick() {
    try {
      if (titleValue.trim() === "" || contentValue.trim() === "") {
        setErrorMessage("Title and content cannot be empty.");
        return;
      }

      const principal = Principal.fromText(principalId);
      const newPost = { title: titleValue, content: contentValue, timestamp: BigInt(Date.now() * 1000000) };
      await seread_backend.share(principal, newPost);

      // Add the new secret to the list
      setSecrets([...secrets, newPost]);

      setIsHidden(false);
      setTitleValue("");
      setContentValue("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sharing secret:", error);
      setErrorMessage("Failed to share secret. Please try again.");
    }
  }

  return (
    <div className="window white">
      <label>Share a Secret:</label>
      <p>
        <input
          type="text"
          placeholder="Principal ID"
          value={principalId}
          onChange={(e) => setPrincipalId(e.target.value)}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Title"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
      </p>
      <p>
        <textarea
          placeholder="Content"
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button onClick={handleClick}>Share</button>
      </p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!isHidden && <p>Secret shared successfully!</p>}

      <h2>Secrets:</h2>
      <ul>
        {secrets.map((secret, index) => (
          <li key={index}>
            <h3>{secret.title}</h3>
            <p>{secret.content}</p>
            <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SecretList;
