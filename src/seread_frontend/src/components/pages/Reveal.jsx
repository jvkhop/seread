import React, { useState, useEffect, useContext } from "react";
import { seread_backend } from "../../../../declarations/seread_backend";
import '../../../assets/styles/secrets.css';
import { Principal } from "@dfinity/principal";
import Navbar from "../common/Navbar";
// import { AuthContext } from '../common/AuthContext';


const RevealSecret = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const backendId = Principal.fromText('2vxsx-fae');

    const [imgBase64, setImgBase64] = useState("");

    function handleUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    // const { isAuthenticated, principal, userCanister } = useContext(AuthContext);
    // const [likes, setLikes] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                id: 0,
                imgUrl: imgBase64
            };

            console.log("New Post Before Share:", newPost); // Debugging line

            await seread_backend.share(newPost);
            const newChecker = await seread_backend.getPost();
            console.log("Check the post added: ", newChecker);


            const allPosts = await seread_backend.getAllSecrets();
            console.log("All Secrets After Share:", allPosts); // Debugging line

            // Add the new secret to the list
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
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className="window white form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        className="text-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="textarea">Secrets go here:</label>
                    <textarea
                        placeholder="Content"
                        value={contentValue}
                        onChange={(e) => setContentValue(e.target.value)}
                        className="textarea-input"
                    />
                </div>

                <div className="image">
                    <h2>Add Image (Optional):</h2>
                    <input type="file" onChange={handleUpload} />
                    {imgBase64 && <img src={imgBase64} alt="Preview" />}
                </div>

                <button type="submit" className="form-submit-btn">Reveal</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {!isHidden && <p>Secret shared successfully!</p>}
            </form>
        </>
    )
};

export default RevealSecret;