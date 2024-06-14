import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import About from './About';

const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        setIsAuthenticated(true);
        const router = createBrowserRouter([
          {
            path: "/",
            element: <App />,
          },
          {
            path: "about",
            element: <About />,
          },
        ]);
        const root = document.getElementById("root");
        const rootElement = ReactDOM.createRoot(root);
        rootElement.render(<RouterProvider router={router} />);
      },
    });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Log in with Internet Identity</button>
      ) : (
        <p>Logged in</p>
      )}
    </div>
  );
};

export default AuthButton;
