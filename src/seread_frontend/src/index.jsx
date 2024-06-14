import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './components/AuthContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from "./components/About";

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

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);