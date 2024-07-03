import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';
import { canisterId, createActor } from '../../../../declarations/seread_backend';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [userCanister, setUserCanister] = useState(null);
  const navigate = useNavigate();

  // Function to initialize authentication state and user canister
  const initializeAuth = useCallback(async (authClient) => {
    setIsAuthenticated(await authClient.isAuthenticated());
    if (isAuthenticated) {
      const identity = authClient.getIdentity();

      setIdentity(identity);

      setPrincipal(identity.getPrincipal());

      const authenticatedCanister = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });
      setUserCanister(authenticatedCanister);

      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const initializeAuthOnMount = async () => {
      const authClient = await AuthClient.create();
      await initializeAuth(authClient);
    };
    initializeAuthOnMount();
  }, [initializeAuth]);

  /////////////////
  ///  Log in   ///
  /////////////////
  const handleLogin = useCallback(async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();

          // identity
          setIdentity(identity);

          // principal Id
          setPrincipal(identity.getPrincipal());

          // userCanister
          const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
              identity,
            },
          });
          setUserCanister(authenticatedCanister);

          // Ship 'em to "profile" page after logging in
          navigate('/profile');
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
      //Handle error (e.g, display error message)
    }
  }, [navigate]);

  /////////////////
  ///  Log out  ///
  /////////////////
  const handleLogout = useCallback(async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error (e.g., display error message)
    }
  }, [navigate]);

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, identity, principal, userCanister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
