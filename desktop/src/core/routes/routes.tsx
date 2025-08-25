import App from "@/App";
import Login from "@/features/auth/Login";
import Home from "@/features/home/Home";
import Setting from "@/features/settings/Setting";
import {createBrowserRouter} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index: true,
        path: "/",
        element: <Login />,
      }, 
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ]
  },
]);
