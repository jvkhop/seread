import React, { createContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom'; //new

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); //new

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      setIsAuthenticated(await authClient.isAuthenticated());
      if (await authClient.isAuthenticated()) { //new
        navigate('/secrets');
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        setIsAuthenticated(true); 
        navigate('/secrets'); //new
      }
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
