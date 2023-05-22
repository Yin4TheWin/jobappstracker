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
import ListView from './routes/listview';

import {firebase} from './firebase'
import { getDatabase, ref, get } from "firebase/database";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Navigate to ="/"/>
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path: ":username/:listId",
    element: <ListView/>,
    loader: async ({params})=>{
      const db = getDatabase(firebase);
      const username=params.username?params.username.toLowerCase():"null"
      const listId=params.listId?params.listId.toLowerCase():"null"
      const snapshot = await get(ref(db, 'users/'+username+'/listVals/'+listId)).then(s=>{
        return s.exists()?s.val():null
      }).catch(()=>{return null})
      return snapshot
    }
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
