import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../common/AuthContext';
import { seread_backend, canisterId } from '../../../../declarations/seread_backend';
import Navbar from '../common/Navbar';
import { Link } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import '../../../assets/styles/profile.css';
import oak_planks from '../../../assets/images/Oak_Planks.png';

const principalId = await seread_backend.getId();

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  // const { isAuthenticated, identity, principal, userCanister } = useContext(AuthContext);

  // Convert backend canister ID to Principal
  const backendId = Principal.fromText('2vxsx-fae');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // if (isAuthenticated && principal) {
      const profileArr = await seread_backend.getUserProfile(backendId);
      const profile = profileArr[0];

      if (profile === null || profile === undefined) {
        console.log("Profile is empty or does not exist.");
        await seread_backend.registerUser("Anonymous", "optional@gmail.com", "You're a fucking badass");
        const newProfile = await seread_backend.getUserProfile(backendId);
        const profile = newProfile[0];
        setUserProfile(profile);
        console.log(profile);

        // var profile = {
        //   username : profile[0].username,
        //   email : profile[0].email,
        //   bio : profile[0].bio
        // }
      } else {
        setUserProfile(profile);
        console.log(profile);
        // profile = {
        //   username: profile[0].username,
        //   email: profile[0].email,
        //   bio: profile[0].bio,     
        // }
      }
      // setUserProfile(profile);
      // }
    };

    const fetchUserPosts = async () => {
      const posts = await seread_backend.getPost();
      console.log("posts: ");
      const realPosts = Array.isArray(posts) ? posts[0] : posts;
      console.log(realPosts);
      if (realPosts) {
        setUserPosts(realPosts);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    await seread_backend.deletePost(postId);
    const updatedPosts = await seread_backend.getPost();
    const realUpdatedPosts = Array.isArray(updatedPosts) ? updatedPosts[0] : updatedPosts;
    setUserPosts(realUpdatedPosts);
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-container" >
        <div className="profile-content">
          <label>Your Identity Card</label>
          <p>{principalId}</p>
          <div className="identity-card">
            <p>Alias: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>Your quotes: {userProfile.bio}</p>
          </div>
          <Link to="/update-profile" className="improve-card">Improve your Identity Card</Link>
        </div>

        <div className="posts-section">
          <h2>Your Secrets</h2>
          {console.log("userPosts: ")}
          {console.log(userPosts)}
          <div>
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => {
              // console.log("hehehe: ");
              // console.log(post); // Inspect the ID values
              return (
                <div key={post.id} className="post-card">
                  {post.imgUrl && <img src={post.imgUrl} />}
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p><small>Baddass: {Number(post.likes)}</small></p>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              );
            })
          ) : (
            <p>You have not shared any secrets yet.</p>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
