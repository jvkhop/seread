// src/components/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      setIsAuthenticated(await authClient.isAuthenticated());
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => setIsAuthenticated(true),
    });
  };

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
