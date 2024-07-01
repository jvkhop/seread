// import React, { createContext, useState, useEffect } from 'react';
// import { AuthClient } from '@dfinity/auth-client';
// import { useNavigate } from 'react-router-dom'; 
// import { canisterId, createActor } from '../../../../declarations/seread_backend';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [principal, setPrincipal] = useState(null); 



//   //
//   const [identity, setIdentity] = useState(null);


//   const [userCanister, setUserCanister] = useState(null);

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const checkAuth = async () => {
//       const authClient = await AuthClient.create();
//       setIsAuthenticated(await authClient.isAuthenticated());

//       if (isAuthenticated) { 
//         const identity = authClient.getIdentity();


//         //
//         setIdentity(identity);


//         setPrincipal(identity.getPrincipal());
//         navigate('/profile');
//       }
//     };
//     checkAuth();
//   }, []);

//   const handleLogin = async () => {
//     const authClient = await AuthClient.create();
//     await authClient.login({
//       identityProvider: "https://identity.ic0.app/#authorize",
//       onSuccess: () => {
//         setIsAuthenticated(true); 
//         const identity = authClient.getIdentity();


//         //
//         setIdentity(identity);


//         setPrincipal(identity.getPrincipal());

//         const authenticatedCanister = createActor(canisterId, {
//           agentOptions: {
//             identity,
//           },
//         });
//         setUserCanister(authenticatedCanister);

//         navigate('/profile'); 
//       }
//     });
//   };

//   const handleLogout = async () => {
//     const authClient = await AuthClient.create();
//     await authClient.logout();
//     setIsAuthenticated(false);
//     setPrincipal(null);
//     navigate('/');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, identity, principal, userCanister, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
