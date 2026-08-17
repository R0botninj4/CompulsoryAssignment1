import {APITester} from "./APITester";
// @ts-ignore
import "./index.css";
import {createBrowserRouter, type RouteObject, RouterProvider} from "react-router-dom";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {Home} from "@/Home.tsx";

import { ListPosts } from "./Posts.tsx";

const myRoutes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <APITester /> },
    { path: "/posts", element: <ListPosts /> },
]

export function App() {

    return <RouterProvider router={createBrowserRouter(myRoutes)} />
}

export default App;
