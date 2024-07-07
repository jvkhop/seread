import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../common/AuthContext';
import { seread_backend, canisterId, createActor } from '../../../../declarations/seread_backend';
import Navbar from '../common/Navbar';
import { useNavigate } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import '../../../assets/styles/updateProfile.css';
//2491391@nh301020
const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState({
    username: 'Anonymous',
    email: 'optional@gmail.com',
    bio: "You're a fucking badass"
  });
  // const { isAuthenticated, identity, principal, userCanister } = useContext(AuthContext);
  const navigate = useNavigate();

  // Convert backend canister ID to Principal
  const backendId = Principal.fromText('2vxsx-fae');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // if (isAuthenticated && principal) {
      var profileArr = await seread_backend.getUserProfile(backendId);
      var profile = Array.isArray(profileArr) ? profileArr[0] : profileArr;

      if (profile != null) {
        setUserProfile(profile);
      }
      // }
    };
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // if (isAuthenticated && userProfile && principal) {
    await seread_backend.updateUserProfile(userProfile.username, userProfile.email, userProfile.bio);

    const profileArr = await seread_backend.getUserProfile(backendId);
    const profile = Array.isArray(profileArr) ? profileArr[0] : profileArr;
    console.log(profile);
    setUserProfile(profile);
    // navigate('/profile');
    // }
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="update-profile-container">
      <Navbar />
      <label>Update Your Profile:</label>
      <form onSubmit={handleUpdateProfile} className="update-card">
        <input
          type="text"
          placeholder="Input your Username:"
          value={userProfile.username}
          onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
        />
        <input
          type="email"
          value={userProfile.email}
          placeholder="(Optional) Your Email:"
          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
        />
        <textarea
          value={userProfile.bio}
          placeholder="(Optional) Your Bio:"
          onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>
      <label>Your Profile:</label>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>Bio: {userProfile.bio}</p>
    </div>
  );
};

export default UpdateProfile;
