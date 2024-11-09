import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import Contact from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import GoogleLogin from './Components/GoogleLogin';
import GithubLogin from './Components/GithubLogin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/googlelogin',
        element: <GoogleLogin></GoogleLogin>
      },
      {
        path: '/githublogin',
        element: <GithubLogin></GithubLogin>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
