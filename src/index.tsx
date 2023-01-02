import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Root from './routes/root'
import reportWebVitals from './reportWebVitals';
import Profile from './routes/profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Navigate to ="/"/>
  },
  {
    path:"/profile",
    element: <Profile/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
