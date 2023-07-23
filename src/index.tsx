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

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CircuitCanvas from './routes/circuit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CircuitCanvas/>,
    children: [
      {
        path: "",
        element: <Root/>
      },
      {
        path:"profile",
        element: <Profile/>
      },
      {
        path: ":username/:listId",
        element: <ListView/>
      }
    ],
    errorElement: <Navigate to ="/"/>
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
