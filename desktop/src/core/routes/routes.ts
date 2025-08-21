import App from "@/App";
import Login from "@/features/auth/Login";
import Home from "@/features/home/Home";
import Setup from "@/features/setup/Setup";
import {createBrowserRouter} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index: true,
        path: "/",
        Component: Setup,
      },
      {
        path: "login",
        Component: Login,
      }, 
      {
        path: "home",
        Component: Home,
      },
    ]
  },
]);
