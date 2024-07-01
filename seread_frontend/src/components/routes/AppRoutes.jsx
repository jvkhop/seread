import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import SecretList from '../pages/SecretList';
import UserProfile from '../pages/UserProfile';
import UpdateProfile from '../pages/UpdateProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/secrets" element={<SecretList />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Routes>
  );
};

export default AppRoutes;