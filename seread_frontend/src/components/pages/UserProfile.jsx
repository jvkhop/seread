import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../common/AuthContext';
import { seread_backend, canisterId } from '../../../../declarations/seread_backend';
import Navbar from '../common/Navbar';
import { Link } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import '../../../assets/styles/profile.css';
import oak_planks from '../../../assets/images/Oak_Planks.png';

var backgroundPic = {
  backgroundImage: `url(${oak_planks})`,
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  // const { isAuthenticated, identity, principal, userCanister } = useContext(AuthContext);

  // Convert backend canister ID to Principal
  const backendId = Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // if (isAuthenticated && principal) {
      var profile = await seread_backend.getUserProfile(backendId);
      console.log(profile);
      // var profile = {
      //   username : profileArr[0].username,
      //   email : profileArr[0].email,
      //   bio : profileArr[0].bio
      // }
      if (profile.length === 0) {
        console.log("Profile is empty or does not exist.");
        await seread_backend.registerUser("Anonymous", "None", "You're a fucking badass");
        profile = await seread_backend.getUserProfile(backendId);
        // var profile = {
        //   username : profile[0].username,
        //   email : profile[0].email,
        //   bio : profile[0].bio
        // }
      } else {
        console.log("User exists");
        // profile = {
        //   username: profile[0].username,
        //   email: profile[0].email,
        //   bio: profile[0].bio,     
        // }
      }
      console.log(profile);
      setUserProfile(profile);
      // }
    };
    fetchUserProfile();
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-container" style={backgroundPic}>
        <div className="profile-content">
          <label>Your Identity Card</label>
          <div className="identity-card">
            <p>Alias: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>Your quotes: {userProfile.bio}</p>
          </div>
          <Link to="/update-profile" className="improve-card">Improve your Identity Card</Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
