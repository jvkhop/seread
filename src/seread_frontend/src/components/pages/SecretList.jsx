import React, { useState, useEffect, useContext } from "react";
import { seread_backend } from "../../../../declarations/seread_backend";
import '../../../assets/styles/secrets.css';
import { Principal } from "@dfinity/principal";
// import { AuthContext } from '../common/AuthContext';
import Post from "../common/Post";
import Pagination from "../common/Pagination";

function SecretList() {
  //Logic
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);


  //Not so Logic
  const backendId = Principal.fromText('2vxsx-fae');
  // const { isAuthenticated, principal, userCanister } = useContext(AuthContext);
  // const [likes, setLikes] = useState(0);




  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await seread_backend.getAllSecrets();
        console.log("Fetched Secrets:", allPosts); // Debugging line
        setPosts(allPosts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);





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
      const allPosts = await seread_backend.getAllSecrets();
      setPosts(allPosts);
      console.log(allPosts);
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  }




  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  return (
    <div className="secrets-container">


      <div className="window white">
        <Post
          posts={currentPosts}
          loading={loading}
          handleBaddass={handleBaddass}
        />
        <Pagination
          length={posts.length}
          postsPerPage={postsPerPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>



    </div>
  );
}

export default SecretList;
