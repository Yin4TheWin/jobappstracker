import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Root from './routes/Root'
import reportWebVitals from './reportWebVitals';
import Profile from './routes/Profile';
import ListView from './routes/JobListView';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CircuitCanvas from './routes/Circuit';

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
        element: <ListView/>,
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
