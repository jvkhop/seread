import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import About from '../pages/About';
import SecretList from '../pages/SecretList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="secrets" element={<SecretList />} />
    </Routes>
  );
};

export default AppRoutes;